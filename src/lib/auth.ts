import { cookies } from 'next/headers';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-lmb-key-change-in-production';

/**
 * Validates if the current visitor is an admin securely on the server-side.
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}
