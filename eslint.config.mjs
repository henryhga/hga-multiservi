import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["legacy-static-site/**", ".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
