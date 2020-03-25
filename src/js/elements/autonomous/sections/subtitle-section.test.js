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
  verifyShowModeView();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    subtitleSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
  });

  it('should switch to edit mode and focus on the size field', () => {
    expect(subtitleSection).toBeInMode('edit');
    expect(subtitleSection.editElements.size).toHaveFocus();
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      subtitleSection.editElements.useCustomText.click();
      subtitleSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the size field', () => {
      expect(subtitleSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        subtitleSection.editElements.useCustomText,
        ['customText'],
        ['size', 'type', 'tags', 'alignment']
      );

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

          expect(subtitleSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedSubtitle);

          const json = verifyJsonExport(expectedValues);
          verifyHtmlExport(expectedSubtitle);
          verifyMarkdownExport(expectedSubtitle);

          reset();
          subtitleSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedSubtitle);
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
        verifyShowModeView(expectedValues.customText);

        const json = verifyJsonExport(expectedValues);

        reset();
        subtitleSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedValues.customText);
      });
    });
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      subtitleSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(subtitleSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
        subtitleSection.editElements.useCustomText,
        ['customText'],
        ['size', 'type', 'tags', 'alignment']
      );

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

          expect(subtitleSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedValues.customText);

          const json = verifyJsonExport(expectedValues);
          verifyHtmlExport(customText);
          verifyMarkdownExport(customText);

          reset();
          subtitleSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedValues.customText);
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
        verifyShowModeView();

        const json = verifyJsonExport(expectedValues);

        reset();
        subtitleSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();
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
});

describe('when importing from Open5e', () => {
  describe('should import as normal', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description           | size            | type             | subtype                  | alignment           | expectedSubtitle
      ${'no subtype'}       | ${'Gargantuan'} | ${'monstrosity'} | ${''}                    | ${'neutral'}        | ${'Gargantuan monstrosity, neutral'}
      ${'single subtype'}   | ${'Small'}      | ${'humanoid'}    | ${'halfling'}            | ${'lawful good'}    | ${'Small humanoid (halfling), lawful good'}
      ${'multiple subtype'} | ${'Tiny'}       | ${'fiend'}       | ${'demon, shapechanger'} | ${'chaotic evil'}   | ${'Tiny fiend (demon, shapechanger), chaotic evil'}
      ${'trimmed subtype'}  | ${'Large'}      | ${'giant'}       | ${'    titan '}          | ${'lawful neutral'} | ${'Large giant (titan), lawful neutral'}
    `
    ('$description: {size="$size", type="$type", subtype="$subtype", alignment="$alignment"} => $expectedSubtitle',
    ({size, type, subtype, alignment, expectedSubtitle}) => {
      const expectedValues = {
        size: size,
        type: type,
        tags: subtype.trim(),
        alignment: alignment
      };

      const json = {
        size: size,
        type: type,
        subtype: subtype,
        alignment: alignment
      };

      subtitleSection.importFromOpen5e(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedSubtitle);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('should import as custom text if size, type, or alignment are not one of the available options', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description           | size          | type                      | subtype       | alignment                     | expectedSubtitle
      ${'custom size'}      | ${'Colossal'} | ${'construct'}            | ${''}         | ${'neutral evil'}             | ${'Colossal construct, neutral evil'}
      ${'custom type'}      | ${'Medium'}   | ${'swarm of Tiny beasts'} | ${''}         | ${'unaligned'}                | ${'Medium swarm of Tiny beasts, unaligned'}
      ${'custom alignment'} | ${'Medium'}   | ${'humanoid'}             | ${'any race'} | ${'any non-lawful alignment'} | ${'Medium humanoid (any race), any non-lawful alignment'}
    `
    ('$description: {size="$size", type="$type", subtype="$subtype", alignment="$alignment"} => $expectedSubtitle',
    ({size, type, subtype, alignment, expectedSubtitle}) => {
      const expectedValues = {
        useCustomText: true,
        customText: expectedSubtitle
      };

      const json = {
        size: size,
        type: type,
        subtype: subtype,
        alignment: alignment
      };

      subtitleSection.importFromOpen5e(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedSubtitle);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

function reset() {
  subtitleModel.reset();
  subtitleSection.updateView();
}

function verifyModel({
  size = 'Medium',
  type = 'humanoid',
  tags = 'any race',
  alignment = 'any alignment',
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
  tags = 'any race',
  alignment = 'any alignment',
  useCustomText = false,
  customText = ''
} = {}) {
  expect(subtitleSection.editElements.size).toHaveValue(size);
  expect(subtitleSection.editElements.type).toHaveValue(type);
  expect(subtitleSection.editElements.tags).toHaveValue(tags);
  expect(subtitleSection.editElements.alignment).toHaveValue(alignment);
  expect(subtitleSection.editElements.useCustomText.checked).toBe(useCustomText);
  expect(subtitleSection.editElements.customText).toHaveValue(customText);

  expect(subtitleSection).toHaveEditElementsEnabledOrDisabledBasedOnCheckbox(
    subtitleSection.editElements.useCustomText,
    ['customText'],
    ['size', 'type', 'tags', 'alignment']
  );
}

function verifyShowModeView(expectedText = 'Medium humanoid (any race), any alignment') {
  expect(subtitleSection.showElements.text).toHaveTextContent(expectedText);
}

function verifyJsonExport({
  size = 'Medium',
  type = 'humanoid',
  tags = 'any race',
  alignment = 'any alignment',
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

function verifyMarkdownExport(expectedSubtitle) {
  const text = subtitleSection.exportToMarkdown();
  const expectedText =
    `>*${expectedSubtitle}*`;

  expect(text).toBe(expectedText);
}
