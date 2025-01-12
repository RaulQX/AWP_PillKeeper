export const MEDICINE_COLORS = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#96CEB4", // Sage
  "#FFEEAD", // Cream
  "#D4A5A5", // Dusty Rose
  "#9B5DE5", // Purple
  "#F15BB5", // Pink
  "#FEE440", // Yellow
  "#00BBF9", // Blue
  "#FF9A8B", // Peach
  "#A8E6CF", // Mint
  "#FFD3B6", // Light Orange
  "#AA96DA", // Lavender
  "#FF8B94", // Salmon
  "#B5EAD7", // Seafoam
  "#C7CEEA", // Periwinkle
  "#E2F0CB", // Light Lime
  "#FFB7B2", // Light Coral
  "#E7C6FF", // Light Purple
];

export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * MEDICINE_COLORS.length);
  return MEDICINE_COLORS[randomIndex];
};
