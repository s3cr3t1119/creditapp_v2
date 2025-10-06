import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  },
};

export default nextConfig;
