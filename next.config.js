/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
		ignoreDuringBuilds: true
	},
  devIndicators: {
    buildActivity: false
}
}

module.exports = nextConfig
