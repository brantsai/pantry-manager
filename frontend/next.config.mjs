/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://express-cloud-run-67007310453.us-central1.run.app/:path*',
            },
        ];
    },
};

export default nextConfig;
