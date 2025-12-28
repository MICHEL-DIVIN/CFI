'use client';

import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button_admin';
import { Input } from '@/components/ui/input_admin';
import { Badge } from '@/components/ui/badge_admin';
import BackgroundParticles from "@/components/background-particles";
import { 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Download,
  ChevronRight,
  FileText,
  TrendingUp
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  activePage?: 'students' | 'results' | 'stats' | 'settings';
  onPageChange?: (page: 'students' | 'results' | 'stats' | 'settings') => void;
}

export const DashboardLayout = ({ 
  children, 
  activePage = 'students',
  onPageChange 
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, message: 'Nouvel étudiant inscrit', time: '2 min', read: false },
    { id: 2, message: 'Résultats publiés', time: '1 heure', read: true },
    { id: 3, message: 'Score IA mis à jour', time: '3 heures', read: false },
  ]);

  const navigationItems = [
    { id: 'students', label: 'Etudiants', icon: Users, badge: 24 },
    { id: 'results', label: 'Résultats', icon: FileText, badge: 12 },
    { id: 'stats', label: 'Statistiques', icon: TrendingUp, badge: null },
    { id: 'settings', label: 'Paramètres', icon: Settings, badge: null },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="min-h-screen ">
      {/* Pattern background discret */}
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="relative z-10 flex min-h-screen pt-28 "> {/* Ajout de pt-16 pour le header */}
        {/* Sidebar - Positionné en dessous du header */}
        <aside
          className={`fixed pt-11 inset-y-0 left-0 z-50 w-64 transform bg-gray-800 backdrop-blur-sm transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: '64px', height: 'calc(100vh - 64px)', position: 'fixed' }} // Position sous le header
        >
          <div className="flex  h-full flex-col">
            {/* Logo et fermeture mobile */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 lg:hidden">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CFI</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Hackathon CIRAS</h1>
                  <p className="text-xs text-gray-100">Tableau de bord</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <nav className="space-y-1 px-4 py-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onPageChange?.(item.id as 'students' | 'results' | 'stats' | 'settings');
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center justify-between w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        activePage === item.id
                          ? 'bg-orange-400 text-black border-l-4 border-orange-500'
                          : 'text-white hover:bg-orange-200 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge !== null && (
                          <Badge
                            variant={activePage === item.id ? 'warning' : 'default'}
                            size="sm"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* User profile - Fixed en bas */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-medium">AD</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Admin CFI</p>
                  <p className="text-xs text-gray-100">Administrateur</p>
                </div>
                <button 
                  className="rounded-lg p-1 hover:bg-gray-100"
                  onClick={() => console.log('Déconnexion')}
                  title="Déconnexion"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col lg:pl-64 w-80">
          {/* Header déjà inclus dans page.tsx, donc on ne le met pas ici */}
          
          {/* Main content area */}
          <main className="flex-1 p-4 lg:p-6">
           
            <BackgroundParticles />
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => onPageChange?.('students')}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </li>
                  <li>
                    <span className="text-gray-100 font-medium">
                      {navigationItems.find(item => item.id === activePage)?.label}
                    </span>
                  </li>
                </ol>
              </nav>
              <h2 className="mt-2 text-2xl font-bold text-orange-900">
                {navigationItems.find(item => item.id === activePage)?.label}
              </h2>
            </div>

            {/* Content area - Scrollable si nécessaire */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm border border-gray-200/50">
              {children}
            </div>

            {/* Footer */}
            <footer className="mt-6 text-center text-sm text-gray-500">
              <p>CFI-CIRAS Hackathon Dashboard • {new Date().getFullYear()} • v1.0.0</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};