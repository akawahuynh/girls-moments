import ultracite from "ultracite/prettier";

const config = {
  ...ultracite,
  useTabs: true,
  singleQuote: true,
  trailingComma: "none",
  printWidth: 100,
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
  tailwindStylesheet: "./src/routes/layout.css",
};

export default config;
