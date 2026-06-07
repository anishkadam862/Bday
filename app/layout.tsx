import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 23rd Birthday, Mariya ❤️",
  description: "A little corner of the internet made just for you.",
  openGraph: {
    title: "Happy 23rd Birthday, Mariya ❤️",
    description: "A little corner of the internet made just for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
