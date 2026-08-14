import Link from "next/link";

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to Content</a>
      <header className="site-header">
      <Link className="brand" href="/" translate="no">
        <span className="wordmark">ARKIVA</span>
        <span className="brand-note">Indonesian visual memory<br />Est. 2024</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/">Finds</Link>
        <Link href="/series">Series</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/about">About</Link>
        <Link href="/contribute">Contribute</Link>
      </nav>
      </header>
    </>
  );
}
