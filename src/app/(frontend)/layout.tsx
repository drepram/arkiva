import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./styles.css";

export const metadata: Metadata = {
  title: { default: "Arkiva", template: "%s | Arkiva" },
  description: "An independent archive of Indonesian visual memory.",
};

export const viewport: Viewport = { themeColor: "#f3f0e7" };

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Header />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <footer className="site-footer">
          <div><strong translate="no">Arkiva</strong><p>A curated digital archive of vintage Indonesian art, design & political memory.</p></div>
          <div><span>Explore</span><a href="/">Finds</a><a href="/series">Series</a><a href="/articles">Articles</a></div>
          <div><span>Archive</span><a href="/about">About</a><a href="mailto:hi.artefakkita@gmail.com">Contact</a><a href="https://www.instagram.com/artefak__kita/">Instagram</a></div>
          <p className="footer-note">Maintained for reading, research & remembrance.<br />Indonesia · 2026</p>
        </footer>
      </body>
    </html>
  );
}
