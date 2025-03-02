import { CustomToaster } from "@/components/custom-toaster";
import { Header } from "@/components/header";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const nominations = await getNominations();
  const byCategory = nominations.reduce((acc, nomination) => {
    acc[nomination.category.title] = [
      ...(acc[nomination.category.title] || []),
      nomination,
    ];
    return acc;
  }, {} as Record<string, typeof nominations>);

  return (
    <div className="flex flex-col gap-4 p-8">
      <Header />
      <main className="flex flex-col gap-4">
        <h1>Nominations</h1>
        <div>
          {Object.entries(byCategory)
            .toSorted((a, b) => a[0].localeCompare(b[0]))
            .map(([category, nominations]) => (
              <div key={category}>
                <strong> {category}</strong>
                <ul>
                  {nominations
                    .toSorted((a, b) =>
                      a.film.title.localeCompare(b.film.title)
                    )
                    .map((nomination) => (
                      <li key={nomination.id}>{nomination.film.title}</li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </main>
      <CustomToaster />
    </div>
  );
}

async function getNominations() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("nominations").select(`
    id,
    categories (
      id,
      title
    ),
    films (
      id,
      title
    ),
    actors (
      id,
      name
    ),
    actresses (
      id,
      name
    ),
    cinematographers (
      id,
      name
    ),
    directors (
      id,
      name
    ),
    editors (
      id,
      name
    ),
    country,
    song,
    recipients
  `);
  if (error) {
    throw error;
  }

  const nominations = data.map((nomination) => ({
    id: nomination.id,
    category: nomination.categories,
    film: nomination.films,
    actor: nomination.actors,
    actress: nomination.actresses,
    cinematographer: nomination.cinematographers,
    director: nomination.directors,
    editor: nomination.editors,
    country: nomination.country,
    song: nomination.song,
    recipients: nomination.recipients,
  }));

  return nominations;
}
