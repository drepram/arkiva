import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { env } from "@/lib/env";
import "./styles.css";

export const metadata: Metadata = {
  title: { default: "Artefak Kita", template: "%s | Artefak Kita" },
  description: "An independent archive of Indonesia's visual history.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function FrontendLayout({ children }: { children: ReactNode }) {
  const mediaOrigin = env.mediaPublicUrl ? new URL(env.mediaPublicUrl).origin : "";

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/eczar-latin-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {mediaOrigin ? <link rel="preconnect" href={mediaOrigin} crossOrigin="anonymous" /> : null}
      </head>
      <body>
        <Header />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <footer className="site-footer">
          <div className="footer-wordmark" translate="no">Artefak Kita</div>
          <div className="footer-grid">
            <section>
              <h2>Explore</h2>
              <a href="/">Finds</a>
              <a href="/series">Series</a>
              <a href="/articles">Articles</a>
              <a href="/about">About</a>
            </section>
            <section>
              <h2>Contribute</h2>
              <a href="https://bit.ly/submit-an-artefact-ak">Submit an Artefact</a>
              <a href="https://bit.ly/submit-an-article-ak">Share Your Writing</a>
              <a href="https://bit.ly/feedback-form-ak">Give Feedback</a>
              <a href="https://trakteer.id/artefak_kita/tip">Buy Us a Coffee</a>
            </section>
            <section>
              <h2>Connect</h2>
              <a href="mailto:hi.artefakkita@gmail.com">Email</a>
              <a href="https://www.instagram.com/artefak__kita/">Instagram</a>
              <a href="https://trakteer.id/artefak_kita">Trakteer</a>
              <a href="https://x.com/artefak__kita">Twitter</a>
            </section>
            <section className="footer-disclaimer">
              <h2>Disclaimer</h2>
              <p>Artefak Kita is an independent archive. Most artefacts are sourced from public collections; ownership remains with the original holders. Personal and contributor items are credited. ©2025</p>
            </section>
          </div>
          <p className="footer-credit">Initiated, designed &amp; built by <a href="https://www.pricharielp.space/">Prinvia Prichariel</a></p>
        </footer>
      </body>
    </html>
  );
}
