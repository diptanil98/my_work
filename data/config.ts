/**
 * PERSONALIZATION CONFIGURATION
 * 
 * Replace placeholders like [GIRLFRIEND_NAME], [INSIDE_JOKE], etc.,
 * with your own personal details. Everything else adapts automatically.
 */

export const siteConfig = {
  // Replace with her name or pet name (e.g. "Maya", "Emma", "Sweetheart")
  recipientName: "[GIRLFRIEND_NAME]",
  
  // A tiny inside joke or sweet phrase revealed in an easter egg or margin note
  insideJoke: "[INSIDE_JOKE - e.g., 'Even when you steal my fries']",

  // Audio track settings
  audio: {
    src: "/audio/ambient.mp3",
    title: "Cinematic Ambient Theme",
    // Synthesizes a warm, soothing ambient soundscape if no mp3 is found
    enableSynthesizerFallback: true,
  },

  // Metadata
  author: "Me",
  year: new Date().getFullYear(),
};
