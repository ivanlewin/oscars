import { createClient } from "@/utils/supabase/server";

const oscars = await import("./oscars.json");

async function insertNomination(
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
      actor_id: actorIds.get(nominee.actor) || null,
      actress_id: actressIds.get(nominee.actress) || null,
      cinematographer_id:
        cinematographerIds.get(nominee.cinematographer) || null,
      director_id: directorIds.get(nominee.director) || null,
      editor_id: editorIds.get(nominee.editor) || null,
      country: nominee.country || null,
      song: nominee.song || null,
      recipients: nominee.recipients || null,
    }))
  );
  if (error) {
    throw error;
  }
}
