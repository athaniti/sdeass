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

type StudentRecord = {
  id: string;
  am: string;
  lastName: string;
  firstName: string;
  year: number;
  gender: string;
  level: string;
  fatherName: string;
  fatherNameGen: string;
  motherName: string;
  address: string;
  phone: string;
  oik: string;
  employer: string;
  unemploymentMonths: number;
  roma: string;
  axiol: string;
  children: number;
  active: string;
  trechon: string;
  pdf: string;
};

type EditStudentDialogProps = {
  student: StudentRecord | null;
  open: boolean;
  onClose: () => void;
  onSave: (student: StudentRecord) => void;
};

export function EditStudentDialog({
  student,
  open,
  onClose,
  onSave,
}: EditStudentDialogProps) {
  const [formData, setFormData] = useState<StudentRecord | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Επεξεργασία Εκπαιδευόμενου</DialogTitle>
          <DialogDescription>
            Επεξεργαστείτε τα στοιχεία του εκπαιδευόμενου και πατήστε Αποθήκευση.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
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
            <Label htmlFor="year">Έτος Γέννησης</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
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
            <Label htmlFor="fatherName">Πατρώνυμο</Label>
            <Input
              id="fatherName"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="fatherNameGen">Πατρώνυμο (Γεν)</Label>
            <Input
              id="fatherNameGen"
              value={formData.fatherNameGen}
              onChange={(e) => setFormData({ ...formData, fatherNameGen: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="motherName">Μητρώνυμο</Label>
            <Input
              id="motherName"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="gender">Φύλο</Label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Α">Άνδρας</SelectItem>
                <SelectItem value="Γ">Γυναίκα</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level">Τάξη</Label>
            <Select 
              value={formData.level} 
              onValueChange={(value) => setFormData({ ...formData, level: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="B1">B1</SelectItem>
                <SelectItem value="B2">B2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label htmlFor="address">Διεύθυνση</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
            <Label htmlFor="oik">Οικογενειακή Κατάσταση</Label>
            <Input
              id="oik"
              value={formData.oik}
              onChange={(e) => setFormData({ ...formData, oik: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="employer">Εργασία</Label>
            <Input
              id="employer"
              value={formData.employer}
              onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="unemploymentMonths">Μήνες Ανεργίας</Label>
            <Input
              id="unemploymentMonths"
              type="number"
              min="0"
              value={formData.unemploymentMonths}
              onChange={(e) => setFormData({ ...formData, unemploymentMonths: parseInt(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="roma">ROMA</Label>
            <Select 
              value={formData.roma} 
              onValueChange={(value) => setFormData({ ...formData, roma: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ΝΑΙ">ΝΑΙ</SelectItem>
                <SelectItem value="ΟΧΙ">ΟΧΙ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="axiol">Αξιολόγηση</Label>
            <Select 
              value={formData.axiol} 
              onValueChange={(value) => setFormData({ ...formData, axiol: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ΝΑΙ">ΝΑΙ</SelectItem>
                <SelectItem value="ΟΧΙ">ΟΧΙ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="children">Αρ. Τέκνων</Label>
            <Input
              id="children"
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, children: value === '' ? 0 : parseInt(value) || 0 });
              }}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="active">Ενεργός</Label>
            <Select 
              value={formData.active} 
              onValueChange={(value) => setFormData({ ...formData, active: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ΝΑΙ">ΝΑΙ</SelectItem>
                <SelectItem value="ΟΧΙ">ΟΧΙ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="trechon">Τρέχων</Label>
            <Select 
              value={formData.trechon} 
              onValueChange={(value) => setFormData({ ...formData, trechon: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ΝΑΙ">ΝΑΙ</SelectItem>
                <SelectItem value="ΟΧΙ">ΟΧΙ</SelectItem>
              </SelectContent>
            </Select>
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
