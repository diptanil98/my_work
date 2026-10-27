export interface MemoryItem {
  id: string;
  image: string;
  placeholderTitle: string;
  caption: string;
  dateOrPlace?: string;
  rotation: number; // slight rotation angle in degrees for artistic scatter
}

export const memoriesData: MemoryItem[] = [
  {
    id: "memory-1",
    image: "/memories/memory-1.jpg",
    placeholderTitle: "[MEMORY_1 - The day we laughed until our stomachs hurt]",
    caption: "One of my favorite versions of us.",
    dateOrPlace: "[DATE_OR_PLACE_1]",
    rotation: -3,
  },
  {
    id: "memory-2",
    image: "/memories/memory-2.jpg",
    placeholderTitle: "[MEMORY_2 - That quiet evening together]",
    caption: "Somehow you made ordinary days feel special.",
    dateOrPlace: "[DATE_OR_PLACE_2]",
    rotation: 2.5,
  },
  {
    id: "memory-3",
    image: "/memories/memory-3.jpg",
    placeholderTitle: "[MEMORY_3 - A moment I never want to forget]",
    caption: "Looking at this reminds me of how peaceful everything felt with you.",
    dateOrPlace: "[DATE_OR_PLACE_3]",
    rotation: -1.8,
  },
  {
    id: "memory-4",
    image: "/memories/memory-4.jpg",
    placeholderTitle: "[MEMORY_4 - Our spontaneous adventure]",
    caption: "I would choose these moments with you a thousand times over.",
    dateOrPlace: "[DATE_OR_PLACE_4]",
    rotation: 3.2,
  },
  {
    id: "memory-5",
    image: "/memories/memory-5.jpg",
    placeholderTitle: "[MEMORY_5 - Just you being completely yourself]",
    caption: "The way you smile without even noticing is still my favorite thing.",
    dateOrPlace: "[DATE_OR_PLACE_5]",
    rotation: -2.2,
  },
];
