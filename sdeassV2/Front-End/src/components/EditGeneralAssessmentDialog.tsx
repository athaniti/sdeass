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

type GeneralAssessmentRecord = {
  id: string;
  lastName: string;
  firstName: string;
  section: string;
  mathAge_A: string;
  continue_A: string;
  enthusiasm_A: string;
  claim_A: string;
  mathAge_B: string;
  continue_B: string;
  enthusiasm_B: string;
  claim_B: string;
};

type EditGeneralAssessmentDialogProps = {
  record: GeneralAssessmentRecord | null;
  open: boolean;
  onClose: () => void;
  onSave: (record: GeneralAssessmentRecord) => void;
};

export function EditGeneralAssessmentDialog({
  record,
  open,
  onClose,
  onSave,
}: EditGeneralAssessmentDialogProps) {
  const [formData, setFormData] = useState<GeneralAssessmentRecord | null>(null);

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
            Επεξεργασία Γενικής Αξιολόγησης - {formData.firstName} {formData.lastName}
          </DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα κριτήρια γενικής αξιολόγησης για τα Α' και Β' Τετράμηνα.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Α' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-indigo-600">Α' Τετράμηνο</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mathAge_A">Μαθ. Πορεία Α</Label>
                <Textarea
                  id="mathAge_A"
                  value={formData.mathAge_A}
                  onChange={(e) =>
                    setFormData({ ...formData, mathAge_A: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε την μαθησιακή πορεία για το Α' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="continue_A">Συνεργασία. - Α</Label>
                <Textarea
                  id="continue_A"
                  value={formData.continue_A}
                  onChange={(e) =>
                    setFormData({ ...formData, continue_A: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε τη συνεργασία για το Α' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="enthusiasm_A">Ενδιαφ. - Α</Label>
                <Textarea
                  id="enthusiasm_A"
                  value={formData.enthusiasm_A}
                  onChange={(e) =>
                    setFormData({ ...formData, enthusiasm_A: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε το ενδιαφέρον για το Α' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="claim_A">Δέσμευση - Α</Label>
                <Textarea
                  id="claim_A"
                  value={formData.claim_A}
                  onChange={(e) =>
                    setFormData({ ...formData, claim_A: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε τη δέσμευση για το Α' Τετράμηνο..."
                />
              </div>
            </div>
          </div>

          {/* Β' Τετράμηνο */}
          <div>
            <h3 className="mb-4 text-indigo-600">Β' Τετράμηνο</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mathAge_B">Μαθ. Πορεία Β</Label>
                <Textarea
                  id="mathAge_B"
                  value={formData.mathAge_B}
                  onChange={(e) =>
                    setFormData({ ...formData, mathAge_B: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε την μαθησιακή πορεία για το Β' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="continue_B">Συνεργασία. - Β</Label>
                <Textarea
                  id="continue_B"
                  value={formData.continue_B}
                  onChange={(e) =>
                    setFormData({ ...formData, continue_B: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε τη συνεργασία για το Β' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="enthusiasm_B">Ενδιαφ. - Β</Label>
                <Textarea
                  id="enthusiasm_B"
                  value={formData.enthusiasm_B}
                  onChange={(e) =>
                    setFormData({ ...formData, enthusiasm_B: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε το ενδιαφέρον για το Β' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="claim_B">Δέσμευση - Β</Label>
                <Textarea
                  id="claim_B"
                  value={formData.claim_B}
                  onChange={(e) =>
                    setFormData({ ...formData, claim_B: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε τη δέσμευση για το Β' Τετράμηνο..."
                />
              </div>
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
