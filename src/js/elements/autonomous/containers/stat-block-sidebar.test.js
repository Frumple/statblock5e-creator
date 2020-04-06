import StatBlockSidebar from './stat-block-sidebar.js';
import EventInterceptor from '../../../helpers/test/event-interceptor.js';

const initialSliderValue = 600;
const sidebarHiddenClass = 'stat-block-sidebar_hidden';
const sliderContainerHiddenClass = 'stat-block-sidebar__slider-container_hidden';

let statBlockSidebar;

beforeAll(async() => {
  await StatBlockSidebar.define();
});

beforeEach(() => {
  statBlockSidebar = new StatBlockSidebar();
  statBlockSidebar.connect();
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

it('should dispatch an event when the "Auto Two-Column Height" button is clicked, and the slider should not be visible', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  statBlockSidebar.autoHeightModeButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('auto');
  expect(event.detail.height).toBe(initialSliderValue);

  expect(statBlockSidebar.heightMode).toBe('auto');
  expect(statBlockSidebar.manualHeightSliderContainer).toHaveClass(sliderContainerHiddenClass);
});

it('should dispatch an event when the "Manual Two-Column Height" button is clicked, and the slider should be visible', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  statBlockSidebar.manualHeightModeButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('manual');
  expect(event.detail.height).toBe(initialSliderValue);

  expect(statBlockSidebar.heightMode).toBe('manual');
  expect(statBlockSidebar.manualHeightSliderContainer).not.toHaveClass(sliderContainerHiddenClass);
});

it('should dispatch an event when the "Manual Two-Column Height" slider is decremented', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  // JSDOM doesn't support the stepDown() method, set the value and dispatch the event manually
  // statBlockSidebar.manualHeightSlider.stepDown(25);
  statBlockSidebar.manualHeightSlider.value = initialSliderValue - 25;
  statBlockSidebar.onInputSlider();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('manual');
  expect(event.detail.height).toBe(initialSliderValue - 25);
});

it('should dispatch an event when the "Manual Two-Column Height" slider is incremented', () => {
  const eventInterceptor = new EventInterceptor(statBlockSidebar, 'twoColumnHeightChanged');

  // JSDOM doesn't support the stepUp() method, set the value and dispatch the event manually
  // statBlockSidebar.manualHeightSlider.stepUp(25);
  statBlockSidebar.manualHeightSlider.value = initialSliderValue + 25;
  statBlockSidebar.onInputSlider();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.mode).toBe('manual');
  expect(event.detail.height).toBe(initialSliderValue + 25);
});