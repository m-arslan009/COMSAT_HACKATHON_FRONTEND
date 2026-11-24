const config = {
  "*": "secretlint --no-gitignore --no-glob",
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": [
    "eslint --fix --max-warnings=0",
    "prettier --write",
  ],
  "*.{css,json,md,mdx,yaml,yml}": "prettier --write",
};

export default config;
