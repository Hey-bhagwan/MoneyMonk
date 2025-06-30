'use server';

import db from '@repo/db/client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function signupAction(formData: FormData) {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!phone || !password || !name) {
    throw new Error("All fields are required");
  }

  const existingUser = await db.user.findFirst({
    where: { number: phone },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      number: phone,
      password: hashedPassword,
    },
  });

  await db.balance.create({
    data: {
      userId: user.id,
      amount: 0,
      locked: 0,
    },
  });

  // Redirect to login page
  redirect('/dashboard');
}
