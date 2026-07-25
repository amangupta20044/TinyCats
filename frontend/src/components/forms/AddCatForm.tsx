import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useCreateCat } from '../../hooks/useCreateCat';
import { FALLBACK_CAT_IMAGE } from '../../constants';

const addCatSchema = z.object({
  name: z.string().min(2, 'Cat name must be at least 2 characters'),
  breed: z.string().min(2, 'Breed name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  lifeSpan: z.number().min(1, 'Life span must be at least 1 year').max(30, 'Life span must be realistic (<30)'),
  energyLevel: z.string().min(1, 'Please select an energy level'),
  kidsFriendly: z.boolean(),
  apartmentFriendly: z.boolean(),
  image: z.string().url('Please enter a valid image URL').or(z.string().min(5, 'Image URL required')),
  color: z.string().optional(),
});

export type AddCatFormData = z.infer<typeof addCatSchema>;

export const AddCatForm: React.FC = () => {
  const createCatMutation = useCreateCat();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddCatFormData>({
    resolver: zodResolver(addCatSchema),
    defaultValues: {
      name: '',
      breed: '',
      description: '',
      lifeSpan: 15,
      energyLevel: 'Medium',
      kidsFriendly: true,
      apartmentFriendly: true,
      image: '',
      color: '#FF7A00',
    },
  });

  const watchImageUrl = watch('image');

  const onSubmit = async (data: AddCatFormData) => {
    await createCatMutation.mutateAsync({
      name: data.name,
      breed: data.breed,
      description: data.description,
      lifeSpan: Number(data.lifeSpan),
      energyLevel: data.energyLevel,
      kidsFriendly: data.kidsFriendly,
      apartmentFriendly: data.apartmentFriendly,
      image: data.image,
      color: data.color || '#FF7A00',
    });
    reset();
  };

  return (
    <Card glass className="p-6 md:p-10 max-w-3xl mx-auto shadow-xl border-border/70">
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <PlusCircle className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-foreground">Add New Cat Profile</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Share details about a cat breed or companion to list them in the Tiny Cats recommendation platform.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Cat Name *"
            placeholder="e.g. Oliver, Whiskers"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Breed */}
          <Input
            label="Breed *"
            placeholder="e.g. Scottish Fold, Persian"
            error={errors.breed?.message}
            {...register('breed')}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-foreground/90">Description *</label>
          <textarea
            rows={3}
            placeholder="Describe the cat's personality, habits, temperament, and care preferences..."
            className="w-full p-4 text-sm bg-card text-foreground rounded-xl border border-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Life Span */}
          <Input
            label="Average Life Span (Years) *"
            type="number"
            placeholder="15"
            error={errors.lifeSpan?.message}
            {...register('lifeSpan', { valueAsNumber: true })}
          />

          {/* Energy Level */}
          <Select
            label="Energy Level *"
            error={errors.energyLevel?.message}
            options={[
              { label: 'High Energy ⚡', value: 'High' },
              { label: 'Medium Energy ⚖️', value: 'Medium' },
              { label: 'Low Energy 😴', value: 'Low' },
            ]}
            {...register('energyLevel')}
          />
        </div>

        {/* Image URL & Preview */}
        <div className="space-y-3">
          <Input
            label="Image URL *"
            placeholder="https://images.unsplash.com/photo-..."
            error={errors.image?.message}
            leftIcon={<ImageIcon className="h-4 w-4" />}
            {...register('image')}
          />

          {watchImageUrl && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center">
              <img
                src={watchImageUrl}
                alt="Cat preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_CAT_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Image Preview
              </div>
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
              {...register('kidsFriendly')}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Kid Friendly 👶</span>
              <span className="text-xs text-muted-foreground">Safe and gentle around children</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
              {...register('apartmentFriendly')}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Apartment Friendly 🏢</span>
              <span className="text-xs text-muted-foreground">Adapts well to indoor living</span>
            </div>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-base font-bold shadow-lg shadow-orange-500/25"
          isLoading={createCatMutation.isPending}
          leftIcon={<Sparkles className="h-5 w-5" />}
        >
          Submit Cat Profile
        </Button>
      </form>
    </Card>
  );
};
