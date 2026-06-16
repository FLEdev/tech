'use client';

import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { useTransition, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ options, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const pathname = usePathname();
  const params = useParams();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function onSelect(nextLocale: string) {
    setSelected(nextLocale);
    setIsOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale as Locale }
      );
    });
  }

  return (
    <div
      ref={ref}
      className={`el-select relative inline-block text-sm${isPending ? ' opacity-50 pointer-events-none' : ''}`}
    >
      <span className="sr-only">{label}</span>
      <button
        onClick={() => setIsOpen((o) => !o)}
        disabled={isPending}
        className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        {selected.toUpperCase()}
        <span className="text-xs">▾</span>
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-1 z-50 min-w-full rounded border border-gray-200 bg-white shadow-md dark:bg-gray-900 dark:border-gray-700">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`el-option px-3 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                opt.value === selected
                  ? 'font-medium text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
