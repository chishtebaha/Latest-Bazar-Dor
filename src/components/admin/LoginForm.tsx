import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (userCredential.user) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(language === 'bn' ? 'লগইন ব্যর্থ হয়েছে। আপনার ইমেইল এবং পাসওয়ার্ড যাচাই করুন।' : 'Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Login'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'ইমেইল' : 'Email'}
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {language === 'bn' ? 'সঠিক ইমেইল দিন' : 'Please enter a valid email'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm pr-10"
                  placeholder={language === 'bn' ? 'আপনার পাসওয়ার্ড' : 'Your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                language === 'bn' ? 'লগইন হচ্ছে...' : 'Signing in...'
              ) : (
                language === 'bn' ? 'লগইন করুন' : 'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}