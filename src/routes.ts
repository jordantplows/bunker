export interface Route {
  path: string;
  entry: string;
  title: string;
}

export const routes: Route[] = [
  { path: "/", entry: "/src/main.ts", title: "Bunker Longevity" },
  { path: "/ai-models", entry: "/src/ai-models.ts", title: "Bunker - AI Models" },
  { path: "/privacy", entry: "/src/privacy.ts", title: "Privacy Policy — Bunker" },
  { path: "/terms", entry: "/src/terms.ts", title: "Terms of Service — Bunker" },
  { path: "/careers", entry: "/src/careers.ts", title: "Careers — Bunker" },
  { path: "/contact", entry: "/src/contact.ts", title: "Contact — Bunker" },
  { path: "/404", entry: "/src/404.ts", title: "404 — Bunker" },
];
