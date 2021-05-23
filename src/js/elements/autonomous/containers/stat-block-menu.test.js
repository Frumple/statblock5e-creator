import StatBlockMenu from './stat-block-menu.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import EventInterceptor from '../../../helpers/test/event-interceptor.js';

let statBlockMenu;

beforeAll(async() => {
  await TestCustomElements.define();
  await StatBlockMenu.define();
});

beforeEach(() => {
  statBlockMenu = new StatBlockMenu();
  document.body.appendChild(statBlockMenu);
});

it('should dispatch events when the "Columns" toggle is checked and unchecked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'numberOfColumnsChanged');

  statBlockMenu.columnsToggle.click();

  const checkedEvent = eventInterceptor.popEvent();
  expect(checkedEvent).not.toBeNull();
  expect(checkedEvent.detail.columns).toBe(2);

  statBlockMenu.columnsToggle.click();

  const uncheckedEvent = eventInterceptor.popEvent();
  expect(uncheckedEvent).not.toBeNull();
  expect(uncheckedEvent.detail.columns).toBe(1);
});

it('should dispatch events when the "Empty Sections" toggle is unchecked and checked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'emptySectionsVisibilityChanged');

  statBlockMenu.emptySectionsToggle.click();

  const uncheckedEvent = eventInterceptor.popEvent();
  expect(uncheckedEvent).not.toBeNull();
  expect(uncheckedEvent.detail.visibility).toBe(false);

  statBlockMenu.emptySectionsToggle.click();

  const checkedEvent = eventInterceptor.popEvent();
  expect(checkedEvent).not.toBeNull();
  expect(checkedEvent.detail.visibility).toBe(true);
});

it('should dispatch an event when the "Edit All Sections" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'allSectionsAction');

  statBlockMenu.editAllSectionsButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.action).toBe('edit');
});

it('should dispatch an event when the "Save All Sections" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'allSectionsAction');

  statBlockMenu.saveAllSectionsButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.action).toBe('save');
});

it('should dispatch an event when the "Getting Started" help menu option is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'toggleGettingStarted');

  statBlockMenu.gettingStartedButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
});
