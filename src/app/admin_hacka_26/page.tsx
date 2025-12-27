'use client';

import { useState } from 'react';
import { 
  Users, Trophy, BarChart3, Settings, 
  TrendingUp, Rocket, Target, FileText,
  CheckCircle, Flame, Calendar, GraduationCap,
  Bell, Mail, Shield, Clock, Download,
  Trash2, RefreshCw, LogOut, Key
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StudentManagement } from '@/components/dashboard/gestion_etu';
import { ResultsPublication } from '@/components/dashboard/publication_resultats';
import AdminHeader from '@/components/layout/Header_Admin';
import { Card } from '@/components/ui/card_admin';
import { Button } from '@/components/ui/button_admin';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<'students' | 'results' | 'stats' | 'settings'>('students');

  // Fonction pour rendre le composant actif
  const renderActiveComponent = () => {
    switch (activePage) {
      case 'students':
        return <StudentManagement />;
      case 'results':
        return <ResultsPublication />;
      case 'stats':
        return <DashboardStats />;
      case 'settings':
        return <DashboardSettings />;
      default:
        return <StudentManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <AdminHeader />
      <DashboardLayout 
        activePage={activePage}
        onPageChange={setActivePage}
      >
        {renderActiveComponent()}
      </DashboardLayout>
    </div>
  );
}

// Composant Stats
function DashboardStats() {
  const [stats] = useState({
    totalStudents: 156,
    activeProjects: 24,
    averageScore: 78,
    publishedResults: 12,
    completionRate: 85,
    engagementRate: 92,
  });

  const statIcons = {
    totalStudents: <Users className="h-6 w-6 text-blue-400" />,
    activeProjects: <Rocket className="h-6 w-6 text-orange-400" />,
    averageScore: <Target className="h-6 w-6 text-green-400" />,
    publishedResults: <FileText className="h-6 w-6 text-purple-400" />,
    completionRate: <CheckCircle className="h-6 w-6 text-cyan-400" />,
    engagementRate: <Flame className="h-6 w-6 text-red-400" />,
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Statistiques globales</h2>
        <p className="text-gray-300">Vue d'ensemble des performances du hackathon</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="p-6 hover:shadow-md transition-shadow bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-3xl font-bold text-white mt-2">
                  {value}{key.includes('Rate') ? '%' : ''}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-900/50 flex items-center justify-center border border-gray-700">
                {statIcons[key as keyof typeof stats]}
              </div>
            </div>
            
            {key.includes('Rate') && (
              <div className="mt-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Graphiques simulés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Évolution des inscriptions</h3>
            </div>
            <div className="h-64 flex items-end space-x-2">
              {[30, 45, 60, 80, 100, 125, 156].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                    style={{ height: `${(value / 156) * 100}%` }}
                  />
                  <div className="text-xs text-gray-400 mt-2">J{index + 1}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              7 derniers jours
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-orange-400" />
              <h3 className="font-semibold text-white">Répartition par promotion</h3>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="relative h-48 w-48">
                {/* Graphique circulaire simulé */}
                <div className="absolute inset-0 rounded-full border-8 border-blue-500/50"></div>
                <div className="absolute inset-8 rounded-full border-8 border-orange-500/50"></div>
                <div className="absolute inset-16 rounded-full border-8 border-green-500/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-300">Promo LIC1 (40%)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm text-gray-300">Promo Lic2 (35%)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-300">Promo LRT (25%)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights supplémentaires */}
      <div className="mt-8">
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              Insights clés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-white">Croissance</div>
                </div>
                <p className="text-sm text-gray-400">
                  +15% d'inscriptions cette semaine par rapport à la dernière
                </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-sm font-medium text-white">Performance</div>
                </div>
                <p className="text-sm text-gray-400">
                  Score moyen en augmentation de 8 points ce mois-ci
                </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-orange-900/30 flex items-center justify-center">
                    <Flame className="h-4 w-4 text-orange-400" />
                  </div>
                  <div className="text-sm font-medium text-white">Engagement</div>
                </div>
                <p className="text-sm text-gray-400">
                  92% des étudiants actifs sur les projets cette semaine
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Composant Paramètres
function DashboardSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyReport: true,
    newRegistration: true,
    resultPublication: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationLabels = {
    email: 'Recevoir les notifications par email',
    push: 'Notifications push dans le navigateur',
    weeklyReport: 'Rapport hebdomadaire automatique',
    newRegistration: 'Nouvelle inscription étudiante',
    resultPublication: 'Publication de résultats',
  };

  const notificationIcons = {
    email: <Mail className="h-4 w-4 text-blue-400" />,
    push: <Bell className="h-4 w-4 text-orange-400" />,
    weeklyReport: <FileText className="h-4 w-4 text-green-400" />,
    newRegistration: <Users className="h-4 w-4 text-purple-400" />,
    resultPublication: <Trophy className="h-4 w-4 text-cyan-400" />,
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Paramètres du tableau de bord</h2>
        <p className="text-gray-300">Personnalisez votre expérience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 hover:bg-gray-900/50 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center mt-1">
                      {notificationIcons[key as keyof typeof notificationIcons]}
                    </div>
                    <div>
                      <div className="font-medium text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {notificationLabels[key as keyof typeof notificationLabels]}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(key as keyof typeof notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Informations de compte */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Votre compte</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Nom</div>
                  <div className="font-medium text-white">Admin CFI</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                <Shield className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Rôle</div>
                  <div className="font-medium text-white">Administrateur</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Dernière connexion</div>
                  <div className="font-medium text-white">Aujourd'hui, 14:30</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                <BarChart3 className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Version</div>
                  <div className="font-medium text-white">1.0.0</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <Button 
                variant="outline" 
                fullWidth
                className="border-gray-600 hover:bg-gray-700"
              >
                <Key className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                className="border-red-600/50 text-red-400 hover:bg-red-900/30"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Zone dangereuse */}
      <Card className="border-gray-800/50 bg-gray-900/20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-red-900/30 flex items-center justify-center">
              <Shield className="h-4 w-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold flex text-red-300">Zone dangereuse</h3>
          </div>
          <p className="text-red-600 mb-6">
            Ces actions sont irréversibles. Soyez certain de ce que vous faites.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="border-red-800/50 flex text-red-600 hover:bg-red-900/30 flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter toutes les données
            </Button>
            <Button
              variant="outline"
              className="border-red-800/50 flex text-red-600 hover:bg-red-900/30 flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer les données de test
            </Button>
            <Button
              variant="outline"
              className="border-red-800/50 flex text-red-600 hover:bg-red-900/30 flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réinitialiser le tableau de bord
            </Button>
          </div>
        </div>
      </Card>

      {/* Aide et support */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
              <Bell className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Aide et support</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="text-sm font-medium text-white mb-2">Documentation</div>
              <p className="text-sm text-gray-400">
                Guide complet d'utilisation du tableau de bord
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="text-sm font-medium text-white mb-2">Support technique</div>
              <p className="text-sm text-gray-400">
                Contactez notre équipe pour toute assistance
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="text-sm font-medium text-white mb-2">Mises à jour</div>
              <p className="text-sm text-gray-400">
                Dernière mise à jour: 15 Janvier 2024
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}