const API_BASE_URL = 'http://localhost:8000'; // Update this to your FastAPI server URL

export class ApiService {
  static async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error message
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async getEbayListings(skip = 0, limit = 100) {
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/ebay/listings/?skip=${skip}&limit=${limit}`
    );
  }
  

  // Add methods for other websites as you implement their backends
  static async getAutotraderListings(skip = 0, limit = 100) {
    // Placeholder - implement when backend endpoint is ready
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/autotrader/listings/?skip=${skip}&limit=${limit}`
    );
  }

  static async getCarsListings(skip = 0, limit = 100) {
    // Placeholder - implement when backend endpoint is ready
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/cars/list/?skip=${skip}&limit=${limit}`
    );
  }

  static async getCargurusListings(skip = 0, limit = 100) {
    // Placeholder - implement when backend endpoint is ready
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/cargurus/list/?skip=${skip}&limit=${limit}`
    );
  }

  static async getDupontListings(skip = 0, limit = 100) {
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/dupont/list?skip=${skip}&limit=${limit}`
    );
  }

  static async getCraigslistListings(skip = 0, limit = 100) {
    // Placeholder - implement when backend endpoint is ready
    return ApiService.fetchWithErrorHandling(
      `${API_BASE_URL}/craigslist/list?skip=${skip}&limit=${limit}`
    );
  }
}
