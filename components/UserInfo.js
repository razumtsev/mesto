import {
  profileName,
  profileDescription,
  inputName,
  inputDescription,
} from "../utils/constants.js";
export default class UserInfo {
  constructor({ name, description }) {
    this._profileName = name;
    this._profileDescription = description;
    this._markupProfileName = profileName;
    this._markupProfileDescription = profileDescription;
  }

  getUserInfo() {
    inputName.value = this._profileName;
    inputDescription.value = this._profileDescription;
  }

  setUserInfo() {
    this._markupProfileName.textContent = this._profileName;
    this._markupProfileDescription.textContent = this._profileDescription;
  }
}
