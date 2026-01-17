/**
 * Service to handle communication with the Yellowcake API.
 * Note: Replace API_KEY with your actual credentials.
 */

const API_KEY = 'yc_live_z5ZU-lYuCdN7mWjh11GuWqSTKoh1746aCp-EwqVCxko='; // The execution environment provides the key at runtime
const BASE_URL = 'https://api.yellowcake.io/v1';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  instructions: string[];
  missedIngredients: string[];
  readyInMinutes: number;
}

export const fetchRecipesByIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (ingredients.length === 0) return [];

  // Implement exponential backoff for API calls
  const fetchWithRetry = async (url: string, retries = 5, delay = 1000): Promise<any> => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  try {
    const query = ingredients.map(i => i.toLowerCase().trim()).join(',');
    const url = `${BASE_URL}/recipes?ingredients=${query}&apiKey=${API_KEY}`;
    
    const data = await fetchWithRetry(url);
    
    // Assuming Yellowcake returns an array of recipes or an object with a recipes key
    return data.recipes || data || [];
  } catch (error) {
    console.error("Yellowcake API Error:", error);
    return [];
  }
};