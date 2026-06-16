'use client';

import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-selector';
import { useExtracted } from 'next-intl';

export default function LocaleSwitcher() {
  const t = useExtracted();
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('label')}
      options={routing.locales.map((cur) => ({ value: cur, label: cur.toUpperCase() }))}
    />
  );
}
