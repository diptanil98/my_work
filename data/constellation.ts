export interface StarNode {
  id: string;
  title: string;
  thought: string;
  x: number; // percentage coordinate 0-100 on canvas
  y: number; // percentage coordinate 0-100 on canvas
  magnitude: number; // visual scale of star
}

export const constellationStars: StarNode[] = [
  {
    id: "star-1",
    title: "Your smile",
    thought: "The genuine one that wrinkles your nose and lights up whatever room we're in.",
    x: 25,
    y: 32,
    magnitude: 1.2,
  },
  {
    id: "star-2",
    title: "The way you care",
    thought: "You pay attention to small details others overlook, always making sure people feel seen.",
    x: 48,
    y: 20,
    magnitude: 1.4,
  },
  {
    id: "star-3",
    title: "Your patience",
    thought: "Even when I'm slow to grasp things or get in my own head, your grace is unmatched.",
    x: 74,
    y: 28,
    magnitude: 1.1,
  },
  {
    id: "star-4",
    title: "Your ambition",
    thought: "The quiet determination in your eyes when you dedicate your heart to something you believe in.",
    x: 82,
    y: 56,
    magnitude: 1.3,
  },
  {
    id: "star-5",
    title: "The way you make me laugh",
    thought: "Those sudden, silly jokes that break through any bad day and make everything feel lighter.",
    x: 62,
    y: 75,
    magnitude: 1.2,
  },
  {
    id: "star-6",
    title: "Your little habits",
    thought: "[INSIDE_JOKE - That specific face you make or the way you tuck your hair when you concentrate.]",
    x: 35,
    y: 80,
    magnitude: 1.1,
  },
  {
    id: "star-7",
    title: "How you make ordinary conversations special",
    thought: "A five-minute chat on a random Tuesday with you feels more grounding than anything else.",
    x: 18,
    y: 60,
    magnitude: 1.3,
  },
  {
    id: "star-8",
    title: "Your heart",
    thought: "The warmth, honesty, and gentle strength that makes you the most incredible person I know.",
    x: 50,
    y: 48,
    magnitude: 1.6, // central beacon
  },
];
