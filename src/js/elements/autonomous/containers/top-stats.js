import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class TopStats extends CustomAutonomousElement {
  static get elementName() { return 'top-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'top-stats',
      'src/html/elements/autonomous/containers/top-stats.html');
  }

  constructor() {
    super(TopStats.templatePaths);

    this.basicStats = document.querySelector('basic-stats');
    this.abilityScoresSection = document.querySelector('ability-scores-section');
    this.advancedStats = document.querySelector('advanced-stats');
  }

  editAllSections() {
    this.basicStats.editAllSections();
    this.abilityScoresSection.edit();
    this.advancedStats.editAllSections();
  }

  saveAllSections() {
    this.basicStats.saveAllSections();
    this.abilityScoresSection.save();
    this.advancedStats.saveAllSections();
  }

  exportToHtml() {
    const topStats = document.createElement('top-stats');

    const basicStatsExport = this.basicStats.exportToHtml();
    const abilityScoresExport = this.abilityScoresSection.exportToHtml();
    const advancedStatsExport = this.advancedStats.exportToHtml();

    topStats.appendChild(basicStatsExport);
    topStats.appendChild(abilityScoresExport);
    topStats.appendChild(advancedStatsExport);
    
    return topStats;
  }

  exportToHomebrewery() {
    const basicStatsExport = this.basicStats.exportToHomebrewery();
    const abilityScoresExport = this.abilityScoresSection.exportToHomebrewery();
    const advancedStatsExport = this.advancedStats.exportToHomebrewery();

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
