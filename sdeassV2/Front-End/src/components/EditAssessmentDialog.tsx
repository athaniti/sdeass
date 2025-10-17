import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Student } from '../App';

type EditAssessmentDialogProps = {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
};

const enthusiasmOptions = [
  'Ελάχιστο',
  'Μέτριο',
  'Ικανοποιητικό',
  'Μεγάλο',
  'Πολύ Μεγάλο'
];

const participationOptions = [
  'Καλά',
  'Επαρκές',
  'Καλό',
  'Πολύ καλό',
  'Άριστο'
];

export function EditAssessmentDialog({
  student,
  open,
  onClose,
  onSave,
}: EditAssessmentDialogProps) {
  const [formData, setFormData] = useState<Student | null>(student);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="bg-blue-400 text-white p-3 -m-6 mb-4 rounded-t-lg">
            Επεξεργασία Εγγραφής
          </DialogTitle>
          <DialogDescription className="sr-only">
            Επεξεργασία αξιολόγησης εκπαιδευόμενου
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <Label>Α Τετρ.</Label>
            <Textarea
              value={formData.aTerm}
              onChange={(e) =>
                setFormData({ ...formData, aTerm: e.target.value })
              }
              className="min-h-[100px] mt-1"
            />
          </div>

          <div>
            <Label>Α-Ενδιαφ.</Label>
            <Select
              value={formData.aPresence}
              onValueChange={(value) =>
                setFormData({ ...formData, aPresence: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enthusiasmOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Β-Ενδιαφ.</Label>
            <Select
              value={formData.bPresence}
              onValueChange={(value) =>
                setFormData({ ...formData, bPresence: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enthusiasmOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Β-Ανταπόκ.</Label>
            <Select
              value={formData.bParticipation}
              onValueChange={(value) =>
                setFormData({ ...formData, bParticipation: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {participationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Τελ. Βαθμός</Label>
            <Select
              value={formData.tdd.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, tdd: parseInt(value) })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 21 }, (_, i) => i).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Β Τετρ.</Label>
            <Textarea
              value={formData.bTerm}
              onChange={(e) =>
                setFormData({ ...formData, bTerm: e.target.value })
              }
              className="min-h-[100px] mt-1"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Αποθήκευση
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
