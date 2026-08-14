import { getDB } from './db';
import type { TopicCategory } from '../types';
import { getAllCategories } from './categoriesRepository';

export async function exportUserDataJSON(): Promise<string> {
  const db = await getDB();
  const customCategories = await db.getAll('categories');

  const exportData = {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    customCategories,
  };

  return JSON.stringify(exportData, null, 2);
}

export async function importUserDataJSON(jsonString: string): Promise<{ importedCategoriesCount: number }> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    throw new Error('Invalid JSON format.');
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Import payload must be a valid JSON object.');
  }

  const data = parsed as { customCategories?: TopicCategory[]; categories?: TopicCategory[] };
  const categoriesList = data.customCategories || data.categories || [];

  if (!Array.isArray(categoriesList)) {
    throw new Error('Import JSON must contain a valid categories array.');
  }

  const db = await getDB();
  let importedCategoriesCount = 0;

  for (const cat of categoriesList) {
    if (cat.name && cat.topics) {
      const id = cat.id || `cat-custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      const now = new Date().toISOString();
      const validCategory: TopicCategory = {
        id,
        name: cat.name,
        description: cat.description || '',
        iconName: cat.iconName || 'Folder',
        source: 'custom',
        createdAt: cat.createdAt || now,
        updatedAt: now,
        topics: {
          easy: Array.isArray(cat.topics.easy) ? cat.topics.easy : [],
          medium: Array.isArray(cat.topics.medium) ? cat.topics.medium : [],
          hard: Array.isArray(cat.topics.hard) ? cat.topics.hard : [],
        },
      };
      await db.put('categories', validCategory);
      importedCategoriesCount++;
    }
  }

  return { importedCategoriesCount };
}

export async function getAllTopicsCount(): Promise<number> {
  const categories = await getAllCategories();
  return categories.reduce((total, cat) => {
    const easy = cat.topics?.easy?.length || 0;
    const medium = cat.topics?.medium?.length || 0;
    const hard = cat.topics?.hard?.length || 0;
    return total + easy + medium + hard;
  }, 0);
}
