/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repoName = '/Pavan_Groups';

const nextConfig = {
  output: 'export',
  basePath: isProd || isGithubActions ? repoName : '',
  assetPrefix: isProd || isGithubActions ? `${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
