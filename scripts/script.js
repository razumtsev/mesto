const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonEditProfile = profile.querySelector('.button_type_edit-profile');
const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputDescription = formEditProfile.querySelector('.form__input_type_description');
const buttonClosePopupList = document.querySelectorAll('.button_type_close');
const elementsGrid = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('#card-template').content;

const addCardPrepend = card => elementsGrid.prepend(card);

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

initialCards.forEach(item => addCardPrepend(createCard(item)));





function closePopup() {
  popupList.forEach(function(item) {
    item.classList.remove('popup_is-open');
  })
}

const openPopup = (popupName) => {
  popupName.classList.add('popup_is-open');
}

buttonEditProfile.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonClosePopupList.forEach(function(button) {
  button.addEventListener('click', closePopup);
});

formEditProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
});
