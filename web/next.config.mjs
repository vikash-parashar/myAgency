/** Static export: the whole site is plain files, so it hosts free on Render static or Cloudflare Pages. */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
