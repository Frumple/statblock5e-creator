import SpeedSection from './speed-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import CurrentContext from '../../../models/current-context.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { nullIfEmptyString } from '../../../helpers/string-formatter.js';

const expectedHeading = 'Speed';

const speedModel = CurrentContext.creature.speed;

let speedSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SpeedSection.define();
});

beforeEach(() => {
  speedModel.reset();

  speedSection = new SpeedSection();
  document.body.appendChild(speedSection);
});

it('show section should have default values', () => {
  verifyShowModeView();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    speedSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
  });

  it('should switch to edit mode and focus on the walk speed field', () => {
    expect(speedSection).toBeInMode('edit');
    expect(speedSection.editElements.walk).toHaveFocus();
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustomText.click();
      speedSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the walk speed field', () => {
      expect(speedSection).toHaveElementsEnabledOrDisabledBasedOnCheckboxState(
        speedSection.editElements.useCustomText,
        ['customText'],
        ['walk', 'burrow', 'climb', 'fly', 'hover', 'swim']
      );

      expect(speedSection.editElements.walk).toHaveFocus();
    });

    describe('and the speed fields are populated and the edit section is submitted', () => {
      describe('should switch to show mode and save the fields in the following combinations:', () => {
        /* eslint-disable indent, no-unexpected-multiline */

        // For combinations that involve 3 or 4 speeds, we'll only test the most common combinations to avoid exhaustively testing every case.
        // These combinations are typically found in several dragons in the 5e Monster Manual:
        // - Walk + Burrow + Fly
        // - Walk + Climb + Fly
        // - Walk + Fly + Swim
        // - Walk + Burrow + Fly + Swim
        // - Walk + Climb + Fly + Swim
        it.each
        `
          description                        | walk   | burrow | climb  | fly    | hover    | swim   | expectedText
          ${'all blank'}                     | ${''}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${'0 ft.'}
          ${'walk only'}                     | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${'30 ft.'}
          ${'burrow only'}                   | ${''}  | ${20}  | ${''}  | ${''}  | ${false} | ${''}  | ${'0 ft., burrow 20 ft.'}
          ${'climb only'}                    | ${''}  | ${''}  | ${15}  | ${''}  | ${false} | ${''}  | ${'0 ft., climb 15 ft.'}
          ${'fly only'}                      | ${''}  | ${''}  | ${''}  | ${60}  | ${false} | ${''}  | ${'0 ft., fly 60 ft.'}
          ${'fly + hover only'}              | ${''}  | ${''}  | ${''}  | ${90}  | ${true}  | ${''}  | ${'0 ft., fly 90 ft. (hover)'}
          ${'hover not visible without fly'} | ${40}  | ${''}  | ${''}  | ${''}  | ${true}  | ${''}  | ${'40 ft.'}
          ${'swim only'}                     | ${''}  | ${''}  | ${''}  | ${''}  | ${false} | ${45}  | ${'0 ft., swim 45 ft.'}
          ${'walk + burrow'}                 | ${50}  | ${30}  | ${''}  | ${''}  | ${false} | ${''}  | ${'50 ft., burrow 30 ft.'}
          ${'walk + climb'}                  | ${10}  | ${''}  | ${10}  | ${''}  | ${false} | ${''}  | ${'10 ft., climb 10 ft.'}
          ${'walk + fly'}                    | ${20}  | ${''}  | ${''}  | ${120} | ${false} | ${''}  | ${'20 ft., fly 120 ft.'}
          ${'walk + fly + hover'}            | ${10}  | ${''}  | ${''}  | ${25}  | ${true}  | ${''}  | ${'10 ft., fly 25 ft. (hover)'}
          ${'walk + swim'}                   | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${50}  | ${'30 ft., swim 50 ft.'}
          ${'walk + burrow + fly'}           | ${30}  | ${15}  | ${''}  | ${60}  | ${false} | ${''}  | ${'30 ft., burrow 15 ft., fly 60 ft.'}
          ${'walk + climb + fly'}            | ${40}  | ${''}  | ${40}  | ${80}  | ${false} | ${''}  | ${'40 ft., climb 40 ft., fly 80 ft.'}
          ${'walk + fly + swim'}             | ${30}  | ${''}  | ${''}  | ${60}  | ${false} | ${30}  | ${'30 ft., fly 60 ft., swim 30 ft.'}
          ${'walk + climb + fly + swim'}     | ${50}  | ${''}  | ${25}  | ${100} | ${false} | ${75}  | ${'50 ft., climb 25 ft., fly 100 ft., swim 75 ft.'}
          ${'walk + burrow + fly + swim'}    | ${40}  | ${30}  | ${''}  | ${80}  | ${false} | ${40}  | ${'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.'}
          ${'all speeds'}                    | ${0}   | ${5}   | ${10}  | ${15}  | ${false} | ${20}  | ${'0 ft., burrow 5 ft., climb 10 ft., fly 15 ft., swim 20 ft.'}
          ${'all speeds + hover'}            | ${150} | ${0}   | ${100} | ${240} | ${true}  | ${185} | ${'150 ft., burrow 0 ft., climb 100 ft., fly 240 ft. (hover), swim 185 ft.'}
          ${'maximum values'}                | ${999} | ${999} | ${999} | ${999} | ${true}  | ${999} | ${'999 ft., burrow 999 ft., climb 999 ft., fly 999 ft. (hover), swim 999 ft.'}
        `
        ('$description: {walk="$walk", burrow="$burrow", climb="$climb", fly="$fly", hover="$hover", swim="$swim"} => "$expectedText"',
        ({walk, burrow, climb, fly, hover, swim, expectedText}) => {
          const expectedValues = {
            walk: nullIfEmptyString(walk),
            burrow : nullIfEmptyString(burrow),
            climb: nullIfEmptyString(climb),
            fly: nullIfEmptyString(fly),
            hover: hover,
            swim: nullIfEmptyString(swim)
          };

          inputValueAndTriggerEvent(speedSection.editElements.walk, walk);
          inputValueAndTriggerEvent(speedSection.editElements.burrow, burrow);
          inputValueAndTriggerEvent(speedSection.editElements.climb, climb);
          inputValueAndTriggerEvent(speedSection.editElements.fly, fly);
          inputValueAndTriggerEvent(speedSection.editElements.swim, swim);

          if (hover) {
            speedSection.editElements.hover.click();
          }

          speedSection.editElements.submitForm();

          expect(speedSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);

          const json = verifyJsonExport(expectedValues);
          expect(speedSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(speedSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

          reset();
          speedSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the speeds if submitted with the custom text checkbox checked', () => {
        const expectedValues = {
          walk: 10,
          burrow: 20,
          climb: 30,
          fly: 40,
          hover: true,
          swim: 50,
          useCustomText: true,
          customText: 'This custom text should be __saved__, but not shown.',
          htmlCustomText: 'This custom text should be <strong>saved</strong>, but not shown.'
        };

        inputValueAndTriggerEvent(speedSection.editElements.walk, expectedValues.walk);
        inputValueAndTriggerEvent(speedSection.editElements.burrow, expectedValues.burrow);
        inputValueAndTriggerEvent(speedSection.editElements.climb, expectedValues.climb);
        inputValueAndTriggerEvent(speedSection.editElements.fly, expectedValues.fly);
        inputValueAndTriggerEvent(speedSection.editElements.swim, expectedValues.swim);
        speedSection.editElements.hover.click();

        speedSection.editElements.useCustomText.click();
        inputValueAndTriggerEvent(speedSection.editElements.customText, expectedValues.customText);

        speedSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedValues.htmlCustomText);

        const json = verifyJsonExport(expectedValues);

        reset();
        speedSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedValues.htmlCustomText);
      });
    });
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(speedSection).toHaveElementsEnabledOrDisabledBasedOnCheckboxState(
        speedSection.editElements.useCustomText,
        ['customText'],
        ['walk', 'burrow', 'climb', 'fly', 'hover', 'swim']
      );

      expect(speedSection.editElements.customText).toHaveFocus();
      expect(speedSection.editElements.customText).toBeSelected();
    });

    describe('and the custom text field is populated and the edit section is submitted', () => {
      describe('should switch to show mode and save the custom text', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                 | customText                                                | expectedHtmlText
          ${'plain custom text'}                      | ${'30 ft. (40 ft., climb 30 ft. in bear or hybrid form)'} | ${'30 ft. (40 ft., climb 30 ft. in bear or hybrid form)'}
          ${'custom text with valid markdown syntax'} | ${'40 ft. (80 ft. when _hasted_)'}                        | ${'40 ft. (80 ft. when <em>hasted</em>)'}
          ${'custom text with html tags escaped'}     | ${'40 ft. (80 ft. when <em>hasted</em>)'}                 | ${'40 ft. (80 ft. when &lt;em&gt;hasted&lt;/em&gt;)'}
        `
        ('$description: $customText => $expectedHtmlText',
        ({customText, expectedHtmlText}) => {
          const expectedValues = {
            useCustomText: true,
            customText: customText,
            htmlCustomText: expectedHtmlText
          };

          inputValueAndTriggerEvent(speedSection.editElements.customText, customText);

          speedSection.editElements.submitForm();

          expect(speedSection).toBeInMode('show');
          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);

          const json = verifyJsonExport(expectedValues);
          expect(speedSection).toExportPropertyLineToHtml(expectedHeading, expectedHtmlText);
          expect(speedSection).toExportPropertyLineToMarkdown(expectedHeading, customText);

          reset();
          speedSection.importFromJson(json);

          verifyModel(expectedValues);
          verifyEditModeView(expectedValues);
          verifyShowModeView(expectedHtmlText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the custom text if submitted with the custom text checkbox unchecked', () => {
        const expectedValues = {
          useCustomText: false,
          customText: '30 ft. (40 ft. in tiger form)'
        };

        inputValueAndTriggerEvent(speedSection.editElements.customText, expectedValues.customText);

        speedSection.editElements.useCustomText.click();
        speedSection.editElements.submitForm();

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();

        const json = verifyJsonExport(expectedValues);

        reset();
        speedSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView();
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(speedSection.editElements.customText, '');

        speedSection.editElements.submitForm();

        expect(speedSection).toBeInMode('edit');
        expect(speedSection).toHaveError(
          speedSection.editElements.customText,
          'Speed Custom Text cannot be blank.');
      });

      it('should display an error if the custom text field has invalid markdown syntax', () => {
        inputValueAndTriggerEvent(speedSection.editElements.customText, '30 ft. (15 ft. when *slowed)');

        speedSection.editElements.submitForm();

        expect(speedSection).toBeInMode('edit');
        expect(speedSection).toHaveError(
          speedSection.editElements.customText,
          'Speed Custom Text has invalid Markdown syntax.');
      });
    });
  });
});

describe('when importing from Open5e', () => {
  describe('should import as normal', () => {
    /* eslint-disable indent, no-unexpected-multiline */

    // For combinations that involve 3 or 4 speeds, we'll only test the most common combinations to avoid exhaustively testing every case.
    // These combinations are typically found in several dragons in the 5e Monster Manual:
    // - Walk + Burrow + Fly
    // - Walk + Climb + Fly
    // - Walk + Fly + Swim
    // - Walk + Burrow + Fly + Swim
    // - Walk + Climb + Fly + Swim
    it.each
    `
      description                        | walk   | burrow | climb  | fly    | hover    | swim   | notes                                            | expectedText
      ${'all blank'}                     | ${''}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'0 ft.'}
      ${'walk only'}                     | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'30 ft.'}
      ${'burrow only'}                   | ${''}  | ${20}  | ${''}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'0 ft., burrow 20 ft.'}
      ${'climb only'}                    | ${''}  | ${''}  | ${15}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'0 ft., climb 15 ft.'}
      ${'fly only'}                      | ${''}  | ${''}  | ${''}  | ${60}  | ${false} | ${''}  | ${''}                                            | ${'0 ft., fly 60 ft.'}
      ${'fly + hover only'}              | ${''}  | ${''}  | ${''}  | ${90}  | ${true}  | ${''}  | ${''}                                            | ${'0 ft., fly 90 ft. (hover)'}
      ${'hover not visible without fly'} | ${40}  | ${''}  | ${''}  | ${''}  | ${true}  | ${''}  | ${''}                                            | ${'40 ft.'}
      ${'swim only'}                     | ${''}  | ${''}  | ${''}  | ${''}  | ${false} | ${45}  | ${''}                                            | ${'0 ft., swim 45 ft.'}
      ${'walk + burrow'}                 | ${50}  | ${30}  | ${''}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'50 ft., burrow 30 ft.'}
      ${'walk + climb'}                  | ${10}  | ${''}  | ${10}  | ${''}  | ${false} | ${''}  | ${''}                                            | ${'10 ft., climb 10 ft.'}
      ${'walk + fly'}                    | ${20}  | ${''}  | ${''}  | ${120} | ${false} | ${''}  | ${''}                                            | ${'20 ft., fly 120 ft.'}
      ${'walk + fly + hover'}            | ${10}  | ${''}  | ${''}  | ${25}  | ${true}  | ${''}  | ${''}                                            | ${'10 ft., fly 25 ft. (hover)'}
      ${'walk + swim'}                   | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${50}  | ${''}                                            | ${'30 ft., swim 50 ft.'}
      ${'walk + burrow + fly'}           | ${30}  | ${15}  | ${''}  | ${60}  | ${false} | ${''}  | ${''}                                            | ${'30 ft., burrow 15 ft., fly 60 ft.'}
      ${'walk + climb + fly'}            | ${40}  | ${''}  | ${40}  | ${80}  | ${false} | ${''}  | ${''}                                            | ${'40 ft., climb 40 ft., fly 80 ft.'}
      ${'walk + fly + swim'}             | ${30}  | ${''}  | ${''}  | ${60}  | ${false} | ${30}  | ${''}                                            | ${'30 ft., fly 60 ft., swim 30 ft.'}
      ${'walk + climb + fly + swim'}     | ${50}  | ${''}  | ${25}  | ${100} | ${false} | ${75}  | ${''}                                            | ${'50 ft., climb 25 ft., fly 100 ft., swim 75 ft.'}
      ${'walk + burrow + fly + swim'}    | ${40}  | ${30}  | ${''}  | ${80}  | ${false} | ${40}  | ${''}                                            | ${'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.'}
      ${'all speeds'}                    | ${0}   | ${5}   | ${10}  | ${15}  | ${false} | ${20}  | ${''}                                            | ${'0 ft., burrow 5 ft., climb 10 ft., fly 15 ft., swim 20 ft.'}
      ${'all speeds + hover'}            | ${150} | ${0}   | ${100} | ${240} | ${true}  | ${185} | ${''}                                            | ${'150 ft., burrow 0 ft., climb 100 ft., fly 240 ft. (hover), swim 185 ft.'}
      ${'maximum values'}                | ${999} | ${999} | ${999} | ${999} | ${true}  | ${999} | ${''}                                            | ${'999 ft., burrow 999 ft., climb 999 ft., fly 999 ft. (hover), swim 999 ft.'}
      ${'werebear with notes'}           | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${'40 ft., climb 30 ft. in bear or hybrid form'} | ${'30 ft. (40 ft., climb 30 ft. in bear or hybrid form)'}
      ${'werewolf with notes'}           | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${''}  | ${'40 ft. in wolf form'}                         | ${'30 ft. (40 ft. in wolf form)'}
    `
    ('$description: {walk="$walk", burrow="$burrow", climb="$climb", fly="$fly", hover="$hover", swim="$swim", notes="$notes"} => "$expectedText"',
    ({walk, burrow, climb, fly, hover, swim, notes, expectedText}) => {
      const expectedValues = {
        walk: nullIfEmptyString(walk),
        burrow : nullIfEmptyString(burrow),
        climb: nullIfEmptyString(climb),
        fly: nullIfEmptyString(fly),
        hover: hover,
        swim: nullIfEmptyString(swim)
      };

      if (notes !== '') {
        expectedValues.useCustomText = true;
        expectedValues.customText = expectedText;
        expectedValues.htmlCustomText = expectedText;
      }

      const json = {
        speed: {}
      };

      if (walk !== '') json.speed.walk = walk;
      if (burrow !== '') json.speed.burrow = burrow;
      if (climb !== '') json.speed.climb = climb;
      if (fly !== '') json.speed.fly = fly;
      if (hover) json.speed.hover = true;
      if (swim !== '') json.speed.swim = swim;
      if (notes !== '') json.speed.notes = notes;

      speedSection.importFromOpen5e(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

function reset() {
  speedModel.reset();
  speedSection.updateView();
}

function verifyModel({
  walk = 30,
  burrow = null,
  climb = null,
  fly = null,
  hover = false,
  swim = null,
  useCustomText = false,
  customText = '',
  htmlCustomText = ''
} = {}) {
  expect(speedModel.walk).toBe(walk);
  expect(speedModel.burrow).toBe(burrow);
  expect(speedModel.climb).toBe(climb);
  expect(speedModel.fly).toBe(fly);
  expect(speedModel.hover).toBe(hover);
  expect(speedModel.swim).toBe(swim);
  expect(speedModel.useCustomText).toBe(useCustomText);
  expect(speedModel.customText).toBe(customText);
  expect(speedModel.htmlCustomText).toBe(htmlCustomText);
}

function verifyEditModeView({
  walk = 30,
  burrow = null,
  climb = null,
  fly = null,
  hover = false,
  swim = null,
  useCustomText = false,
  customText = ''
} = {}) {
  expect(speedSection.editElements.walk).toHaveValue(walk);
  expect(speedSection.editElements.burrow).toHaveValue(burrow);
  expect(speedSection.editElements.climb).toHaveValue(climb);
  expect(speedSection.editElements.fly).toHaveValue(fly);
  expect(speedSection.editElements.hover.checked).toBe(hover);
  expect(speedSection.editElements.swim).toHaveValue(swim);
  expect(speedSection.editElements.useCustomText.checked).toBe(useCustomText);
  expect(speedSection.editElements.customText).toHaveValue(customText);

  expect(speedSection).toHaveElementsEnabledOrDisabledBasedOnCheckboxState(
    speedSection.editElements.useCustomText,
    ['customText'],
    ['walk', 'burrow', 'climb', 'fly', 'hover', 'swim']
  );
}

function verifyShowModeView(expectedText = '30 ft.') {
  expect(speedSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport({
  walk = 30,
  burrow = null,
  climb = null,
  fly = null,
  hover = false,
  swim = null,
  useCustomText = false,
  customText = ''
} = {}) {
  const json = speedSection.exportToJson();
  const expectedJson = {
    walk: walk,
    burrow: burrow,
    climb: climb,
    fly: fly,
    hover: hover,
    swim: swim,
    useCustomText: useCustomText,
    customText: customText
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}