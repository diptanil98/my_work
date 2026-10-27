export interface PromiseItem {
  id: string;
  text: string;
  subtext?: string;
}

export const promisesData: PromiseItem[] = [
  {
    id: "p1",
    text: "I'll listen better.",
    subtext: "Without preparing a defense while you speak.",
  },
  {
    id: "p2",
    text: "I'll communicate better.",
    subtext: "Being honest about what I'm feeling before frustration takes over.",
  },
  {
    id: "p3",
    text: "I'll think before I speak.",
    subtext: "Because careless words leave bruises that take time to heal.",
  },
  {
    id: "p4",
    text: "I'll never take your feelings lightly.",
    subtext: "Your peace of mind matters as much to me as my own.",
  },
  {
    id: "p5",
    text: "I'll keep choosing us.",
    subtext: "Even on hard days, even when we need patience to understand each other.",
  },
  {
    id: "p6",
    text: "[PERSONAL_PROMISE - e.g. I promise to always make your favorite tea when you're overwhelmed.]",
    subtext: "A personal commitment made just for you.",
  },
];
