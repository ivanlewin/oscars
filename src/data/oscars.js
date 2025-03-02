Array.from(categories).map((category) => {
  const data = {};

  const title = category.querySelector(".field--name-field-award-category-oscars");
  data.title = title.textContent.trim();

  const nominees = category.querySelectorAll(".field--name-field-award-honorees > .field__item");
  const nomineeData = Array.from(nominees).map((nominee) => {
    const data = {};

    const entities = nominee.querySelectorAll(".field--name-field-award-entities");
    if (entities.length > 0) {
      data.entities = Array.from(entities).map((entity) => entity.textContent.trim().split(/, | and /));
    } else {
      console.warn(`No entities found for category ${title}.`);
    }

    const films = nominee.querySelectorAll(".field--name-field-award-film");
    if (films.length > 0) {
      data.films = Array.from(films).map((film) => film.textContent.trim().split(/, | and /));
    } else {
      console.warn(`No films found for category ${title}.`);
    }

    return data;
  });

  data.nominees = nomineeData;

  return data;
});
