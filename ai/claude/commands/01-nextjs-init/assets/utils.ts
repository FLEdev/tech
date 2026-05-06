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

export function stripHtmlToText(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

import { iconMap } from '@/components/ui/dynamic-list/types';

export function getIcon(type: string): string {
  if (iconMap[type]) return iconMap[type];
  const prefix = type.split('|')[0];
  return iconMap[`${prefix}|*`] ?? 'help_outline';
}
