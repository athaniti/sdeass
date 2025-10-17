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
import { useState } from 'react';

type ExportGradesDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function ExportGradesDialog({ open, onClose }: ExportGradesDialogProps) {
  const [formData, setFormData] = useState({
    period: '2425',
    actionNumber: '',
    actionDate: '',
    firstDiplomaNumber: '',
    firstDiplomaDate: '',
    firstGradesNumber: '',
    firstGradesDate: '',
    gradeFormat: ''
  });

  const handleExport = () => {
    // Export logic here
    console.log('Exporting grades:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Εξαγωγή αναλυτικής βαθμολογίας για το σχ. έτος {formData.period}
          </DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα απαραίτητα στοιχεία για την εξαγωγή της αναλυτικής βαθμολογίας.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="period">Περίοδος:</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="actionNumber">Αρ. Πράξης:</Label>
            <Input
              id="actionNumber"
              value={formData.actionNumber}
              onChange={(e) => setFormData({ ...formData, actionNumber: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="actionDate">Ημερομηνία Πράξης (ΗΗ-ΜΜ-ΕΕΕΕ):</Label>
            <Input
              id="actionDate"
              placeholder="DD-MM-YYYY"
              value={formData.actionDate}
              onChange={(e) => setFormData({ ...formData, actionDate: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstDiplomaNumber">Αρχικός Αρ. Πρωτ Τίτλου Σπουδών:</Label>
            <Input
              id="firstDiplomaNumber"
              value={formData.firstDiplomaNumber}
              onChange={(e) => setFormData({ ...formData, firstDiplomaNumber: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstDiplomaDate">Ημερομηνία Πρωτ Τίτλου Σπουδών (ΗΗ-ΜΜ-ΕΕΕΕ):</Label>
            <Input
              id="firstDiplomaDate"
              placeholder="DD-MM-YYYY"
              value={formData.firstDiplomaDate}
              onChange={(e) => setFormData({ ...formData, firstDiplomaDate: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstGradesNumber">Αρχικός Αρ. Πρωτ Αναλυτικής Βαθμολογίας:</Label>
            <Input
              id="firstGradesNumber"
              value={formData.firstGradesNumber}
              onChange={(e) => setFormData({ ...formData, firstGradesNumber: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstGradesDate">Ημερομηνία Πρωτ Αναλυτικής Βαθμολογίας (ΗΗ-ΜΜ-ΕΕΕΕ):</Label>
            <Input
              id="firstGradesDate"
              placeholder="DD-MM-YYYY"
              value={formData.firstGradesDate}
              onChange={(e) => setFormData({ ...formData, firstGradesDate: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="gradeFormat">
              Μορφή βαθμού (d ή D για δεκαδική και b ή B και για τα δύο, αλλιώς η παλιά μορφή μόνο της):
            </Label>
            <Input
              id="gradeFormat"
              value={formData.gradeFormat}
              onChange={(e) => setFormData({ ...formData, gradeFormat: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Κλείσιμο
          </Button>
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
            Εξαγωγή αρχείου
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
