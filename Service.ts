export function adjustColorBrightness(hexColor: string, brightness: number): string {
    // Convert the hex color to RGB
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Apply the brightness adjustment
    const adjustedRed = Math.round(red + (brightness * 255));
    const adjustedGreen = Math.round(green + (brightness * 255));
    const adjustedBlue = Math.round(blue + (brightness * 255));

    // Clamp the adjusted RGB values to the valid range (0-255)
    const clampedRed = Math.max(0, Math.min(255, adjustedRed));
    const clampedGreen = Math.max(0, Math.min(255, adjustedGreen));
    const clampedBlue = Math.max(0, Math.min(255, adjustedBlue));

    // Convert the adjusted RGB values back to hex
    const adjustedHexColor = `#${clampedRed.toString(16).padStart(2, '0')}${clampedGreen.toString(16).padStart(2, '0')}${clampedBlue.toString(16).padStart(2, '0')}`;

    return adjustedHexColor;
}