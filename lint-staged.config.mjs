const config = {
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md,mdx,yaml,yml}": "prettier --write",
};

export default config;
