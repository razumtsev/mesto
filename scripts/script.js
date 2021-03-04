let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container')
let editProfile = document.querySelector('.button_type_edit-profile');
let closeButton = document.querySelector('.button_type_close');
let saveButton = document.querySelector('.button_type_save');
let inputName = document.querySelector('.popup__input_type_name');
let inputOccupation = document.querySelector('.popup__input_type_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

function openPopup() {
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup();
}

editProfile.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);