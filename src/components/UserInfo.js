export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    }
  }

  setUserInfo({name, info}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
