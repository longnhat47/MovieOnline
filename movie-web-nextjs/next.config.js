/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
          {
            hostname: '127.0.0.1',
          }
        ],
    },
}

module.exports = nextConfig
