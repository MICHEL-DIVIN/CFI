'use client';

import { useState } from 'react';import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge_admin';
import { z } from 'zod';
import { Button } from '@/components/ui/button_admin';
import { Input } from '@/components/ui/input_admin';
import { Select } from '@/components/ui/select_admin';
import { Card } from '@/components/ui/card_admin';

export interface Result {
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  status: 'published' | 'draft';
  fileUrl?: string;
  author: string;
}

interface ResultsTableProps {
  results?: Result[];
  onEdit?: (result: Result) => void;
  onDelete?: (resultId: string) => void;
  onDownload?: (result: Result) => void;
}

const defaultResults: Result[] = [
  {
    id: '1',
    title: 'Résultats Hackathon IA 2024',
    description: 'Les projets gagnants du hackathon Intelligence Artificielle',
    category: 'hackathon',
    publishDate: '2024-01-15',
    status: 'published',
    author: 'Admin CFI',
  },
  {
    id: '2',
    title: 'Workshop React Avancé',
    description: 'Compte-rendu du workshop sur les performances React',
    category: 'workshop',
    publishDate: '2024-01-14',
    status: 'draft',
    author: 'Tech Lead',
  },
  {
    id: '3',
    title: 'Conférence Cybersecurity',
    description: 'Présentation des nouvelles menaces et solutions',
    category: 'conference',
    publishDate: '2024-01-13',
    status: 'published',
    fileUrl: '/documents/cybersecurity.pdf',
    author: 'Security Team',
  },
  {
    id: '4',
    title: 'Compétition Dataviz',
    description: 'Résultats de la compétition de visualisation de données',
    category: 'competition',
    publishDate: '2024-01-12',
    status: 'published',
    author: 'Data Team',
  },
  {
    id: '5',
    title: 'Formation TypeScript',
    description: 'Évaluation et feedback de la formation TypeScript',
    category: 'training',
    publishDate: '2024-01-11',
    status: 'draft',
    author: 'Formation Team',
  },
  {
    id: '6',
    title: 'Meetup Cloud Native',
    description: 'Retour sur le meetup des technologies cloud native',
    category: 'other',
    publishDate: '2024-01-10',
    status: 'published',
    author: 'Cloud Team',
  },
  {
    id: '7',
    title: 'Hackathon Blockchain',
    description: 'Projets innovants sur la technologie blockchain',
    category: 'hackathon',
    publishDate: '2024-01-09',
    status: 'published',
    author: 'Blockchain Team',
  },
  {
    id: '8',
    title: 'Workshop DevOps',
    description: 'Documentation du workshop CI/CD et DevOps',
    category: 'workshop',
    publishDate: '2024-01-08',
    status: 'draft',
    author: 'DevOps Team',
  },
];

const statusOptions = [
  { value: '', label: 'Tous les statuts' },
  { value: 'published', label: 'Publié' },
  { value: 'draft', label: 'Brouillon' },
];

const categoryOptions = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'conference', label: 'Conférence' },
  { value: 'competition', label: 'Compétition' },
  { value: 'training', label: 'Formation' },
  { value: 'other', label: 'Autre' },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'hackathon': return 'bg-orange-100 text-orange-800';
    case 'workshop': return 'bg-blue-100 text-blue-800';
    case 'conference': return 'bg-green-100 text-green-800';
    case 'competition': return 'bg-purple-100 text-purple-800';
    case 'training': return 'bg-cyan-100 text-cyan-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ResultsTable = ({
  results = defaultResults,
  onEdit,
  onDelete,
  onDownload,
}: ResultsTableProps) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const itemsPerPage = 6;
  
  const filteredResults = results.filter(result => {
    const matchesStatus = !selectedStatus || result.status === selectedStatus;
    const matchesCategory = !selectedCategory || result.category === selectedCategory;
    
    return matchesStatus && matchesCategory;
  });
  
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDelete = async (resultId: string) => {
    setDeletingId(resultId);
    // Simulation d'une suppression asynchrone
    await new Promise(resolve => setTimeout(resolve, 500));
    onDelete?.(resultId);
    setDeletingId(null);
  };
  
  const handleDownload = (result: Result) => {
    if (onDownload) {
      onDownload(result);
    } else {
      // Simulation de téléchargement
      const content = `Titre: ${result.title}\nDescription: ${result.description}\nCatégorie: ${result.category}\nDate: ${result.publishDate}\nStatut: ${result.status}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${result.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select
            label="Statut"
            options={statusOptions}
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Catégorie"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedStatus('');
              setSelectedCategory('');
              setCurrentPage(1);
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="text-sm font-medium text-orange-800">Total résultats</div>
          <div className="text-2xl font-bold text-orange-900">{filteredResults.length}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="text-sm font-medium text-orange-800">Publiés</div>
          <div className="text-2xl font-bold text-orange-900">
            {filteredResults.filter(r => r.status === 'published').length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="text-sm font-medium text-orange-800">Brouillons</div>
          <div className="text-2xl font-bold text-orange-900">
            {filteredResults.filter(r => r.status === 'draft').length}
          </div>
        </div>
      </div>

      {/* Tableau - Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-500 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-200">
            {paginatedResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {result.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                    {result.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(result.publishDate), 'dd MMM yyyy', { locale: fr })}
                  </div>
                  <div className="text-xs text-gray-500">par {result.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={result.status === 'published' ? 'success' : 'warning'}>
                    {result.status === 'published' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(result)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(result)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(result.id)}
                      disabled={deletingId === result.id}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      {deletingId === result.id ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vue mobile */}
      <div className="md:hidden space-y-4">
        {paginatedResults.map((result) => (
          <div key={result.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{result.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</p>
              </div>
              <Badge variant={result.status === 'published' ? 'success' : 'warning'} size="sm">
                {result.status === 'published' ? 'Publié' : 'Brouillon'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(result.category)}`}>
                {result.category}
              </span>
              <div className="text-gray-500">
                {format(new Date(result.publishDate), 'dd MMM yyyy', { locale: fr })}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">par {result.author}</div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit?.(result)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(result)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(result.id)}
                  disabled={deletingId === result.id}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  {deletingId === result.id ? (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredResults.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredResults.length)} sur {filteredResults.length} résultats
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Précédent
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun résultat trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez de modifier vos critères de filtrage
          </p>
        </div>
      )}
    </div>
  );
};