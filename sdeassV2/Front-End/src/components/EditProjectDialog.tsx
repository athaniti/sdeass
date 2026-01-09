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
import { Project } from './ManageProjects';

type EditProjectDialogProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
};

export function EditProjectDialog({
  project,
  open,
  onClose,
  onSave,
}: EditProjectDialogProps) {
  const [formData, setFormData] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    }
  }, [project]);

  if (!formData) return null;

  const isNew = !formData.name;

  const handleSave = () => {
    if (!formData.name.trim()) {
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'Νέο Project / Εργαστήριο' : 'Επεξεργασία Project / Εργαστηρίου'}
          </DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα στοιχεία του project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Όνομα Project *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="π.χ. Χρόνος και διαχρονικές συσκευές"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Περιγραφή</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Περιγράψτε το project..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="academicYear">Ακαδημαϊκό Έτος</Label>
              <Input
                id="academicYear"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                placeholder="2024-2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Κατάσταση</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Project['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Προγραμματισμένο</SelectItem>
                  <SelectItem value="active">Ενεργό</SelectItem>
                  <SelectItem value="completed">Ολοκληρωμένο</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Ημερομηνία Έναρξης</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Ημερομηνία Λήξης</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-800">
              💡 Για να προσθέσετε εκπαιδευτικούς και εκπαιδευόμενους στο project, 
              αποθηκεύστε πρώτα το project και στη συνέχεια χρησιμοποιήστε το κουμπί 
              "Διαχείριση Μελών" (
              <span className="inline-flex items-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </span>
              ).
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          >
            {isNew ? 'Δημιουργία' : 'Αποθήκευση'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
