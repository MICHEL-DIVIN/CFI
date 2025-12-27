'use client';

import { Card } from '@/components/ui/card_admin';
import { Badge } from '@/components/ui/badge_admin';
import { Button } from '@/components/ui/button_admin';
import { Modal } from '@/components/ui/Modal';
import { Student } from '@/components/tableau/tableau_etudiant';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  User, Mail, Building2, Calendar, Code2, 
  Download, X, Send, Brain, TrendingUp,
  Award, CheckCircle, AlertCircle, FolderGit2,
  ExternalLink, Star, Target, Zap
} from 'lucide-react';

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const StudentDetailsModal = ({ isOpen, onClose, student }: StudentDetailsModalProps) => {
  if (!student) return null;

  const formattedDate = format(new Date(student.registrationDate), 'dd MMMM yyyy', { locale: fr });
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-900/30';
    if (score >= 80) return 'text-blue-400 bg-blue-900/30';
    if (score >= 70) return 'text-orange-400 bg-orange-900/30';
    return 'text-red-400 bg-red-900/30';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Très bon';
    if (score >= 70) return 'Bon';
    return 'À améliorer';
  };

  const getScoreLevelColor = (score: number) => {
    if (score >= 90) return 'bg-green-900/50 text-green-300 border-green-700';
    if (score >= 80) return 'bg-blue-900/50 text-blue-300 border-blue-700';
    if (score >= 70) return 'bg-orange-900/50 text-orange-300 border-orange-700';
    return 'bg-red-900/50 text-red-300 border-red-700';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails de l'étudiant"
      size="lg"
    >
      <div className="space-y-4 md:space-y-6">
        {/* En-tête avec infos principales */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center flex-shrink-0">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{student.firstName} {student.lastName}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge variant="info" size="md">
                <Building2 className="h-3 w-3 mr-1" />
                {student.classe}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="h-3 w-3" />
                Inscrit le {formattedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Informations personnelles */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-white">Informations personnelles</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-300">Email</div>
                    <a 
                      href={`mailto:${student.email}`}
                      className="text-blue-300 hover:text-blue-200 hover:underline text-sm md:text-base"
                    >
                      {student.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <Calendar className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-300">Date d'inscription</div>
                    <div className="text-white text-sm md:text-base">{formattedDate}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <Building2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-300">Classe</div>
                    <div className="text-white text-sm md:text-base">{student.classe}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <Star className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-300">ID Étudiant</div>
                    <div className="text-white text-sm md:text-base font-mono">{student.id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Compétences techniques */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-5 w-5 text-green-400" />
              <h4 className="text-lg font-semibold text-white">Compétences techniques</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.technologies.map((tech, index) => (
                <Badge
                  key={tech}
                  variant={index % 3 === 0 ? 'success' : index % 3 === 1 ? 'warning' : 'info'}
                  size="md"
                >
                  <div className="flex items-center">
                    <Code2 className="h-3 w-3 mr-2" />
                    {tech}
                  </div>
                </Badge>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-400">
              {student.technologies.length} technologie{student.technologies.length !== 1 ? 's' : ''} maîtrisée{student.technologies.length !== 1 ? 's' : ''}
            </div>
          </div>
        </Card>

        {/* Score IA */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-orange-400" />
              <h4 className="text-lg font-semibold text-white">Score d'évaluation IA</h4>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className={`text-3xl md:text-4xl font-bold ${getScoreColor(student.aiScore)} px-4 py-2 rounded-lg`}>
                    {student.aiScore}%
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Score global</div>
                </div>
                
                <div className={`px-4 py-2 rounded-full border text-sm font-medium ${getScoreLevelColor(student.aiScore)}`}>
                  {student.aiScore >= 90 && <Award className="h-4 w-4 inline mr-2" />}
                  {student.aiScore >= 80 && student.aiScore < 90 && <TrendingUp className="h-4 w-4 inline mr-2" />}
                  {student.aiScore >= 70 && student.aiScore < 80 && <Target className="h-4 w-4 inline mr-2" />}
                  {student.aiScore < 70 && <AlertCircle className="h-4 w-4 inline mr-2" />}
                  {getScoreLevel(student.aiScore)}
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      student.aiScore >= 90 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                      student.aiScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                      student.aiScore >= 70 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                      'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${student.aiScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Statistiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg border border-blue-800/50">
                  <FolderGit2 className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Projets</div>
                  <div className="text-xl font-bold text-white">{(student.aiScore / 20).toFixed(0)}</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-lg border border-orange-800/50">
                  <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Contributions</div>
                  <div className="text-xl font-bold text-white">{(student.aiScore / 10).toFixed(0)}</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg border border-green-800/50">
                  <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Évaluation</div>
                  <div className="text-xl font-bold text-white">{student.aiScore >= 70 ? '✓' : '✗'}</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg border border-purple-800/50">
                  <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Niveau</div>
                  <div className="text-xl font-bold text-white">
                    {student.aiScore >= 85 ? 'Avancé' : student.aiScore >= 70 ? 'Intermédiaire' : 'Débutant'}
                  </div>
                </div>
              </div>
              
              {/* Recommandations */}
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  Recommandations
                </h5>
                <p className="text-sm text-gray-400">
                  {student.aiScore >= 90 
                    ? 'Excellente progression ! Continue sur cette lancée.'
                    : student.aiScore >= 80
                    ? 'Très bon niveau. Explore des projets plus complexes.'
                    : student.aiScore >= 70
                    ? 'Bon début ! Concentre-toi sur la pratique régulière.'
                    : 'Besoin de renforcement. Participe à plus de workshops.'
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              window.location.href = `mailto:${student.email}?subject=CFI%20CIRAS%20-%20Contact&body=Bonjour%20${student.firstName}%20${student.lastName},%0D%0A%0D%0A`;
            }}
            className="border-gray-600 hover:bg-gray-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Contacter
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              const data = JSON.stringify(student, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `etudiant-${student.firstName.toLowerCase()}-${student.lastName.toLowerCase()}.json`;
              a.click();
            }}
            className="border-gray-600 hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
    </Modal>
  );
};