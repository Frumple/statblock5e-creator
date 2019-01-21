class HtmlTemplates {
  constructor() {
    this.templates = {};
  }

  async addTemplate(name, path) {
    let content =
      await fetch(path).then(stream => stream.text());

    let contentNode =
      document.createRange().createContextualFragment(content);

    this.templates[name] = contentNode;
  }

  getTemplate(name) {
    return this.templates[name];
  }
}

export default new HtmlTemplates();
