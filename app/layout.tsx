import type { Metadata } from "next";
export const metadata: Metadata = { title: "Horologie", description: "Watch Valuation System" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
