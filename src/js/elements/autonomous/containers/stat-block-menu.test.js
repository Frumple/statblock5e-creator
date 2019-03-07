import StatBlockMenu from './stat-block-menu.js';

let statBlockMenu;

beforeAll(async() => {
  await StatBlockMenu.define();
});

beforeEach(() => {
  statBlockMenu = new StatBlockMenu();
  statBlockMenu.connect();
});

it('should dispatch an event when the "One Column" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('numberOfColumnsChanged', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.oneColumnButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.columns).toBe(1);
});

it('should dispatch an event when the "Two Column" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('numberOfColumnsChanged', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.twoColumnButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.columns).toBe(2);
});

it('should dispatch an event when the "Show Empty Sections" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('emptySectionsVisibilityChanged', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.showEmptySectionsButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.visibility).toBe(true);
});

it('should dispatch an event when the "Hide Empty Sections" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('emptySectionsVisibilityChanged', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.hideEmptySectionsButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.visibility).toBe(false);
});

it('should dispatch an event when the "Edit All Sections" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('allSectionsAction', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.editAllSectionsButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.action).toBe('edit');
});

it('should dispatch an event when the "Save All Sections" button is clicked', () => {
  let receivedEvent = null;
  statBlockMenu.addEventListener('allSectionsAction', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.saveAllSectionsButton.click();

  expect(receivedEvent).not.toBeNull();
  expect(receivedEvent.detail.action).toBe('save');
});
