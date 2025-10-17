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

type ProjectAssessmentProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

export function ProjectAssessment({
  user,
  onLogout,
  onNavigateToDashboard,
}: ProjectAssessmentProps) {
  return (
    <div className="space-y-6">
        <div className="bg-orange-500 text-white px-4 py-3 mb-4 rounded">
          <h2>Αξιολόγηση project - εργαστηρίου</h2>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-600">
              <TableRow>
                <TableHead className="text-white">
                  <button className="flex items-center gap-1">
                    Επίθετο
                    <span className="text-xs">▲</span>
                  </button>
                </TableHead>
                <TableHead className="text-white">Όνομα</TableHead>
                <TableHead className="text-white">Project - Εργαστήριο</TableHead>
                <TableHead className="text-white">Α Τετρ.</TableHead>
                <TableHead className="text-white">Β Τετρ.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                  Δεν υπάρχουν διαθέσιμα δεδομένα!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
    </div>
  );
}
