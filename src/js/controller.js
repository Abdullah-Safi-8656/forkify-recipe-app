import * as modle from './model.js';
import recipeViwe from './RecipeView/recipeViwer.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeViwe.renderSpiner();

    // 1) Loading recipe.
    await modle.loadRecipe(id);
    // const { recipe } = modle.state;

    // Rendering recipe
    recipeViwe.render(modle.state.recipe);
  } catch (err) {
    recipeViwe.renderErrorMessage(err.message)
  }
};

const init = function () {
  recipeViwe.addHandlerRender(controlRecipes);
};

init();
