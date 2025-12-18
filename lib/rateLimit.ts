
// Einfaches In-Memory Rate Limiting
const ipCache = new Map<string, { count: number; lastReset: number }>();

const WINDOW_SIZE = 15 * 60 * 1000; // 15 Minuten
const MAX_REQUESTS = 5; // Max 5 Anfragen pro Fenster

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > WINDOW_SIZE) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count++;
  ipCache.set(ip, userData);

  return userData.count > MAX_REQUESTS;
}
