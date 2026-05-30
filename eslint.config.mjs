import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Apostrophes in prose are fine — the project's voice uses them
      // liberally and React's no-unescaped-entities is purely cosmetic.
      "react/no-unescaped-entities": "off",
      // postcss.config.mjs default-exports an object literal by design.
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default config;
