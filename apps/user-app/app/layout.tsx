import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import * as React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyMonk",
  description: "Simple wallet app",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return React.createElement(
    "html",
    { lang: "en" },
    React.createElement(
      Providers,
      null,
      React.createElement(
        "body",
        { className: inter.className },
        children
      )
    )
  );
}
