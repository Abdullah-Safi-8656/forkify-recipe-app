import * as modle from './model.js';
import RecipeView from './views/recipeViwer.js';
import searchResult from './views/searchView.js';
import ResultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultView from './views/resultView.js';

// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)
    if (!id) return;
    RecipeView.renderSpiner();

    // Update results view to mark selected search results
    resultView.update(modle.getSearchResultsPage())

    // 1) Loading recipe.
    await modle.loadRecipe(id);

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

    // Render results
    ResultView.render(modle.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(modle.state.search);
  } catch (err) {
    console.log(err);
  }
};

const Pagination = function (goToPage) {
  // Render New result
  ResultView.render(modle.getSearchResultsPage(goToPage));
  // Render initial pagination buttons
  paginationView.render(modle.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings in the state
  modle.UpdateServings(newServings)

  // Update the recipe view
  // RecipeView.render(modle.state.recipe)
  RecipeView.update(modle.state.recipe)

}

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerRenderUpdateServings(controlServings)
  searchResult.addSearchHandler(controlSearchResults);
  paginationView._addHandlerClick(Pagination);
};

init();
