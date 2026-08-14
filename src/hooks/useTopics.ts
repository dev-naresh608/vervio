import { useState, useEffect, useCallback } from 'react';
import type { TopicCategory, Topic, TopicBuckets, SelectedDifficulties } from '../types';
import { getAllCategories, addCustomCategory } from '../storage/categoriesRepository';

export function useTopics() {
  const [categories, setCategories] = useState<TopicCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cats = await getAllCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load local practice data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Build pool of topics based on selected difficulties (easy, medium, hard)
  const getTopicPool = useCallback((category: TopicCategory, selections: SelectedDifficulties): Topic[] => {
    const pool: Topic[] = [];
    if (!category || !category.topics) return pool;

    if (selections.easy && Array.isArray(category.topics.easy)) {
      pool.push(...category.topics.easy);
    }
    if (selections.medium && Array.isArray(category.topics.medium)) {
      pool.push(...category.topics.medium);
    }
    if (selections.hard && Array.isArray(category.topics.hard)) {
      pool.push(...category.topics.hard);
    }

    return pool;
  }, []);

  // Pick random topic from category given difficulty selection, excluding recent topic IDs if possible
  const getRandomTopic = useCallback(
    (
      category: TopicCategory,
      selections: SelectedDifficulties,
      excludeTopicIds: string[] = []
    ): Topic | null => {
      const pool = getTopicPool(category, selections);
      if (pool.length === 0) return null;

      // Filter out recently shown topic IDs if candidates remain
      const candidates = pool.filter(t => !excludeTopicIds.includes(t.id));
      const finalPool = candidates.length > 0 ? candidates : pool;

      const randomIndex = Math.floor(Math.random() * finalPool.length);
      return finalPool[randomIndex];
    },
    [getTopicPool]
  );

  const createCategory = useCallback(
    async (name: string, buckets: TopicBuckets, iconName = 'Folder', description = '') => {
      const id = `cat-custom-${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const now = new Date().toISOString();

      const newCategory: TopicCategory = {
        id,
        name,
        description,
        iconName,
        topics: buckets,
        source: 'custom',
        createdAt: now,
        updatedAt: now,
      };

      await addCustomCategory(newCategory);
      await loadData();
    },
    [loadData]
  );

  return {
    categories,
    isLoading,
    error,
    refreshTopics: loadData,
    getTopicPool,
    getRandomTopic,
    createCategory,
  };
}
