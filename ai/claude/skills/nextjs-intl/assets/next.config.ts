import type { NextConfig } from "next";
import crateNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = crateNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);


