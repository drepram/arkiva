import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Artefak Kita, an independent archive of Indonesia's visual history.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-hero">
        <h1>About Us</h1>
        <p>Artefak Kita is an independent digital archive that documents and explores Indonesia’s visual history through artefacts of art, design, and political narratives.</p>
      </header>

      <p className="about-mission">Established in 2024, this initiative aims to make Indonesian artefacts more accessible, contextualized, and searchable — to preserve meaning and encourage critical reflection.</p>

      <div className="about-sections">
        <section className="about-section">
          <h2><span>Who We Are</span><span aria-hidden="true">×</span></h2>
          <div className="about-section-body">
            <p>Artefak Kita is initiated and independently maintained by <a href="https://www.pricharielp.space/">Prinvia Prichariel</a>. The project is unaffiliated with any institution and operates voluntarily, without commercial funding.</p>
            <p>Contributions and submissions are carefully reviewed and credited. This archive continues to grow through shared curiosity, ongoing research, and a collective commitment to documenting overlooked pieces of Indonesia’s visual past.</p>
          </div>
        </section>

        <section className="about-section">
          <h2><span>Why This Archive Exists</span><span aria-hidden="true">×</span></h2>
          <div className="about-section-body">
            <p>This archive began as a personal response to a gap I encountered during my first year of university. At the time, I wasn’t particularly drawn to history, until a course in my second semester, Design &amp; Indonesian Culture, introduced me to Indonesia’s political and social past through the lens of visual art and design.</p>
            <p>During that class, we were tasked with analyzing vintage Indonesian artefacts. That’s when I realized just how difficult it was to find them. Despite their historical and visual richness, many of these artefacts were poorly documented, scattered, or simply inaccessible. Ironically, some of the most compelling materials were housed not in Indonesian archives, but in institutions abroad.</p>
            <p>Out of that frustration, I started Artefak Kita as an <a href="https://www.instagram.com/artefak__kita/">Instagram page</a> in March 2024, a personal attempt to document and organize the finds I came across. What began as a small initiative is something I hope will grow into a larger public archive, one that makes these materials easier to explore, study, and reflect on together.</p>
          </div>
        </section>

        <section className="about-section">
          <h2><span>Disclaimer</span><span aria-hidden="true">×</span></h2>
          <div className="about-section-body">
            <p>Artefak Kita is a personal initiative. I am not a professional historian or archival expert. This platform is built through independent research, open-source findings, and community contributions. While every effort is made to ensure accuracy and provide context, there may be errors or gaps.</p>
            <p>Most artefacts are sourced from public archives or contributors, and ownership remains with their original holders. Items from personal collections are clearly noted. The archive is non-commercial and intended solely for educational, cultural, and research use.</p>
            <p>If you spot an inaccuracy or would like to contribute further context, please don’t hesitate to <a href="https://bit.ly/feedback-form-ak">leave feedback</a> or email us at <a href="mailto:hi.artefakkita@gmail.com">hi.artefakkita@gmail.com</a>. Your input helps keep this archive open, evolving, and responsible.</p>
          </div>
        </section>
      </div>

      <figure className="about-collage">
        <img src="/images/about-collage.webp" alt="A collage of Indonesian posters, illustrations, printed matter, and political graphics from the Artefak Kita archive" width="1472" height="1043" loading="lazy" decoding="async" />
      </figure>
    </main>
  );
}
