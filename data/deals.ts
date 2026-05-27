// AUTO-GENERATED. Do not edit by hand.
// Regenerate with: node scripts/build-deals.mjs

export type Meal = "breakfast" | "lunch" | "dinner" | "late_night";

export type Macros = { cal: number; protein: number };

export type Confidence = "verified" | "ad-only" | "unconfirmed";

export type Deal = {
  id: string | number;
  day: string;
  days: string[]; // ["Mon","Tue",...]
  oneTimeDate?: string; // YYYY-MM-DD
  restaurant: string;
  neighborhood: string;
  deal: string;
  timeWindow: string;
  price: string;
  cadence: "day-specific" | "everyday";
  cuisine: string;
  category: string;
  sourceUrl: string;
  verified: boolean;
  notes: string;
  lastVerified?: string; // YYYY-MM-DD
  expires?: string; // YYYY-MM-DD
  traits: string[];
  confidence?: Confidence;
  meals: Meal[];
  macros?: Macros;
  isPersonal?: boolean;
};

export const deals: Deal[] = [
  {
    "id": 1,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Little Dom's",
    "neighborhood": "Los Feliz",
    "deal": "$25 three-course meal (changes weekly)",
    "timeWindow": "All night",
    "price": "$25",
    "cadence": "day-specific",
    "cuisine": "Italian",
    "category": "Weekly Special",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/best-bang-for-your-buck-los-angeles-restaurant-deals",
    "verified": true,
    "notes": "Wine $20/bottle add-on",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 2,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Catch LA",
    "neighborhood": "WeHo",
    "deal": "$1 oysters",
    "timeWindow": "4pm-close",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.lovehappyhour.com/LHH/blog/FeaturedMain/oyster-happy-hour-LA.php",
    "verified": true,
    "notes": "Upscale-spot Mon deal",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 3,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Malo",
    "neighborhood": "Silver Lake",
    "deal": "$2 tacos",
    "timeWindow": "4pm-close",
    "price": "$2",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Night",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/a-guide-to-taco-tuesday-in-la",
    "verified": true,
    "notes": "Monday taco night (not Tue)",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 4,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Rappahannock Oyster Bar",
    "neighborhood": "DTLA",
    "deal": "$2 oysters all-night HH",
    "timeWindow": "4pm-close",
    "price": "$2",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.discoverlosangeles.com/eat-drink/the-best-happy-hours-in-downtown-los-angeles",
    "verified": true,
    "notes": "All-night Monday",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 5,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Maple Block Meat Co.",
    "neighborhood": "Culver City",
    "deal": "$9 grilled cheese/tacos, $13 wings/nachos, $11 cocktails",
    "timeWindow": "5-9pm",
    "price": "from $9",
    "cadence": "day-specific",
    "cuisine": "BBQ",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Extended Monday HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 1000,
      "protein": 60
    }
  },
  {
    "id": 6,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Bar Amá",
    "neighborhood": "DTLA",
    "deal": "$7 super nachos, $5 tacos, $4 Pacifico, $9 margaritas",
    "timeWindow": "10pm-close",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "Tex-Mex",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Super Nacho Hour Mon-Sat",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 28
    }
  },
  {
    "id": 7,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Far Bar",
    "neighborhood": "Little Tokyo",
    "deal": "$5 bar snacks, $7 cocktails, $5 wine/beer",
    "timeWindow": "All night",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Bar",
    "category": "Late Night",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/late-night-happy-hour-la",
    "verified": true,
    "notes": "All-night Mon",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 600,
      "protein": 22
    }
  },
  {
    "id": 8,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Bonchon",
    "neighborhood": "Multiple LA",
    "deal": "$1 wings (Korean fried)",
    "timeWindow": "All day dine-in",
    "price": "$1/wing",
    "cadence": "day-specific",
    "cuisine": "Korean Wings",
    "category": "Chain",
    "sourceUrl": "https://www.instagram.com/p/DH9if7GBD8Q/",
    "verified": true,
    "notes": "Mon-Wed varies by location. 15-wing limit. Confirm your store.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1200,
      "protein": 80
    }
  },
  {
    "id": 9,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Bonchon",
    "neighborhood": "Multiple LA",
    "deal": "$1 wings (Korean fried)",
    "timeWindow": "All day dine-in",
    "price": "$1/wing",
    "cadence": "day-specific",
    "cuisine": "Korean Wings",
    "category": "Chain",
    "sourceUrl": "https://www.instagram.com/p/DH9if7GBD8Q/",
    "verified": true,
    "notes": "Mon-Wed varies by location. 15-wing limit. Confirm your store.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1200,
      "protein": 80
    }
  },
  {
    "id": 10,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Pink Taco",
    "neighborhood": "WeHo",
    "deal": "$3 tacos, $3 elote, $3 Dos Equis, $5 sangria, $7 frozen margaritas",
    "timeWindow": "4pm-close",
    "price": "from $3",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/a-guide-to-taco-tuesday-in-la",
    "verified": true,
    "notes": "Taco Tuesday all-day deal",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 11,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Tacos Mexico",
    "neighborhood": "North Hollywood",
    "deal": "$0.90 street tacos",
    "timeWindow": "All day",
    "price": "$0.90",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Cheapest in LA county",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 12,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "The Great White Hut",
    "neighborhood": "Echo Park",
    "deal": "$0.99 tacos all day",
    "timeWindow": "All day",
    "price": "$0.99",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Also Glendale & Pasadena",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 13,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Pablito's Tacos",
    "neighborhood": "Burbank",
    "deal": "$1 tacos (10 max)",
    "timeWindow": "All day",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Online order only",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 14,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Te'kila Hollywood",
    "neighborhood": "Hollywood",
    "deal": "$1-$2 chicken, asada, carnitas tacos",
    "timeWindow": "All day",
    "price": "$1-$2",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "http://tekilahollywood.com/specials/",
    "verified": true,
    "notes": "Requires drink purchase",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 15,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Calle Tacos",
    "neighborhood": "Hollywood",
    "deal": "99-cent tacos (beef/chicken/carnitas/veg)",
    "timeWindow": "All day",
    "price": "$0.99",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/a-guide-to-taco-tuesday-in-la",
    "verified": true,
    "notes": "Cash-friendly",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 16,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Cabo Cantina",
    "neighborhood": "Hollywood",
    "deal": "$9.99 all-you-can-eat tacos",
    "timeWindow": "All day",
    "price": "$9.99",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "AYCE",
    "sourceUrl": "https://lalaguide.com/the-best-restaurants-for-taco-tuesday-in-los-angeles/",
    "verified": true,
    "notes": "AYCE Taco Tuesday",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 17,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Fiesta Cantina",
    "neighborhood": "WeHo",
    "deal": "$9.99 all-you-can-eat tacos",
    "timeWindow": "All day",
    "price": "$9.99",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "AYCE",
    "sourceUrl": "https://lalaguide.com/the-best-restaurants-for-taco-tuesday-in-los-angeles/",
    "verified": true,
    "notes": "Bar scene heavy",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 18,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Trejo's Tacos",
    "neighborhood": "Hollywood",
    "deal": "$2.91-$3.40 street tacos",
    "timeWindow": "All day",
    "price": "$2.91-$3.40",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://lalaguide.com/the-best-restaurants-for-taco-tuesday-in-los-angeles/",
    "verified": true,
    "notes": "Multiple locations",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 19,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Tu Madre",
    "neighborhood": "Los Feliz",
    "deal": "$2 street tacos / $3.50 tacos dorados",
    "timeWindow": "All day (HH 3-6pm)",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://lalaguide.com/the-best-restaurants-for-taco-tuesday-in-los-angeles/",
    "verified": true,
    "notes": "WeHo/SM/Westwood too",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 20,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Kalaveras",
    "neighborhood": "Multiple LA",
    "deal": "$1.99 street tacos",
    "timeWindow": "All day",
    "price": "$1.99",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Multiple SoCal locations",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 21,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "El Chinanteco",
    "neighborhood": "DTLA",
    "deal": "$1.50 tacos",
    "timeWindow": "All day",
    "price": "$1.50",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Also runs Friday",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 22,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Baja California Tacos",
    "neighborhood": "K-Town",
    "deal": "$1.49 street tacos",
    "timeWindow": "All day",
    "price": "$1.49",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Also Los Feliz/Palms/Culver",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 23,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "El Torito",
    "neighborhood": "Sherman Oaks",
    "deal": "$3 steak, chicken, carnitas, al pastor tacos",
    "timeWindow": "4pm-close",
    "price": "$3",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco Tuesday",
    "sourceUrl": "https://www.eatdrinkla.com/7-best-taco-tuesday-deals-los-angeles/",
    "verified": true,
    "notes": "Multiple locations",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 24,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Pearl's Liquor Bar",
    "neighborhood": "WeHo",
    "deal": "$1 oysters",
    "timeWindow": "5pm-until run out",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.lovehappyhour.com/LHH/blog/FeaturedMain/oyster-happy-hour-LA.php",
    "verified": true,
    "notes": "Tuesday only",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 25,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Cole's",
    "neighborhood": "DTLA",
    "deal": "$8 cocktails, $5 wells, $6 wine, $2 off spirits (all-day HH)",
    "timeWindow": "All day",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Historic French dip",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 26,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Bodega Wine Bar",
    "neighborhood": "Santa Monica",
    "deal": "$2 tacos + half-off beers",
    "timeWindow": "All night",
    "price": "$2",
    "cadence": "day-specific",
    "cuisine": "Wine Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Industry-friendly",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 27,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "La Dolce Vita",
    "neighborhood": "Beverly Hills",
    "deal": "$6 wines, $5 Moretti, $7 cocktails, $5-$8 snacks",
    "timeWindow": "5-10pm",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Italian",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Tuesday-only deal",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 28,
    "day": "Tuesday",
    "days": [
      "Tue"
    ],
    "restaurant": "Guelaguetza",
    "neighborhood": "K-Town",
    "deal": "$7 margaritas; HH plates $4.50-$12",
    "timeWindow": "2-6pm",
    "price": "from $4.50",
    "cadence": "day-specific",
    "cuisine": "Oaxacan",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Tuesday margarita night",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 29,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Bonchon",
    "neighborhood": "Multiple LA",
    "deal": "$1 wings (Korean fried)",
    "timeWindow": "All day dine-in",
    "price": "$1/wing",
    "cadence": "day-specific",
    "cuisine": "Korean Wings",
    "category": "Chain",
    "sourceUrl": "https://www.instagram.com/p/DH9if7GBD8Q/",
    "verified": true,
    "notes": "Some locations Mon-Wed (Fountain Valley confirmed). Mon-Tue at SD locations. Confirm yours.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1200,
      "protein": 80
    }
  },
  {
    "id": 30,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "The Churchill",
    "neighborhood": "WeHo",
    "deal": "$1 oysters",
    "timeWindow": "6pm onward",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.lovehappyhour.com/LHH/blog/FeaturedMain/oyster-happy-hour-LA.php",
    "verified": true,
    "notes": "Wednesday only",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 31,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Mama Shelter",
    "neighborhood": "Hollywood",
    "deal": "$3 oysters (max 12)",
    "timeWindow": "4-6pm",
    "price": "$3",
    "cadence": "day-specific",
    "cuisine": "French/Hotel",
    "category": "Happy Hour",
    "sourceUrl": "https://www.welikela.com/the-best-oyster-happy-hours-in-los-angeles/",
    "verified": true,
    "notes": "Rooftop vibes",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 25
    }
  },
  {
    "id": 32,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "The Park's Finest",
    "neighborhood": "Echo Park",
    "deal": "$18.50 Worker Wednesday BBQ plate",
    "timeWindow": "All day",
    "price": "$18.50",
    "cadence": "day-specific",
    "cuisine": "BBQ/Filipino",
    "category": "Weekly Special",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/best-bang-for-your-buck-los-angeles-restaurant-deals",
    "verified": true,
    "notes": "Beef, hot links, pork, chicken, rice, cornbread",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1000,
      "protein": 55
    }
  },
  {
    "id": 33,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "About Last Knife",
    "neighborhood": "Hollywood",
    "deal": "$30 chef's burger + frosty beer",
    "timeWindow": "All day",
    "price": "$30",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Weekly Special",
    "sourceUrl": "https://abc7.com/post/celebrate-national-cheeseburger-day-deals-fast-food-chains-restaurants/17841491/",
    "verified": true,
    "notes": "Inside Godfrey Hotel",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 34,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Bacari PDR",
    "neighborhood": "Playa del Rey",
    "deal": "Wine progressively cheaper each glass (down to free)",
    "timeWindow": "5pm-close",
    "price": "Free",
    "cadence": "day-specific",
    "cuisine": "Italian/Wine",
    "category": "Drink Deal",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/late-night-happy-hour-la",
    "verified": true,
    "notes": "Each glass $1 less than previous",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 22
    }
  },
  {
    "id": 35,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Guelaguetza",
    "neighborhood": "K-Town",
    "deal": "$7 wines (Wine Wednesday)",
    "timeWindow": "2-6pm",
    "price": "$7",
    "cadence": "day-specific",
    "cuisine": "Oaxacan",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Wed wine special",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 36,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Hippo",
    "neighborhood": "Highland Park",
    "deal": "$12-14 pasta, $9-11 cocktails, $10 wine, $4-7 bites",
    "timeWindow": "5-6pm",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "Italian",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Wed/Thu/Fri/Sun",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 37,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Connie and Ted's",
    "neighborhood": "WeHo",
    "deal": "$6 beer, $8 cocktails, $4-16 bar bites",
    "timeWindow": "5-6:30pm",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Bar seating only Wed-Fri",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 38,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "The Greyhound",
    "neighborhood": "Glendale",
    "deal": "$1 oysters",
    "timeWindow": "4-6pm",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.welikela.com/the-best-oyster-happy-hours-in-los-angeles/",
    "verified": true,
    "notes": "Thu-Sun",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 39,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "FishBar",
    "neighborhood": "Manhattan Beach",
    "deal": "$10 tiki cocktails + discounted bar snacks",
    "timeWindow": "10pm-close",
    "price": "$10",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Late Night",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/late-night-happy-hour-la",
    "verified": true,
    "notes": "Late-night Thu only",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 40,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "Electric Owl",
    "neighborhood": "Hollywood",
    "deal": "$5 beers, $9 wells/wine/cocktails, $4.20-7 bites",
    "timeWindow": "4-6pm",
    "price": "from $4.20",
    "cadence": "day-specific",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Thu-Sun",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 41,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "Birds Rotisserie Chicken",
    "neighborhood": "Franklin Village",
    "deal": "$4 drafts, wine, well drinks",
    "timeWindow": "10pm-close",
    "price": "$4",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Late Night",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/late-night-happy-hour-la",
    "verified": true,
    "notes": "Wed-Thu late night",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 42,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "Villain's Tavern",
    "neighborhood": "Arts District",
    "deal": "$5 drafts, $5 tacos/sliders, $6 fries, $7 mac & cheese",
    "timeWindow": "11pm-1am",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Bar Food",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Tue-Thu late",
    "traits": [],
    "meals": [
      "breakfast",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 32
    }
  },
  {
    "id": 43,
    "day": "Thursday May 28",
    "days": [
      "Thu"
    ],
    "restaurant": "The Press Burger Joint",
    "neighborhood": "Tarzana (18448 Oxnard St)",
    "deal": "3-2-1 National Burger Day: $3 single (grass-fed, American cheese, grilled onions, house sauce, pickles) + $2 tallow fries + $1 soda",
    "timeWindow": "12pm-8pm",
    "price": "$6 combo",
    "cadence": "day-specific",
    "cuisine": "Burgers",
    "category": "One-Time",
    "sourceUrl": "https://www.instagram.com/thepressburgerjoint/",
    "verified": true,
    "notes": "One day only. (818) 200-6662",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 850,
      "protein": 35
    },
    "oneTimeDate": "2026-05-28"
  },
  {
    "id": 44,
    "day": "Wednesday",
    "days": [
      "Wed"
    ],
    "restaurant": "Tacos $1 @ Figueroa & 132",
    "neighborhood": "South LA (Figueroa & 132nd St)",
    "deal": "$1 tacos (carne asada / al pastor / etc.)",
    "timeWindow": "All day",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco",
    "sourceUrl": "IG @slimedo",
    "verified": true,
    "notes": "Street vendor confirmed via IG. Runs Wed + Thu.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 45,
    "day": "Thursday",
    "days": [
      "Thu"
    ],
    "restaurant": "Tacos $1 @ Figueroa & 132",
    "neighborhood": "South LA (Figueroa & 132nd St)",
    "deal": "$1 tacos (carne asada / al pastor / etc.)",
    "timeWindow": "All day",
    "price": "$1",
    "cadence": "day-specific",
    "cuisine": "Mexican",
    "category": "Taco",
    "sourceUrl": "IG @slimedo",
    "verified": true,
    "notes": "Street vendor confirmed via IG. Runs Wed + Thu.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 46,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "Guelaguetza",
    "neighborhood": "K-Town",
    "deal": "2-for-1 micheladas",
    "timeWindow": "2-6pm",
    "price": "2-for-1",
    "cadence": "day-specific",
    "cuisine": "Oaxacan",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Friday michelada special",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 47,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "Aestus",
    "neighborhood": "Santa Monica",
    "deal": "$4 draft, $6 wine/wells, $5 bar bites",
    "timeWindow": "9-11pm",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Fri-Sat late",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 48,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "Shirubē",
    "neighborhood": "Santa Monica",
    "deal": "$5 beers, $6-9 sake, $5-20 bar bites",
    "timeWindow": "9-10:30pm",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Japanese/Izakaya",
    "category": "Late Night",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Late HH Fri-Sat",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 49,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "Idle Hour",
    "neighborhood": "North Hollywood",
    "deal": "$7 cocktails, $7 wines, $2 off beers",
    "timeWindow": "4-6pm",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Iconic barrel bar",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 50,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "EMC Seafood",
    "neighborhood": "K-Town",
    "deal": "$1.50 oysters, $5 drafts, $5 wine",
    "timeWindow": "11pm-close",
    "price": "from $1.50",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Fri-Sat late night",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 51,
    "day": "Friday",
    "days": [
      "Fri"
    ],
    "restaurant": "Boneyard Bistro",
    "neighborhood": "Sherman Oaks",
    "deal": "25% off draft, $5 wells, $9 shot+beer",
    "timeWindow": "10:30pm-close",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "BBQ/Bar",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Fri-Sat late",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 900,
      "protein": 50
    }
  },
  {
    "id": 52,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Shirubē",
    "neighborhood": "Santa Monica",
    "deal": "All-day HH: $5 beers, $6-9 sake, $5-20 bar bites",
    "timeWindow": "4-6pm",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Japanese/Izakaya",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Saturday afternoon",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 53,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Idle Hour",
    "neighborhood": "North Hollywood",
    "deal": "$7 cocktails, $7 wines, $2 off beers",
    "timeWindow": "1-6pm",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Extended Saturday HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 54,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Piccalilli",
    "neighborhood": "Culver City",
    "deal": "$10-13 small plates, $5-7 beer, $8-10 wine, $10-12 cocktails",
    "timeWindow": "4-6pm",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Pub/British",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Weekend HH later",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 55,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "The High Low",
    "neighborhood": "Atwater Village",
    "deal": "$9 margs/mules/old fashioneds, $8 wines, $2 bar snacks",
    "timeWindow": "1-5pm",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Weekend afternoon",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 56,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "H&H Brazilian Steakhouse",
    "neighborhood": "DTLA",
    "deal": "$22 bottomless mimosas brunch",
    "timeWindow": "11am-3pm",
    "price": "$22",
    "cadence": "day-specific",
    "cuisine": "Brazilian",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sat-Sun",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "late_night"
    ],
    "macros": {
      "cal": 1000,
      "protein": 60
    }
  },
  {
    "id": 57,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Real Food Daily",
    "neighborhood": "WeHo",
    "deal": "$20 bottomless brunch",
    "timeWindow": "10am-4pm",
    "price": "$20",
    "cadence": "day-specific",
    "cuisine": "Vegan",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sat-Sun",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch"
    ],
    "macros": {
      "cal": 600,
      "protein": 25
    }
  },
  {
    "id": 58,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Castaway",
    "neighborhood": "Burbank",
    "deal": "$30 bottomless mimosa brunch",
    "timeWindow": "11am-3pm",
    "price": "$30",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sat-Sun view",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 59,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "The Overland",
    "neighborhood": "Palms",
    "deal": "$12.99 brunch",
    "timeWindow": "10am onward",
    "price": "$12.99",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sat-Sun cheapest brunch",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 60,
    "day": "Saturday",
    "days": [
      "Sat"
    ],
    "restaurant": "Queen's Raw Bar",
    "neighborhood": "Eagle Rock",
    "deal": "$10 martini, oysters, bites",
    "timeWindow": "Noon-6pm",
    "price": "$10",
    "cadence": "day-specific",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Long weekend HH",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 61,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Idle Hour",
    "neighborhood": "North Hollywood",
    "deal": "$7 cocktails, $7 wines, $2 off beers",
    "timeWindow": "4-6pm",
    "price": "from $2",
    "cadence": "day-specific",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Sun-Fri HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 62,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Stache",
    "neighborhood": "WeHo",
    "deal": "$25 bottomless brunch",
    "timeWindow": "1-3pm",
    "price": "$25",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sunday only",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 63,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Idle Hour",
    "neighborhood": "North Hollywood",
    "deal": "$16 bottomless brunch",
    "timeWindow": "11am-3pm",
    "price": "$16",
    "cadence": "day-specific",
    "cuisine": "American",
    "category": "Brunch",
    "sourceUrl": "https://www.eatdrinkla.com/best-bottomless-mimosa-brunches-in-los-angeles/",
    "verified": true,
    "notes": "Sunday-only brunch",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 64,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Far Bar",
    "neighborhood": "DTLA/Little Tokyo",
    "deal": "$5 bar snacks, $7 cocktails, $5 wine/beer",
    "timeWindow": "All night",
    "price": "from $5",
    "cadence": "day-specific",
    "cuisine": "Bar/American",
    "category": "Late Night",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/late-night-happy-hour-la",
    "verified": true,
    "notes": "All-night Sunday",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 65,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Casey's Irish Pub",
    "neighborhood": "DTLA",
    "deal": "$2 off appetizers, $1 off drafts",
    "timeWindow": "All day",
    "price": "from $1",
    "cadence": "day-specific",
    "cuisine": "Irish Pub",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Industry-friendly",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 66,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Bacari West Adams",
    "neighborhood": "West Adams",
    "deal": "$2 off all food except desserts",
    "timeWindow": "All day Sun-Mon",
    "price": "$2",
    "cadence": "day-specific",
    "cuisine": "Italian",
    "category": "Discount Day",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Whole-night discount",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 67,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Wolf & Crane Bar",
    "neighborhood": "Little Tokyo",
    "deal": "$5 beers, house wine, wells",
    "timeWindow": "All night",
    "price": "$5",
    "cadence": "day-specific",
    "cuisine": "Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "All-night HH",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 600,
      "protein": 22
    }
  },
  {
    "id": 68,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Rock and Reilly's",
    "neighborhood": "USC Village",
    "deal": "$7 pizzas",
    "timeWindow": "All day",
    "price": "$7",
    "cadence": "day-specific",
    "cuisine": "Pizza/Pub",
    "category": "Weekly Special",
    "sourceUrl": "https://www.visitwesthollywood.com/stories/best-happy-hours-in-west-hollywood/",
    "verified": true,
    "notes": "Sunday pizza deal",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 28
    }
  },
  {
    "id": 69,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Hippo",
    "neighborhood": "Highland Park",
    "deal": "$12-14 pasta, $9-11 cocktails, $4-7 bites",
    "timeWindow": "5-6pm",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "Italian",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Sunday brief HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 70,
    "day": "Sunday",
    "days": [
      "Sun"
    ],
    "restaurant": "Jones",
    "neighborhood": "WeHo",
    "deal": "$5 wells, $4 beers, $6 pizzas, $8 pastas",
    "timeWindow": "10pm-2am",
    "price": "from $4",
    "cadence": "day-specific",
    "cuisine": "Italian/Pizza",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Sun-Thu late",
    "traits": [],
    "meals": [
      "breakfast",
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 28
    }
  },
  {
    "id": 71,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Red Robin",
    "neighborhood": "Chain (multiple LA)",
    "deal": "Big YUMMM: Red's Double Burger, Haystack Double, or 7\" Donatos Pizza + bottomless side + drink",
    "timeWindow": "All day",
    "price": "$9.99",
    "cadence": "everyday",
    "cuisine": "Burgers",
    "category": "Chain",
    "sourceUrl": "https://www.redrobin.com/the-big-yummm",
    "verified": true,
    "notes": "Launched Jan 2026. Higher tiers $14.99 & $16.99. $5 Coors Light / $8 House Marg all-day.",
    "traits": [
      "pickup",
      "solo meal",
      "under $10"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1100,
      "protein": 53
    }
  },
  {
    "id": 72,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Chili's",
    "neighborhood": "Chain (multiple LA)",
    "deal": "3 For Me: entrée (Big Smasher / Cilantro-Lime Carne Asada / Big Crispy Chicken) + chips & salsa or soup/salad + bottomless drink",
    "timeWindow": "All day",
    "price": "$10.99",
    "cadence": "everyday",
    "cuisine": "American",
    "category": "Chain",
    "sourceUrl": "https://www.chilis.com/menu",
    "verified": true,
    "notes": "Higher tiers $14.99 / $16.99. Local price may vary slightly.",
    "traits": [
      "pickup",
      "solo meal",
      "cheap protein"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1300,
      "protein": 55
    }
  },
  {
    "id": 73,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Checkers/Rally's",
    "neighborhood": "Chain (multiple LA)",
    "deal": "$4 Unbeatable Meal: Cheese Double OR Spicy Chicken + small fries + apple pie + 12oz drink",
    "timeWindow": "All day",
    "price": "$4",
    "cadence": "everyday",
    "cuisine": "Burgers",
    "category": "Chain",
    "sourceUrl": "https://www.fastfoodpost.com/checkers-rallys-debuts-new-4-unbeatable-meal-deal/",
    "verified": true,
    "notes": "GloRilla variant adds Glo's BBQ Jacked Burger. Limited time.",
    "traits": [
      "drive-thru",
      "solo meal",
      "under $10"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 620,
      "protein": 26
    }
  },
  {
    "id": 74,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Shabuya",
    "neighborhood": "Olympic Blvd / La Mirada / Fountain Valley",
    "deal": "AYCE shabu-shabu lunch",
    "timeWindow": "Lunch hours (before 3pm typical)",
    "price": "$22-26",
    "cadence": "everyday",
    "cuisine": "Japanese Hot Pot",
    "category": "AYCE/Lunch",
    "sourceUrl": "https://www.shabuyarestaurant.com/",
    "verified": true,
    "notes": "Lunch significantly cheaper than $29.99 dinner. Price varies by location.",
    "traits": [],
    "meals": [
      "lunch"
    ],
    "macros": {
      "cal": 900,
      "protein": 60
    }
  },
  {
    "id": 75,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Ktown Pho",
    "neighborhood": "K-Town",
    "deal": "Large bowl of pho",
    "timeWindow": "Lunch + dinner",
    "price": "$15",
    "cadence": "everyday",
    "cuisine": "Vietnamese",
    "category": "Lunch",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-pho-restaurants-los-angeles",
    "verified": true,
    "notes": "Tiny cafe on Western. Best pho in K-Town per Infatuation.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 32
    }
  },
  {
    "id": 76,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Simply Pho You",
    "neighborhood": "LA (multiple)",
    "deal": "Lunch special: pho + spring roll + house iced tea",
    "timeWindow": "Lunch",
    "price": "$13.95",
    "cadence": "everyday",
    "cuisine": "Vietnamese",
    "category": "Lunch",
    "sourceUrl": "https://www.atly.com/united-states/california/los-angeles/best-pho",
    "verified": true,
    "notes": "Combo deal includes drink and roll",
    "traits": [],
    "meals": [
      "lunch"
    ],
    "macros": {
      "cal": 550,
      "protein": 32
    }
  },
  {
    "id": 77,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Sugarfish",
    "neighborhood": "Brentwood",
    "deal": "Trust Me $35 dinner / $30 lunch",
    "timeWindow": "All day",
    "price": "$30-35",
    "cadence": "everyday",
    "cuisine": "Sushi",
    "category": "Set Menu",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/best-bang-for-your-buck-los-angeles-restaurant-deals",
    "verified": true,
    "notes": "Set menu = best value at Sugarfish",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 35
    }
  },
  {
    "id": 78,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Kozo Sushi",
    "neighborhood": "Torrance",
    "deal": "Special Campaign: ANY matcha latte $2.99 (was $5.25) + Karaage $4.99 (was $5.25)",
    "timeWindow": "All open hours",
    "price": "$2.99-$4.99",
    "cadence": "everyday",
    "cuisine": "Sushi/Drinks",
    "category": "Drink Deal",
    "sourceUrl": "https://www.instagram.com/kozosushi_torrance_ca/",
    "verified": true,
    "notes": "25364 Crenshaw Blvd. (310) 534-4013. Limited campaign per IG.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 250,
      "protein": 8
    }
  },
  {
    "id": 79,
    "day": "Monday",
    "days": [
      "Mon"
    ],
    "restaurant": "Tom's Jr Burger",
    "neighborhood": "South LA (953 W Florence Ave) + La Mirada",
    "deal": "2 fried chicken sandwiches + fries + drink",
    "timeWindow": "All day",
    "price": "$9.99",
    "cadence": "day-specific",
    "cuisine": "Burgers/Chicken",
    "category": "Weekly Special",
    "sourceUrl": "https://www.tomsjrburger.com/menu",
    "verified": true,
    "notes": "Monday $9.99. Other days $10.99. Tax not included.",
    "traits": [
      "drive-thru",
      "solo meal",
      "cheap protein",
      "under $10"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1200,
      "protein": 50
    }
  },
  {
    "id": 80,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Tom's Jr Burger",
    "neighborhood": "South LA (953 W Florence Ave) + La Mirada",
    "deal": "2 fried chicken sandwiches + fries + drink",
    "timeWindow": "All day",
    "price": "$10.99",
    "cadence": "everyday",
    "cuisine": "Burgers/Chicken",
    "category": "Combo",
    "sourceUrl": "https://www.tomsjrburger.com/menu",
    "verified": true,
    "notes": "Mon-Sun $10.99 (Mon special $9.99 — see Monday row).",
    "traits": [
      "drive-thru",
      "solo meal",
      "cheap protein"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1200,
      "protein": 50
    }
  },
  {
    "id": 81,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Uncle Stevey's Bagels",
    "neighborhood": "El Segundo (213 Richmond St)",
    "deal": "FREE coffee with any sandwich",
    "timeWindow": "All day weekdays / Weekends after 11:30am",
    "price": "Sandwich price only",
    "cadence": "everyday",
    "cuisine": "Bagels/Breakfast",
    "category": "Coffee Deal",
    "sourceUrl": "https://www.instagram.com/unclesteveysbagels/",
    "verified": true,
    "notes": "Valid through May 31 2026. Skip the $18 lunch.",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 25
    }
  },
  {
    "id": 82,
    "day": "Weekends",
    "days": [
      "Sat",
      "Sun"
    ],
    "restaurant": "Uncle Stevey's Bagels",
    "neighborhood": "El Segundo (213 Richmond St)",
    "deal": "FREE coffee with any sandwich",
    "timeWindow": "After 11:30am",
    "price": "Sandwich price only",
    "cadence": "everyday",
    "cuisine": "Bagels/Breakfast",
    "category": "Coffee Deal",
    "sourceUrl": "https://www.instagram.com/unclesteveysbagels/",
    "verified": true,
    "notes": "Valid through May 31 2026.",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch"
    ],
    "macros": {
      "cal": 600,
      "protein": 25
    }
  },
  {
    "id": 83,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "In-N-Out Protein Style",
    "neighborhood": "Chain (multiple LA)",
    "deal": "Burger w/ lettuce wrap instead of bun — macro-friendly",
    "timeWindow": "All day",
    "price": "Menu price",
    "cadence": "everyday",
    "cuisine": "Burgers",
    "category": "Macro-Friendly",
    "sourceUrl": "https://www.in-n-out.com/menu/nutrition-info",
    "verified": true,
    "notes": "Hamburger 240 cal / 13g protein / 11g carbs. Cheeseburger 330 cal. Double-Double 520 cal / 33g protein. Not the cheapest but great macros.",
    "traits": [
      "drive-thru",
      "solo meal",
      "cheap protein",
      "under $10"
    ],
    "confidence": "verified",
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 520,
      "protein": 33
    }
  },
  {
    "id": 84,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "DoorDash Happy Hour",
    "neighborhood": "App (anywhere LA)",
    "deal": "25%+ off select restaurants & retailers",
    "timeWindow": "2pm-5pm",
    "price": "Varies",
    "cadence": "everyday",
    "cuisine": "Delivery",
    "category": "Delivery App",
    "sourceUrl": "https://help.doordash.com/en-us/merchants/article/happy-hour-discount-on-doordash",
    "verified": true,
    "notes": "DoorDash supports Happy Hour promos; exact LA restaurants are app/location personalized. Check the app around 2-5pm.",
    "lastVerified": "2026-05-27",
    "traits": [
      "open now",
      "solo meal",
      "under $10"
    ],
    "confidence": "ad-only",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 85,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Wingstop on DoorDash",
    "neighborhood": "App (anywhere LA)",
    "deal": "15% off pickup orders $15+",
    "timeWindow": "All day",
    "price": "Up to $15 off",
    "cadence": "everyday",
    "cuisine": "Wings",
    "category": "Delivery App",
    "sourceUrl": "https://www.doordash.com/store/wingstop",
    "verified": true,
    "notes": "Pickup only. Valid through 6/27/2026 per current listing.",
    "lastVerified": "2026-05-27",
    "expires": "2026-06-27",
    "traits": [
      "pickup",
      "cheap protein",
      "solo meal"
    ],
    "confidence": "verified",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 1100,
      "protein": 75
    }
  },
  {
    "id": 86,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "DoorDash Deals Tab",
    "neighborhood": "App (anywhere LA)",
    "deal": "Restaurant-specific BOGOs and free items rotate daily",
    "timeWindow": "All day",
    "price": "Free with $15+ orders",
    "cadence": "everyday",
    "cuisine": "Delivery",
    "category": "Delivery App",
    "sourceUrl": "https://www.doordash.com/en/near-me/category/bogo-deals",
    "verified": true,
    "notes": "Open app → Deals tab. Local + personalized. Screenshot strong finds and add them as real rows.",
    "lastVerified": "2026-05-27",
    "traits": [
      "open now",
      "solo meal",
      "under $10"
    ],
    "confidence": "ad-only",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 87,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Uber Eats Offers Tab",
    "neighborhood": "App (anywhere LA)",
    "deal": "BOGO + free item + % off on participating LA restaurants",
    "timeWindow": "All day",
    "price": "Free items / % off",
    "cadence": "everyday",
    "cuisine": "Delivery",
    "category": "Delivery App",
    "sourceUrl": "https://www.ubereats.com/promo",
    "verified": true,
    "notes": "Open app → Account → Promotions. Refreshes weekly and varies by account/address.",
    "lastVerified": "2026-05-27",
    "traits": [
      "open now",
      "solo meal",
      "under $10"
    ],
    "confidence": "ad-only",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 88,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Uber Eats new user",
    "neighborhood": "App (first order)",
    "deal": "$10 off your first order of $20+ (code: affeats10us526)",
    "timeWindow": "All day",
    "price": "First order only",
    "cadence": "everyday",
    "cuisine": "Delivery",
    "category": "Delivery App",
    "sourceUrl": "https://www.joinhoney.com/shop/uber-eats-eater",
    "verified": true,
    "notes": "May 2026 code seen on Honey. Check current code in Account → Promotions before ordering.",
    "lastVerified": "2026-05-27",
    "expires": "2026-05-31",
    "traits": [
      "solo meal"
    ],
    "confidence": "ad-only",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 89,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "DoorDash new user",
    "neighborhood": "App (first order)",
    "deal": "$25 off first order of $30+ (code: DASH30NOW)",
    "timeWindow": "All day",
    "price": "First order only",
    "cadence": "everyday",
    "cuisine": "Delivery",
    "category": "Delivery App",
    "sourceUrl": "https://www.couponpac.com/coupon/638672/",
    "verified": true,
    "notes": "Coupon site lists DASH30NOW for new users. Verify at checkout before counting it.",
    "lastVerified": "2026-05-27",
    "expires": "2026-11-05",
    "traits": [
      "solo meal"
    ],
    "confidence": "ad-only",
    "meals": [
      "breakfast",
      "lunch",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 90,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Groupon LA Food & Drink",
    "neighborhood": "App (LA-wide)",
    "deal": "Pre-pay vouchers up to 70% off LA restaurants (dine-in)",
    "timeWindow": "All day",
    "price": "Varies (e.g. $20 for $40 food)",
    "cadence": "everyday",
    "cuisine": "Vouchers",
    "category": "Voucher App",
    "sourceUrl": "https://www.groupon.com/local/los-angeles/food-and-drink",
    "verified": true,
    "notes": "Best for date-night sit-down spots. Stack with in-app deals.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 91,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Groupon+ cashback",
    "neighborhood": "App (LA-wide)",
    "deal": "Link card → automatic % back at participating LA spots (no voucher needed)",
    "timeWindow": "All day",
    "price": "Cashback only",
    "cadence": "everyday",
    "cuisine": "Vouchers",
    "category": "Voucher App",
    "sourceUrl": "https://www.groupon.com/local/los-angeles/restaurants",
    "verified": true,
    "notes": "No printout needed. Pays back to your linked card.",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 92,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Groupon Restaurants K-Town",
    "neighborhood": "K-Town",
    "deal": "Rotating 30-70% off voucher deals (sushi / KBBQ / Korean fried chicken)",
    "timeWindow": "Varies by spot",
    "price": "$10-30 vouchers",
    "cadence": "everyday",
    "cuisine": "Vouchers",
    "category": "Voucher App",
    "sourceUrl": "https://www.groupon.com/local/los-angeles/restaurants",
    "verified": true,
    "notes": "Check before booking K-Town spots. Frequently discounted.",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 93,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Groupon Restaurants Santa Monica",
    "neighborhood": "Santa Monica",
    "deal": "Rotating happy hour & dinner vouchers at SM restaurants",
    "timeWindow": "Varies by spot",
    "price": "$15-40 vouchers",
    "cadence": "everyday",
    "cuisine": "Vouchers",
    "category": "Voucher App",
    "sourceUrl": "https://www.groupon.com/local/los-angeles/restaurants",
    "verified": true,
    "notes": "Beach-area sit-downs cycle frequently.",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 94,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Groupon Restaurants DTLA",
    "neighborhood": "DTLA",
    "deal": "Rotating downtown restaurant vouchers + brunch deals",
    "timeWindow": "Varies by spot",
    "price": "$15-35 vouchers",
    "cadence": "everyday",
    "cuisine": "Vouchers",
    "category": "Voucher App",
    "sourceUrl": "https://www.groupon.com/local/los-angeles/downtown-los/food-and-drink",
    "verified": true,
    "notes": "Downtown spots run dinner + brunch vouchers.",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 95,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "EMC Seafood and Raw Bar",
    "neighborhood": "K-Town",
    "deal": "$1.50 oysters, $5 house wine, $5 draft",
    "timeWindow": "4-7pm",
    "price": "from $1.50",
    "cadence": "everyday",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.welikela.com/the-best-oyster-happy-hours-in-los-angeles/",
    "verified": true,
    "notes": "Multiple locations",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 96,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "ETA",
    "neighborhood": "Highland Park",
    "deal": "$1 oysters",
    "timeWindow": "5-8pm",
    "price": "$1",
    "cadence": "everyday",
    "cuisine": "Modern American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.welikela.com/the-best-oyster-happy-hours-in-los-angeles/",
    "verified": true,
    "notes": "Until they run out",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 97,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Cafe La Boheme",
    "neighborhood": "WeHo",
    "deal": "$2 oysters w/ apple ginger mignonette",
    "timeWindow": "5pm onward (4pm wknd)",
    "price": "$2",
    "cadence": "everyday",
    "cuisine": "French",
    "category": "Happy Hour",
    "sourceUrl": "https://www.welikela.com/the-best-oyster-happy-hours-in-los-angeles/",
    "verified": true,
    "notes": "Daily",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 98,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Tabula Rasa",
    "neighborhood": "Thai Town",
    "deal": "$9 house wines, $6 beer",
    "timeWindow": "4-6pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Wine Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Daily HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 99,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "La Cuevita",
    "neighborhood": "Highland Park",
    "deal": "$7 select cocktails (FREE taco w/ $7 cocktail after 10pm)",
    "timeWindow": "Open-8pm",
    "price": "$7",
    "cadence": "everyday",
    "cuisine": "Mexican/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Free taco after 10pm",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 500,
      "protein": 22
    }
  },
  {
    "id": 100,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Broken Shaker",
    "neighborhood": "DTLA",
    "deal": "$12 cocktails, $6 beer, $10 wine",
    "timeWindow": "4-7pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Cocktail Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Freehand Hotel rooftop",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 101,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Tu Madre",
    "neighborhood": "Los Feliz",
    "deal": "$5-6 beers, $9 wines, $10 cocktails, $3.50 tacos dorados",
    "timeWindow": "3-6pm",
    "price": "from $3.50",
    "cadence": "everyday",
    "cuisine": "Mexican",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Mon-Fri 3-6pm",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 102,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Seven Grand",
    "neighborhood": "DTLA",
    "deal": "$7 cocktails, $11 boilermakers, $5 beers",
    "timeWindow": "Til 8pm",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Whiskey Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.discoverlosangeles.com/eat-drink/the-best-happy-hours-in-downtown-los-angeles",
    "verified": true,
    "notes": "Sun-Fri til 8pm",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 103,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Bigfoot Lodge",
    "neighborhood": "Atwater Village",
    "deal": "$8 cocktails, $6 draft beer",
    "timeWindow": "5-8pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Tiki/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Daily HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 500,
      "protein": 15
    }
  },
  {
    "id": 104,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Charcoal Venice",
    "neighborhood": "Venice",
    "deal": "$12 burger, $9 cocktails, $5 beer",
    "timeWindow": "5:30-7pm",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Steakhouse",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Evening Glass Off",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 1100,
      "protein": 65
    }
  },
  {
    "id": 105,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Far Bar",
    "neighborhood": "Little Tokyo",
    "deal": "$5 food menu, $7 cocktails, $5 wells, $3 Sapporo",
    "timeWindow": "9pm-close",
    "price": "from $3",
    "cadence": "everyday",
    "cuisine": "Bar/Asian",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Late night every day",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 106,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Backhouse Restaurant",
    "neighborhood": "K-Town",
    "deal": "$5 wells/house wine, $4 drafts, $6 sake, $7 lychee martini",
    "timeWindow": "10pm-close",
    "price": "from $4",
    "cadence": "everyday",
    "cuisine": "Asian Fusion",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Multiple locations",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 107,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "U-Zen Sushi",
    "neighborhood": "Sawtelle",
    "deal": "$3-4.50 beer/sake, $3 wine, $4 sushi rolls",
    "timeWindow": "8pm-close",
    "price": "from $3",
    "cadence": "everyday",
    "cuisine": "Sushi",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Late-night sushi steal",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 108,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Pizza Romana",
    "neighborhood": "Hollywood",
    "deal": "$6 Italian wines or pizza bianca/pasta al forno",
    "timeWindow": "9pm-close",
    "price": "$6",
    "cadence": "everyday",
    "cuisine": "Italian/Pizza",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Nightly",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 28
    }
  },
  {
    "id": 109,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Mexicali Cocina Cantina",
    "neighborhood": "Studio City",
    "deal": "$4.75 beer, $6.50 wells, $6.75 margaritas, $5.50 apps",
    "timeWindow": "11pm-1am",
    "price": "from $4.75",
    "cadence": "everyday",
    "cuisine": "Mexican",
    "category": "Late Night",
    "sourceUrl": "https://laist.com/news/food/best-late-night-happy-hours-in-los",
    "verified": true,
    "notes": "Nightly late",
    "traits": [],
    "meals": [
      "breakfast",
      "late_night"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 110,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Rappahannock Oyster Bar",
    "neighborhood": "DTLA",
    "deal": "$5 beer, $7 wine, $1.50 oysters",
    "timeWindow": "4-6pm",
    "price": "from $1.50",
    "cadence": "everyday",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.discoverlosangeles.com/eat-drink/the-best-happy-hours-in-downtown-los-angeles",
    "verified": true,
    "notes": "Inside Grand Central Market",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 111,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Imperial Western Beer Co",
    "neighborhood": "DTLA",
    "deal": "$5 pints, $18 pitchers, $1 oysters",
    "timeWindow": "4-7pm",
    "price": "from $1",
    "cadence": "everyday",
    "cuisine": "Beer Hall",
    "category": "Happy Hour",
    "sourceUrl": "https://www.discoverlosangeles.com/eat-drink/the-best-happy-hours-in-downtown-los-angeles",
    "verified": true,
    "notes": "Inside Union Station",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 22
    }
  },
  {
    "id": 112,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Bar Verde",
    "neighborhood": "Glendale",
    "deal": "$8 burgers, $6 pizza, $4 tacos, $5 wine, $4 beer",
    "timeWindow": "3:30-6:30pm",
    "price": "from $4",
    "cadence": "everyday",
    "cuisine": "American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Top floor of Nordstrom",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 113,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Escala",
    "neighborhood": "K-Town",
    "deal": "$6 street corn, $7 carne asada sliders, $6 empanadas, $6 beer",
    "timeWindow": "4-7pm / 11pm-1am",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Colombian/Korean",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Sun-Thu late HH too",
    "traits": [],
    "meals": [
      "breakfast",
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 114,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "The Lobster",
    "neighborhood": "Santa Monica",
    "deal": "$8 draft, $12 cocktails, $13 smash burger, $21 shrimp",
    "timeWindow": "3-6pm",
    "price": "from $8",
    "cadence": "everyday",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Pier views",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 115,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Atrium",
    "neighborhood": "Los Feliz",
    "deal": "$10 cocktails, $8 wine, $12 burgers",
    "timeWindow": "4-6pm",
    "price": "from $8",
    "cadence": "everyday",
    "cuisine": "American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Daily HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 116,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Hae Ha Heng Thai Bistro",
    "neighborhood": "K-Town",
    "deal": "$1 gyozas/egg rolls/wontons, $3 edamame, $6 wings, $23 beer tower",
    "timeWindow": "3-7pm",
    "price": "from $1",
    "cadence": "everyday",
    "cuisine": "Thai",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Dollar dumplings",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 117,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Tokyo Hamburg",
    "neighborhood": "K-Town",
    "deal": "$1 oysters, $4 draft, $5 sake, $4 cocktails",
    "timeWindow": "All day",
    "price": "from $1",
    "cadence": "everyday",
    "cuisine": "Japanese",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "All-day HH",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 30
    }
  },
  {
    "id": 118,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Cassell's",
    "neighborhood": "K-Town",
    "deal": "$15 burger+fries+craft beer combo",
    "timeWindow": "4-7pm",
    "price": "$15",
    "cadence": "everyday",
    "cuisine": "Burgers",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Classic LA burger",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 950,
      "protein": 45
    }
  },
  {
    "id": 119,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Dante Beverly Hills",
    "neighborhood": "Beverly Hills",
    "deal": "$10 select martinis",
    "timeWindow": "3-5pm",
    "price": "$10",
    "cadence": "everyday",
    "cuisine": "Italian/Cocktail",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "NYC import",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 22
    }
  },
  {
    "id": 120,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Rustic Canyon",
    "neighborhood": "Santa Monica",
    "deal": "$10 cocktails, $5 lager, $9-13 snacks",
    "timeWindow": "5-6:30pm",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "New American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Happy Hour and a Half",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 121,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Coucou Weho",
    "neighborhood": "WeHo",
    "deal": "3 items for $33 (cocktails or dishes)",
    "timeWindow": "5-6pm",
    "price": "$33",
    "cadence": "everyday",
    "cuisine": "French",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "French bistro deal",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 122,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "The Morrison",
    "neighborhood": "Atwater Village",
    "deal": "$6 craft beer, $8 cocktails, food under $10",
    "timeWindow": "Noon-6pm (Sun 2-6)",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Pub",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Long HH window",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 123,
    "day": "Daily",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "restaurant": "Asadas El Infierno",
    "neighborhood": "Northridge",
    "deal": "$1 tacos daily",
    "timeWindow": "7pm-midnight",
    "price": "$1",
    "cadence": "everyday",
    "cuisine": "Mexican",
    "category": "Taco",
    "sourceUrl": "https://tacotuesday.com/10-best-taco-tuesday-deals-under-5-in-los-angeles-county/",
    "verified": true,
    "notes": "Every day not just Tue",
    "traits": [],
    "meals": [
      "late_night"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 124,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Gracias Madre",
    "neighborhood": "WeHo",
    "deal": "$6 drafts, $8 wines, $9 margaritas, $7 small plates, $10 Happy Madre Meal",
    "timeWindow": "3-6pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Vegan Mexican",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Plant-based",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 22
    }
  },
  {
    "id": 125,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Madre West Hollywood",
    "neighborhood": "Fairfax",
    "deal": "$7 wine/beer, $8 sangria, $11 cocktails, $5-12 apps",
    "timeWindow": "3-7pm",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Oaxacan",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Long HH window",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 126,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Red Lion Tavern",
    "neighborhood": "Silver Lake",
    "deal": "25% off draft, $8 bratwursts, $8 pretzels",
    "timeWindow": "12-5pm",
    "price": "$8",
    "cadence": "everyday",
    "cuisine": "German",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Beer garden",
    "traits": [],
    "meals": [
      "lunch",
      "dinner"
    ],
    "macros": {
      "cal": 1000,
      "protein": 50
    }
  },
  {
    "id": 127,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "The Waterfront",
    "neighborhood": "Venice",
    "deal": "BOGO cocktails",
    "timeWindow": "3-7pm",
    "price": "BOGO",
    "cadence": "everyday",
    "cuisine": "American",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Beachy bar",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 128,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Bacari W. 3rd",
    "neighborhood": "WeHo",
    "deal": "$2 off cocktails/dishes, $8 wine, $5 beer",
    "timeWindow": "5-6pm",
    "price": "from $2",
    "cadence": "everyday",
    "cuisine": "Italian Tapas",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Short HH but cheap",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 500,
      "protein": 22
    }
  },
  {
    "id": 129,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Pacific Catch",
    "neighborhood": "Santa Monica",
    "deal": "$11 cocktails, $9.50 wine, $5.50-8 beer, $11 ceviche",
    "timeWindow": "3-6pm",
    "price": "from $5.50",
    "cadence": "everyday",
    "cuisine": "Seafood",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/best-happy-hour-deals-la",
    "verified": true,
    "notes": "Mon-Fri",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 550,
      "protein": 35
    }
  },
  {
    "id": 130,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "33 Taps",
    "neighborhood": "Silver Lake",
    "deal": "$5 beers, $7 wells, $8 cocktails, $9 bites, $19 pitchers",
    "timeWindow": "3-7pm + 9:30-close",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Sports Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Late-night second window",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 32
    }
  },
  {
    "id": 131,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Big Bar",
    "neighborhood": "Los Feliz",
    "deal": "$2 off draft, $8 wine, $10 cocktails, $5-12 plates",
    "timeWindow": "2-7pm",
    "price": "from $2",
    "cadence": "everyday",
    "cuisine": "Cocktail Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "5-hour HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 132,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Founders Ale House",
    "neighborhood": "Westside",
    "deal": "$6 wells/wine/beer, $7-8 cocktails, $5 sliders/taquitos",
    "timeWindow": "2-7pm + 10pm-close",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Pub",
    "category": "Happy Hour",
    "sourceUrl": "https://www.timeout.com/los-angeles/bars/best-happy-hour-deals-in-los-angeles",
    "verified": true,
    "notes": "Two HH windows",
    "traits": [],
    "meals": [
      "dinner",
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 133,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Library Bar",
    "neighborhood": "DTLA",
    "deal": "$6 beer/wine, $8 cocktails",
    "timeWindow": "3-7pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Cocktail Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Inside Hotel Figueroa",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 134,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Little Easy",
    "neighborhood": "DTLA",
    "deal": "$4 Kronenburgs, $5 wine/wells, $6 hurricanes",
    "timeWindow": "4-8pm",
    "price": "from $4",
    "cadence": "everyday",
    "cuisine": "New Orleans",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Long HH window",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 800,
      "protein": 32
    }
  },
  {
    "id": 135,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Perch",
    "neighborhood": "DTLA",
    "deal": "$5 Kronenburg, $6 wine, $7 cocktails",
    "timeWindow": "4-6pm",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "French Rooftop",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Skyline views",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 600,
      "protein": 25
    }
  },
  {
    "id": 136,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Las Perlas",
    "neighborhood": "DTLA",
    "deal": "$5 draft cocktails + food discounts",
    "timeWindow": "5-8pm wkdy / 1-8pm wknd",
    "price": "$5",
    "cadence": "everyday",
    "cuisine": "Mezcal Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Long weekend HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 137,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Sushi Gen",
    "neighborhood": "Little Tokyo",
    "deal": "$26 sashimi lunch (9-10 fish + sides)",
    "timeWindow": "Lunch service",
    "price": "$26",
    "cadence": "everyday",
    "cuisine": "Sushi",
    "category": "Lunch",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/best-bang-for-your-buck-los-angeles-restaurant-deals",
    "verified": true,
    "notes": "Tue-Fri lunch only",
    "traits": [],
    "meals": [
      "lunch"
    ],
    "macros": {
      "cal": 600,
      "protein": 28
    }
  },
  {
    "id": 138,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Wi Jammin",
    "neighborhood": "Mid-City",
    "deal": "$12-14 Caribbean chicken lunch + plantains + 2 sides",
    "timeWindow": "11am-3pm",
    "price": "$12-14",
    "cadence": "everyday",
    "cuisine": "Caribbean",
    "category": "Lunch",
    "sourceUrl": "https://www.timeout.com/los-angeles/restaurants/best-bang-for-your-buck-los-angeles-restaurant-deals",
    "verified": true,
    "notes": "Mon-Fri",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "late_night"
    ],
    "macros": {
      "cal": 800,
      "protein": 35
    }
  },
  {
    "id": 139,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Petit Trois",
    "neighborhood": "Hollywood",
    "deal": "$44 three-course prix fixe lunch",
    "timeWindow": "12-4pm",
    "price": "$44",
    "cadence": "everyday",
    "cuisine": "French",
    "category": "Lunch",
    "sourceUrl": "https://www.eatdrinkla.com/weekday-lunch-specials-los-angeles/",
    "verified": true,
    "notes": "Sherman Oaks too",
    "traits": [],
    "meals": [
      "lunch"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 140,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "ALL'ACQUA",
    "neighborhood": "Atwater Village",
    "deal": "$20 pizza/panini/pasta + soup/salad + gelato",
    "timeWindow": "11:30am-2:30pm",
    "price": "$20",
    "cadence": "everyday",
    "cuisine": "Italian",
    "category": "Lunch",
    "sourceUrl": "https://www.eatdrinkla.com/weekday-lunch-specials-los-angeles/",
    "verified": true,
    "notes": "Mon-Fri lunch",
    "traits": [],
    "meals": [
      "lunch"
    ],
    "macros": {
      "cal": 750,
      "protein": 28
    }
  },
  {
    "id": 141,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Cozy Corner Thai",
    "neighborhood": "Glendale",
    "deal": "Nothing over $12 (lunch)",
    "timeWindow": "11am-3pm",
    "price": "$12",
    "cadence": "everyday",
    "cuisine": "Thai",
    "category": "Lunch",
    "sourceUrl": "https://www.eatdrinkla.com/weekday-lunch-specials-los-angeles/",
    "verified": true,
    "notes": "Daily lunch",
    "traits": [],
    "meals": [
      "breakfast",
      "lunch",
      "late_night"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 142,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Cole's",
    "neighborhood": "DTLA",
    "deal": "$5.94 cocktails/snacks, $1.37 fries with drink",
    "timeWindow": "4-7pm",
    "price": "from $1.37",
    "cadence": "everyday",
    "cuisine": "French Dip/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.discoverlosangeles.com/eat-drink/the-best-happy-hours-in-downtown-los-angeles",
    "verified": true,
    "notes": "Historic DTLA bar",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 850,
      "protein": 45
    }
  },
  {
    "id": 143,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Mama Lion",
    "neighborhood": "K-Town",
    "deal": "$12 half-dozen oysters, $8 sliders/wings, $6-8 cocktails",
    "timeWindow": "7-9pm",
    "price": "from $6",
    "cadence": "everyday",
    "cuisine": "Asian Fusion",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Tue-Fri + Tue-Sat 11pm-close",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 32
    }
  },
  {
    "id": 144,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "The Normandie Club",
    "neighborhood": "K-Town",
    "deal": "$5 shot or beer of the day, reduced cocktails",
    "timeWindow": "6-8pm",
    "price": "$5",
    "cadence": "everyday",
    "cuisine": "Cocktail Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://laist.com/news/food/koreatowns-best-happy-hours",
    "verified": true,
    "notes": "Top LA cocktail bar",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 145,
    "day": "Weekdays",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],
    "restaurant": "Everson Royce Bar",
    "neighborhood": "Arts District",
    "deal": "$7 cocktails, $10 burger+fries, free chips/salsa",
    "timeWindow": "5-7pm",
    "price": "from $7",
    "cadence": "everyday",
    "cuisine": "American/Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.theinfatuation.com/los-angeles/guides/downtown-la-dtla-happy-hours",
    "verified": true,
    "notes": "Tue-Sun",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 700,
      "protein": 30
    }
  },
  {
    "id": 146,
    "day": "Weekends",
    "days": [
      "Sat",
      "Sun"
    ],
    "restaurant": "Socalo",
    "neighborhood": "Santa Monica",
    "deal": "$10 Socalo Burger, $7.50 tostadita, $8 margarita, $5 beer",
    "timeWindow": "3-6pm Wed-Fri / 3-5pm Sat",
    "price": "from $5",
    "cadence": "everyday",
    "cuisine": "Mexican",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Weekend short HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 147,
    "day": "Weekends",
    "days": [
      "Sat",
      "Sun"
    ],
    "restaurant": "Mercado",
    "neighborhood": "Santa Monica",
    "deal": "$10+ tacos, $4 cervezas, $7 wine, $8 margarita",
    "timeWindow": "4-6pm",
    "price": "from $4",
    "cadence": "everyday",
    "cuisine": "Mexican",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Weekend HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 450,
      "protein": 22
    }
  },
  {
    "id": 148,
    "day": "Weekends",
    "days": [
      "Sat",
      "Sun"
    ],
    "restaurant": "A.O.C.",
    "neighborhood": "Brentwood",
    "deal": "$12 wine, $15 cocktails",
    "timeWindow": "2:30-6pm Wed-Sun",
    "price": "from $12",
    "cadence": "everyday",
    "cuisine": "Wine Bar",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "Nicer-spot deal",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 400,
      "protein": 12
    }
  },
  {
    "id": 149,
    "day": "Weekends",
    "days": [
      "Sat",
      "Sun"
    ],
    "restaurant": "Boa Steakhouse",
    "neighborhood": "Santa Monica",
    "deal": "$12 cocktails, $10 wine, $16 burger",
    "timeWindow": "5-6pm",
    "price": "from $10",
    "cadence": "everyday",
    "cuisine": "Steakhouse",
    "category": "Happy Hour",
    "sourceUrl": "https://www.eatdrinkla.com/best-weekend-happy-hours-los-angeles/",
    "verified": true,
    "notes": "High-end weekend HH",
    "traits": [],
    "meals": [
      "dinner"
    ],
    "macros": {
      "cal": 1100,
      "protein": 65
    }
  }
];

export const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const ALL_MEALS: Meal[] = ["breakfast", "lunch", "dinner", "late_night"];
