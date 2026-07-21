import dbConnect from '@/lib/db';
import User from '@/models/User';
import RegisterForm from './RegisterForm';

// Force dynamic rendering to always check the DB in real-time
export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  await dbConnect();
  
  // Registration is unlocked for now so you can create your new account!
  return <RegisterForm />;
}
