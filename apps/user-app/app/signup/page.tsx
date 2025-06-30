'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { signupAction } from '../lib/actions/signup';


export default function SignupPage() {
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const defaultPhone = searchParams.get('phone') || '';

  async function handleSubmit(formData: FormData) {
    try {
      await signupAction(formData);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
        <form action={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 bg-white shadow rounded">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
                                      
        {error && <p className="text-red-600">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          required
          defaultValue={defaultPhone} // <-- Autofill from ?phone=...
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Create Account
        </button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
