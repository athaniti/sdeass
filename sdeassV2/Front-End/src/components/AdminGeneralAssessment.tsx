import { useState } from 'react';
import { User } from '../App';
import { Header } from './Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Edit } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { EditGeneralAssessmentDialog } from './EditGeneralAssessmentDialog';
import { toast } from 'sonner';

type AdminGeneralAssessmentProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

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

const mockRecords: GeneralAssessmentRecord[] = [
  {
    id: '1',
    lastName: 'Athanit',
    firstName: 'Flutur',
    section: 'A1',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Ελαφρώς Ανώθηη',
    claim_A: 'Καλή',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Μεγάλο',
    claim_B: 'Ικανοποιητική'
  },
  {
    id: '2',
    lastName: 'Cekaj',
    firstName: 'Hertila',
    section: 'A2',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Ελαφρώς σπαδικη',
    claim_A: 'Πολύ καλή',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Πολύ μεγάλο',
    claim_B: 'Μεγάλη'
  },
  {
    id: '3',
    lastName: 'Kica',
    firstName: 'Pranvera',
    section: 'A2',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Ανώθηη',
    claim_A: 'Πολύ καλή',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Πολύ μεγάλο',
    claim_B: 'Πολύ μεγάλη'
  },
  {
    id: '4',
    lastName: 'Kryeziu',
    firstName: 'Edie',
    section: 'A1',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Ανώθηη',
    claim_A: 'Ανώθηη',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Μεγάλο',
    claim_B: 'Ικανοποιητική'
  },
  {
    id: '5',
    lastName: 'Kryeziu',
    firstName: 'Elton',
    section: 'A1',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Βελτιούμενη',
    claim_A: 'Μέτρια',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Μέτρια',
    claim_B: 'Επαρκής'
  },
  {
    id: '6',
    lastName: 'Lika',
    firstName: 'Xhulian',
    section: 'A1',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: '',
    claim_A: '',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: '',
    claim_B: ''
  },
  {
    id: '7',
    lastName: 'Ujka',
    firstName: 'Rudina',
    section: 'A1',
    mathAge_A: '',
    continue_A: '',
    enthusiasm_A: 'Ανώθηη',
    claim_A: 'Καλή',
    mathAge_B: '',
    continue_B: '',
    enthusiasm_B: 'Μεγάλο',
    claim_B: 'Ικανοποιητική'
  }
];

export function AdminGeneralAssessment({
  user,
  onLogout,
  onNavigateToDashboard,
}: AdminGeneralAssessmentProps) {
  const [records, setRecords] = useState<GeneralAssessmentRecord[]>(mockRecords);
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('24/25');
  const [selectedRecord, setSelectedRecord] = useState<GeneralAssessmentRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredRecords = records.filter((record) => {
    if (filterSection !== 'all' && record.section !== filterSection) {
      return false;
    }
    return true;
  });

  const handleEdit = (record: GeneralAssessmentRecord) => {
    setSelectedRecord(record);
    setIsEditDialogOpen(true);
  };

  const handleSaveRecord = (updatedRecord: GeneralAssessmentRecord) => {
    setRecords(records.map(r =>
      r.id === updatedRecord.id ? updatedRecord : r
    ));
    toast.success('Η αξιολόγηση ενημερώθηκε επιτυχώς!');
  };

  return (
    <div className="space-y-6">
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              Εξαγωγή σε Word για το Α΄ Τετράμηνο
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              Εξαγωγή σε Word για το Β΄ Τετράμηνο
            </a>
          </div>

          <div className="bg-orange-500 text-white px-4 py-2 rounded">
            Γενική Αξιολόγηση
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-500">
              <TableRow>
                <TableHead className="text-white">Επίθετο</TableHead>
                <TableHead className="text-white">Όνομα</TableHead>
                <TableHead className="text-white">Τμήμα</TableHead>
                <TableHead className="text-white">Μαθ. Πορεία Α</TableHead>
                <TableHead className="text-white">Συνεργασία. - Α</TableHead>
                <TableHead className="text-white">Ενδιαφ. - Α</TableHead>
                <TableHead className="text-white">Δέσμευση - Α</TableHead>
                <TableHead className="text-white">Μαθ. Πορεία Β</TableHead>
                <TableHead className="text-white">Συνεργασία. - Β</TableHead>
                <TableHead className="text-white">Ενδιαφ. - Β</TableHead>
                <TableHead className="text-white">Δέσμευση - Β</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <TableRow
                  key={record.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{record.lastName}</TableCell>
                  <TableCell>{record.firstName}</TableCell>
                  <TableCell>{record.section}</TableCell>
                  <TableCell>{record.mathAge_A}</TableCell>
                  <TableCell>{record.continue_A}</TableCell>
                  <TableCell>{record.enthusiasm_A}</TableCell>
                  <TableCell>{record.claim_A}</TableCell>
                  <TableCell>{record.mathAge_B}</TableCell>
                  <TableCell>{record.continue_B}</TableCell>
                  <TableCell>{record.enthusiasm_B}</TableCell>
                  <TableCell>{record.claim_B}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(record)}
                      className="hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <EditGeneralAssessmentDialog
          record={selectedRecord}
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedRecord(null);
          }}
          onSave={handleSaveRecord}
        />
    </div>
  );
}
