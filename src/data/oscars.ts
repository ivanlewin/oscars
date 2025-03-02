import { createClient } from "@/utils/supabase/server";

const oscars = await import("./oscars.json");
console.log("oscars", oscars);

export async function insertNomination(
  nomination: (typeof oscars)["categories"][number]
) {
  const supabase = await createClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, title");
  if (categoriesError) {
    throw categoriesError;
  }
  const categoryIds = new Map(
    categories.map((category) => [category.title, category.id])
  );

  const { data: films, error: filmsError } = await supabase
    .from("films")
    .select("id, title");
  if (filmsError) {
    throw filmsError;
  }
  const filmIds = new Map(films.map((film) => [film.title, film.id]));

  const { data: actors, error: actorsError } = await supabase
    .from("actors")
    .select("id, name");
  if (actorsError) {
    throw actorsError;
  }
  const actorIds = new Map(actors.map((actor) => [actor.name, actor.id]));

  const { data: actresses, error: actressesError } = await supabase
    .from("actresses")
    .select("id, name");
  if (actressesError) {
    throw actressesError;
  }
  const actressIds = new Map(
    actresses.map((actress) => [actress.name, actress.id])
  );

  const { data: cinematographers, error: cinematographersError } =
    await supabase.from("cinematographers").select("id, name");
  if (cinematographersError) {
    throw cinematographersError;
  }
  const cinematographerIds = new Map(
    cinematographers.map((cinematographer) => [
      cinematographer.name,
      cinematographer.id,
    ])
  );

  const { data: directors, error: directorsError } = await supabase
    .from("directors")
    .select("id, name");
  if (directorsError) {
    throw directorsError;
  }
  const directorIds = new Map(
    directors.map((director) => [director.name, director.id])
  );

  const { data: editors, error: editorsError } = await supabase
    .from("editors")
    .select("id, name");
  if (editorsError) {
    throw editorsError;
  }
  const editorIds = new Map(editors.map((editor) => [editor.name, editor.id]));

  const { error } = await supabase.from("nominations").insert(
    nomination.nominees.map((nominee) => ({
      category_id: categoryIds.get(nomination.title)!,
      film_id: filmIds.get(nominee.film)!,
      actor_id: actorIds.get((nominee as { actor: string }).actor) || null,
      actress_id:
        actressIds.get((nominee as { actress: string }).actress) || null,
      cinematographer_id:
        cinematographerIds.get(
          (nominee as { cinematographer: string }).cinematographer
        ) || null,
      director_id:
        directorIds.get((nominee as { director: string }).director) || null,
      editor_id: editorIds.get((nominee as { editor: string }).editor) || null,
      country: (nominee as { country: string }).country || null,
      song: (nominee as { song: string }).song || null,
      recipients: (nominee as { recipients: string[] }).recipients || null,
    }))
  );
  if (error) {
    throw error;
  }
}
