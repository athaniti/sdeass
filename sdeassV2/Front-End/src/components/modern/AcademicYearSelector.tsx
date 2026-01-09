import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type AcademicYearSelectorProps = {
  value: string;
  onChange: (year: string) => void;
};

// Generate academic years (current and previous 5 years)
const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  
  for (let i = 0; i <= 5; i++) {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    years.push(`${startYear}-${endYear}`);
  }
  
  return years;
};

const academicYears = generateAcademicYears();

export function AcademicYearSelector({ value, onChange }: AcademicYearSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
      <Calendar className="w-4 h-4 text-indigo-600" />
      <span className="text-sm text-gray-600 hidden sm:inline">Ακαδ. Έτος:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[130px] border-0 shadow-none focus:ring-0 p-0 h-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {academicYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
