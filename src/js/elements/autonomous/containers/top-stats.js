import StatsContainer from './stats-container.js';
import currentContext from '../../../models/current-context.js';

export default class TopStats extends StatsContainer {
  static get elementName() { return 'top-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'top-stats',
      'src/html/elements/autonomous/containers/top-stats.html');
  }

  constructor() {
    super(TopStats.templatePaths);

    this.sections.set('basicStats', document.querySelector('basic-stats'));
    this.sections.set('abilityScores', document.querySelector('ability-scores-section'));
    this.sections.set('advancedStats', document.querySelector('advanced-stats'));
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

  importFromJson(json) {
    // Import ability scores and proficiency bonus first before other stats
    // that depend on them.
    // (i.e. CON HP, saving throws, skills, passive perception)

    // Special path to import JSON files created with version 0.1.1 or earlier
    if ('attributes' in json) {
      this.sections.get('abilityScores').importFromJson(json.attributes.abilityScores);
      currentContext.creature.challengeRating.proficiencyBonus = json.attributes.proficiencyBonus;
    } else {
      this.sections.get('abilityScores').importFromJson(json.abilityScores);
    }

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

  exportToHomebrewery() {
    const basicStatsExport = this.sections.get('basicStats').exportToHomebrewery();
    const abilityScoresExport = this.sections.get('abilityScores').exportToHomebrewery();
    const advancedStatsExport = this.sections.get('advancedStats').exportToHomebrewery();

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
