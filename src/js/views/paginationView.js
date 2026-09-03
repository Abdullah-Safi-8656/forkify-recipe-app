import { mark } from 'regenerator-runtime';
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    // Number of pages
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page one and there are no other pages
    if (currPage === 1 && numPages > 1) {
      return `
      <button data-goto= ${currPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
      `;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
     <button data-goto=${currPage - 1} class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
       <span>Page ${currPage - 1}</span>
     </button>
            `;
    }

    // Other page
    if (currPage < numPages) {
      return this._generateMarkupButton();
    }

    // Page one and there are no other pages
    return '';
  }

  _generateMarkupButton() {
    return `
      <button data-goto=${this._data.page - 1} class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
       <span>Page${this._data.page - 1}</span>
     </button>
      
      <button data-goto=${this._data.page + 1} class="btn--inline pagination__btn--next">
        <span>Page${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
       </button>
    `;
  }
}

export default new PaginationView();
