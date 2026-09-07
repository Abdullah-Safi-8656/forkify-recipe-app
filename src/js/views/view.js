import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const Newmarkup = this._generateMarkup();

    const NewDom = document.createRange().createContextualFragment(Newmarkup);
    const newElements = Array.from(NewDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates Changed text
      if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      // Updates Changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpiner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderErrorMessage(message = this._ErrorMessage) {
    const markup = `
        <div class="error">
        <div>
        <svg>
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div>
        
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message = this._SuccessMessage) {
    const markup = `
        <div class="message">
        <div>
        <svg>
        <use href="${icons}icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div>
        
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
