import 'dotenv/config';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUniqueId = () => {
  return uuidv4();
}

export const formatDate = (timestamp: number | string) => {
  return new Date(typeof timestamp === 'number' ? timestamp * 1000 : timestamp).toLocaleDateString();
}