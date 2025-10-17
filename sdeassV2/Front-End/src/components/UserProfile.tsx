import { useState } from 'react';
import { User } from '../App';
import { Header } from './Header';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

type UserProfileProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

export function UserProfile({
  user,
  onLogout,
  onNavigateToDashboard,
}: UserProfileProps) {
  const [formData, setFormData] = useState({
    firstName: 'Ανδρέας',
    lastName: 'Αθανίτης',
    specialty: '',
    specialtyCode: '',
    address: '',
    email: '',
    phone: '',
    username: user.username,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to the backend
    alert('Τα στοιχεία αποθηκεύτηκαν επιτυχώς!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Προσωπικές Ρυθμίσεις</h1>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Όνομα:</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Επίθετο:</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Ειδικότητα:</Label>
                <Input
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Κωδικός Ειδικότητας:</Label>
                <Input
                  value={formData.specialtyCode}
                  onChange={(e) =>
                    setFormData({ ...formData, specialtyCode: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Διεύθυνση:</Label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Email:</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Τηλέφωνο:</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-48 text-right">Username:</Label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
                Save
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
}
