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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState, useEffect } from 'react';

type LiteracyRow = {
  id: string;
  literacy: string;
  aTerm: string;
  aEnthusiasm: string;
  aResponse: string;
  bTerm: string;
  bEnthusiasm: string;
  bResponse: string;
  grade: string;
};

type EditLiteracyAssessmentDialogProps = {
  literacy: LiteracyRow | null;
  studentName: string;
  open: boolean;
  onClose: () => void;
  onSave: (literacy: LiteracyRow) => void;
};

export function EditLiteracyAssessmentDialog({
  literacy,
  studentName,
  open,
  onClose,
  onSave,
}: EditLiteracyAssessmentDialogProps) {
  const [formData, setFormData] = useState<LiteracyRow | null>(null);

  useEffect(() => {
    if (literacy) {
      setFormData({ ...literacy });
    }
  }, [literacy]);

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
            Αξιολόγηση Γραμματισμού - {studentName}
          </DialogTitle>
          <DialogDescription>
            Συμπληρώστε την αξιολόγηση για τον γραμματισμό: {formData.literacy}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Α' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-indigo-600">Α' Τετράμηνο</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="aTerm">Α Τετρ.</Label>
                <Textarea
                  id="aTerm"
                  value={formData.aTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, aTerm: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε την αξιολόγηση για το Α' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="aEnthusiasm">Α-Ενδιαφ.</Label>
                <Textarea
                  id="aEnthusiasm"
                  value={formData.aEnthusiasm}
                  onChange={(e) =>
                    setFormData({ ...formData, aEnthusiasm: e.target.value })
                  }
                  className="mt-1 min-h-[80px]"
                  placeholder="Συμπληρώστε το ενδιαφέρον για το Α' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="aResponse">Α-Ανταπόκ.</Label>
                <Textarea
                  id="aResponse"
                  value={formData.aResponse}
                  onChange={(e) =>
                    setFormData({ ...formData, aResponse: e.target.value })
                  }
                  className="mt-1 min-h-[80px]"
                  placeholder="Συμπληρώστε την ανταπόκριση για το Α' Τετράμηνο..."
                />
              </div>
            </div>
          </div>

          {/* Β' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-indigo-600">Β' Τετράμηνο</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="bTerm">Β Τετρ.</Label>
                <Textarea
                  id="bTerm"
                  value={formData.bTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, bTerm: e.target.value })
                  }
                  className="mt-1 min-h-[100px]"
                  placeholder="Συμπληρώστε την αξιολόγηση για το Β' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="bEnthusiasm">Β-Ενδιαφ.</Label>
                <Textarea
                  id="bEnthusiasm"
                  value={formData.bEnthusiasm}
                  onChange={(e) =>
                    setFormData({ ...formData, bEnthusiasm: e.target.value })
                  }
                  className="mt-1 min-h-[80px]"
                  placeholder="Συμπληρώστε το ενδιαφέρον για το Β' Τετράμηνο..."
                />
              </div>

              <div>
                <Label htmlFor="bResponse">Β-Ανταπόκ.</Label>
                <Textarea
                  id="bResponse"
                  value={formData.bResponse}
                  onChange={(e) =>
                    setFormData({ ...formData, bResponse: e.target.value })
                  }
                  className="mt-1 min-h-[80px]"
                  placeholder="Συμπληρώστε την ανταπόκριση για το Β' Τετράμηνο..."
                />
              </div>
            </div>
          </div>

          {/* Τελικός Βαθμός */}
          <div>
            <h3 className="mb-4 text-indigo-600">Τελικός Βαθμός</h3>
            <div>
              <Label htmlFor="grade">Τελ. Βαθμός (0-20)</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData({ ...formData, grade: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Επιλέξτε βαθμό" />
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
