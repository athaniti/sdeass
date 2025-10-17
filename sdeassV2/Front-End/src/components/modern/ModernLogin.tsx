import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GraduationCap, Lock, User } from 'lucide-react';

type ModernLoginProps = {
  onLogin: (username: string, password: string) => void;
};

export function ModernLogin({ onLogin }: ModernLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-center border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-2xl mb-2">
            Σύστημα Διαχείρισης ΣΔΕ
          </h1>
          <p className="text-indigo-200 text-sm">
            Σχολείο Δεύτερης Ευκαιρίας
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-800 text-xl mb-6 text-center">
            Είσοδος στο Σύστημα
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Όνομα Χρήστη
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Κωδικός Πρόσβασης
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg"
            >
              Σύνδεση
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
              Ξεχάσατε τον κωδικό σας;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-indigo-200 text-sm">
          <p>© 2025 Σχολείο Δεύτερης Ευκαιρίας. Όλα τα δικαιώματα κατοχυρωμένα.</p>
          <p className="mt-2 text-xs text-indigo-300">Ακαδημαϊκό Έτος 2024-2025</p>
        </div>
      </div>
    </div>
  );
}
