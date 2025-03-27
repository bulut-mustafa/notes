/** @type {import('next').NextConfig} */


const nextConfig = ({
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'notes-app-note-images.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'timetogo-user-pictures.s3.amazonaws.com' },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
});

export default nextConfig;