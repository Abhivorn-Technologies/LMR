import dbConnect from '@/lib/db';
import Content from '@/models/Content';

/**
 * Fetches dynamic content from the database for Server Components.
 * If no content exists for the given key, it gracefully falls back to the defaultData.
 */
export const getPageContent = async <T>(key: string, defaultData: T): Promise<T> => {
  try {
    await dbConnect();
    const result = await Content.findOne({ key }).lean();
    if (result && result.data) {
      // Merge with defaults to ensure no missing fields break the UI
      if (typeof result.data === 'object' && !Array.isArray(result.data) && result.data !== null) {
        return { ...defaultData, ...result.data } as T;
      }
      return result.data as T;
    }
  } catch (error) {
    console.error(`Error fetching CMS content for key: ${key}`, error);
  }
  
  // Fallback to default
  return defaultData;
};
