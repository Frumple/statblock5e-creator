import TitleSection from './title-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import CurrentContext from '../../../models/current-context.js';

const titleModel = CurrentContext.creature.title;

let titleSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await TitleSection.define();
});

beforeEach(() => {
  titleModel.reset();

  titleSection = new TitleSection();
  TestCustomElements.initializeSection(titleSection);
  titleSection.connect();
});

it('show section should have default values', () => {
  expect(titleSection.showElements.title).toHaveTextContent('Commoner');
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    titleSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
  });

  it('should switch to edit mode and focus on the title field', () => {
    expect(titleSection).toBeInMode('edit');
    expect(titleSection.editElements.fullName).toHaveFocus();
    expect(titleSection.editElements.fullName).toBeSelected();
  });

  describe('and creature name, short name, and/or the proper noun checkbox is changed', () => {
    describe('should save the changes, the grammatical name used in block list sections should be correct, and should fire a creatureNameChanged event', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                  | creatureName           | shortName      | isProperNoun | expectedGrammaticalName
        ${'no changes'}                              | ${''}                  | ${''}          | ${false}     | ${'the commoner'}
        ${'creature name'}                           | ${'Bullywug'}          | ${''}          | ${false}     | ${'the bullywug'}
        ${'short name'}                              | ${''}                  | ${'peasant'}   | ${false}     | ${'the peasant'}
        ${'creature name + short name'}              | ${'Beholder Zombie'}   | ${'zombie'}    | ${false}     | ${'the zombie'}
        ${'no changes, proper noun'}                 | ${''}                  | ${''}          | ${true}      | ${'Commoner'}
        ${'creature name, proper noun'}              | ${'Tiamat'}            | ${''}          | ${true}      | ${'Tiamat'}
        ${'short name, proper noun'}                 | ${''}                  | ${'Bob'}       | ${true}      | ${'Bob'}
        ${'creature name + short name, proper noun'} | ${'Lady Kima of Vord'} | ${'Lady Kima'} | ${true}      | ${'Lady Kima'}
      `
      ('$description: {creatureName="$creatureName", shortName="$shortName", isProperNoun="$isProperNoun"} => expectedGrammaticalName',
      ({creatureName, shortName, isProperNoun, expectedGrammaticalName}) => {
        let expectedCreatureName = 'Commoner';
        let expectedShortName = '';

        let receivedEvent = null;
        titleSection.addEventListener('creatureNameChanged', (event) => {
          receivedEvent = event;
        });

        if (creatureName !== '') {
          expectedCreatureName = creatureName;
          inputValueAndTriggerEvent(titleSection.editElements.fullName, creatureName);
        }
        if (shortName !== '') {
          expectedShortName = shortName;
          inputValueAndTriggerEvent(titleSection.editElements.shortName, shortName);
        }
        if (isProperNoun) {
          titleSection.editElements.properNoun.click();
        }

        expect(titleModel.fullName).toBe(expectedCreatureName);
        expect(titleModel.shortName).toBe(expectedShortName);
        expect(titleModel.isProperNoun).toBe(isProperNoun);
        expect(titleModel.grammaticalName).toBe(expectedGrammaticalName);

        if (creatureName !== '' || shortName !== '' || isProperNoun) {
          expect(receivedEvent).not.toBeNull();
          expect(receivedEvent.detail.creatureName).toBe(expectedCreatureName);
          expect(receivedEvent.detail.shortName).toBe(expectedShortName);
          expect(receivedEvent.detail.isProperNoun).toBe(isProperNoun);
        } else {
          expect(receivedEvent).toBeNull();
        }
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and fields are populated and the edit section is submitted', () => {
    describe('should switch to show mode and save the creature full name, short name, and whether it is a proper noun', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                   | fullName                 | shortName       | isProperNoun
        ${'full name only'}                           | ${'Aboleth'}             | ${''}           | ${false}
        ${'full name and short name'}                 | ${'Adult Copper Dragon'} | ${'dragon'}     | ${false}
        ${'full name, is proper noun'}                | ${'Tiamat'}              | ${''}           | ${true}
        ${'full name and short name, is proper noun'} | ${'Lady Kima of Vord'}   | ${'Lady Kima'}  | ${true}
      `
      ('$description: {fullName="$fullName", shortName="$shortName", isProperNoun="$isProperNoun"}',
      ({fullName, shortName, isProperNoun}) => {
        inputValueAndTriggerEvent(titleSection.editElements.fullName, fullName);
        inputValueAndTriggerEvent(titleSection.editElements.shortName, shortName);
        inputValueAndTriggerEvent(titleSection.editElements.properNoun, isProperNoun);

        titleSection.editElements.submitForm();

        expect(titleSection).toBeInMode('show');

        verifyModel(fullName, shortName, isProperNoun);
        verifyEditModeView(fullName, shortName, isProperNoun);
        verifyShowModeView(fullName);

        const json = verifyJsonExport(fullName, shortName, isProperNoun);
        verifyHtmlExport(fullName);
        verifyMarkdownExport(fullName);

        reset();
        titleSection.importFromJson(json);

        verifyModel(fullName, shortName, isProperNoun);
        verifyEditModeView(fullName, shortName, isProperNoun);
        verifyShowModeView(fullName);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    describe('the creature name should have the following behaviours', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                             | fullName              | expectedFullName
        ${'should capitalize the first letter'} | ${'young red dragon'} | ${'Young red dragon'}
        ${'should trim whitespace'}             | ${'  Purple Worm '}   | ${'Purple Worm'}
      `
      ('$description: $fullName => $expectedFullName',
      ({fullName, expectedFullName}) => {
        inputValueAndTriggerEvent(titleSection.editElements.fullName, fullName);

        titleSection.editElements.submitForm();

        expect(titleSection).toBeInMode('show');

        verifyModel(expectedFullName);
        verifyEditModeView(expectedFullName);
        verifyShowModeView(expectedFullName);

        const json = verifyJsonExport(expectedFullName);
        verifyHtmlExport(expectedFullName);
        verifyMarkdownExport(expectedFullName);

        reset();
        titleSection.importFromJson(json);

        verifyModel(expectedFullName);
        verifyEditModeView(expectedFullName);
        verifyShowModeView(expectedFullName);
      });
    /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should display an error if the creature name field is blank', () => {
      inputValueAndTriggerEvent(titleSection.editElements.fullName, '');

      titleSection.editElements.submitForm();

      expect(titleSection).toBeInMode('edit');
      expect(titleSection).toHaveError(
        titleSection.editElements.fullName,
        'Creature Name cannot be blank.');
    });
  });
});

describe('when importing from Open5e', () => {
  it('should import the title', () => {
    const json = {
      'name': 'Adult Black Dragon'
    };

    titleSection.importFromOpen5e(json);

    verifyModel(json.name);
    verifyEditModeView(json.name);
    verifyShowModeView(json.name);
  });
});

function reset() {
  titleModel.reset();
  titleSection.updateView();
}

function verifyModel(expectedFullName, expectedShortName = '', expectedIsProperNoun = false) {
  expect(titleModel.fullName).toBe(expectedFullName);
  expect(titleModel.shortName).toBe(expectedShortName);
  expect(titleModel.isProperNoun).toBe(expectedIsProperNoun);
}

function verifyEditModeView(expectedFullName, expectedShortName = '', expectedIsProperNoun = false) {
  expect(titleSection.editElements.fullName).toHaveValue(expectedFullName);
  expect(titleSection.editElements.shortName).toHaveValue(expectedShortName);
  expect(titleSection.editElements.properNoun.checked).toBe(expectedIsProperNoun);
}

function verifyShowModeView(expectedFullName) {
  expect(titleSection.showElements.title).toHaveTextContent(expectedFullName);
}

function verifyJsonExport(expectedFullName, expectedShortName = '', expectedIsProperNoun = false) {
  const json = titleSection.exportToJson();
  const expectedJson = {
    fullName: expectedFullName,
    shortName: expectedShortName,
    isProperNoun: expectedIsProperNoun
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}

function verifyHtmlExport(expectedTitle) {
  const titleElement = titleSection.exportToHtml();
  expect(titleElement.tagName).toBe('H1');
  expect(titleElement).toHaveTextContent(expectedTitle);
}

function verifyMarkdownExport(expectedTitle) {
  const text = titleSection.exportToMarkdown();
  const expectedText =
    `> ## ${expectedTitle}`;

  expect(text).toBe(expectedText);
}
