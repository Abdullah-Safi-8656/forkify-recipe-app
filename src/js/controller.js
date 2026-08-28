const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const url =
  'https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e82b4';

const showRecipe = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(response);
    if (!response.ok)
      throw new Error(`something went wrong please try again later`);

    console.log(data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (err) {
    console.log(err);
  }
};

showRecipe();
