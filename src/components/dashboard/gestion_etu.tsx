'use client';

import { useState } from 'react';
import { 
  Search, Filter, Download, UserPlus, TrendingUp, 
  Code2, Trophy, Users, Brain, Calendar, Sparkles,
  X, AlertCircle, BarChart3, Cpu, Clock, Eye, EyeOff,
  ChevronDown, ChevronUp, Check, XCircle, ListFilter
} from 'lucide-react';
import { Button } from '@/components/ui/button_admin';
import { Card } from '@/components/ui/card_admin';
import { Select } from '@/components/ui/select_admin';
import { Badge } from '@/components/ui/badge_admin';
import { StudentsTable, Student } from '@/components/tableau/tableau_etudiant';

// Simuler des données d'étudiants supplémentaires
const generateMockStudents = (count: number): Student[] => {
  const classe = ['LIC2 A', 'LIC2 B', 'LRT', 'LIC1'];
  const techs = ['React', 'TypeScript', 'Python', 'Next.js', 'Vue.js', 'Node.js', 'Java', 'Docker'];
  const names = ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 100}`,
    firstName: ['Jean', 'Marie', 'Pierre', 'Sophie', 'Lucas', 'Emma', 'Hugo', 'Chloé'][i % 8],
    lastName: names[i % names.length],
    email: `etudiant${i + 100}@email.com`,
    classe: classe[Math.floor(Math.random() * classe.length)],
    technologies: techs.slice(0, 2 + Math.floor(Math.random() * 3)),
    aiScore: 60 + Math.floor(Math.random() * 40),
    registrationDate: `2024-0${1 + Math.floor(Math.random() * 9)}-${10 + Math.floor(Math.random() * 20)}`,
  }));
};

export const StudentManagement = () => {
  const [students] = useState<Student[]>([
    ...generateMockStudents(15),
  ]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPromo, setSelectedPromo] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Options disponibles
  const techOptions = ['React', 'TypeScript', 'Python', 'Next.js', 'Vue.js', 'Node.js', 'Java', 'Docker'];
  const promoOptions = ['all', ...Array.from(new Set(students.map(s => s.classe)))];

  // Filtrage des étudiants
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPromo = selectedPromo === 'all' || student.classe === selectedPromo;
    const matchesScore = student.aiScore >= minScore;
    const matchesTechs = selectedTechs.length === 0 || 
      selectedTechs.some(tech => student.technologies.includes(tech));
    
    return matchesSearch && matchesPromo && matchesScore && matchesTechs;
  });

  // Calcul des statistiques avec les étudiants filtrés
  const totalStudents = filteredStudents.length;
  const averageScore = totalStudents > 0 
    ? Math.round(filteredStudents.reduce((acc, s) => acc + s.aiScore, 0) / totalStudents)
    : 0;
  
  const topPromo = filteredStudents.reduce((acc, s) => {
    acc[s.classe] = (acc[s.classe] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPopularPromo = Object.entries(topPromo).sort((a, b) => b[1] - a[1])[0];

  const techStats = filteredStudents.reduce((acc, s) => {
    s.technologies.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const topTechs = Object.entries(techStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const handleExport = async () => {
    setExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const csvContent = [
      ['Nom', 'Prénom', 'Email', 'Promo', 'Technologies', 'Score IA', 'Date Inscription'],
      ...filteredStudents.map(s => [
        s.lastName,
        s.firstName,
        s.email,
        s.classe,
        s.technologies.join(', '),
        s.aiScore.toString(),
        s.registrationDate
      ])
    ].map(row => row.join(';')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `etudiants-cfi-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setExporting(false);
  };

  const clearFilters = () => {
    setSelectedPromo('all');
    setMinScore(0);
    setSearchTerm('');
    setSelectedTechs([]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const hasActiveFilters = searchTerm || selectedPromo !== 'all' || minScore > 0 || selectedTechs.length > 0;

  return (
    <div className="space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 bg-gray-700 rounded-xl min-h-screen">
      {/* Alertes de filtres actifs */}
      {hasActiveFilters && (
        <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/20 border border-orange-800/50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-orange-200">
              {filteredStudents.length} étudiant{filteredStudents.length !== 1 ? 's' : ''} trouvé{filteredStudents.length !== 1 ? 's' : ''} avec les filtres actuels
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-orange-300 hover:text-white flex items-center gap-1"
          >
            <XCircle className="h-4 w-4" />
            Effacer
          </button>
        </div>
      )}

      {/* En-tête avec boutons */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Gestion des étudiants</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">Gérez les inscriptions et suivez les performances</p>
          </div>
          
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
            {/* Barre de recherche mobile */}
            <div className="relative xs:hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden flex-1 xs:flex-none"
                size="sm"
              >
                <ListFilter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleExport}
                loading={exporting}
                className="flex-1 xs:flex-none"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Exporter</span>
              </Button>
              
              <Button
                variant="primary"
                onClick={() => console.log('Ajouter étudiant')}
                className="flex-1 xs:flex-none"
                size="sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Ajouter</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Barre de recherche desktop et filtres rapides */}
        <div className="hidden sm:flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou technologie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Filtres rapides desktop */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-600 bg-gray-800 text-white min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes les promos</option>
              {promoOptions.filter(opt => opt !== 'all').map(promo => (
                <option key={promo} value={promo} className="bg-gray-800">Promo {promo}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2 min-w-[180px]">
              <label className="text-sm text-gray-300 whitespace-nowrap">Score min:</label>
              <div className="relative flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                />
                <span className="absolute -top-6 right-0 text-xs font-medium text-white bg-gray-800 px-2 py-1 rounded border border-gray-600">
                  {minScore}%
                </span>
              </div>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques - Version responsive améliorée */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gray-800 border border-orange-800/50 hover:border-orange-700 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider mb-1">Total étudiants</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{totalStudents}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-orange-400 mr-1" />
                  <span className="text-xs text-orange-300 font-medium">+3 cette semaine</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-900/30 flex items-center justify-center flex-shrink-0 border border-orange-800/50">
                <Users className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border border-orange-800/50 hover:border-orange-700 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider mb-1">Score IA moyen</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{averageScore}%</p>
                <div className="mt-2">
                  <div className="h-2 bg-orange-900/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${averageScore}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-900/30 flex items-center justify-center flex-shrink-0 ml-4 border border-orange-800/50">
                <Brain className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border border-orange-800/50 hover:border-orange-700 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider mb-1">Promo active</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{mostPopularPromo?.[0] || 'N/A'}</p>
                <div className="flex items-center mt-2">
                  <Trophy className="h-3 w-3 text-orange-400 mr-1" />
                  <span className="text-xs text-orange-300 font-medium">{mostPopularPromo?.[1] || 0} étudiants</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-900/30 flex items-center justify-center flex-shrink-0 border border-orange-800/50">
                <Sparkles className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border border-orange-800/50 hover:border-orange-700 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider mb-1">Technologies principales</p>
                <div className="space-y-2 mt-2">
                  {topTechs.length > 0 ? (
                    topTechs.map(([tech, count]) => (
                      <div key={tech} className="flex items-center justify-between">
                        <Badge >
                          {tech}
                        </Badge>
                        <span className="text-sm font-semibold text-orange-300">{count}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-orange-400 italic">Aucune donnée</span>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-900/30 flex items-center justify-center flex-shrink-0 ml-4 border border-orange-800/50">
                <Code2 className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtres avancés (Mobile) */}
      {showMobileFilters && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black/70 flex items-start justify-end">
          <div className="w-full max-w-sm bg-gray-800 h-full overflow-y-auto animate-slideInRight border-l border-gray-700">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Filtres avancés</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-orange-700 rounded-lg"
              >
                <X className="h-5 w-5 text-orange-400" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Promotion
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {promoOptions.filter(opt => opt !== 'all').map(promo => (
                    <button
                      key={promo}
                      onClick={() => setSelectedPromo(promo)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedPromo === promo 
                          ? 'bg-orange-900/50 border-orange-500 text-orange-200' 
                          : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      Promo {promo}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Score IA minimum: <span className="font-bold text-blue-400">{minScore}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Technologies
                </label>
                <div className="flex flex-wrap gap-2">
                  {techOptions.map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        selectedTechs.includes(tech)
                          ? 'bg-blue-900/50 border-blue-500 text-blue-200' 
                          : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {tech}
                      {selectedTechs.includes(tech) && (
                        <Check className="h-3 w-3 ml-1 inline" />
                      )}
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

      {/* Filtres avancés (Desktop) */}
      <div className="hidden sm:block">
        <Card className="border border-gray-600 bg-gray-800">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Filter className="h-5 w-5 text-orange-400" />
                Filtres avancés
              </h4>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                >
                  <X className="h-4 w-4 text-orange-400" />
                  Effacer tous les filtres
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                    Score IA
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: "≥ 80% (Excellent)", value: 80 },
                      { label: "60-79% (Bon)", value: 60 },
                      { label: "≤ 59% (À améliorer)", value: 0 }
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`score-${value}`}
                          checked={minScore === value}
                          onChange={() => setMinScore(minScore === value ? 0 : value)}
                          className="rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800"
                        />
                        <label htmlFor={`score-${value}`} className="ml-2 text-sm text-gray-300">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    Date d'inscription
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                      placeholder="De"
                    />
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                      placeholder="À"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-orange-400" />
                    Technologies
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {techOptions.slice(0, 4).map(tech => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedTechs.includes(tech)
                            ? 'bg-blue-900/50 border-blue-500 text-blue-200' 
                            : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        {tech}
                        {selectedTechs.includes(tech) && (
                          <Check className="h-3 w-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-400" />
                    Dernière activité
                  </label>
                  <select className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white">
                    <option>Toutes les périodes</option>
                    <option>Dernières 24h</option>
                    <option>Dernière semaine</option>
                    <option>Dernier mois</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Résultats et tableau */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-white">
            Étudiants ({filteredStudents.length})
          </h4>
          {filteredStudents.length !== students.length && (
            <p className="text-sm text-gray-400 mt-1">
              Filtres actifs : {students.length - filteredStudents.length} étudiant{students.length - filteredStudents.length !== 1 ? 's' : ''} masqué{students.length - filteredStudents.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {filteredStudents.length === 0 ? (
          <div className="flex items-center gap-2 text-orange-300 bg-orange-900/30 px-4 py-2 rounded-lg border border-amber-800/50">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">Aucun étudiant ne correspond aux critères</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-orange-400">Affichage de 1 à {filteredStudents.length} sur {students.length}</span>
          </div>
        )}
      </div>

      {/* Tableau des étudiants */}
      <Card className="overflow-hidden border border-gray-600 bg-gray-800">
        <div className="p-0">
          <StudentsTable students={filteredStudents} />
        </div>
      </Card>

      {/* Insights améliorés */}
      {filteredStudents.length > 0 && (
        <Card className="bg-gray-800 border border-gray-600">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Insights et recommandations</h4>
              </div>
              <span className="text-xs font-medium text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-800/50">
                Mis à jour aujourd'hui
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-4 border border-blue-800/50">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-blue-900/50 flex items-center justify-center flex-shrink-0 border border-blue-800/50">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-300 mb-1">Performances IA</h5>
                    <p className="text-sm text-blue-200">
                      {Math.round(filteredStudents.filter(s => s.aiScore >= 80).length / filteredStudents.length * 100)}% 
                      des étudiants excellent avec un score ≥ 80%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-xl p-4 border border-orange-800/50">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-orange-900/50 flex items-center justify-center flex-shrink-0 border border-orange-800/50">
                    <Code2 className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-300 mb-1">Compétences techniques</h5>
                    <p className="text-sm text-orange-200">
                      {topTechs[0]?.[0] || 'Aucune'} est la technologie la plus maîtrisée 
                      ({topTechs[0]?.[1] || 0} étudiant{topTechs[0]?.[1] !== 1 ? 's' : ''})
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-4 border border-green-800/50">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-green-900/50 flex items-center justify-center flex-shrink-0 border border-green-800/50">
                    <Trophy className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300 mb-1">Engagement promo</h5>
                    <p className="text-sm text-green-200">
                      Promo {mostPopularPromo?.[0]} domine avec {mostPopularPromo?.[1] || 0} étudiant{mostPopularPromo?.[1] !== 1 ? 's' : ''} actif{mostPopularPromo?.[1] !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredStudents.length < students.length && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300">Conseil :</span> Les filtres actuels masquent {students.length - filteredStudents.length} étudiant{students.length - filteredStudents.length !== 1 ? 's' : ''}. 
                  Élargissez vos critères pour voir plus de résultats.
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};