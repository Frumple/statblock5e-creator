export default class Open5eClient {
  constructor() {
    this.cachedCreatureLists = new Map();
  }

  static getCreatureListUrl(documentSlug) {
    return `https://api.open5e.com/monsters/?format=json&fields=name,slug&limit=1000&document__slug=${documentSlug}`;
  }

  static getCreatureUrl(creatureSlug) {
    return `https://api.open5e.com/monsters/${creatureSlug}`;
  }

  async loadCreatureList(documentSlug) {
    if (this.cachedCreatureLists.has(documentSlug)) {
      return this.cachedCreatureLists.get(documentSlug);
    }

    const url = Open5eClient.getCreatureListUrl(documentSlug);
    const json = await fetch(url).then(response => response.json());
    const results = json.results;

    this.cachedCreatureLists.set(documentSlug, results);
    return results;
  }

  async loadCreature(creatureSlug) {
    const url = Open5eClient.getCreatureUrl(creatureSlug);
    return await fetch(url).then(response => response.json());
  }
}