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
  }

  getUserInfo() {
    inputName.value = this._profileName;
    inputDescription.value = this._profileDescription;
  }

  setUserInfo() {
    profileName.textContent = this._profileName;
    profileDescription.textContent = this._profileDescription;
  }
}
