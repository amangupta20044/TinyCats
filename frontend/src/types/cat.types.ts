export interface Cat {
  _id: string;
  name: string;
  breed: string;
  description: string;
  lifeSpan: number;
  energyLevel: string;
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  image: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateCatPayload = Omit<Cat, '_id' | 'createdAt' | 'updatedAt'>;

export interface RecommendationParams {
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  energyPreference?: string;
  longHair?: boolean;
  shortHair?: boolean;
  quiet?: boolean;
  playful?: boolean;
}

export interface CatFilterOptions {
  searchQuery: string;
  kidsFriendlyOnly: boolean;
  apartmentFriendlyOnly: boolean;
  energyLevel: string;
  sortBy: 'name-asc' | 'name-desc' | 'energy-high' | 'lifespan-high';
}
