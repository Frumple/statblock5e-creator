import SensesSection from './senses-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import Abilities from '../../../models/abilities.js';
import ProficiencyBonus from '../../../models/proficiency-bonus.js';
import Skills from '../../../models/skills.js';
import Senses from '../../../models/senses.js';
import { nullIfEmptyString } from '../../../helpers/string-formatter.js';

const expectedHeading = 'Senses';

let sensesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SensesSection.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();
  Skills.reset();
  Senses.reset();

  sensesSection = new SensesSection();
  TestCustomElements.initializeSection(sensesSection);
  sensesSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    sensesSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the blindsight field', () => {
    expect(sensesSection).toBeInMode('edit');
    expect(sensesSection.editElements.blindsight).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      sensesSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(sensesSection.editElements.blindsight).toBeDisabled();
      expect(sensesSection.editElements.darkvision).toBeDisabled();
      expect(sensesSection.editElements.tremorsense).toBeDisabled();
      expect(sensesSection.editElements.truesight).toBeDisabled();
      expect(sensesSection.editElements.customText).not.toBeDisabled();

      expect(sensesSection.editElements.customText).toHaveFocus();
      expect(sensesSection.editElements.customText).toBeSelected();
    });

    describe('and the custom text field is populated and the edit section is submitted', () => {
      it('should switch to show mode and save the custom text', () => {
        const customText = 'darkvision 120 ft. (penetrates magical darkness), passive Perception 13';
        inputValueAndTriggerEvent(sensesSection.editElements.customText, customText);

        sensesSection.editElements.submitForm();

        expect(Senses.useCustomText).toBe(true);
        expect(Senses.originalCustomText).toBe(customText);
        expect(Senses.htmlCustomText).toBe(customText);

        expect(sensesSection).toBeInMode('show');
        expect(sensesSection).toShowPropertyLine(expectedHeading, customText);

        expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, customText);
        expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, customText);
      });

      it('should switch to show mode and save the custom text with valid markdown syntax', () => {
        const originalText = '**boldvision 60 ft.**';
        const htmlText = '<strong>boldvision 60 ft.</strong>';
        inputValueAndTriggerEvent(sensesSection.editElements.customText, originalText);

        sensesSection.editElements.submitForm();

        expect(Senses.useCustomText).toBe(true);
        expect(Senses.originalCustomText).toBe(originalText);
        expect(Senses.htmlCustomText).toBe(htmlText);

        expect(sensesSection).toBeInMode('show');
        expect(sensesSection).toShowPropertyLine(expectedHeading, htmlText);

        expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, htmlText);
        expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, originalText);
      });

      it('should switch to show mode and save the custom text with html escaped', () => {
        const originalText = '<strong>boldvision 60 ft.</strong>';
        const htmlText = '&lt;strong&gt;boldvision 60 ft.&lt;/strong&gt;';
        inputValueAndTriggerEvent(sensesSection.editElements.customText, originalText);

        sensesSection.editElements.submitForm();

        expect(Senses.useCustomText).toBe(true);
        expect(Senses.originalCustomText).toBe(originalText);
        expect(Senses.htmlCustomText).toBe(htmlText);

        expect(sensesSection).toBeInMode('show');
        expect(sensesSection).toShowPropertyLine(expectedHeading, htmlText);

        expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, htmlText);
        expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, originalText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(sensesSection.editElements.customText, '');

        sensesSection.editElements.submitForm();

        expect(sensesSection).toBeInMode('edit');
        expect(sensesSection).toHaveError(
          sensesSection.editElements.customText,
          'Senses Custom Text cannot be blank.');
      });

      it('should display an error if the custom text field has invalid markdown syntax', () => {
        inputValueAndTriggerEvent(sensesSection.editElements.customText, 'Here is some __invalid bold text');

        sensesSection.editElements.submitForm();

        expect(sensesSection).toBeInMode('edit');
        expect(sensesSection).toHaveError(
          sensesSection.editElements.customText,
          'Senses Custom Text has invalid Markdown syntax.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      sensesSection.editElements.useCustomText.click();
      sensesSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the blindsight field', () => {
      expect(sensesSection.editElements.blindsight).not.toBeDisabled();
      expect(sensesSection.editElements.darkvision).not.toBeDisabled();
      expect(sensesSection.editElements.tremorsense).not.toBeDisabled();
      expect(sensesSection.editElements.truesight).not.toBeDisabled();
      expect(sensesSection.editElements.customText).toBeDisabled();

      expect(sensesSection.editElements.blindsight).toHaveFocus();
    });

    describe('and the senses fields are populated and the edit section is submitted', () => {
      describe('should switch to show mode and save the fields in the following combinations:', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                | blindsight | darkvision | tremorsense | truesight | expectedText
          ${'all blank'}                             | ${''}      | ${''}      | ${''}       | ${''}     | ${'passive Perception 10'}
          ${'blindsight only'}                       | ${30}      | ${''}      | ${''}       | ${''}     | ${'blindsight 30 ft., passive Perception 10'}
          ${'darkvision only'}                       | ${''}      | ${60}      | ${''}       | ${''}     | ${'darkvision 60 ft., passive Perception 10'}
          ${'tremorsense only'}                      | ${''}      | ${''}      | ${90}       | ${''}     | ${'tremorsense 90 ft., passive Perception 10'}
          ${'truesight only'}                        | ${''}      | ${''}      | ${''}       | ${120}    | ${'truesight 120 ft., passive Perception 10'}
          ${'blindsight + darkvision'}               | ${15}      | ${40}      | ${''}       | ${''}     | ${'blindsight 15 ft., darkvision 40 ft., passive Perception 10'}
          ${'blindsight + tremorsense'}              | ${50}      | ${''}      | ${35}       | ${''}     | ${'blindsight 50 ft., tremorsense 35 ft., passive Perception 10'}
          ${'blindsight + truesight'}                | ${25}      | ${''}      | ${''}       | ${80}     | ${'blindsight 25 ft., truesight 80 ft., passive Perception 10'}
          ${'darkvision + tremorsense'}              | ${''}      | ${45}      | ${100}      | ${''}     | ${'darkvision 45 ft., tremorsense 100 ft., passive Perception 10'}
          ${'darkvision + truesight'}                | ${''}      | ${180}     | ${''}       | ${20}     | ${'darkvision 180 ft., truesight 20 ft., passive Perception 10'}
          ${'tremorsense + truesight'}               | ${''}      | ${''}      | ${75}       | ${35}     | ${'tremorsense 75 ft., truesight 35 ft., passive Perception 10'}
          ${'blindsight + darkvision + tremorsense'} | ${150}     | ${55}      | ${5}        | ${''}     | ${'blindsight 150 ft., darkvision 55 ft., tremorsense 5 ft., passive Perception 10'}
          ${'blindsight + darkvision + truesight'}   | ${65}      | ${10}      | ${''}       | ${0}      | ${'blindsight 65 ft., darkvision 10 ft., truesight 0 ft., passive Perception 10'}
          ${'blindsight + tremorsense + truesight'}  | ${85}      | ${''}      | ${70}       | ${95}     | ${'blindsight 85 ft., tremorsense 70 ft., truesight 95 ft., passive Perception 10'}
          ${'darkvision + tremorsense + truesight'}  | ${''}      | ${105}     | ${110}      | ${115}    | ${'darkvision 105 ft., tremorsense 110 ft., truesight 115 ft., passive Perception 10'}
          ${'all senses'}                            | ${125}     | ${130}     | ${135}      | ${140}    | ${'blindsight 125 ft., darkvision 130 ft., tremorsense 135 ft., truesight 140 ft., passive Perception 10'}
          ${'maximum values'}                        | ${999}     | ${999}     | ${999}      | ${999}    | ${'blindsight 999 ft., darkvision 999 ft., tremorsense 999 ft., truesight 999 ft., passive Perception 10'}
        `
        ('$description: {blindsight="$blindsight", darkvision="$darkvision", tremorsense="$tremorsense", truesight="$truesight"} => "$expectedText"',
        ({blindsight, darkvision, tremorsense, truesight, expectedText}) => {
          inputValueAndTriggerEvent(sensesSection.editElements.blindsight, blindsight);
          inputValueAndTriggerEvent(sensesSection.editElements.darkvision, darkvision);
          inputValueAndTriggerEvent(sensesSection.editElements.tremorsense, tremorsense);
          inputValueAndTriggerEvent(sensesSection.editElements.truesight, truesight);

          sensesSection.editElements.submitForm();

          expect(Senses.blindsight).toBe(nullIfEmptyString(blindsight));
          expect(Senses.darkvision).toBe(nullIfEmptyString(darkvision));
          expect(Senses.tremorsense).toBe(nullIfEmptyString(tremorsense));
          expect(Senses.truesight).toBe(nullIfEmptyString(truesight));
          expect(Senses.useCustomText).toBe(false);

          expect(sensesSection).toBeInMode('show');
          expect(sensesSection).toShowPropertyLine(expectedHeading, expectedText);

          expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});

describe('should calculate the passive perception based on the following conditions:', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                           | wisdomScore | proficiencyBonus | perceptionEnabled | perceptionProficient | perceptionOverride | expectedPassivePerception
    ${'perception disabled, not proficient, no override'} | ${10}       | ${2}             | ${false}          | ${false}             | ${''}              | ${10}
    ${'perception enabled, not proficient, no override'}  | ${10}       | ${2}             | ${true}           | ${false}             | ${''}              | ${10}
    ${'perception enabled, proficient, no override'}      | ${10}       | ${2}             | ${true}           | ${true}              | ${''}              | ${12}
    ${'perception enabled, not proficient, override'}     | ${10}       | ${2}             | ${true}           | ${false}             | ${7}               | ${17}
    ${'perception enabled, proficient, override'}         | ${10}       | ${2}             | ${true}           | ${true}              | ${8}               | ${18}
    ${'- wisdom score and - proficiency bonus'}           | ${3}        | ${-1}            | ${true}           | ${true}              | ${''}              | ${5}
    ${'- wisdom score and 0 proficiency bonus'}           | ${3}        | ${0}             | ${true}           | ${true}              | ${''}              | ${6}
    ${'- wisdom score and + proficiency bonus'}           | ${3}        | ${3}             | ${true}           | ${true}              | ${''}              | ${9}
    ${'0 wisdom score and - proficiency bonus'}           | ${10}       | ${-1}            | ${true}           | ${true}              | ${''}              | ${9}
    ${'0 wisdom score and 0 proficiency bonus'}           | ${10}       | ${0}             | ${true}           | ${true}              | ${''}              | ${10}
    ${'0 wisdom score and + proficiency bonus'}           | ${10}       | ${3}             | ${true}           | ${true}              | ${''}              | ${13}
    ${'+ wisdom score and - proficiency bonus'}           | ${14}       | ${-1}            | ${true}           | ${true}              | ${''}              | ${11}
    ${'+ wisdom score and 0 proficiency bonus'}           | ${14}       | ${0}             | ${true}           | ${true}              | ${''}              | ${12}
    ${'+ wisdom score and + proficiency bonus'}           | ${14}       | ${3}             | ${true}           | ${true}              | ${''}              | ${15}
  `
  ('$description: {wisdomScore="$wisdomScore", proficiencyBonus="$proficiencyBonus", perceptionEnabled="$perceptionEnabled", perceptionProficient="$perceptionProficient", perceptionOverride="$perceptionOverride"} => $expectedPassivePerception',
  ({wisdomScore, proficiencyBonus, perceptionEnabled, perceptionProficient, perceptionOverride, expectedPassivePerception}) => {
    const expectedText = `passive Perception ${expectedPassivePerception}`;

    Abilities.abilities['wisdom'].score = wisdomScore;
    ProficiencyBonus.proficiencyBonus = proficiencyBonus;

    const skill = Skills.skills['perception'];
    skill.isEnabled = perceptionEnabled;
    skill.isProficient = perceptionProficient;
    skill.override = nullIfEmptyString(perceptionOverride);

    sensesSection.updateView();

    expect(Senses.passivePerception).toBe(expectedPassivePerception);

    expect(sensesSection).toShowPropertyLine(expectedHeading, expectedText);

    expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
    expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

    sensesSection.showElements.section.click();

    expect(sensesSection.editElements.passivePerception).toHaveTextContent(expectedPassivePerception);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});