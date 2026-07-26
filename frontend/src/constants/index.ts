import type { Cat } from '../types/cat.types';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-1b2o.onrender.com/api';

export const LOCAL_STORAGE_KEYS = {
  THEME: 'tiny_cats_theme',
  FAVORITES: 'tiny_cats_favorites',
} as const;

export const ENERGY_LEVELS = ['All', 'High', 'Medium', 'Low'] as const;

export const SORT_OPTIONS = [
  { label: 'Name (A - Z)', value: 'name-asc' },
  { label: 'Name (Z - A)', value: 'name-desc' },
  { label: 'Energy (Highest)', value: 'energy-high' },
  { label: 'Life Span (Longest)', value: 'lifespan-high' },
] as const;

export const FALLBACK_CAT_IMAGE = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80';

export const SAMPLE_CATS_FALLBACK: Cat[] = [
  {
    _id: 'sample-1',
    name: 'Milo',
    breed: 'Scottish Fold',
    description: 'An affectionate and calm cat with distinctive folded ears. Loves cozy laps and soft cuddles.',
    lifeSpan: 15,
    energyLevel: 'Medium',
    kidsFriendly: true,
    apartmentFriendly: true,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    color: '#FFD1A4',
  },
  {
    _id: 'sample-2',
    name: 'Luna',
    breed: 'Siamese',
    description: 'Vocal, highly intelligent, and social. Luna demands your full attention and will converse all day!',
    lifeSpan: 18,
    energyLevel: 'High',
    kidsFriendly: true,
    apartmentFriendly: true,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80',
    color: '#E2E8F0',
  },
  {
    _id: 'sample-3',
    name: 'Oliver',
    breed: 'British Shorthair',
    description: 'Easygoing and dignified with a dense plush coat. Oliver prefers quiet lounging and relaxing ambient tunes.',
    lifeSpan: 16,
    energyLevel: 'Low',
    kidsFriendly: true,
    apartmentFriendly: true,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    color: '#94A3B8',
  },
  {
    _id: 'sample-4',
    name: 'Bella',
    breed: 'Maine Coon',
    description: 'Gentle giant with a majestic bushy tail. Known for dog-like loyalty and playful nature.',
    lifeSpan: 14,
    energyLevel: 'High',
    kidsFriendly: true,
    apartmentFriendly: false,
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=800&q=80',
    color: '#D97706',
  },
  {
    _id: 'sample-5',
    name: 'Simba',
    breed: 'Bengal',
    description: 'Wild looks with a domestic heart. Simba loves leaping to high perches and running through tunnels.',
    lifeSpan: 16,
    energyLevel: 'High',
    kidsFriendly: false,
    apartmentFriendly: true,
    image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=800&q=80',
    color: '#F59E0B',
  },
  {
    _id: 'sample-6',
    name: 'Cleo',
    breed: 'Persian',
    description: 'Luxurious long coat and sweet expression. Cleo enjoys serene environments and daily brushings.',
    lifeSpan: 15,
    energyLevel: 'Low',
    kidsFriendly: true,
    apartmentFriendly: true,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    color: '#F8FAFC',
  },
];
