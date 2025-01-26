import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { UserCircle } from 'lucide-react';

export function SignOutPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut();
        navigate('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    performSignOut();
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle className="w-10 h-10 text-white/70" />
            )}
          </div>
          <h2 className="text-xl font-medium text-white/90">
            Signing out, {user?.name || 'Guest User'}...
          </h2>
          <p className="text-white/50 text-center">
            Please wait while we securely sign you out of your account.
          </p>
        </div>
      </div>
    </div>
  );
}