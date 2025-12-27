'use client';

import { useState } from 'react';
import { 
  Search, Filter, User, Mail, Calendar, 
  ChevronLeft, ChevronRight, Eye, X,
  Brain, GraduationCap, Code2, Download,
  RefreshCw, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button_admin';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select_admin';
import { StudentDetailsModal } from '@/components/modals/mod_info_etu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  classe: string;
  technologies: string[];
  aiScore: number;
  registrationDate: string;
}

interface StudentsTableProps {
  students?: Student[];
}

const defaultStudents: Student[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    classe: 'LIC2 A',
    technologies: ['React', 'TypeScript', 'Node.js'],
    aiScore: 85,
    registrationDate: '2024-01-15'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Leroy',
    email: 'marie.leroy@email.com',
    classe: 'LIC2 B',
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    aiScore: 92,
    registrationDate: '2024-01-14'
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@email.com',
    classe: 'LRT',
    technologies: ['Next.js', 'Tailwind', 'Prisma'],
    aiScore: 78,
    registrationDate: '2024-01-13'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    classe: 'LIC1',
    technologies: ['Vue.js', 'JavaScript', 'CSS'],
    aiScore: 88,
    registrationDate: '2024-01-12'
  },
  {
    id: '5',
    firstName: 'Thomas',
    lastName: 'Petit',
    email: 'thomas.petit@email.com',
    classe: 'LIC2 A',
    technologies: ['Java', 'Spring', 'Docker'],
    aiScore: 75,
    registrationDate: '2024-01-11'
  },
  {
    id: '6',
    firstName: 'Emma',
    lastName: 'Dubois',
    email: 'emma.dubois@email.com',
    classe: 'LIC2 B',
    technologies: ['React', 'GraphQL', 'MongoDB'],
    aiScore: 91,
    registrationDate: '2024-01-10'
  },
  {
    id: '7',
    firstName: 'Lucas',
    lastName: 'Moreau',
    email: 'lucas.moreau@email.com',
    classe: 'LRT',
    technologies: ['Vue.js', 'Nuxt.js', 'PostgreSQL'],
    aiScore: 83,
    registrationDate: '2024-01-09'
  },
  {
    id: '8',
    firstName: 'Chloé',
    lastName: 'Fournier',
    email: 'chloe.fournier@email.com',
    classe: 'LIC1',
    technologies: ['Python', 'Django', 'Redis'],
    aiScore: 79,
    registrationDate: '2024-01-08'
  },
  {
    id: '9',
    firstName: 'Hugo',
    lastName: 'Girard',
    email: 'hugo.girard@email.com',
    classe: 'LIC2 A',
    technologies: ['TypeScript', 'NestJS', 'MySQL'],
    aiScore: 87,
    registrationDate: '2024-01-07'
  },
  {
    id: '10',
    firstName: 'Zoé',
    lastName: 'Roux',
    email: 'zoe.roux@email.com',
    classe: 'LIC2 B',
    technologies: ['React Native', 'Expo', 'Firebase'],
    aiScore: 94,
    registrationDate: '2024-01-06'
  }
];

const classeOptions = [
  { value: '', label: 'Toutes les classes' },
  { value: 'LIC2 A', label: 'LIC2 A' },
  { value: 'LIC2 B', label: 'LIC2 B' },
  { value: 'LRT', label: 'LRT' },
  { value: 'LIC1', label: 'LIC1' }
];

const technologyOptions = [
  { value: '', label: 'Toutes les technologies' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'java', label: 'Java' },
  { value: 'docker', label: 'Docker' }
];

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-400 bg-green-900/20';
  if (score >= 80) return 'text-blue-400 bg-blue-900/20';
  if (score >= 70) return 'text-orange-400 bg-orange-900/20';
  return 'text-red-400 bg-red-900/20';
};

export const StudentsTable = ({ students = defaultStudents }: StudentsTableProps) => {
  const [search, setSearch] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const itemsPerPage = 6;
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesClasse = !selectedClasse || student.classe === selectedClasse;
    const matchesTech = !selectedTech || 
      student.technologies.some(tech => 
        tech.toLowerCase().includes(selectedTech.toLowerCase())
      );
    
    return matchesSearch && matchesClasse && matchesTech;
  });
  
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  
  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedClasse('');
    setSelectedTech('');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || selectedClasse || selectedTech;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filtres et recherche */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>

        {/* Filtres - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          <Select
            options={classeOptions}
            value={selectedClasse}
            onChange={(e) => {
              setSelectedClasse(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 border-gray-600 text-white"
          />
          <Select
            options={technologyOptions}
            value={selectedTech}
            onChange={(e) => {
              setSelectedTech(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 border-gray-600 text-white"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden border-gray-600"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filtres - Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="flex-1 border-gray-600"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres {hasActiveFilters && `(${selectedClasse ? 1 : 0}${selectedTech ? 1 : 0})`}
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtres mobiles en overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/70 md:hidden flex items-start justify-end">
          <div className="w-full max-w-sm bg-gray-800 h-full overflow-y-auto animate-slideInRight border-l border-gray-700">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Filtres avancés</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Classe
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {classeOptions.filter(opt => opt.value).map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedClasse(option.value);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedClasse === option.value
                          ? 'bg-blue-900/50 border-blue-500 text-blue-200' 
                          : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Technologie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {technologyOptions.filter(opt => opt.value).map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedTech(option.value);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedTech === option.value
                          ? 'bg-blue-900/50 border-blue-500 text-blue-200' 
                          : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-gray-800 pt-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Réinitialiser
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-4 rounded-xl border border-blue-800/50">
          <div className="text-sm font-medium text-blue-300">Total étudiants</div>
          <div className="text-2xl font-bold text-white">{filteredStudents.length}</div>
        </div>
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 p-4 rounded-xl border border-green-800/50">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-green-400" />
            <div className="text-sm font-medium text-green-300">Score moyen</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {filteredStudents.length > 0 
              ? Math.round(filteredStudents.reduce((acc, s) => acc + s.aiScore, 0) / filteredStudents.length)
              : 0}%
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/20 p-4 rounded-xl border border-orange-800/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            <div className="text-sm font-medium text-orange-300">Top classe</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {(() => {
              const classeCounts = filteredStudents.reduce((acc, student) => {
                acc[student.classe] = (acc[student.classe] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);
              
              const topClasse = Object.entries(classeCounts).sort((a, b) => b[1] - a[1])[0];
              return topClasse ? topClasse[0] : 'N/A';
            })()}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <Table className="bg-gray-800">
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="text-gray-300 font-semibold">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Étudiant
                </div>
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Classe
                </div>
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Technologies
                </div>
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id} className="border-gray-700 hover:bg-gray-750">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Inscrit le {new Date(student.registrationDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700">
                    {student.classe}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {student.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-gray-900/30 text-gray-300 border-gray-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(student)}
                      className="border-gray-600 flex hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Simulation d'export des données de l'étudiant
                        const content = `
Étudiant: ${student.firstName} ${student.lastName}
Email: ${student.email}
Classe: ${student.classe}
Score IA: ${student.aiScore}%
Technologies: ${student.technologies.join(', ')}
Date d'inscription: ${student.registrationDate}
                        `.trim();
                        
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${student.lastName}-${student.firstName}.txt`;
                        a.click();
                      }}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Aucun résultat */}
      {paginatedStudents.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-900/50 flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-white">Aucun étudiant trouvé</h3>
          <p className="mt-1 text-sm text-gray-400">
            {hasActiveFilters 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Aucun étudiant disponible pour le moment'}
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredStudents.length)} sur {filteredStudents.length} étudiant{filteredStudents.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-gray-600 flex hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-gray-500">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      currentPage === totalPages
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-600 flex hover:bg-gray-700"
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Résumé des filtres */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <span className="text-sm text-gray-400">Filtres actifs :</span>
          {search && (
            <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700">
              Recherche: "{search}"
              <button
                onClick={() => setSearch('')}
                className="ml-1 hover:text-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedClasse && (
            <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-700">
              Classe: {classeOptions.find(opt => opt.value === selectedClasse)?.label}
              <button
                onClick={() => setSelectedClasse('')}
                className="ml-1 hover:text-green-200"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTech && (
            <Badge variant="secondary" className="bg-orange-900/30 text-orange-300 border-orange-700">
              Technologie: {technologyOptions.find(opt => opt.value === selectedTech)?.label}
              <button
                onClick={() => setSelectedTech('')}
                className="ml-1 hover:text-orange-200"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Modal des détails */}
      <StudentDetailsModal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent!}
      />
    </div>
  );
};