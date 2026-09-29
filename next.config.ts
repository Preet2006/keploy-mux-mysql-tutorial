import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Note: remark/rehype plugins with function values are not compatible
  // with Turbopack's serialization requirements. We handle syntax
  // highlighting via our custom CodeBlock component and IDs via React props.
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
