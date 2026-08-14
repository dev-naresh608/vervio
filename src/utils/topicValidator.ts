import type { TopicBuckets } from '../types';

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
  counts?: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  validatedBuckets?: TopicBuckets;
};

export function normalizeTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export function validateCategoryJSON(jsonString: string): ValidationResult {
  const errors: string[] = [];

  if (!jsonString || !jsonString.trim()) {
    return { isValid: false, errors: ['The uploaded JSON file is empty.'] };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    const message = (err as Error).message || 'Invalid JSON syntax.';
    return { isValid: false, errors: [`JSON syntax error: ${message}`] };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { isValid: false, errors: ['Root element must be a valid JSON object.'] };
  }

  const obj = parsed as Record<string, unknown>;

  // Verify root properties
  const validKeys = ['easy', 'medium', 'hard'];
  const rootKeys = Object.keys(obj);

  // Check for invalid root keys
  const invalidKeys = rootKeys.filter(k => !validKeys.includes(k));
  if (invalidKeys.length > 0) {
    errors.push(`Invalid root field(s) found: ${invalidKeys.map(k => `"${k}"`).join(', ')}. Root object should only contain "easy", "medium", and "hard".`);
  }

  // Check required keys exist and are arrays
  for (const key of validKeys) {
    if (!(key in obj)) {
      errors.push(`Missing required difficulty bucket: "${key}".`);
    } else if (!Array.isArray(obj[key])) {
      errors.push(`Difficulty bucket "${key}" must be an array of topic objects.`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const easyRaw = obj['easy'] as unknown[];
  const mediumRaw = obj['medium'] as unknown[];
  const hardRaw = obj['hard'] as unknown[];

  const validatedBuckets: TopicBuckets = {
    easy: [],
    medium: [],
    hard: [],
  };

  const seenTitles = new Map<string, { difficulty: string; originalTitle: string }>();

  const processBucket = (rawItems: unknown[], bucketName: 'easy' | 'medium' | 'hard') => {
    rawItems.forEach((item, index) => {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
        errors.push(`Topic #${index + 1} in "${bucketName}" bucket is not a valid JSON object.`);
        return;
      }

      const topicObj = item as Record<string, unknown>;
      if (!('title' in topicObj)) {
        errors.push(`Topic #${index + 1} in "${bucketName}" bucket is missing the "title" property.`);
        return;
      }

      if (typeof topicObj.title !== 'string') {
        errors.push(`Topic #${index + 1} in "${bucketName}" bucket has invalid title type "${typeof topicObj.title}". Expected a non-empty string.`);
        return;
      }

      const trimmedTitle = topicObj.title.trim();
      if (trimmedTitle.length === 0) {
        errors.push(`Topic #${index + 1} in "${bucketName}" bucket has an empty title string.`);
        return;
      }

      if (trimmedTitle.length > 300) {
        errors.push(`Topic #${index + 1} in "${bucketName}" bucket title is too long (${trimmedTitle.length} characters). Maximum 300 characters.`);
        return;
      }

      // Duplicate detection across file
      const normalized = normalizeTitle(trimmedTitle);
      if (seenTitles.has(normalized)) {
        const prev = seenTitles.get(normalized)!;
        errors.push(`Duplicate topic found: "${trimmedTitle}" in "${bucketName}" bucket matches previously listed topic in "${prev.difficulty}" bucket.`);
        return;
      }

      seenTitles.set(normalized, { difficulty: bucketName, originalTitle: trimmedTitle });

      const topicId = `topic-${bucketName}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      validatedBuckets[bucketName].push({
        id: topicId,
        title: trimmedTitle,
      });
    });
  };

  processBucket(easyRaw, 'easy');
  processBucket(mediumRaw, 'medium');
  processBucket(hardRaw, 'hard');

  const totalCount = validatedBuckets.easy.length + validatedBuckets.medium.length + validatedBuckets.hard.length;
  if (errors.length === 0 && totalCount === 0) {
    errors.push('No topics were found in the uploaded file. Please add at least 1 topic.');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: [],
    counts: {
      easy: validatedBuckets.easy.length,
      medium: validatedBuckets.medium.length,
      hard: validatedBuckets.hard.length,
      total: totalCount,
    },
    validatedBuckets,
  };
}

export function generateTemplateJSON(): string {
  const template = {
    easy: [
      { title: "What is a variable in JavaScript?" },
      { title: "What is the difference between let, const, and var?" }
    ],
    medium: [
      { title: "Explain closures and lexical scope." },
      { title: "Explain the JavaScript Event Loop." }
    ],
    hard: [
      { title: "How does V8 optimize JavaScript code execution?" }
    ]
  };
  return JSON.stringify(template, null, 2);
}
