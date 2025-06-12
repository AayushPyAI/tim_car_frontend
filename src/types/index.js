
// Car listing data structure
export const CarListingSchema = {
  id: 'number',
  title: 'string',
  price: 'number',
  year: 'number',
  make: 'string',
  model: 'string',
  mileage: 'number',
  location: 'string',
  image_url: 'string',
  listing_url: 'string',
  created_at: 'string'
};

// API response structure
export const ApiResponseSchema = {
  data: 'array',
  total: 'number',
  skip: 'number',
  limit: 'number'
};

// Available websites
export const WEBSITES = {
  EBAY: 'ebay',
  AUTOTRADER: 'autotrader',
  CARS: 'cars',
  CARGURUS: 'cargurus',
  DUPONT: 'dupont',
  CRAIGSLIST: 'craigslist'
};
