import CustomAutonomousElement from '../custom-autonomous-element.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';
import GlobalOptions from '../../../helpers/global-options.js';

import HeadingStats from '../containers/heading-stats.js';
import TopStats from '../containers/top-stats.js';
import BottomStats from '../containers/bottom-stats.js';

export default class StatBlock extends CustomAutonomousElement {
  static get elementName() { return 'stat-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block',
      'src/html/elements/autonomous/containers/stat-block.html');
  }

  constructor(parent = null) {
    super(StatBlock.templatePaths, parent);

    if (isRunningInNode) {
      this.headingStats = new HeadingStats();
      this.topStats = new TopStats();
      this.bottomStats = new BottomStats();
    } else {
      this.headingStats = document.querySelector('heading-stats');
      this.topStats = document.querySelector('top-stats');
      this.bottomStats = document.querySelector('bottom-stats');
    }
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('creatureNameChanged', this.onCreatureNameChanged);
      this.addEventListener('abilityScoreChanged', this.onAbilityScoreChanged);
      this.addEventListener('proficiencyBonusChanged', this.onProficiencyBonusChanged);
      this.addEventListener('skillChanged', this.onSkillChanged);

      this.isInitialized = true;
    }
  }

  onCreatureNameChanged() {
    this.reparseBlockSections();
  }

  onAbilityScoreChanged() {
    const abilityName = event.detail.abilityName;

    if (abilityName === 'constitution') {
      this.topStats.basicStats.sections.get('hitPoints').updateView();
    } else if (abilityName === 'wisdom') {
      this.topStats.advancedStats.sections.get('senses').updateView();
    }

    const savingThrowsSection = this.topStats.advancedStats.sections.get('savingThrows');
    const skillsSection = this.topStats.advancedStats.sections.get('skills');

    savingThrowsSection.updateViewSavingThrow(abilityName);
    savingThrowsSection.updateViewText();

    skillsSection.updateViewSkillsByAbility(abilityName);
    skillsSection.updateViewText();

    this.reparseBlockSections();
  }

  onProficiencyBonusChanged() {
    this.topStats.advancedStats.sections.get('savingThrows').updateView();
    this.topStats.advancedStats.sections.get('skills').updateView();
    this.topStats.advancedStats.sections.get('senses').updateView();

    this.reparseBlockSections();
  }

  onSkillChanged() {
    const skillName = event.detail.skillName;

    if (skillName === 'perception') {
      this.topStats.advancedStats.sections.get('senses').updateView();
    }
  }

  setColumns(columns) {
    if (columns === 1) {
      delete this.dataset.twoColumn;
    } else if (columns === 2) {
      this.dataset.twoColumn = '';
    }
  }

  setColumnHeight(mode, height) {
    if (mode === 'auto') {
      this.removeAttribute('style');
    } else if (mode === 'manual') {
      this.setAttribute('style', `--statblock-content-height: ${height}px;`);
    }
  }

  setEmptySectionsVisibility(visibility) {
    this.topStats.advancedStats.setEmptySectionsVisibility(visibility);
    this.bottomStats.setEmptySectionsVisibility(visibility);
  }

  editAllSections() {
    // Edit in reverse order so that the title section is the last to gain focus
    this.bottomStats.editAllSections();
    this.topStats.editAllSections();
    this.headingStats.editAllSections();
  }

  saveAllSections() {
    this.bottomStats.saveAllSections();
    this.topStats.saveAllSections();
    this.headingStats.saveAllSections();
  }

  reparseBlockSections() {
    this.bottomStats.reparseAllSections();
  }

  exportToJson() {
    const jsObject = {};

    Object.assign(jsObject, this.headingStats.exportToJson());
    Object.assign(jsObject, this.topStats.exportToJson());
    Object.assign(jsObject, this.bottomStats.exportToJson());

    return jsObject;
  }

  exportToHtml() {
    const statBlockElement = document.createElement('stat-block');

    const headingStats = this.headingStats.exportToHtml();
    const topStats = this.topStats.exportToHtml();
    const bottomStats = this.bottomStats.exportToHtml();

    statBlockElement.appendChild(headingStats);
    statBlockElement.appendChild(topStats);
    statBlockElement.appendChild(bottomStats);

    if (GlobalOptions.columns === 2) {
      statBlockElement.dataset.twoColumn = '';

      if (GlobalOptions.twoColumnMode === 'manual') {
        statBlockElement.setAttribute('style', `--data-content-height: ${GlobalOptions.twoColumnHeight}px`);
      }
    }

    return statBlockElement;
  }

  exportToHomebrewery() {
    let blockHeader = '___';
    if (GlobalOptions.columns === 2) {
      blockHeader += '\n___';
    }

    const headingStats = this.headingStats.exportToHomebrewery();
    const topStats = this.topStats.exportToHomebrewery();
    const bottomStats = this.bottomStats.exportToHomebrewery();

    return `${blockHeader}\n${headingStats}\n${topStats}\n${bottomStats}`;
  }
}
