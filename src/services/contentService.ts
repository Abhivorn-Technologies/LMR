import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export async function getContent(key: string, defaultValue: any = null) {
  try {
    await dbConnect();
    const content = await Content.findOne({ key });
    
    if (content && content.data) {
      return content.data;
    }
    
    return defaultValue;
  } catch (error) {
    console.error(`Failed to fetch content for key: ${key}`, error);
    return defaultValue;
  }
}
