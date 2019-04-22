import SpeedSection from './speed-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import Speed from '../../../models/speed.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Speed';

let speedSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SpeedSection.define();
});

beforeEach(() => {
  Speed.reset();

  speedSection = new SpeedSection();
  TestCustomElements.initializeSection(speedSection);
  speedSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    speedSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the walk speed field', () => {
    expect(speedSection).toBeInMode('edit');
    expect(speedSection.editElements.walk).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(speedSection.editElements.walk).toBeDisabled();
      expect(speedSection.editElements.burrow).toBeDisabled();
      expect(speedSection.editElements.climb).toBeDisabled();
      expect(speedSection.editElements.fly).toBeDisabled();
      expect(speedSection.editElements.hover).toBeDisabled();
      expect(speedSection.editElements.swim).toBeDisabled();
      expect(speedSection.editElements.customText).not.toBeDisabled();

      expect(speedSection.editElements.customText).toHaveFocus();
      expect(speedSection.editElements.customText).toBeSelected();
    });

    describe('and the custom text field is populated and the edit section is submitted', () => {
      it('should switch to show mode and save the custom text', () => {
        const customText = '30 ft. (40 ft., climb 30 ft. in bear or hybrid form)';
        inputValueAndTriggerEvent(speedSection.editElements.customText, customText);

        speedSection.editElements.submitForm();

        expect(Speed.useCustomText).toBe(true);
        expect(Speed.originalCustomText).toBe(customText);
        expect(Speed.htmlCustomText).toBe(customText);

        expect(speedSection).toBeInMode('show');
        expect(speedSection).toShowPropertyLine(expectedHeading, customText);

        expect(speedSection).toExportPropertyLineToHtml(expectedHeading, customText);
        expect(speedSection).toExportPropertyLineToHomebrewery(expectedHeading, customText);
      });

      it('should switch to show mode and save the custom text with valid markdown syntax', () => {
        const originalText = '40 ft. (80 ft. when _hasted_)';
        const htmlText = '40 ft. (80 ft. when <em>hasted</em>)';
        inputValueAndTriggerEvent(speedSection.editElements.customText, originalText);

        speedSection.editElements.submitForm();

        expect(Speed.useCustomText).toBe(true);
        expect(Speed.originalCustomText).toBe(originalText);
        expect(Speed.htmlCustomText).toBe(htmlText);

        expect(speedSection).toBeInMode('show');
        expect(speedSection).toShowPropertyLine(expectedHeading, htmlText);

        expect(speedSection).toExportPropertyLineToHtml(expectedHeading, htmlText);
        expect(speedSection).toExportPropertyLineToHomebrewery(expectedHeading, originalText);
      });

      it('should switch to show mode and save the custom text with html escaped', () => {
        const originalText = '40 ft. (80 ft. when <em>hasted</em>)';
        const htmlText = '40 ft. (80 ft. when &lt;em&gt;hasted&lt;/em&gt;)';
        inputValueAndTriggerEvent(speedSection.editElements.customText, originalText);

        speedSection.editElements.submitForm();

        expect(Speed.useCustomText).toBe(true);
        expect(Speed.originalCustomText).toBe(originalText);
        expect(Speed.htmlCustomText).toBe(htmlText);

        expect(speedSection).toBeInMode('show');
        expect(speedSection).toShowPropertyLine(expectedHeading, htmlText);

        expect(speedSection).toExportPropertyLineToHtml(expectedHeading, htmlText);
        expect(speedSection).toExportPropertyLineToHomebrewery(expectedHeading, originalText);
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

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustomText.click();
      speedSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the walk speed field', () => {
      expect(speedSection.editElements.walk).not.toBeDisabled();
      expect(speedSection.editElements.burrow).not.toBeDisabled();
      expect(speedSection.editElements.climb).not.toBeDisabled();
      expect(speedSection.editElements.fly).not.toBeDisabled();
      expect(speedSection.editElements.hover).not.toBeDisabled();
      expect(speedSection.editElements.swim).not.toBeDisabled();
      expect(speedSection.editElements.customText).toBeDisabled();

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
          ${'all blank'}                     | ${NaN} | ${NaN} | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'0 ft.'}
          ${'walk only'}                     | ${30}  | ${NaN} | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'30 ft.'}
          ${'burrow only'}                   | ${NaN} | ${20}  | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'0 ft., burrow 20 ft.'}
          ${'climb only'}                    | ${NaN} | ${NaN} | ${15}  | ${NaN} | ${false} | ${NaN} | ${'0 ft., climb 15 ft.'}
          ${'fly only'}                      | ${NaN} | ${NaN} | ${NaN} | ${60}  | ${false} | ${NaN} | ${'0 ft., fly 60 ft.'}
          ${'fly + hover only'}              | ${NaN} | ${NaN} | ${NaN} | ${90}  | ${true}  | ${NaN} | ${'0 ft., fly 90 ft. (hover)'}
          ${'hover not visible without fly'} | ${40}  | ${NaN} | ${NaN} | ${NaN} | ${true}  | ${NaN} | ${'40 ft.'}
          ${'swim only'}                     | ${NaN} | ${NaN} | ${NaN} | ${NaN} | ${false} | ${45}  | ${'0 ft., swim 45 ft.'}
          ${'walk + swim'}                   | ${50}  | ${30}  | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'50 ft., burrow 30 ft.'}
          ${'walk + climb'}                  | ${10}  | ${NaN} | ${10}  | ${NaN} | ${false} | ${NaN} | ${'10 ft., climb 10 ft.'}
          ${'walk + fly'}                    | ${20}  | ${NaN} | ${NaN} | ${120} | ${false} | ${NaN} | ${'20 ft., fly 120 ft.'}
          ${'walk + fly + hover'}            | ${10}  | ${NaN} | ${NaN} | ${25}  | ${true}  | ${NaN} | ${'10 ft., fly 25 ft. (hover)'}
          ${'walk + swim'}                   | ${30}  | ${NaN} | ${NaN} | ${NaN} | ${false} | ${50}  | ${'30 ft., swim 50 ft.'}
          ${'walk + burrow + fly'}           | ${30}  | ${15}  | ${NaN} | ${60}  | ${false} | ${NaN} | ${'30 ft., burrow 15 ft., fly 60 ft.'}
          ${'walk + climb + fly'}            | ${40}  | ${NaN} | ${40}  | ${80}  | ${false} | ${NaN} | ${'40 ft., climb 40 ft., fly 80 ft.'}
          ${'walk + fly + swim'}             | ${30}  | ${NaN} | ${NaN} | ${60}  | ${false} | ${30}  | ${'30 ft., fly 60 ft., swim 30 ft.'}
          ${'walk + climb + fly + swim'}     | ${50}  | ${NaN} | ${25}  | ${100} | ${false} | ${75}  | ${'50 ft., climb 25 ft., fly 100 ft., swim 75 ft.'}
          ${'walk + burrow + fly + swim'}    | ${40}  | ${30}  | ${NaN} | ${80}  | ${false} | ${40}  | ${'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.'}
          ${'all speeds'}                    | ${0}   | ${5}   | ${10}  | ${15}  | ${false} | ${20}  | ${'0 ft., burrow 5 ft., climb 10 ft., fly 15 ft., swim 20 ft.'}
          ${'all speeds + hover'}            | ${150} | ${0}   | ${100} | ${240} | ${true}  | ${185} | ${'150 ft., burrow 0 ft., climb 100 ft., fly 240 ft. (hover), swim 185 ft.'}
          ${'maximum values'}                | ${999} | ${999} | ${999} | ${999} | ${true}  | ${999} | ${'999 ft., burrow 999 ft., climb 999 ft., fly 999 ft. (hover), swim 999 ft.'}
        `
        ('$description: {walk="$walk", burrow="$burrow", climb="$climb", fly="$fly", hover="$hover", swim="$swim"} => "$expectedText"',
        ({walk, burrow, climb, fly, hover, swim, expectedText}) => {
          inputValueAndTriggerEvent(speedSection.editElements.walk, walk);
          inputValueAndTriggerEvent(speedSection.editElements.burrow, burrow);
          inputValueAndTriggerEvent(speedSection.editElements.climb, climb);
          inputValueAndTriggerEvent(speedSection.editElements.fly, fly);
          inputValueAndTriggerEvent(speedSection.editElements.swim, swim);

          if (hover) {
            speedSection.editElements.hover.click();
          }

          speedSection.editElements.submitForm();

          expect(Speed.walk).toBe(walk);
          expect(Speed.burrow).toBe(burrow);
          expect(Speed.climb).toBe(climb);
          expect(Speed.fly).toBe(fly);
          expect(Speed.hover).toBe(hover);
          expect(Speed.swim).toBe(swim);
          expect(Speed.useCustomText).toBe(false);

          expect(speedSection).toBeInMode('show');
          expect(speedSection).toShowPropertyLine(expectedHeading, expectedText);

          expect(speedSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(speedSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});