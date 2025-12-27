'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button_admin';
import { Input } from '@/components/ui/input_admin';
import { Select } from '@/components/ui/select_admin';
import { Card } from '@/components/ui/card_admin';

// Schéma de validation Zod
const resultFormSchema = z.object({
  title: z.string()
    .min(3, { message: 'Le titre doit contenir au moins 3 caractères' })
    .max(100, { message: 'Le titre ne peut pas dépasser 100 caractères' }),
  description: z.string()
    .min(10, { message: 'La description doit contenir au moins 10 caractères' })
    .max(500, { message: 'La description ne peut pas dépasser 500 caractères' }),
  category: z.string().min(1, { message: 'La catégorie est requise' }),
  publishDate: z.string().min(1, { message: 'La date de publication est requise' }),
  file: z.instanceof(FileList).optional(),
});

type ResultFormData = z.infer<typeof resultFormSchema>;

interface ResultFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<ResultFormData> & { id?: string };
  onSubmit: (data: ResultFormData, isDraft: boolean) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const categoryOptions = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'conference', label: 'Conférence' },
  { value: 'competition', label: 'Compétition' },
  { value: 'training', label: 'Formation' },
  { value: 'other', label: 'Autre' },
];

export const ResultForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ResultFormProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<ResultFormData>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      publishDate: initialData?.publishDate || new Date().toISOString().split('T')[0],
    },
    mode: 'onChange',
  });

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');
  const characterCount = watchedDescription?.length || 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFileName(file.name);
      
      // Simulation de prévisualisation pour les images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleFormSubmit = async (data: ResultFormData, isDraft: boolean = false) => {
    try {
      await onSubmit(data, isDraft);
      if (!isDraft && mode === 'create') {
        reset();
        setFilePreview(null);
        setSelectedFileName('');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gray-800 p-6">
      {/* En-tête avec gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500" />
      
      <div className="pt-2 ">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            {mode === 'create' ? 'Publier un nouveau résultat' : 'Modifier le résultat'}
          </h2>
          <p className="text-gray-200 mt-1">
            Remplissez les informations ci-dessous pour {mode === 'create' ? 'publier' : 'modifier'} un résultat
          </p>
        </div>

        <form onSubmit={handleSubmit((data) => handleFormSubmit(data, false))} className="space-y-6">
          {/* Titre */}
          <div>
            <Input
              label="Titre du résultat"
              placeholder="Ex: Résultats du hackathon IA 2024"
              {...register('title')}
              error={errors.title?.message}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <div className="mt-1 text-sm text-gray-500">
              {watchedTitle?.length || 0}/100 caractères
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border bg-slate-600 border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 text-base min-h-[120px] resize-none"
              placeholder="Décrivez les résultats, les projets gagnants, les apprentissages..."
              {...register('description')}
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
            <div className={`mt-1 text-sm ${
              characterCount > 450 ? 'text-orange-600' : 'text-gray-500'
            }`}>
              {characterCount}/500 caractères
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catégorie */}
            <Select
              label="Catégorie"
              options={categoryOptions}
              {...register('category')}
              error={errors.category?.message}
            />

            {/* Date de publication */}
            <Input
              type="date"
              label="Date de publication"
              {...register('publishDate')}
              error={errors.publishDate?.message}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>

          {/* Fichier joint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fichier joint (optionnel)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Télécharger un fichier</span>
                    <input
                      type="file"
                      className="sr-only"
                      {...register('file')}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>
                  <p className="pl-1">ou glissez-déposez</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, JPG, PNG jusqu'à 10MB
                </p>
              </div>
            </div>
            
            {selectedFileName && (
              <div className="mt-3 flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{selectedFileName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFileName('');
                    setFilePreview(null);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {filePreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Aperçu :</p>
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48 rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit((data) => handleFormSubmit(data, true))}
              disabled={isLoading || !isValid}
              loading={isLoading}
              fullWidth
              className="sm:w-1/3"
            >
              Enregistrer brouillon
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !isValid}
              loading={isLoading}
              fullWidth
              className="sm:w-1/3"
            >
              {mode === 'create' ? 'Publier' : 'Mettre à jour'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              fullWidth
              className="sm:w-1/3 border-red-300 text-red-600 hover:bg-red-50"
            >
              Annuler
            </Button>
          </div>

          {/* Indicateur de validation */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={isValid ? 'text-green-700' : 'text-red-700'}>
                {isValid ? 'Formulaire valide' : 'Veuillez corriger les erreurs'}
              </span>
            </div>
            <div className="text-gray-500">
              Mode: <span className="font-medium">{mode === 'create' ? 'Création' : 'Édition'}</span>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
// À la fin de ResultForm.tsx, ajoutez :
export type { ResultFormData };