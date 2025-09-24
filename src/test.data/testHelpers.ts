// Simple random string generator without external deps
export function randomString(length: number = 12): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

function randomLetters(length: number = 6): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return out;
}

export function createUniqueEmail(
  prefix: string,
  domain: string = 'example.com',
): string {
  return `${prefix}${Date.now()}@${domain}`;
}

export function createUniqueName(prefix: string): string {
  return `${prefix}${Date.now()}`;
}

export function generateUsername(): string {
  return `user_${randomString(8)}`;
}

export function generateEmail(): string {
  return `${randomString(10).toLowerCase()}@example.com`;
}

export function generatePassword(): string {
  return `Aa1!${randomString(10)}`;
}

export function generateFirstName(): string {
  const name = randomLetters(6);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function generateLastName(): string {
  const name = randomLetters(7);
  return name.charAt(0).toUpperCase() + name.slice(1);
}
