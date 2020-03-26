class LocalStorageProxy {
  constructor() {
    this.localStorageKey = 'json';
  }

  save(json) {
    localStorage.setItem(this.localStorageKey, json);
  }

  load() {
    return localStorage.getItem(this.localStorageKey);
  }

  clear() {
    localStorage.removeItem(this.localStorageKey);
  }
}

export default new LocalStorageProxy();