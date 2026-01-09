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
import { Label } from './ui/label';
import { useState, useEffect } from 'react';

type ProjectRecord = {
  id: string;
  lastName: string;
  firstName: string;
  project: string;
  aTerm: string;
  bTerm: string;
};

type EditProjectAssessmentDialogProps = {
  record: ProjectRecord | null;
  open: boolean;
  onClose: () => void;
  onSave: (record: ProjectRecord) => void;
};

export function EditProjectAssessmentDialog({
  record,
  open,
  onClose,
  onSave,
}: EditProjectAssessmentDialogProps) {
  const [formData, setFormData] = useState<ProjectRecord | null>(null);

  useEffect(() => {
    if (record) {
      setFormData({ ...record });
    }
  }, [record]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Επεξεργασία Αξιολόγησης Project - {formData.firstName} {formData.lastName}
          </DialogTitle>
          <DialogDescription>
            Project / Εργαστήριο: {formData.project}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Α' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-indigo-600">Α' Τετράμηνο</h3>
            <div>
              <Label htmlFor="aTerm">Α Τετρ.</Label>
              <Textarea
                id="aTerm"
                value={formData.aTerm}
                onChange={(e) =>
                  setFormData({ ...formData, aTerm: e.target.value })
                }
                className="mt-1 min-h-[150px]"
                placeholder="Συμπληρώστε την αξιολόγηση για το Α' Τετράμηνο..."
              />
            </div>
          </div>

          {/* Β' Τετράμηνο */}
          <div>
            <h3 className="mb-4 text-indigo-600">Β' Τετράμηνο</h3>
            <div>
              <Label htmlFor="bTerm">Β Τετρ.</Label>
              <Textarea
                id="bTerm"
                value={formData.bTerm}
                onChange={(e) =>
                  setFormData({ ...formData, bTerm: e.target.value })
                }
                className="mt-1 min-h-[150px]"
                placeholder="Συμπληρώστε την αξιολόγηση για το Β' Τετράμηνο..."
              />
            </div>
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
