import { apiClient } from './api';
import type { Cat, CreateCatPayload, RecommendationParams } from '../types/cat.types';
import type { ApiResponse } from '../types/api.types';
import { SAMPLE_CATS_FALLBACK } from '../constants';

export const catService = {
  /**
   * Fetch all cats from backend API GET /api/cats
   */
  async getAllCats(): Promise<Cat[]> {
    try {
      const response = await apiClient.get<ApiResponse<Cat[]>>('/cats');
      if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return SAMPLE_CATS_FALLBACK;
    } catch (error) {
      console.warn('Backend unavailable, using fallback cat data for UI preview:', error);
      return SAMPLE_CATS_FALLBACK;
    }
  },

  /**
   * Fetch single cat by ID from GET /api/cats/:id
   */
  async getCatById(id: string): Promise<Cat> {
    try {
      const response = await apiClient.get<ApiResponse<Cat>>(`/cats/${id}`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
    } catch (error) {
      console.warn(`Fetching cat ${id} failed, falling back to local list:`, error);
    }
    const localCat = SAMPLE_CATS_FALLBACK.find((c) => c._id === id);
    if (localCat) return localCat;
    throw new Error(`Cat with ID ${id} not found.`);
  },

  /**
   * Search cats by query from GET /api/cats/search/all?q=
   */
  async searchCats(query: string): Promise<Cat[]> {
    if (!query.trim()) return this.getAllCats();
    try {
      const response = await apiClient.get<ApiResponse<Cat[]>>(`/cats/search/all?q=${encodeURIComponent(query)}`);
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('Search API call failed, filtering fallback data:', error);
    }
    const q = query.toLowerCase();
    return SAMPLE_CATS_FALLBACK.filter(
      (c) => c.name.toLowerCase().includes(q) || c.breed.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  },

  /**
   * Post new cat to POST /api/cats/create
   */
  async createCat(payload: CreateCatPayload): Promise<Cat> {
    try {
      const response = await apiClient.post<ApiResponse<Cat>>('/cats/create', payload);
      return response.data.data;
    } catch (error) {
      console.warn('Failed to post cat to backend server, returning mocked response:', error);
      const newCat: Cat = {
        ...payload,
        color: payload.color || '#FF7A00',
        _id: `local-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      // Append to local fallback for runtime persistence
      SAMPLE_CATS_FALLBACK.unshift(newCat);
      return newCat;
    }
  },

  /**
   * Standard recommendation POST /api/cats/recommend
   */
  async recommendCats(params: RecommendationParams): Promise<Cat[]> {
    try {
      const response = await apiClient.post<ApiResponse<Cat[]>>('/cats/recommend', {
        kidsFriendly: params.kidsFriendly,
        apartmentFriendly: params.apartmentFriendly,
      });
      if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('Recommend API failed, using fallback filtering:', error);
    }
    return SAMPLE_CATS_FALLBACK.filter((cat) => {
      if (params.kidsFriendly && !cat.kidsFriendly) return false;
      if (params.apartmentFriendly && !cat.apartmentFriendly) return false;
      return true;
    });
  },

  /**
   * AI recommendation POST /api/aiRecommend/recommendByAi
   */
  async recommendByAi(params: RecommendationParams): Promise<Cat[]> {
    try {
      const response = await apiClient.post<ApiResponse<Cat[]>>('/aiRecommend/recommendByAi', {
        kidsFriendly: params.kidsFriendly,
        apartmentFriendly: params.apartmentFriendly,
        energyPreference: params.energyPreference,
        quiet: params.quiet,
        playful: params.playful,
      });
      if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('AI Recommend API failed, falling back to smart local matching:', error);
    }
    return this.recommendCats(params);
  },
};
