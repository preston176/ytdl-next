export function calculateFileSize(resolution: number, duration: number): string {
    // Base data (1080p, 186 seconds, 5MB)
    const baseResolution = 1080;
    const baseDuration = 186; // seconds
    const baseFileSize = 5; // MB

    // Estimate the file size using the ratio of resolutions and duration
    const fileSize = (resolution / baseResolution) * (duration / baseDuration) * baseFileSize;

    return fileSize.toFixed(2); // Return file size rounded to 2 decimal places
}
