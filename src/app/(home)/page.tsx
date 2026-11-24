import { FrontendHealthCard } from "./_components/frontend-health-card";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-10 px-6 py-20 sm:px-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          COMSAT Hackathon
        </h1>
        <p className="text-lg text-muted-foreground">Frontend starter</p>
      </header>
      <FrontendHealthCard />
    </main>
  );
}
