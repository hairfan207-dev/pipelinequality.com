import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipMiddlewareUrlNormalize: true,
  // Hide the Next.js "N" badge on the client preview tunnel
  devIndicators: false,
  allowedDevOrigins: ['*.trycloudflare.com'],
}

export default withNextIntl(nextConfig)
