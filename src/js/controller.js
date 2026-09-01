import * as modle from './model.js';
import RecipeView from './views/recipeViwer.js';
import searchResult from './views/searchView.js';
import ResultView from './views/resultView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept()
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    RecipeView.renderSpiner();

    // 1) Loading recipe.
    await modle.loadRecipe(id);
    // const { recipe } = modle.state;

    // Rendering recipe
    RecipeView.render(modle.state.recipe);
  } catch (err) {
    RecipeView.renderErrorMessage(err.message);
  }
};

const controlSearchResults = async function () {
  try {
    // rendering the spinner
    ResultView.renderSpiner();

    // getting search query
    const query = searchResult.getQuery();
    if (!query) return;
    // calling loadSearchResults from modle module
    await modle.loadSearchResults(query);
    // console.log(modle.state.search.results);
    ResultView.render(modle.state.search.results)
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  searchResult.addSearchHandler(controlSearchResults);
};

init();
