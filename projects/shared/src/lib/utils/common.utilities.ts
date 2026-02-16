export function formatName(mode: any): string {
    return mode
        .split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}