import CustomAutonomousElement from '../custom-autonomous-element.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';
import GlobalOptions from '../../../helpers/global-options.js';

import HeadingSection from '../sections/heading-section.js';
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
      this.headingSection = new HeadingSection();
      this.topStats = new TopStats();
      this.bottomStats = new BottomStats();
    } else {
      this.headingSection = document.querySelector('heading-section');
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
    this.reparseAllSections();
  }
  
  onAbilityScoreChanged() {
    const abilityName = event.detail.abilityName;
  
    if (abilityName === 'constitution') {
      this.topStats.basicStats.hitPointsSection.updateView();
    } else if (abilityName === 'wisdom') {
      this.topStats.advancedStats.sensesSection.updateView();
    }

    this.topStats.advancedStats.savingThrowsSection.updateViewSavingThrow(abilityName);
    this.topStats.advancedStats.savingThrowsSection.updateViewText();


    this.topStats.advancedStats.skillsSection.updateViewSkillsByAbility(abilityName);
    this.topStats.advancedStats.skillsSection.updateViewText();
  }

  onProficiencyBonusChanged() {
    this.topStats.advancedStats.savingThrowsSection.updateView();
    this.topStats.advancedStats.skillsSection.updateView();
    this.topStats.advancedStats.sensesSection.updateView();
  }

  onSkillChanged() {
    const skillName = event.detail.skillName;
  
    if (skillName === 'perception') {
      this.topStats.advancedStats.sensesSection.updateView();
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
    this.topStats.editAllSections();
    this.bottomStats.editAllSections();
    this.headingSection.edit();
  }

  saveAllSections() {    
    this.topStats.saveAllSections();
    this.bottomStats.saveAllSections();
    this.headingSection.save();
  }

  reparseAllSections() {
    this.bottomStats.reparseAllSections();
  }

  exportToJson() {
    // TODO
  }

  exportToHtml() {
    const statBlockElement = document.createElement('stat-block');

    const headingSection = this.headingSection.exportToHtml();
    const topStats = this.topStats.exportToHtml();
    const bottomStats = this.bottomStats.exportToHtml();

    statBlockElement.appendChild(headingSection);
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

    const headingSection = this.headingSection.exportToHomebrewery();
    const topStats = this.topStats.exportToHomebrewery();
    const bottomStats = this.bottomStats.exportToHomebrewery();

    return `${blockHeader}\n${headingSection}\n${topStats}\n${bottomStats}`;
  }
}
