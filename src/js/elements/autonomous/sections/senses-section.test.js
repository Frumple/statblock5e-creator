import SensesSection from './senses-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { nullIfEmptyString } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const expectedHeading = 'Senses';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const skillsModel = CurrentContext.creature.skills;
const sensesModel = CurrentContext.creature.senses;

let sensesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SensesSection.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  skillsModel.reset();
  sensesModel.reset();

  sensesSection = new SensesSection();
  TestCustomElements.initializeSection(sensesSection);
  sensesSection.connect();
});

it('show section should have default values', () => {
  verifyShowModeView();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    sensesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
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
      expect(sensesSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        sensesSection.editElements.useCustomText,
        ['customText'],
        ['blindsight', 'darkvision', 'tremorsense', 'truesight']
      );

      expect(sensesSection.editElements.customText).toHaveFocus();
      expect(sensesSection.editElements.customText).toBeSelected();
    });

    describe('and the custom text field is populated and the edit section is submitted', () => {
      describe('should switch to show mode and save the custom text', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
        description                                 | customText                                                                   | expectedHtmlText
        ${'plain custom text'}                      | ${'darkvision 120 ft. (penetrates magical darkness), passive Perception 13'} | ${'darkvision 120 ft. (penetrates magical darkness), passive Perception 13'}
        ${'custom text with valid markdown syntax'} | ${'**boldvision 60 ft.**'}                                                   | ${'<strong>boldvision 60 ft.</strong>'}
        ${'custom text with html tags escaped'}     | ${'<strong>boldvision 60 ft.</strong>'}                                      | ${'&lt;strong&gt;boldvision 60 ft.&lt;/strong&gt;'}
        `
        ('$description: $customText => $expectedHtmlText',
        ({customText, expectedHtmlText}) => {
          const expectedValues = {
            useCustomText: true,
            customText: customText,
            htmlCustomText: expectedHtmlText
          };

          inputValueAndTriggerEvent(sensesSection.editElements.customText, customText);

          sensesSection.editElements.submitForm();

          expect(sensesSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);

          const json = verifyJsonExport(expectedValues);
          expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, expectedHtmlText);
          expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, customText);

          reset();
          sensesSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the custom text if submitted with the custom text checkbox unchecked', () => {
        const expectedValues = {
          useCustomText: false,
          customText: '60 ft. echolocation'
        };

        inputValueAndTriggerEvent(sensesSection.editElements.customText, expectedValues.customText);

        sensesSection.editElements.useCustomText.click();
        sensesSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();

        const json = verifyJsonExport(expectedValues);

        reset();
        sensesSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();
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
      expect(sensesSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        sensesSection.editElements.useCustomText,
        ['customText'],
        ['blindsight', 'darkvision', 'tremorsense', 'truesight']
      );

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
          const expectedValues = {
            blindsight: nullIfEmptyString(blindsight),
            darkvision: nullIfEmptyString(darkvision),
            tremorsense: nullIfEmptyString(tremorsense),
            truesight: nullIfEmptyString(truesight)
          };

          inputValueAndTriggerEvent(sensesSection.editElements.blindsight, blindsight);
          inputValueAndTriggerEvent(sensesSection.editElements.darkvision, darkvision);
          inputValueAndTriggerEvent(sensesSection.editElements.tremorsense, tremorsense);
          inputValueAndTriggerEvent(sensesSection.editElements.truesight, truesight);

          sensesSection.editElements.submitForm();

          expect(sensesSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);

          const json = verifyJsonExport(expectedValues);
          expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

          reset();
          sensesSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the speeds if submitted with the custom text checkbox checked', () => {
        const expectedValues = {
          blindsight: 10,
          darkvision: 20,
          tremorsense: 30,
          truesight: 40,
          useCustomText: true,
          customText: 'This custom text should be __saved__, but not shown.',
          htmlCustomText: 'This custom text should be <strong>saved</strong>, but not shown.'
        };

        inputValueAndTriggerEvent(sensesSection.editElements.blindsight, expectedValues.blindsight);
        inputValueAndTriggerEvent(sensesSection.editElements.darkvision, expectedValues.darkvision);
        inputValueAndTriggerEvent(sensesSection.editElements.tremorsense, expectedValues.tremorsense);
        inputValueAndTriggerEvent(sensesSection.editElements.truesight, expectedValues.truesight);
        sensesSection.editElements.useCustomText.click();
        inputValueAndTriggerEvent(sensesSection.editElements.customText, expectedValues.customText);

        sensesSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);

        const json = verifyJsonExport(expectedValues);

        reset();
        sensesSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
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

    abilitiesModel.abilities['wisdom'].score = wisdomScore;
    challengeRatingModel.proficiencyBonus = proficiencyBonus;

    const skill = skillsModel.skills['perception'];
    skill.isEnabled = perceptionEnabled;
    skill.isProficient = perceptionProficient;
    skill.override = nullIfEmptyString(perceptionOverride);

    sensesSection.updateViewOnAttributeChange();

    expect(sensesModel.passivePerception).toBe(expectedPassivePerception);

    verifyShowModeView(expectedText);

    expect(sensesSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
    expect(sensesSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

    sensesSection.showElements.section.click();

    expect(sensesSection.editElements.passivePerception).toHaveTextContent(expectedPassivePerception);
  });
  /* eslint-enable indent, no-unexpected-multiline */
});

function reset() {
  sensesModel.reset();
  sensesSection.updateView();
}

function verifyModel({
  blindsight = null,
  darkvision = null,
  tremorsense = null,
  truesight = null,
  useCustomText = false,
  customText = '',
  htmlCustomText = ''
} = {}) {
  expect(sensesModel.blindsight).toBe(blindsight);
  expect(sensesModel.darkvision).toBe(darkvision);
  expect(sensesModel.tremorsense).toBe(tremorsense);
  expect(sensesModel.truesight).toBe(truesight);
  expect(sensesModel.useCustomText).toBe(useCustomText);
  expect(sensesModel.customText).toBe(customText);
  expect(sensesModel.htmlCustomText).toBe(htmlCustomText);
}

function verifyEditModeView({
  blindsight = null,
  darkvision = null,
  tremorsense = null,
  truesight = null,
  passivePerception = 10,
  useCustomText = false,
  customText = ''
} = {}) {
  expect(sensesSection.editElements.blindsight).toHaveValue(blindsight);
  expect(sensesSection.editElements.darkvision).toHaveValue(darkvision);
  expect(sensesSection.editElements.tremorsense).toHaveValue(tremorsense);
  expect(sensesSection.editElements.truesight).toHaveValue(truesight);
  expect(sensesSection.editElements.passivePerception).toHaveTextContent(passivePerception);
  expect(sensesSection.editElements.useCustomText.checked).toBe(useCustomText);
  expect(sensesSection.editElements.customText).toHaveValue(customText);

  expect(sensesSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
    sensesSection.editElements.useCustomText,
    ['customText'],
    ['blindsight', 'darkvision', 'tremorsense', 'truesight']
  );
}

function verifyShowModeView(expectedText = 'passive Perception 10') {
  expect(sensesSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport({
  blindsight = null,
  darkvision = null,
  tremorsense = null,
  truesight = null,
  useCustomText = false,
  customText = ''
} = {}) {
  const json = sensesSection.exportToJson();
  const expectedJson = {
    blindsight: blindsight,
    darkvision: darkvision,
    tremorsense: tremorsense,
    truesight: truesight,
    useCustomText: useCustomText,
    customText: customText
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}