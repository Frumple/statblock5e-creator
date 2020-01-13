import TitleSection from './title-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import Title from '../../../models/title.js';

let titleSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await TitleSection.define();
});

beforeEach(() => {
  Title.reset();

  titleSection = new TitleSection();
  TestCustomElements.initializeSection(titleSection);
  titleSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    titleSection.showElements.section.click();
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

        expect(Title.fullName).toBe(expectedCreatureName);
        expect(Title.shortName).toBe(expectedShortName);
        expect(Title.isProperNoun).toBe(isProperNoun);
        expect(Title.grammaticalName).toBe(expectedGrammaticalName);

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

        expect(Title.fullName).toBe(fullName);
        expect(Title.shortName).toBe(shortName);
        expect(Title.isProperNoun).toBe(isProperNoun);

        expect(titleSection).toBeInMode('show');
        expect(titleSection.showElements.title).toHaveTextContent(fullName);

        verifyJsonExport(fullName, shortName, isProperNoun);
        verifyHtmlExport(fullName);
        verifyHomebreweryExport(fullName);
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

        expect(Title.fullName).toBe(expectedFullName);

        expect(titleSection).toBeInMode('show');
        expect(titleSection.showElements.title).toHaveTextContent(expectedFullName);

        verifyJsonExport(expectedFullName, '', false);
        verifyHtmlExport(expectedFullName);
        verifyHomebreweryExport(expectedFullName);
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

function verifyJsonExport(expectedFullName, expectedShortName, expectedIsProperNoun) {
  const json = titleSection.exportToJson();
  const expectedJson = {
    fullName: expectedFullName,
    shortName: expectedShortName,
    isProperNoun: expectedIsProperNoun
  };

  expect(json).toStrictEqual(expectedJson);
}

function verifyHtmlExport(expectedTitle) {
  const titleElement = titleSection.exportToHtml();
  expect(titleElement.tagName).toBe('H1');
  expect(titleElement).toHaveTextContent(expectedTitle);
}

function verifyHomebreweryExport(expectedTitle) {
  const text = titleSection.exportToHomebrewery();
  const expectedText =
    `> ## ${expectedTitle}`;

  expect(text).toBe(expectedText);
}
