// очень глобальные переменные
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// модальное окно редактирования профиля
const buttonEditProfile = profile.querySelector('.button_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputDescription = formEditProfile.querySelector('.form__input_type_description');
// модальное окно добавления карточки
const buttonAddCard = profile.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.form_type_add-card');
const inputCardName = formAddCard.querySelector('.form__input_type_card-name');
const inputCardLink = formAddCard.querySelector('.form__input_type_card-link');
// закрытие попапов
const popupList = document.querySelectorAll('.popup');
const buttonClosePopupList = document.querySelectorAll('.button_type_close');
// темплейт карточки
const elementsGrid = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('#card-template').content;


// создание и добавление карточки на страницу
const addCardPrepend = card => elementsGrid.prepend(card);

const addCardAppend = card => elementsGrid.append(card);

const handleLikeClick = evt => evt.target.classList.toggle('card__like_is-active');

const createCard = item => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const link = card.querySelector('.card__image');
  const name = card.querySelector('.card__caption');
  const like = card.querySelector('.card__like')
  link.src = item.link;
  link.alt = item.name;
  name.textContent = item.name;
  like.addEventListener('click', handleLikeClick);
  return card;
}

initialCards.forEach(item => addCardAppend(createCard(item)));



// прочее неструктурированное

// закрытие модальных окон
const closePopup = () => popupList.forEach(item => item.classList.remove('popup_is-open'));

buttonClosePopupList.forEach(button => button.addEventListener('click', closePopup));

// открытие модальных окон
const openPopup = (popupName) => {
  popupName.classList.add('popup_is-open');
}

// обработчики событий

buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
});

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

formAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  const cardEssence = {};
  cardEssence.name = inputCardName.value;
  cardEssence.link = inputCardLink.value;
  addCardPrepend(createCard(cardEssence));
  closePopup();
});
