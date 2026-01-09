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

type ProjectStudent = {
  id: string;
  lastName: string;
  firstName: string;
  section: string;
  projectName: string;
  aTerm: string;
  aPresence: string;
  aParticipation: string;
  bTerm: string;
  bPresence: string;
  bParticipation: string;
};

type EditTeacherProjectAssessmentDialogProps = {
  student: ProjectStudent | null;
  open: boolean;
  onClose: () => void;
  onSave: (student: ProjectStudent) => void;
};

const presenceOptions = ['Άριστο', 'Πολύ καλό', 'Καλό', 'Μέτριο', 'Επαρκές', 'Ανεπαρκές'];
const participationOptions = ['Άριστο', 'Πολύ καλό', 'Καλό', 'Επαρκές', 'Ανεπαρκές'];

export function EditTeacherProjectAssessmentDialog({
  student,
  open,
  onClose,
  onSave,
}: EditTeacherProjectAssessmentDialogProps) {
  const [formData, setFormData] = useState<ProjectStudent | null>(null);

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
          <DialogTitle>
            Επεξεργασία Αξιολόγησης - {formData.firstName} {formData.lastName}
          </DialogTitle>
          <DialogDescription>
            Project: {formData.projectName} • Τμήμα: {formData.section}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Α' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-indigo-600">Α' Τετράμηνο</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="aTerm">Σχόλια Α' Τετραμήνου</Label>
                <Textarea
                  id="aTerm"
                  value={formData.aTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, aTerm: e.target.value })
                  }
                  className="mt-1 min-h-[120px]"
                  placeholder="Συμπληρώστε την αξιολόγηση για το Α' Τετράμηνο..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aPresence">Α-Ενδιαφέρον</Label>
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
                      {presenceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="aParticipation">Α-Ανταπόκριση</Label>
                  <Select
                    value={formData.aParticipation}
                    onValueChange={(value) =>
                      setFormData({ ...formData, aParticipation: value })
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
              </div>
            </div>
          </div>

          {/* Β' Τετράμηνο */}
          <div className="border-b pb-6">
            <h3 className="mb-4 text-violet-600">Β' Τετράμηνο</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bTerm">Σχόλια Β' Τετραμήνου</Label>
                <Textarea
                  id="bTerm"
                  value={formData.bTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, bTerm: e.target.value })
                  }
                  className="mt-1 min-h-[120px]"
                  placeholder="Συμπληρώστε την αξιολόγηση για το Β' Τετράμηνο..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bPresence">Β-Ενδιαφέρον</Label>
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
                      {presenceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bParticipation">Β-Ανταπόκριση</Label>
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
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          >
            Αποθήκευση
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
