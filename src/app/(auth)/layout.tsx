import { Brand } from "@/components/brand";

const highlights = [
  "Register your team and manage your submission",
  "Keep your profile and contact details up to date",
  "Reset a forgotten password in a couple of minutes",
];

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid flex-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="hidden flex-col justify-between bg-foreground p-10 text-background lg:flex xl:p-14">
        <Brand className="[&>span:first-child]:bg-background [&>span:first-child]:text-foreground" />
        <div className="max-w-md space-y-6">
          <p className="text-3xl leading-tight font-semibold tracking-tight xl:text-4xl">
            Build, ship and present, all in one place.
          </p>
          <ul className="space-y-3 text-base text-background/75">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-background"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-background/60">COMSAT Hackathon</p>
      </aside>

      <div className="flex flex-col">
        <header className="px-6 pt-6 sm:px-10 lg:hidden">
          <Brand />
        </header>
        <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 sm:py-16">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
