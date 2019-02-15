import StatBlockMenu from '/src/js/elements/autonomous/containers/stat-block-menu.js';

let statBlockMenu;

beforeAll(async() => {
  await StatBlockMenu.define();
});

beforeEach(() => {
  statBlockMenu = new StatBlockMenu();
  statBlockMenu.forceConnect();
});

afterEach(() => {
  document.clear();
});

it('should dispatch an event when the "Edit All Sections" button is clicked', () => {
  let receivedEvent = null;

  document.addEventListener('editAllSections', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.editAllSectionsButton.click();

  expect(receivedEvent).not.toBeNull();
});

it('should dispatch an event when the "Save All Sections" button is clicked', () => {
  let receivedEvent = null;

  document.addEventListener('saveAllSections', (event) => {
    receivedEvent = event;
  });

  statBlockMenu.saveAllSectionsButton.click();

  expect(receivedEvent).not.toBeNull();
});
