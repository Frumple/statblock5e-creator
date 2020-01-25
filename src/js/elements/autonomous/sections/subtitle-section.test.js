import SubtitleSection from './subtitle-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import CurrentContext from '../../../models/current-context.js';

const subtitleModel = CurrentContext.creature.subtitle;

let subtitleSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SubtitleSection.define();
});

beforeEach(() => {
  subtitleModel.reset();

  subtitleSection = new SubtitleSection();
  TestCustomElements.initializeSection(subtitleSection);
  subtitleSection.connect();
});

it('show section should have default values', () => {
  expect(subtitleSection.showElements.text).toHaveTextContent('Medium humanoid, unaligned');
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    subtitleSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    expect(subtitleSection.editElements.size).toHaveValue('Medium');
    expect(subtitleSection.editElements.type).toHaveValue('humanoid');
    expect(subtitleSection.editElements.tags).toHaveValue('');
    expect(subtitleSection.editElements.alignment).toHaveValue('unaligned');
    expect(subtitleSection.editElements.useCustomText).not.toBeChecked();
    expect(subtitleSection.editElements.customText).toHaveValue('');
  });

  it('should switch to edit mode and focus on the size field', () => {
    expect(subtitleSection).toBeInMode('edit');
    expect(subtitleSection.editElements.size).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      subtitleSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(subtitleSection.editElements.size).toBeDisabled();
      expect(subtitleSection.editElements.type).toBeDisabled();
      expect(subtitleSection.editElements.tags).toBeDisabled();
      expect(subtitleSection.editElements.alignment).toBeDisabled();
      expect(subtitleSection.editElements.customText).toBeEnabled();

      expect(subtitleSection.editElements.customText).toHaveFocus();
      expect(subtitleSection.editElements.customText).toBeSelected();
    });

    describe('and the edit section is submitted', () => {
      describe('should switch to show mode and save the custom text', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                     | customText
          ${'custom alignment'}           | ${'Medium humanoid (any race), any non-lawful alignment'}
          ${'alignment with percentages'} | ${'Huge giant, neutral good (50%) or neutral evil (50%)'}
          ${'swarm'}                      | ${'Medium swarm of Tiny beasts, unaligned'}
        `
        ('$description: $customText',
        ({customText}) => {
          const expectedValues = {
            useCustomText: true,
            customText: customText
          };

          inputValueAndTriggerEvent(subtitleSection.editElements.customText, customText);

          subtitleSection.editElements.submitForm();

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          expect(subtitleSection).toBeInMode('show');
          expect(subtitleSection.showElements.text).toHaveTextContent(customText);

          const json = verifyJsonExport(expectedValues);
          verifyHtmlExport(customText);
          verifyHomebreweryExport(customText);

          reset();
          subtitleSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          expect(subtitleSection.showElements.text).toHaveTextContent(customText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the custom text if submitted with the custom text checkbox unchecked', () => {
        const expectedValues = {
          useCustomText: false,
          customText: 'Medium swarm of Tiny beasts, unaligned'
        };

        inputValueAndTriggerEvent(subtitleSection.editElements.customText, expectedValues.customText);

        subtitleSection.editElements.useCustomText.click();
        subtitleSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);

        const json = verifyJsonExport(expectedValues);

        reset();
        subtitleSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(subtitleSection.editElements.customText, '');

        subtitleSection.editElements.submitForm();

        expect(subtitleSection).toBeInMode('edit');
        expect(subtitleSection).toHaveError(
          subtitleSection.editElements.customText,
          'Subtitle Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      subtitleSection.editElements.useCustomText.click();
      subtitleSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the size field', () => {
      expect(subtitleSection.editElements.size).toBeEnabled();
      expect(subtitleSection.editElements.type).toBeEnabled();
      expect(subtitleSection.editElements.tags).toBeEnabled();
      expect(subtitleSection.editElements.alignment).toBeEnabled();
      expect(subtitleSection.editElements.customText).toBeDisabled();

      expect(subtitleSection.editElements.size).toHaveFocus();
    });

    describe('and fields are populated and the edit section is submitted', () => {
      describe('should switch to show mode and save the creature size, type, tags, and alignment', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description        | size            | type             | tags                     | alignment           | expectedSubtitle
          ${'no tags'}       | ${'Gargantuan'} | ${'monstrosity'} | ${''}                    | ${'neutral'}        | ${'Gargantuan monstrosity, neutral'}
          ${'single tag'}    | ${'Small'}      | ${'humanoid'}    | ${'halfling'}            | ${'lawful good'}    | ${'Small humanoid (halfling), lawful good'}
          ${'multiple tags'} | ${'Tiny'}       | ${'fiend'}       | ${'demon, shapechanger'} | ${'chaotic evil'}   | ${'Tiny fiend (demon, shapechanger), chaotic evil'}
          ${'trimmed tags'}  | ${'Large'}      | ${'giant'}       | ${'    titan '}          | ${'lawful neutral'} | ${'Large giant (titan), lawful neutral'}
        `
        ('$description: {size="$size", type="$type", tags="$tags", alignment="$alignment"} => $expectedSubtitle',
        ({size, type, tags, alignment, expectedSubtitle}) => {
          const expectedValues = {
            size: size,
            type: type,
            tags: tags.trim(),
            alignment: alignment
          };

          inputValueAndTriggerEvent(subtitleSection.editElements.size, size);
          inputValueAndTriggerEvent(subtitleSection.editElements.type, type);
          inputValueAndTriggerEvent(subtitleSection.editElements.tags, tags);
          inputValueAndTriggerEvent(subtitleSection.editElements.alignment, alignment);

          subtitleSection.editElements.submitForm();

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          expect(subtitleSection).toBeInMode('show');
          expect(subtitleSection.showElements.text).toHaveTextContent(expectedSubtitle);

          const json = verifyJsonExport(expectedValues);
          verifyHtmlExport(expectedSubtitle);
          verifyHomebreweryExport(expectedSubtitle);

          reset();
          subtitleSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          expect(subtitleSection.showElements.text).toHaveTextContent(expectedSubtitle);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the size, type, tags, and alignment if submitted with the custom text checkbox checked', () => {
        const expectedValues = {
          size: 'Small',
          type: 'fey',
          tags: 'shapechanger',
          alignment: 'chaotic neutral',
          useCustomText: true,
          customText: 'This custom text should be saved, but not shown.'
        };

        inputValueAndTriggerEvent(subtitleSection.editElements.size, expectedValues.size);
        inputValueAndTriggerEvent(subtitleSection.editElements.type, expectedValues.type);
        inputValueAndTriggerEvent(subtitleSection.editElements.tags, expectedValues.tags);
        inputValueAndTriggerEvent(subtitleSection.editElements.alignment, expectedValues.alignment);

        subtitleSection.editElements.useCustomText.click();
        inputValueAndTriggerEvent(subtitleSection.editElements.customText, expectedValues.customText);

        subtitleSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        expect(subtitleSection.showElements.text).toHaveTextContent(expectedValues.customText);

        const json = verifyJsonExport(expectedValues);

        reset();
        subtitleSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        expect(subtitleSection.showElements.text).toHaveTextContent(expectedValues.customText);
      });
    });
  });
});

function reset() {
  subtitleModel.reset();
  subtitleSection.updateView();
}

function verifyModel({
  size = 'Medium',
  type = 'humanoid',
  tags = '',
  alignment = 'unaligned',
  useCustomText = false,
  customText = ''
} = {}) {
  expect(subtitleModel.size).toBe(size);
  expect(subtitleModel.type).toBe(type);
  expect(subtitleModel.tags).toBe(tags);
  expect(subtitleModel.alignment).toBe(alignment);
  expect(subtitleModel.useCustomText).toBe(useCustomText);
  expect(subtitleSection.editElements.customText).toHaveValue(customText);
}

function verifyEditModeView({
  size = 'Medium',
  type = 'humanoid',
  tags = '',
  alignment = 'unaligned',
  useCustomText = false,
  customText = ''
} = {}) {
  expect(subtitleSection.editElements.size).toHaveValue(size);
  expect(subtitleSection.editElements.type).toHaveValue(type);
  expect(subtitleSection.editElements.tags).toHaveValue(tags);
  expect(subtitleSection.editElements.alignment).toHaveValue(alignment);
  expect(subtitleSection.editElements.useCustomText.checked).toBe(useCustomText);
  expect(subtitleSection.editElements.customText).toHaveValue(customText);
}

function verifyJsonExport({
  size = 'Medium',
  type = 'humanoid',
  tags = '',
  alignment = 'unaligned',
  useCustomText = false,
  customText = ''
} = {}) {
  const json = subtitleSection.exportToJson();
  const expectedJson = {
    size: size,
    type: type,
    tags: tags,
    alignment: alignment,
    useCustomText: useCustomText,
    customText: customText
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}

function verifyHtmlExport(expectedSubtitle) {
  const subtitleElement = subtitleSection.exportToHtml();
  expect(subtitleElement.tagName).toBe('H2');
  expect(subtitleElement).toHaveTextContent(expectedSubtitle);
}

function verifyHomebreweryExport(expectedSubtitle) {
  const text = subtitleSection.exportToHomebrewery();
  const expectedText =
    `>*${expectedSubtitle}*`;

  expect(text).toBe(expectedText);
}
