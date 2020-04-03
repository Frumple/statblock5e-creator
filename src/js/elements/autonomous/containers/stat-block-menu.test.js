import StatBlockMenu from './stat-block-menu.js';
import EventInterceptor from '../../../helpers/test/event-interceptor.js';

let statBlockMenu;

beforeAll(async() => {
  await StatBlockMenu.define();
});

beforeEach(() => {
  statBlockMenu = new StatBlockMenu();
  statBlockMenu.connect();
});

it('should dispatch an event when the "One Column" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'numberOfColumnsChanged');

  statBlockMenu.oneColumnButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.columns).toBe(1);
});

it('should dispatch an event when the "Two Column" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'numberOfColumnsChanged');

  statBlockMenu.twoColumnButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.columns).toBe(2);
});

it('should dispatch an event when the "Show Empty Sections" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'emptySectionsVisibilityChanged');

  statBlockMenu.showEmptySectionsButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.visibility).toBe(true);
});

it('should dispatch an event when the "Hide Empty Sections" button is clicked', () => {
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'emptySectionsVisibilityChanged');

  statBlockMenu.hideEmptySectionsButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
  expect(event.detail.visibility).toBe(false);
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
  const eventInterceptor = new EventInterceptor(statBlockMenu, 'toggleGettingStartedAction');

  statBlockMenu.gettingStartedButton.click();

  const event = eventInterceptor.popEvent();
  expect(event).not.toBeNull();
});
