import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Check if any admin exists
    const adminCount = await User.countDocuments();
    // TEMPORARILY DISABLED: Allow creating new admins for now
    // if (adminCount > 0) {
    //   return NextResponse.json({ error: 'Admin already exists' }, { status: 403 });
    // }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({ success: true, message: 'Admin user created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
