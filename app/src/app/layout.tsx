import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Web developer & photographer",
  description: "A portfolio for development work and visual stories.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
