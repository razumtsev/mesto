let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let inputName = document.querySelector('.popup__input_name');
let inputOccupation = document.querySelector('.popup__input_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

function openPopup() {
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
  popup.classList.add('popup_opened');
  console.log(inputName.value);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveInfo() {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', saveInfo);

