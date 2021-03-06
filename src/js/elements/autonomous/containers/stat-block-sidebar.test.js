import StatBlockSidebar from './stat-block-sidebar.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import EventInterceptor from '../../../helpers/test/event-interceptor.js';

const initialSliderValue = 600;
const sliderChangeAmount = 25;
const sidebarHiddenClass = 'stat-block-sidebar_hidden';
const sliderContainerHiddenClass = 'stat-block-sidebar__slider-container_hidden';

let statBlockSidebar;

/* Notes about JSDOM limitations:
   The stepUp() and stepDown() methods in JSDOM do not fire input events.
   The workaround is to call onInputSlider() manually afterwards.
*/

beforeAll(async() => {
  await TestCustomElements.define();
  await StatBlockSidebar.define();
});

beforeEach(() => {
  statBlockSidebar = new StatBlockSidebar();
  document.body.appendChild(statBlockSidebar);
});

it('should be visible when visible is set to true', () => {
  statBlockSidebar.visible = true;

  expect(statBlockSidebar.visible).toBe(true);
  expect(statBlockSidebar.sidebar).not.toHaveClass(sidebarHiddenClass);
});

it('should be hidden when visible is set to false', () => {
  statBlockSidebar.visible = false;

  expect(statBlockSidebar.visible).toBe(false);
  expect(statBlockSidebar.sidebar).toHaveClass(sidebarHiddenClass);
});

it('should dispatch events when the "Height Mode" toggle is checked and unchecked', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  statBlockSidebar.heightModeToggle.click();

  const checkedEvent = eventInterceptor.popEvent();
  expect(checkedEvent).not.toBeNull();
  expect(checkedEvent.detail.mode).toBe('manual');
  expect(checkedEvent.detail.height).toBe(initialSliderValue);

  expect(statBlockSidebar.heightMode).toBe('manual');
  expect(statBlockSidebar.manualHeightSliderContainer).not.toHaveClass(sliderContainerHiddenClass);

  statBlockSidebar.heightModeToggle.click();

  const uncheckedEvent = eventInterceptor.popEvent();
  expect(uncheckedEvent).not.toBeNull();
  expect(uncheckedEvent.detail.mode).toBe('auto');
  expect(uncheckedEvent.detail.height).toBe(initialSliderValue);

  expect(statBlockSidebar.heightMode).toBe('auto');
  expect(statBlockSidebar.manualHeightSliderContainer).toHaveClass(sliderContainerHiddenClass);
});

it('should dispatch an event when the "Manual Two-Column Height" slider is decremented', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  statBlockSidebar.manualHeightSlider.stepDown(sliderChangeAmount);
  statBlockSidebar.onInputSlider();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('manual');
  expect(event.detail.height).toBe(initialSliderValue - sliderChangeAmount);
});

it('should dispatch an event when the "Manual Two-Column Height" slider is incremented', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  statBlockSidebar.manualHeightSlider.stepUp(sliderChangeAmount);
  statBlockSidebar.onInputSlider();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('manual');
  expect(event.detail.height).toBe(initialSliderValue + sliderChangeAmount);
});