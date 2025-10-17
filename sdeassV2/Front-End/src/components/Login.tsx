import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type LoginProps = {
  onLogin: (username: string, password: string) => void;
};

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-center mb-8 text-gray-800">
            Εισαγωγή στο σύστημα
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Εγγραφή
          </a>
          <p className="mt-4 text-gray-600">
            © 2021 Ανδρέας Αθανίτης
          </p>
        </div>
      </div>
    </div>
  );
}
