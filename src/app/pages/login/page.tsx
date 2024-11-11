

'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push('/pages/home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        {authMode === 'login' ? (
          <>
            <LoginForm onSuccess={handleAuthSuccess} />
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegistrationForm onSuccess={handleAuthSuccess} />
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
