import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, X } from 'lucide-react';

type TeacherRecord = {
  id: string;
  am: string;
  lastName: string;
  firstName: string;
  department: string;
  specialization: string;
  phone: string;
  email: string;
  active: string;
};

type LiteracyAssignment = {
  literacy: string;
  departments: {
    A1: boolean;
    A2: boolean;
    A3: boolean;
    B1: boolean;
    B2: boolean;
    B3: boolean;
    B4: boolean;
    B5: boolean;
  };
};

type EditTeacherDialogProps = {
  teacher: TeacherRecord | null;
  open: boolean;
  onClose: () => void;
  onSave: (teacher: TeacherRecord) => void;
};

const LITERACY_OPTIONS = [
  'Γλώσσα',
  'Αγγλικά',
  'Πληροφορική',
  'Μαθηματικά',
  'Φυσ. Επιστήμες',
  'Περ. Εκπαίδευση',
  'Κοινωνιολογία',
  'Καλλιτεχνικά'
];

export function EditTeacherDialog({
  teacher,
  open,
  onClose,
  onSave,
}: EditTeacherDialogProps) {
  const [formData, setFormData] = useState<TeacherRecord | null>(null);
  const [literacyAssignments, setLiteracyAssignments] = useState<LiteracyAssignment[]>([
    {
      literacy: 'Γλώσσα',
      departments: {
        A1: false,
        A2: false,
        A3: false,
        B1: false,
        B2: false,
        B3: false,
        B4: false,
        B5: false,
      }
    }
  ]);

  useEffect(() => {
    if (teacher) {
      setFormData({ ...teacher });
      // Initialize with one empty literacy assignment
      setLiteracyAssignments([
        {
          literacy: 'Γλώσσα',
          departments: {
            A1: false,
            A2: false,
            A3: false,
            B1: false,
            B2: false,
            B3: false,
            B4: false,
            B5: false,
          }
        }
      ]);
    }
  }, [teacher]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const addLiteracyAssignment = () => {
    setLiteracyAssignments([
      ...literacyAssignments,
      {
        literacy: 'Γλώσσα',
        departments: {
          A1: false,
          A2: false,
          A3: false,
          B1: false,
          B2: false,
          B3: false,
          B4: false,
          B5: false,
        }
      }
    ]);
  };

  const removeLiteracyAssignment = (index: number) => {
    if (literacyAssignments.length > 1) {
      setLiteracyAssignments(literacyAssignments.filter((_, i) => i !== index));
    }
  };

  const updateLiteracy = (index: number, literacy: string) => {
    const updated = [...literacyAssignments];
    updated[index].literacy = literacy;
    setLiteracyAssignments(updated);
  };

  const toggleDepartment = (index: number, dept: keyof LiteracyAssignment['departments']) => {
    const updated = [...literacyAssignments];
    updated[index].departments[dept] = !updated[index].departments[dept];
    setLiteracyAssignments(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Επεξεργασία Εκπαιδευτικού</DialogTitle>
          <DialogDescription>
            Επεξεργαστείτε τα στοιχεία του εκπαιδευτικού και πατήστε Αποθήκευση.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Βασικά Στοιχεία */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="am">Α.Μ.</Label>
              <Input
                id="am"
                value={formData.am}
                onChange={(e) => setFormData({ ...formData, am: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lastName">Επίθετο</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="firstName">Όνομα</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="specialization">Ειδικότητα</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Τηλέφωνο</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Ανάθεση Γραμματισμών */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ανάθεση Γραμματισμών και Τμημάτων</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLiteracyAssignment}
                className="text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Προσθήκη Γραμματισμού
              </Button>
            </div>

            {literacyAssignments.map((assignment, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="mb-3">
                      <Label>
                        {index === 0 ? 'Κύριος Γραμματισμός' : `Δευτερεύων Γραμματισμός ${index}`}
                      </Label>
                      <Select
                        value={assignment.literacy}
                        onValueChange={(value) => updateLiteracy(index, value)}
                      >
                        <SelectTrigger className="mt-1 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LITERACY_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block">Τμήματα</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'B5'] as const).map((dept) => (
                          <div key={dept} className="flex items-center space-x-2">
                            <Label className="text-sm flex items-center gap-2 cursor-pointer">
                              <span className="min-w-[24px]">{dept}:</span>
                              <Select
                                value={assignment.departments[dept] ? 'ΝΑΙ' : 'ΟΧΙ'}
                                onValueChange={(value) => {
                                  const updated = [...literacyAssignments];
                                  updated[index].departments[dept] = value === 'ΝΑΙ';
                                  setLiteracyAssignments(updated);
                                }}
                              >
                                <SelectTrigger className="h-8 w-20 bg-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ΝΑΙ">ΝΑΙ</SelectItem>
                                  <SelectItem value="ΟΧΙ">ΟΧΙ</SelectItem>
                                </SelectContent>
                              </Select>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {literacyAssignments.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLiteracyAssignment(index)}
                      className="hover:text-red-600 mt-6"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
            Αποθήκευση
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
