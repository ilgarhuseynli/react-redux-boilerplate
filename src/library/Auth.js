export class Auth {
  static data = null;

  static get(key) {
    return this.data ? this.data[key] : null;
  }
  static getData() {
    return this.data;
  }
  static getPermission(key) {
    return this.data?.permissions[key] || false;
  }
  static setData(data) {
    this.data = {
      ...this.data,
      ...data,
    };
  }
  static isAuth() {
    return !!this.getData()._id;
  }
  static isPermitted(view, action, selected = false) {
    let permission = this.data?.permissions[`${view}_${action}`];
    if (selected) {
      let selectedViews = (permission && permission.selected) || [];
      return selectedViews.includes(selected);
    } else {
      return permission?.allow;
    }
  }
  static checkFullPermission(key, selected = false) {
    let permission = this.data?.permissions[key];
    if (selected) {
      let selectedViews = (permission && permission.selected) || [];
      return selectedViews.includes(selected);
    } else {
      return permission?.allow;
    }
  }
}
