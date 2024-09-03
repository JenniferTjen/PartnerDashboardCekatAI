/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['s3-us-east-2.amazonaws.com', 'lookaside.fbsbx.com'],
    },
};

module.exports = nextConfig;
