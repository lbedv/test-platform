export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  
  // Initialize the native datetime formatter
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDuration(
  totalSeconds: number,
  clockFormat: boolean = false
): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  if (clockFormat) {
    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')
    return `${paddedMinutes}:${paddedSeconds}`
  }

  return `${minutes}m ${seconds}s`
}

export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  
  // Calculate difference in seconds
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  // Initialize the native relative time formatter
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' });

  // Determine the best unit to display
  if (absDiff < 60) {
    return rtf.format(diffInSeconds, 'second');
  } 
  if (absDiff < 3600) {
    return rtf.format(Math.round(diffInSeconds / 60), 'minute');
  } 
  if (absDiff < 86400) {
    return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
  } 
  if (absDiff < 2592000) { // ~30 days
    return rtf.format(Math.round(diffInSeconds / 86400), 'day');
  } 
  if (absDiff < 31536000) { // 365 days
    return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
  }
  
  return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
}