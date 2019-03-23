import CustomAutonomousElement from '../custom-autonomous-element.js';
import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
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
    let abilityName = event.detail.abilityName;
  
    if (abilityName === 'constitution') {
      this.topStats.basicStats.hitPointsSection.updateHitPoints();
    } else if (abilityName === 'wisdom') {
      this.topStats.advancedStats.sensesSection.updatePassivePerception();
    }

    this.topStats.advancedStats.savingThrowsSection.updateModifiers(abilityName);
    this.topStats.advancedStats.skillsSection.updateModifiers(abilityName);
  }

  onProficiencyBonusChanged() {
    this.topStats.advancedStats.savingThrowsSection.updateModifiers();
    this.topStats.advancedStats.skillsSection.updateModifiers();
    this.topStats.advancedStats.sensesSection.updatePassivePerception();
  }

  onSkillChanged() {
    let skillName = event.detail.skillName;
  
    if (skillName === 'perception') {
      this.topStats.advancedStats.sensesSection.updatePassivePerception();
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

  exportToHtml(title) {
    const doc = HtmlExportDocumentFactory.createInstance();
    const titleElement = doc.querySelector('title');
    const statBlockElement = doc.querySelector('stat-block');

    const headingSection = this.headingSection.exportToHtml();
    const topStats = this.topStats.exportToHtml();
    const bottomStats = this.bottomStats.exportToHtml();

    titleElement.textContent = title;

    statBlockElement.appendChild(headingSection);
    statBlockElement.appendChild(topStats);
    statBlockElement.appendChild(bottomStats);

    if (GlobalOptions.columns === 2) {
      statBlockElement.dataset.twoColumn = '';

      if (GlobalOptions.twoColumnMode === 'manual') {
        statBlockElement.setAttribute('style', `--data-content-height: ${GlobalOptions.twoColumnHeight}px`);
      }
    }

    const doctype = '<!DOCTYPE html>';
    const content = `${doctype}${doc.documentElement.outerHTML}`;
    const beautified_content = html_beautify(content, { indent_size: 2 });

    return beautified_content;
  }

  exportToHomebrewery() {
    // TODO
  }
}
