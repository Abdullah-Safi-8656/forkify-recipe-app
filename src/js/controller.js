import * as modle from './model.js';
import recipeViwe from './RecipeView/recipeViwer.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


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



const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeViwe.renderSpiner();

    // 1) Loading recipe.
    await modle.loadRecipe(id);
    const { recipe } = modle.state;

    // Rendering recipe
    recipeViwe.render(modle.state.recipe);

  } catch (err) {
    recipeContainer.innerHTML = '';
    alert(err);
  }
};

// showRecipe();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controllerRecipe));
