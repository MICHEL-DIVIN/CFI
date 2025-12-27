import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      if (closeOnOverlayClick) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOverlayClick]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-100">
      {/* Overlay semi-transparent - NE bloque PAS le scroll */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity ${
          closeOnOverlayClick ? 'cursor-pointer' : ''
        }`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      
      {/* Modal Container - Positionné de manière à ne pas bloquer */}
      <div className="relative flex items-start justify-center min-h-screen p-4 pt-20">
        {/* Modal Content */}
        <div 
          ref={modalRef}
          className={`relative ${sizes[size]} w-full transform overflow-hidden rounded-xl bg-gray-800 shadow-2xl border border-gray-700 max-h-[80vh]`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4 sticky top-0 bg-gray-800 z-10">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Body - Contenu scrollable */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
            <div className="px-6 py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};