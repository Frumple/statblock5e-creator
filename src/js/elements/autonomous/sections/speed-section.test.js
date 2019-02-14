import SpeedSection from '/src/js/elements/autonomous/sections/speed-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let speedSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await SpeedSection.define();
});

beforeEach(() => {
  speedSection = new SpeedSection();
  copyObjectProperties(speedSection, SectionTestMixin);
  speedSection.initializeCustomElements();
  speedSection.forceConnect();
});

afterEach(() => {
  document.clear();
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
      speedSection.editElements.useCustom.click();
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
    });

    describe('and the custom text field is populated and the save button is clicked', () => {
      it('should switch to show mode and save the custom text', () => {
        let customText = '30 ft. (40ft., climb 30ft. in bear or hybrid form)';
        inputValueAndTriggerEvent(speedSection.editElements.customText, customText);

        speedSection.editElements.saveAction.click();

        expect(speedSection).toBeInMode('show');
        expect(speedSection.showElements.text).toHaveTextContent(customText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(speedSection.editElements.customText, '');

        speedSection.editElements.saveAction.click();

        expect(speedSection).toBeInMode('edit');
        expect(speedSection).toHaveSingleError(
          speedSection.editElements.customText,
          'Speed Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustom.click();
      speedSection.editElements.useCustom.click();
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

    describe('and the speed fields are populated and the save button is clicked', () => {
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
          ${'walk + swim'}                   | ${50}  | ${30}  | ${''}  | ${''}  | ${false} | ${''}  | ${'50 ft., burrow 30 ft.'}
          ${'walk + climb'}                  | ${10}  | ${''}  | ${10}  | ${''}  | ${false} | ${''}  | ${'10 ft., climb 10 ft.'}
          ${'walk + fly'}                    | ${20}  | ${''}  | ${''}  | ${120} | ${false} | ${''}  | ${'20 ft., fly 120 ft.'}
          ${'walk + fly + hover'}            | ${10}  | ${''}  | ${''}  | ${25}  | ${true}  | ${''}  | ${'10 ft., fly 25 ft. (hover)'}
          ${'walk + swim'}                   | ${30}  | ${''}  | ${''}  | ${''}  | ${false} | ${50}  | ${'30 ft., swim 50 ft.'}
          ${'walk + burrow + fly'}           | ${30}  | ${15}  | ${''}  | ${60}  | ${false} | ${''}  | ${'30 ft., burrow 15 ft., fly 60 ft.'}
          ${'walk + climb + fly'}            | ${40}  | ${''}  | ${40}  | ${80}  | ${false} | ${''}  | ${'40 ft., climb 40 ft., fly 80 ft.'}
          ${'walk + fly + swim'}             | ${30}  | ${''}  | ${''}  | ${60}  | ${false} | ${30}  | ${'30 ft., fly 60 ft., swim 30 ft.'}
          ${'walk + climb + fly + swim'}     | ${50}  | ${''}  | ${25}  | ${100} | ${false} | ${75}  | ${'50 ft., climb 25 ft., fly 100 ft., swim 75 ft.'}
          ${'walk + burrow + fly + swim'}    | ${40}  | ${30}  | ${''}  | ${80}  | ${false} | ${40}  | ${'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.'}
          ${'all speeds'}                    | ${5}   | ${10}  | ${15}  | ${20}  | ${false} | ${25}  | ${'5 ft., burrow 10 ft., climb 15 ft., fly 20 ft., swim 25 ft.'}
          ${'all speeds + hover'}            | ${150} | ${120} | ${100} | ${240} | ${true}  | ${185} | ${'150 ft., burrow 120 ft., climb 100 ft., fly 240 ft. (hover), swim 185 ft.'}
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

          speedSection.editElements.saveAction.click();

          expect(speedSection).toBeInMode('show');
          expect(speedSection.showElements.text).toHaveTextContent(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});