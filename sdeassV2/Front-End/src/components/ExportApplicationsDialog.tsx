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

type ExportApplicationsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function ExportApplicationsDialog({ open, onClose }: ExportApplicationsDialogProps) {
  const [formData, setFormData] = useState({
    period: '2425',
    firstApplicationNumber: '',
    firstGradesDate: ''
  });

  const handleExport = () => {
    console.log('Exporting applications:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Εξαγωγή αιτήσεων για αναλυτική για το σχ. έτος {formData.period}
          </DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα απαραίτητα στοιχεία για την εξαγωγή των αιτήσεων.
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
            <Label htmlFor="firstApplicationNumber">
              Αρχικός Αρ. Πρωτ Αίτησης (προς το παρόν ανενεργό):
            </Label>
            <Input
              id="firstApplicationNumber"
              value={formData.firstApplicationNumber}
              onChange={(e) => setFormData({ ...formData, firstApplicationNumber: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="firstGradesDate">
              Ημερομηνία Πρωτ Αναλυτικής Βαθμολογίας (ΗΗ-ΜΜ-ΕΕΕΕ):
            </Label>
            <Input
              id="firstGradesDate"
              placeholder="DD-MM-YYYY"
              value={formData.firstGradesDate}
              onChange={(e) => setFormData({ ...formData, firstGradesDate: e.target.value })}
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
