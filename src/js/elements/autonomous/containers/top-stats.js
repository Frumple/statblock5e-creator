import StatsContainer from './stats-container.js';

export default class TopStats extends StatsContainer {
  static get elementName() { return 'top-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'top-stats',
      'src/html/elements/autonomous/containers/top-stats.html');
  }

  constructor() {
    super(TopStats.templatePaths);

    this.sections.set('basicStats', this.shadowRoot.querySelector('basic-stats'));
    this.sections.set('abilityScores', this.shadowRoot.querySelector('ability-scores-section'));
    this.sections.set('advancedStats', this.shadowRoot.querySelector('advanced-stats'));
  }

  updateHitPointsView() {
    this.sections.get('basicStats').updateHitPointsView();
  }

  updateSavingThrowsView(abilityName) {
    this.sections.get('advancedStats').updateSavingThrowsView(abilityName);
  }

  updateSkillsView(abilityName) {
    this.sections.get('advancedStats').updateSkillsView(abilityName);
  }

  updateSensesView() {
    this.sections.get('advancedStats').updateSensesView();
  }

  // Ability scores and proficiency bonus must be imported before other stats
  // that depend on them, such as:
  // Constitution hit points, saving throws, skills, and passive perception
  importFromOpen5e(json) {
    this.sections.get('abilityScores').importFromOpen5e(json);
    this.sections.get('advancedStats').importFromOpen5e(json);
    this.sections.get('basicStats').importFromOpen5e(json);
  }

  importFromJson(json) {
    this.sections.get('abilityScores').importFromJson(json.abilityScores);
    this.sections.get('advancedStats').importFromJson(json);
    this.sections.get('basicStats').importFromJson(json);
  }

  exportToJson() {
    const json = {};

    Object.assign(json, this.sections.get('basicStats').exportToJson());
    json.abilityScores = this.sections.get('abilityScores').exportToJson();
    Object.assign(json, this.sections.get('advancedStats').exportToJson());

    return json;
  }

  exportToHtml() {
    const topStats = document.createElement('top-stats');

    const basicStatsExport = this.sections.get('basicStats').exportToHtml();
    const abilityScoresExport = this.sections.get('abilityScores').exportToHtml();
    const advancedStatsExport = this.sections.get('advancedStats').exportToHtml();

    topStats.appendChild(basicStatsExport);
    topStats.appendChild(abilityScoresExport);
    topStats.appendChild(advancedStatsExport);

    return topStats;
  }

  exportToMarkdown() {
    const basicStatsExport = this.sections.get('basicStats').exportToMarkdown();
    const abilityScoresExport = this.sections.get('abilityScores').exportToMarkdown();
    const advancedStatsExport = this.sections.get('advancedStats').exportToMarkdown();

    const text =
`>___
${basicStatsExport}
>___
${abilityScoresExport}
>___
${advancedStatsExport}
>___`;

    return text;
  }
}
