import type { PortfolioMode } from "@/components/portfolio/portfolio-data";
import { PortfolioExperience } from "@/components/portfolio-experience";

type HomeProps = { searchParams: Promise<{ mode?: string }> };

export default async function Home({ searchParams }: HomeProps) {
  const { mode } = await searchParams;
  const initialMode: PortfolioMode =
    mode === "development" ? "development" : "photography";

  return <PortfolioExperience initialMode={initialMode} />;
}
