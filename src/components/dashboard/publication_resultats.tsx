'use client';

import { useState, useEffect } from 'react';
import { 
  AlertCircle, CheckCircle, Info, X, 
  FileEdit, Download, Trash2, Calendar, 
  Lock, BarChart3, Plus, XCircle,
  Eye, EyeOff, Save, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button_admin';
import { Card } from '@/components/ui/card_admin';
import { ResultForm } from '@/components/forms/form_resultat';
import { ResultsTable, Result } from '@/components/tableau/tableau_resultat';
import { ResultFormData } from '@/components/forms/form_resultat';

type AlertType = 'success' | 'error' | 'info' | null;

interface Alert {
  type: AlertType;
  message: string;
  id: number;
}

export const ResultsPublication = () => {
  const [results, setResults] = useState<Result[]>([
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
      author: 'Security Team',
    },
  ]);

  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(prev => [...prev]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const showAlert = (type: AlertType, message: string) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { type, message, id }]);
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  const handleSubmit = async (data: ResultFormData, isDraft: boolean = false) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingResult) {
        setResults(prev => prev.map(r => 
          r.id === editingResult.id 
            ? { 
                ...r, 
                ...data, 
                status: isDraft ? 'draft' : 'published',
                publishDate: data.publishDate,
              }
            : r
        ));
        
        showAlert('success', `Résultat ${isDraft ? 'enregistré en brouillon' : 'publié'} avec succès !`);
        setEditingResult(null);
      } else {
        const newResult: Result = {
          id: `result-${Date.now()}`,
          ...data,
          status: isDraft ? 'draft' : 'published',
          author: 'Admin CFI',
        };
        
        setResults(prev => [newResult, ...prev]);
        showAlert('success', `Nouveau résultat ${isDraft ? 'enregistré en brouillon' : 'publié'} !`);
        setFormKey(prev => prev + 1);
      }
      
    } catch (error) {
      showAlert('error', 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
    if (window.innerWidth < 768) {
      document.getElementById('result-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (resultId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setResults(prev => prev.filter(r => r.id !== resultId));
      showAlert('info', 'Résultat supprimé avec succès.');
      
      if (editingResult?.id === resultId) {
        setEditingResult(null);
        setFormKey(prev => prev + 1);
      }
    } catch (error) {
      showAlert('error', 'Erreur lors de la suppression.');
    }
  };

  const handleDownload = (result: Result) => {
    const content = `
Titre: ${result.title}
Description: ${result.description}
Catégorie: ${result.category}
Date: ${result.publishDate}
Statut: ${result.status}
Auteur: ${result.author}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    
    showAlert('info', 'Téléchargement démarré...');
  };

  const handleCancel = () => {
    setEditingResult(null);
    setFormKey(prev => prev + 1);
    showAlert('info', 'Édition annulée.');
  };

  const publishedCount = results.filter(r => r.status === 'published').length;
  const draftCount = results.filter(r => r.status === 'draft').length;

  return (
    <div className="space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 bg-gray-700 rounded-xl min-h-screen">
      {/* Alertes */}
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg p-4 transition-all duration-300 animate-slideDown ${
              alert.type === 'success'
                ? 'bg-green-900/30 border border-green-700 text-green-100'
                : alert.type === 'error'
                ? 'bg-red-900/30 border border-red-700 text-red-100'
                : 'bg-blue-900/30 border border-blue-700 text-blue-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {alert.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                ) : alert.type === 'error' ? (
                  <AlertCircle className="h-5 w-5 mr-3 text-red-400" />
                ) : (
                  <Info className="h-5 w-5 mr-3 text-blue-400" />
                )}
                <span>{alert.message}</span>
              </div>
              <button
                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                className="ml-4 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            {editingResult ? 'Modifier un résultat' : 'Publication des résultats'}
          </h3>
          <p className="text-gray-300">
            {editingResult 
              ? 'Modifiez les informations du résultat sélectionné'
              : 'Publiez et gérez les résultats des événements'}
          </p>
        </div>
        
        {editingResult && (
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-orange-500 text-orange-400 hover:bg-orange-900/30"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Annuler l'édition
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Formulaire - Gauche */}
        <div id="result-form">
          <Card className="h-full bg-gray-800 border-gray-800">
            <ResultForm
              key={formKey}
              mode={editingResult ? 'edit' : 'create'}
              initialData={editingResult || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </Card>
        </div>

        {/* Tableau - Droite */}
        <div className="lg:col-span-1">
          <Card className="h-full bg-gray-800 border-gray-700">
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-white">Résultats publiés</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-300">{publishedCount} publiés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-orange-400" />
                      <span className="text-sm text-orange-300">{draftCount} brouillons</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Dernière mise à jour: il y a 5 min
                </div>
              </div>

              <div className="space-y-4">
                <ResultsTable
                  results={results}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              </div>

              {/* Stats rapides */}
              <div className="mt-6 md:mt-8 pt-6 border-t border-gray-700">
                <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Statistiques de publication
                </h5>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-gradient-to-r from-blue-900/30 to-blue-900/10 rounded-xl border border-blue-800/50">
                    <div className="text-xl md:text-2xl font-bold text-blue-300">
                      {publishedCount}
                    </div>
                    <div className="text-sm text-blue-200">Publiés</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gradient-to-r from-orange-900/30 to-orange-900/10 rounded-xl border border-orange-800/50">
                    <div className="text-xl md:text-2xl font-bold text-orange-300">
                      {draftCount}
                    </div>
                    <div className="text-sm text-orange-200">En attente</div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allResults = results.map(r => ({
                      ...r,
                      date: r.publishDate,
                      statut: r.status === 'published' ? 'Publié' : 'Brouillon'
                    }));
                    
                    const csv = [
                      ['Titre', 'Description', 'Catégorie', 'Date', 'Statut', 'Auteur'],
                      ...allResults.map(r => [r.title, r.description, r.category, r.date, r.statut, r.author])
                    ].map(row => row.join(';')).join('\n');
                    
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'resultats-export.csv';
                    a.click();
                    
                    showAlert('info', 'Export CSV démarré...');
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter CSV
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingResult(null);
                    setFormKey(prev => prev + 1);
                    if (window.innerWidth < 768) {
                      document.getElementById('result-form')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <FileEdit className="h-4 w-4 mr-2" />
                  Nouveau résultat
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Conseils et informations */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h5 className="font-medium text-white">Conseil de publication</h5>
                <p className="text-sm text-gray-300 mt-1">
                  Utilisez "Enregistrer brouillon" pour travailler plus tard, puis "Publier" quand tout est prêt.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h5 className="font-medium text-white">Sécurité des données</h5>
                <p className="text-sm text-gray-300 mt-1">
                  Toutes les données sont sauvegardées automatiquement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h5 className="font-medium text-white">Statistiques</h5>
                <p className="text-sm text-gray-300 mt-1">
                  Suivez l'impact de vos publications avec nos outils d'analytics.
                </p>
              </div>
            </div>
          </div>
          
          {/* Résumé global */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Résumé global</h5>
                <p className="text-sm text-gray-300">
                  {results.length} résultats au total • 
                  <span className="text-green-400 ml-2">{publishedCount} visibles</span> • 
                  <span className="text-orange-400 ml-2">{draftCount} en préparation</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                    style={{ width: `${(publishedCount / results.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {Math.round((publishedCount / results.length) * 100)}% publiés
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Boutons d'action rapide (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <div className="flex flex-col items-end space-y-2">
          {editingResult && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="shadow-lg bg-gray-800 border-gray-600 text-white"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            onClick={() => {
              setEditingResult(null);
              setFormKey(prev => prev + 1);
              document.getElementById('result-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
            <p className="text-white text-sm">
              {editingResult ? 'Modification en cours...' : 'Publication en cours...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};