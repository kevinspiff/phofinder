// Mock data for Pho Mate app

export const phoPreferences = {
  brothTypes: ['Beef', 'Chicken', 'Vegetarian'],
  noodleTypes: ['Thin', 'Medium', 'Thick'],
  proteins: ['Rare Beef', 'Brisket', 'Meatballs', 'Chicken', 'Tofu', 'Shrimp'],
  garnishes: ['Cilantro', 'Basil', 'Bean Sprouts', 'Lime', 'Jalapeños']
};

export const phoSpots = [
  {
    id: 1,
    name: "Pho Saigon",
    location: "Little Saigon, San Jose",
    address: "123 Story Rd, San Jose, CA 95122",
    rating: 4.8,
    specialties: ["Traditional Beef Pho", "Bone Marrow Pho"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    coordinates: { lat: 37.3382, lng: -121.8863 },
    distance: "2.3 miles",
    hours: "9:00 AM - 10:00 PM",
    phone: "(408) 555-0123"
  },
  {
    id: 2,
    name: "Pho 79",
    location: "Westminster, CA",
    address: "456 Bolsa Ave, Westminster, CA 92683",
    rating: 4.9,
    specialties: ["Rare Beef Pho", "Chicken Pho"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    coordinates: { lat: 33.7500, lng: -117.9939 },
    distance: "5.1 miles",
    hours: "8:00 AM - 11:00 PM",
    phone: "(714) 555-0456"
  },
  {
    id: 3,
    name: "Pho Hoa",
    location: "San Francisco, CA",
    address: "789 Clement St, San Francisco, CA 94118",
    rating: 4.6,
    specialties: ["Vegetarian Pho", "Seafood Pho"],
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    coordinates: { lat: 37.7849, lng: -122.4634 },
    distance: "1.8 miles",
    hours: "10:00 AM - 9:30 PM",
    phone: "(415) 555-0789"
  },
  {
    id: 4,
    name: "Golden Star Vietnamese",
    location: "Oakland, CA",
    address: "321 International Blvd, Oakland, CA 94606",
    rating: 4.7,
    specialties: ["Brisket Pho", "Meatball Pho"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    coordinates: { lat: 37.8044, lng: -122.2712 },
    distance: "3.7 miles",
    hours: "9:30 AM - 10:30 PM",
    phone: "(510) 555-0321"
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "Maya",
    age: 28,
    location: "San Francisco, CA",
    distance: "2 miles away",
    bio: "Pho enthusiast who believes the perfect bowl is an art form. Always on the hunt for the most authentic pho spots!",
    mainPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    phoJourney: [
      {
        id: 1,
        restaurant: "Pho Saigon",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
        rating: 5,
        description: "The broth here is absolutely incredible - rich, complex, and perfectly balanced. Their rare beef melts in your mouth!"
      },
      {
        id: 2,
        restaurant: "Pho 79",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        rating: 4,
        description: "Classic spot with authentic flavors. The noodles are perfectly cooked and the portion size is generous."
      }
    ],
    preferences: {
      brothType: "Beef",
      noodleType: "Medium",
      proteins: ["Rare Beef", "Brisket"],
      garnishes: ["Cilantro", "Basil", "Bean Sprouts", "Lime"]
    },
    phoCompatibility: 95
  },
  {
    id: 2,
    name: "David",
    age: 32,
    location: "San Jose, CA",
    distance: "5 miles away",
    bio: "Chef by day, pho connoisseur by night. I judge a pho place by their broth depth and noodle texture.",
    mainPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    phoJourney: [
      {
        id: 3,
        restaurant: "Pho Hoa",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
        rating: 5,
        description: "Their vegetarian pho is surprisingly rich and flavorful. The mushroom broth is a game-changer!"
      },
      {
        id: 4,
        restaurant: "Golden Star Vietnamese",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
        rating: 4,
        description: "Solid brisket pho with great texture. The meat is tender and the broth has good depth."
      }
    ],
    preferences: {
      brothType: "Beef",
      noodleType: "Thick",
      proteins: ["Brisket", "Meatballs"],
      garnishes: ["Cilantro", "Basil", "Lime", "Jalapeños"]
    },
    phoCompatibility: 88
  },
  {
    id: 3,
    name: "Sarah",
    age: 26,
    location: "Oakland, CA",
    distance: "3 miles away",
    bio: "Food blogger who's tried pho in 15 different cities. Looking for someone to share my pho adventures with!",
    mainPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    phoJourney: [
      {
        id: 5,
        restaurant: "Pho Saigon",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
        rating: 5,
        description: "This place changed my life! The bone marrow pho is next level - so rich and unctuous."
      },
      {
        id: 6,
        restaurant: "Pho 79",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        rating: 4,
        description: "Reliable spot with consistent quality. Great for when you need your pho fix!"
      }
    ],
    preferences: {
      brothType: "Beef",
      noodleType: "Thin",
      proteins: ["Rare Beef", "Chicken"],
      garnishes: ["Cilantro", "Bean Sprouts", "Lime"]
    },
    phoCompatibility: 92
  },
  {
    id: 4,
    name: "Alex",
    age: 30,
    location: "Berkeley, CA",
    distance: "7 miles away",
    bio: "Vegetarian foodie who's passionate about plant-based pho. Love exploring different broth variations!",
    mainPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    phoJourney: [
      {
        id: 7,
        restaurant: "Pho Hoa",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
        rating: 5,
        description: "Best vegetarian pho I've ever had! The mushroom and vegetable broth is incredibly complex and satisfying."
      },
      {
        id: 8,
        restaurant: "Golden Star Vietnamese",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
        rating: 3,
        description: "Decent vegetarian options, but the broth could use more depth. Good for a quick pho fix."
      }
    ],
    preferences: {
      brothType: "Vegetarian",
      noodleType: "Medium",
      proteins: ["Tofu"],
      garnishes: ["Cilantro", "Basil", "Bean Sprouts", "Lime"]
    },
    phoCompatibility: 75
  }
];

export const phoPedia = [
  {
    title: "What is Pho?",
    content: "Pho (pronounced 'fuh') is a Vietnamese soup consisting of broth, rice noodles, herbs, and meat. It's considered Vietnam's national dish and has gained worldwide popularity for its complex, aromatic broth and fresh ingredients."
  },
  {
    title: "Broth Types",
    content: "Pho broth is typically made by simmering beef or chicken bones with spices like star anise, cinnamon, cloves, and ginger for hours. The result is a clear, flavorful broth that forms the foundation of the dish."
  },
  {
    title: "Traditional Garnishes",
    content: "Fresh herbs like cilantro, Thai basil, and mint, along with bean sprouts, lime wedges, and sliced jalapeños are served on the side. These add freshness, acidity, and heat to balance the rich broth."
  },
  {
    title: "Noodle Varieties",
    content: "Pho uses flat rice noodles (bánh phở) that come in different widths. Thin noodles cook quickly and absorb broth well, while thicker noodles have more chew and substance."
  }
];
