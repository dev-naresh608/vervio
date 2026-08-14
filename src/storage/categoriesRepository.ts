import { getDB } from './db';
import type { TopicCategory } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultTopics';

export function calculateTopicCounts(category: TopicCategory) {
  const easy = category.topics?.easy?.length || 0;
  const medium = category.topics?.medium?.length || 0;
  const hard = category.topics?.hard?.length || 0;
  const total = easy + medium + hard;
  return { easy, medium, hard, total };
}

export async function getAllCategories(): Promise<TopicCategory[]> {
  try {
    const db = await getDB();
    const customCategories = await db.getAll('categories');

    const allCategoriesMap = new Map<string, TopicCategory>();

    DEFAULT_CATEGORIES.forEach(cat => {
      allCategoriesMap.set(cat.id, {
        ...cat,
        topicCounts: calculateTopicCounts(cat),
      });
    });

    customCategories.forEach(cat => {
      allCategoriesMap.set(cat.id, {
        ...cat,
        source: 'custom',
        topicCounts: calculateTopicCounts(cat),
      });
    });

    return Array.from(allCategoriesMap.values());
  } catch (err) {
    console.error('Error loading categories from IndexedDB:', err);
    return DEFAULT_CATEGORIES.map(cat => ({
      ...cat,
      topicCounts: calculateTopicCounts(cat),
    }));
  }
}

export async function addCustomCategory(category: TopicCategory): Promise<TopicCategory> {
  const db = await getDB();
  const catToSave: TopicCategory = {
    ...category,
    source: 'custom',
    topicCounts: calculateTopicCounts(category),
  };
  await db.put('categories', catToSave);
  return catToSave;
}

export async function deleteCustomCategory(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('categories', id);
}
