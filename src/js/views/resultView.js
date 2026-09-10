import View from './view';
import previewView from './previewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');

  _ErrorMessage = 'No recipe found for your query! Please try again ;)';
  _SuccessMessage = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();