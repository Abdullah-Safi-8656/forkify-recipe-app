import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { GetJson } from './helper.js';



export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await GetJson(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookMarks.some(bookmark => bookmark.id === id)){
      state.recipe.bookMarked = true
    } else {
      state.recipe.bookMarked = false
    }

  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    
    const data = await GetJson(`${API_URL}?search=${encodeURIComponent(query)}`);
    
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    // alert(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const UpdateServings = function (newServings) {
   state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // NewQt = (Old quantity * newServings) / Old servings
  });


  // Updating the number of servings
  state.recipe.servings = newServings;
};



const presistBookmark = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
}

export const addBookMarks = function(recipe) {
  // Add bookmarks
  state.bookMarks.push(recipe);


  // Mark current recipe as a bookMark
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;

  presistBookmark()
}


export const deleteBookmark = function(id) {
  // Delete bookmark
  const index = state.bookMarks.findIndex(el => el.id === id);
  state.bookMarks.splice(index, 1);

  // Mark current recipe NOT as a bookMark
  if (id === state.recipe.id) state.recipe.bookMarked = false;

  presistBookmark() 

}

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookMarks = JSON.parse(storage)

}

init()
console.log(state.bookMarks)
