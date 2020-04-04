class LocalStorageProxy {
  constructor() {
    this.jsonKey = 'json';
    this.localSettingsKey = 'localSettings';
  }

  loadJson() {
    return localStorage.getItem(this.jsonKey);
  }

  saveJson(json) {
    localStorage.setItem(this.jsonKey, json);
  }

  clearJson() {
    localStorage.removeItem(this.jsonKey);
  }

  loadLocalSettings() {
    return localStorage.getItem(this.localSettingsKey);
  }

  saveLocalSettings(localSettings) {
    localStorage.setItem(this.localSettingsKey, localSettings);
  }

  clearLocalSettings() {
    localStorage.removeItem(this.localSettingsKey);
  }
}

export default new LocalStorageProxy();