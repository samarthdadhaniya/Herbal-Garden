
// This is a temporary placeholder for our plant database
// In a real application, this data would come from Supabase

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  systems: ('ayurveda' | 'yoga' | 'unani' | 'siddha' | 'homeopathy')[];
  properties: string[];
  uses: string[];
  parts: string[];
  image: string;
  gallery?: string[];
  cultivation?: string;
  modelUrl?: string; // URL to 3D model if available
}

export const plants: Plant[] = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Ashwagandha is an evergreen shrub that grows in Asia and Africa. It is commonly used for stress. Many of its health benefits are attributed to its high concentration of withanolides, which have been shown to fight inflammation and tumor growth.",
    systems: ["ayurveda"],
    properties: ["Adaptogen", "Anti-inflammatory", "Antioxidant", "Immunomodulatory"],
    uses: ["Reduces stress and anxiety", "Improves sleep quality", "Enhances cognitive function", "Boosts immune system"],
    parts: ["Root", "Leaf", "Seed"],
    image: "https://images.unsplash.com/photo-1625178551411-62eea1351c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1062&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1625178551411-62eea1351c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1062&q=80",
      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/ashwagandha-benefits-1296x728-feature.jpg?w=1155&h=1528"
    ],
    cultivation: "Ashwagandha thrives in dry regions and is cultivated in many parts of India and Nepal. It prefers well-drained soil and full sun exposure.",
    modelUrl: "/models/ashwagandha.glb" // placeholder, we'll create this later
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    description: "Tulsi, also known as Holy Basil, is an aromatic plant in the family Lamiaceae. It is an erect, much-branched subshrub, 30–60 cm tall with hairy stems and simple, opposite, green leaves that are strongly scented.",
    systems: ["ayurveda"],
    properties: ["Adaptogen", "Antimicrobial", "Antioxidant", "Anti-inflammatory"],
    uses: ["Relieves stress", "Supports immune system", "Promotes respiratory health", "Enhances digestion"],
    parts: ["Leaf", "Seed", "Root"],
    image: "https://images.unsplash.com/photo-1622210445677-7ec164723bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622210445677-7ec164723bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-plants-tulsi-holy-basil-ram-tulsi-plant-16969345826892_600x600.jpg?v=1634230232"
    ],
    cultivation: "Tulsi is widely cultivated across the Southeast Asian tropics. It grows best in rich, well-drained soil with plenty of sunlight and regular watering."
  },
  {
    id: 3,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    description: "Aloe Vera is a succulent plant species of the genus Aloe. It's been used for thousands of years and is known for its healing properties. The gel from aloe vera leaves is often used to treat burns and various skin conditions.",
    systems: ["ayurveda", "unani"],
    properties: ["Soothing", "Moisturizing", "Anti-inflammatory", "Antimicrobial"],
    uses: ["Treats burns and wounds", "Moisturizes skin", "Reduces dental plaque", "Lowers blood sugar levels"],
    parts: ["Gel", "Latex", "Leaf"],
    image: "https://images.unsplash.com/photo-1596046216241-305f0df82b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596046216241-305f0df82b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      "https://images.unsplash.com/photo-1610505197660-9bd868bc5b10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    cultivation: "Aloe vera is easily grown as a houseplant or in warmer climates as a garden plant. It requires well-drained sandy soil and minimal watering."
  },
  {
    id: 4,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    description: "Turmeric is a flowering plant of the ginger family. Its roots/rhizomes are used in cooking, for yellow coloring, and for their medicinal properties. It has been used in India for thousands of years as a spice and medicinal herb.",
    systems: ["ayurveda", "unani", "siddha"],
    properties: ["Anti-inflammatory", "Antioxidant", "Antimicrobial", "Hepatoprotective"],
    uses: ["Reduces inflammation", "Improves digestion", "Enhances immune function", "Promotes healthy skin"],
    parts: ["Rhizome", "Root"],
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9a4824?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485500704-8e990f9a4824?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1613125700782-8394bec3b2dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
    ],
    cultivation: "Turmeric grows in warm, humid conditions with plenty of rainfall. It requires temperatures between 20°C and 30°C and a considerable amount of annual rainfall."
  },
  {
    id: 5,
    name: "Neem",
    scientificName: "Azadirachta indica",
    description: "Neem is a fast-growing tree native to the Indian subcontinent. It's known for its pesticide and medicinal properties. All parts of the tree have been used in traditional medicine for household remedies against various human ailments.",
    systems: ["ayurveda", "unani"],
    properties: ["Antimicrobial", "Antipyretic", "Anti-inflammatory", "Antioxidant"],
    uses: ["Treats skin disorders", "Supports dental health", "Purifies blood", "Combats parasitic infections"],
    parts: ["Leaf", "Bark", "Seed", "Oil"],
    image: "https://images.unsplash.com/photo-1618590067824-5ba32ca76ce9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618590067824-5ba32ca76ce9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
      "https://5.imimg.com/data5/YN/KU/MY-3087103/neem-tree-500x500.jpg"
    ],
    cultivation: "Neem trees grow in tropical and semi-tropical regions. They can tolerate high temperatures but not cold or frost. They prefer well-draining soils and can survive in poor, stony soils."
  },
  {
    id: 6,
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    description: "Brahmi is a perennial, creeping herb native to the wetlands of southern and Eastern India, Australia, Europe, Africa, Asia, and North and South America. It is an important medicinal herb used in Ayurveda for memory enhancement and treating anxiety.",
    systems: ["ayurveda"],
    properties: ["Nootropic", "Adaptogen", "Anxiolytic", "Antioxidant"],
    uses: ["Enhances memory and cognitive function", "Reduces anxiety and stress", "Improves attention and concentration", "Supports nervous system health"],
    parts: ["Leaf", "Stem"],
    image: "https://images.unsplash.com/photo-1585652013029-f7fe867ebec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585652013029-f7fe867ebec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzuMbIVu8hHSlTN2y-YCeQhEj7AzT-loj9lg&usqp=CAU"
    ],
    cultivation: "Brahmi thrives in moist, boggy conditions. It can be grown in water gardens, at the edges of ponds, or in consistently moist soil in partial shade."
  }
];

// Function to get a plant by ID
export const getPlantById = (id: number): Plant | undefined => {
  return plants.find(plant => plant.id === id);
};

// Function to filter plants by system
export const getPlantsBySystem = (system: string): Plant[] => {
  return plants.filter(plant => plant.systems.includes(system as any));
};

// Function to search plants
export const searchPlants = (query: string): Plant[] => {
  const lowerCaseQuery = query.toLowerCase();
  return plants.filter(
    plant => 
      plant.name.toLowerCase().includes(lowerCaseQuery) || 
      plant.scientificName.toLowerCase().includes(lowerCaseQuery) ||
      plant.description.toLowerCase().includes(lowerCaseQuery)
  );
};
