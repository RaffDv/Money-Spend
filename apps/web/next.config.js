/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@phosphor-icons/react"],
	},
	images: {
		domains: ["googleusercontent.com"],
	},
};

export default nextConfig;
