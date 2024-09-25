// Function to generate a random dark color in RGB format
export const getRandomDarkColor = (): string => {
  const randomValue = (): number => Math.floor(Math.random() * 51); // Generate a random value from 0 to 50
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`; // Return the RGB color string
};

// Type for the gradient return object
interface Gradient {
  colors: string[];
  angle: string;
}

// Function to generate a random linear gradient with two dark colors
export const generateRandomLinearGradient = (): Gradient => {
  const color1 = getRandomDarkColor(); // Get the first random dark color
  const color2 = getRandomDarkColor(); // Get the second random dark color
  const color3 = getRandomDarkColor(); // Uncomment if you want to include a third color
  const color4 = getRandomDarkColor(); // Uncomment if you want to include a third color

  const angle = Math.floor(Math.random() * 180); // Generate a random angle for the gradient
  return {
    colors: [
      color1, // First color of the gradient
      color2, // Second color of the gradient
      color3, // Uncomment to include a third color
      color4,
    ],
    angle: `${angle}deg`, // Angle of the gradient in degrees
  };
};

// Function to check if a color is too light based on its RGB values
const isColorLight = (color: string): boolean => {
  const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]; // Extract RGB values from the color string
  // Calculate brightness using the luminosity formula
  const brightness = Math.sqrt(
    rgb[0] * rgb[0] * 0.299 + rgb[1] * rgb[1] * 0.587 + rgb[2] * rgb[2] * 0.114,
  );
  return brightness > 128; // Return true if brightness is above threshold, indicating a light color
};

// Function to generate a safe random dark gradient ensuring colors are not too light
export const generateSafeRandomDarkGradient = (): Gradient => {
  let color1 = getRandomDarkColor(); // Get the first random dark color
  let color2 = getRandomDarkColor(); // Get the second random dark color

  // Regenerate colors if they are too light
  while (isColorLight(color1)) {
    color1 = getRandomDarkColor(); // Keep generating until color1 is dark enough
  }
  while (isColorLight(color2)) {
    color2 = getRandomDarkColor(); // Keep generating until color2 is dark enough
  }

  const angle = Math.floor(Math.random() * 360); // Generate a random angle for the gradient
  return {
    colors: [color1, color2], // Return the safe dark colors for the gradient
    angle: `${angle}deg`, // Angle of the gradient in degrees
  };
};
