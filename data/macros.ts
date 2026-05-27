// Macro estimates per restaurant or cuisine baseline.
// Restaurant overrides take priority; otherwise we fall back to cuisine baseline,
// otherwise to the generic default. All values are rough estimates of one
// typical order (entree + sides as the deal is normally redeemed).

export type Macros = { cal: number; protein: number };

// Restaurants with published nutrition info or a known signature order.
export const restaurantOverrides: Record<string, Macros> = {
  "Red Robin": { cal: 1100, protein: 53 },
  "Chili's": { cal: 1300, protein: 55 },
  "Checkers/Rally's": { cal: 620, protein: 26 },
  "In-N-Out Protein Style": { cal: 520, protein: 33 },
  "Tom's Jr Burger": { cal: 1200, protein: 50 },
  "Sugarfish": { cal: 700, protein: 35 },
  "Bonchon": { cal: 1200, protein: 80 },
  "Cassell's": { cal: 950, protein: 45 },
  "The Press Burger Joint": { cal: 850, protein: 35 },
  "Uncle Stevey's Bagels": { cal: 600, protein: 25 },
  "Kozo Sushi": { cal: 250, protein: 8 },
};

// Cuisine -> typical order baseline.
export const cuisineMacros: Record<string, Macros> = {
  Mexican: { cal: 450, protein: 22 },
  Vietnamese: { cal: 550, protein: 32 },
  Sushi: { cal: 600, protein: 28 },
  "Japanese Hot Pot": { cal: 900, protein: 60 },
  "Korean Wings": { cal: 1100, protein: 75 },
  American: { cal: 800, protein: 35 },
  "American/Bar": { cal: 700, protein: 30 },
  Burgers: { cal: 900, protein: 40 },
  "Burgers/Chicken": { cal: 950, protein: 45 },
  Pizza: { cal: 700, protein: 28 },
  "Pizza/Pub": { cal: 700, protein: 28 },
  Italian: { cal: 750, protein: 28 },
  "Italian/Pizza": { cal: 700, protein: 28 },
  "Italian/Wine": { cal: 550, protein: 22 },
  "Italian Tapas": { cal: 500, protein: 22 },
  "Italian/Cocktail": { cal: 550, protein: 22 },
  French: { cal: 700, protein: 30 },
  "French/Hotel": { cal: 600, protein: 25 },
  "French/Rooftop": { cal: 600, protein: 25 },
  "French Rooftop": { cal: 600, protein: 25 },
  "French Dip/Bar": { cal: 850, protein: 45 },
  Seafood: { cal: 550, protein: 35 },
  "Seafood/Bar": { cal: 550, protein: 35 },
  Steakhouse: { cal: 1100, protein: 65 },
  Thai: { cal: 700, protein: 30 },
  Caribbean: { cal: 800, protein: 35 },
  Vegan: { cal: 600, protein: 25 },
  "Vegan Mexican": { cal: 550, protein: 22 },
  "Bagels/Breakfast": { cal: 550, protein: 22 },
  Oaxacan: { cal: 600, protein: 28 },
  BBQ: { cal: 1000, protein: 60 },
  "BBQ/Bar": { cal: 900, protein: 50 },
  "BBQ/Filipino": { cal: 1000, protein: 55 },
  "Modern American": { cal: 700, protein: 30 },
  "New American": { cal: 700, protein: 30 },
  "Asian Fusion": { cal: 700, protein: 32 },
  "Asian/Bar": { cal: 700, protein: 32 },
  "Bar/Asian": { cal: 700, protein: 32 },
  "Bar Food": { cal: 800, protein: 32 },
  Bar: { cal: 600, protein: 22 },
  "Bar/American": { cal: 700, protein: 30 },
  "Cocktail Bar": { cal: 400, protein: 12 },
  "Whiskey Bar": { cal: 400, protein: 12 },
  "Wine Bar": { cal: 400, protein: 12 },
  "Tiki/Bar": { cal: 500, protein: 15 },
  "Mexican/Bar": { cal: 500, protein: 22 },
  "Tex-Mex": { cal: 700, protein: 28 },
  "Mezcal Bar": { cal: 400, protein: 12 },
  "Beer Hall": { cal: 600, protein: 22 },
  Wings: { cal: 1100, protein: 75 },
  "Colombian/Korean": { cal: 700, protein: 32 },
  "Sports Bar": { cal: 800, protein: 32 },
  Pub: { cal: 700, protein: 30 },
  "Pub/British": { cal: 700, protein: 30 },
  "Irish Pub": { cal: 700, protein: 30 },
  "New Orleans": { cal: 800, protein: 32 },
  Japanese: { cal: 600, protein: 30 },
  "Japanese/Izakaya": { cal: 700, protein: 32 },
  German: { cal: 1000, protein: 50 },
  "Sushi/Drinks": { cal: 250, protein: 8 },
  Vouchers: { cal: 700, protein: 30 },
  Delivery: { cal: 800, protein: 35 },
  Brazilian: { cal: 1000, protein: 60 },
};

export const DEFAULT_MACROS: Macros = { cal: 600, protein: 25 };

export function macrosFor(restaurant: string, cuisine: string): Macros {
  if (restaurantOverrides[restaurant]) return restaurantOverrides[restaurant];
  if (cuisineMacros[cuisine]) return cuisineMacros[cuisine];
  return DEFAULT_MACROS;
}
