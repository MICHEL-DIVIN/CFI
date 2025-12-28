"use client";

import Link from "next/link";
import { CodeXml, Bell, LogOut, Settings, User, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface AdminHeaderProps {
  activePage: 'students' | 'results' | 'stats' | 'settings';
  onPageChange: (page: 'students' | 'results' | 'stats' | 'settings') => void;
}

const AdminHeader = ({ activePage, onPageChange }: AdminHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const [notifications] = useState([
    { id: 1, message: 'Nouvel étudiant inscrit', time: '2 min', unread: true },
    { id: 2, message: 'Résultats publiés', time: '1 heure', unread: false },
    { id: 3, message: 'Score IA mis à jour', time: '3 heures', unread: true },
    { id: 4, message: 'Projet soumis', time: '5 heures', unread: false },
  ]);

  const navLinks = [
    { id: 'students', label: "Étudiants" },
    { id: 'results', label: "Résultats" },
  ];

  const unreadNotifications = notifications.filter(n => n.unread).length;

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-3 text-xl font-bold">
            <div className="text-2xl font-medium text-orange-600">
              <CodeXml className="w-8 h-8 text-primary" /> 
            </div>
            <div className="flex flex-col">
              <span className="text-orange-600">CFI-CIRAS</span>
              <span className="text-xs text-gray-500 font-normal">Admin Panel</span>
            </div>
          </Link>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="h-5 w-5 text-gray-200" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Il y a {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 ml-2 mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 px-3"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium text-white">Admin CFI</span>
                  <span className="text-xs text-orange-500">Administrateur</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-gray-900">Admin CFI</p>
                      <p className="text-xs text-gray-500">admin@cfi-ciras.com</p>
                    </div>
                  </div>
                  <div className="p-1">
                    <button 
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => {
                        onPageChange('settings');
                        setIsProfileOpen(false);
                      }}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Mon profil
                    </button>
                    <button 
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => {
                        onPageChange('settings');
                        setIsProfileOpen(false);
                      }}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Paramètres
                    </button>
                  </div>
                  <div className="p-1 border-t border-gray-200">
                    <button 
                      className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      onClick={() => console.log('Déconnexion')}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button avec les 3 traits (hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Ouvrir le menu"
            >
              {/* Les 3 traits du menu hamburger */}
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-200 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-200 transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-0.5 bg-gray-200 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
              <div className="fixed inset-0 z-50 bg-orange-700 bg-opacity-50">
                <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-800 shadow-xl animate-in slide-in-from-right">
                  <div className="flex flex-col h-full">
                    {/* Header Mobile */}
                    <div className="flex justify-between items-center border-b p-4">
                      <Link href="/admin/dashboard" className="flex items-center gap-3 text-xl font-bold">
                        <div className="text-2xl font-medium text-orange-600">
                          <CodeXml className="w-8 h-8 text-primary" /> 
                        </div>
                        <div className="flex flex-col">
                          <span className="text-orange-600">CFI-CIRAS</span>
                          <span className="text-xs text-gray-500 font-normal">Admin Panel</span>
                        </div>
                      </Link>
                      <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                        aria-label="Fermer le menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* User Info Mobile */}
                    <div className="flex items-center space-x-3 bg-slate-700 p-6 border-b">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                        AD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Admin CFI</p>
                        <p className="text-xs text-gray-500">Administrateur</p>
                        <p className="text-xs text-gray-400 mt-1">admin@cfi-ciras.com</p>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                        <Bell className="h-5 w-5" />
                        {unreadNotifications > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                            {unreadNotifications}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Navigation Mobile */}
                    <nav className="flex-1 p-4 bg-slate-700">
                      <div className="space-y-2">
                        {navLinks.map((link) => (
                          <button
                            key={link.id}
                            onClick={() => {
                              onPageChange(link.id as any);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full text-left font-medium py-3 px-4 rounded-lg transition-colors ${
                              activePage === link.id
                                ? 'bg-orange-600 text-white'
                                : 'text-white hover:text-orange-600 hover:bg-gray-50'
                            }`}
                          >
                            {link.label}
                          </button>
                        ))}
                      </div>
                    </nav>

                    {/* Actions Mobile */}
                    <div className="p-4 border-t bg-slate-700">
                      <div className="space-y-2">
                        <button 
                          className="w-full flex items-center text-sm font-medium text-white hover:text-orange-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50"
                          onClick={() => {
                            onPageChange('settings');
                            setIsMenuOpen(false);
                          }}
                        >
                          <User className="mr-3 h-5 w-5" />
                          Mon profil
                        </button>
                        <button 
                          className="w-full flex items-center text-sm font-medium text-white hover:text-orange-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50"
                          onClick={() => {
                            onPageChange('settings');
                            setIsMenuOpen(false);
                          }}
                        >
                          <Settings className="mr-3 h-5 w-5" />
                          Paramètres
                        </button>
                        <button
                          className="w-full flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-3 px-4 rounded-lg border border-red-300 hover:bg-red-50"
                          onClick={() => {
                            console.log('Déconnexion');
                            setIsMenuOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;