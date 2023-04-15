export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemsAppend(element) {
    this._container.append(element);
  }

  addItemsPrepend(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach(item => this._renderer(item));
  }
}
