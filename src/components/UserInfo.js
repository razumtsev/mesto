export default class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }

  setUserAvatar({name, avatar}) {
    this._userAvatar.src = avatar;
    this._userAvatar.alt = name;
  }
}
