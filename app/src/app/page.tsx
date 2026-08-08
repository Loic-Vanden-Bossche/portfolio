import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getPortfolioProfile() {
  try {
    const profile = await prisma.portfolioProfile.findFirst();

    return { connected: true, profile };
  } catch {
    return { connected: false, profile: null };
  }
}

export default async function Home() {
  const { connected, profile } = await getPortfolioProfile();

  return (
    <main>
      <nav aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Portfolio home">
          L<span>·</span>P
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <p className="eyebrow">Web developer · Photographer</p>
        <h1>
          Digital craft,
          <br />
          <em>human perspective.</em>
        </h1>
        <p className="intro">
          {profile?.introduction ??
            "This portfolio is taking shape. Soon, it will bring together thoughtful web experiences and visual stories."}
        </p>
        <a className="cta" href="#work">
          Explore soon <span aria-hidden="true">↘</span>
        </a>
      </section>

      <section className="work-placeholder" id="work" aria-labelledby="work-title">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Projects are on the way.</h2>
        </div>
        <p>
          The foundation is ready for case studies, photo series, and everything
          between code and image.
        </p>
      </section>

      <footer id="about">
        <p>Portfolio foundation · {new Date().getFullYear()}</p>
        <p className={`database-status ${connected ? "online" : "offline"}`}>
          <span aria-hidden="true" />
          Database {connected ? "connected" : "unavailable"}
        </p>
      </footer>
    </main>
  );
}
