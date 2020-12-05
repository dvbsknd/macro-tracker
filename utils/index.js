export const randInt = (l, h) => l + Math.floor(Math.random() * (h - l));
export const today = () => new Date();
export const yesterday = (date) => new Date(date.setDate(date.getDate() - 1));
export const tomorrow = (date) => new Date(date.setDate(date.getDate() + 1));
export const isoDate = (date) => date.toISOString().split('T')[0];
export const sameDay = (a, b) => isoDate(a) === isoDate(b);
