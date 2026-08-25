import { ContentManager } from "./content-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">CMS</p>
      <h1 className="display mt-2 text-5xl text-forest">Homepage content</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">
        Edit navigation labels, section copy, visibility and images in English, Arabic and Bahasa Melayu.
      </p>
      <ContentManager
        sections={data.sections}
        navItems={data.navItems}
        highlights={data.highlights}
        countries={data.countries}
      />
    </div>
  );
}
