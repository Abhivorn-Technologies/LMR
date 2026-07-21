import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export const getContent = async (key: string, defaultValue: any = null) => {
  try {
    await dbConnect();
    const content = await Content.findOne({ key }).lean();
    
    if (content && content.data) {
      return content.data;
    }
    
    return defaultValue;
  } catch (error) {
    console.error(`Failed to fetch content for key: ${key}`, error);
    return defaultValue;
  }
};
