export function validateApiKey(key: string): boolean {
  if (!key || typeof key !== "string") return false;
  return /^zynu_[a-zA-Z0-9]{32,}$/.test(key);
}

export function buildAuthHeader(apiKey: string): Record<string, string> {
  return { Authorization: `Bearer ${apiKey}` };
}
