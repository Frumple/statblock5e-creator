import ErrorMessages from './error-messages.js';

let errorMessages;

beforeAll(async() => {
  await ErrorMessages.define();
});

beforeEach(() => {
  errorMessages = new ErrorMessages();
  document.body.appendChild(errorMessages);
});

it('should add a single error', () => {
  const fieldElement = document.createElement('input');
  const message = 'Cannot do the thing!';

  errorMessages.add(fieldElement, message);

  expect(errorMessages.any).toBe(true);
  expect(errorMessages.container).not.toHaveClass('error-messages_hidden');

  expect(errorMessages.errors).toHaveLength(1);
  expect(errorMessages.errors[0].fieldElement).toBe(fieldElement);
  expect(errorMessages.errors[0].message).toBe(message);

  expect(fieldElement).toHaveClass('section__error-highlight');

  const listItem = errorMessages.list.querySelector('li');
  expect(listItem).toHaveTextContent(message);
});

it('should add multiple errors', () => {
  const fieldElements = [
    document.createElement('input'),
    document.createElement('input'),
    document.createElement('input')
  ];
  const messages = [
    'Cannot do the thing!',
    'Cannot do the other thing!',
    'Cannot do anything!'
  ];

  for (let i = 0; i <= 2; i++) {
    errorMessages.add(fieldElements[i], messages[i]);
  }

  const listItems = Array.from(errorMessages.list.querySelectorAll('li'));

  expect(errorMessages.any).toBe(true);
  expect(errorMessages.errors).toHaveLength(3);
  expect(errorMessages.container).not.toHaveClass('error-messages_hidden');

  for (let i = 0; i <= 2; i++) {
    expect(errorMessages.errors[i].fieldElement).toBe(fieldElements[i]);
    expect(errorMessages.errors[i].message).toBe(messages[i]);

    expect(fieldElements[i]).toHaveClass('section__error-highlight');

    expect(listItems[i]).toHaveTextContent(messages[i]);
  }
});

it('should clear all errors', () => {
  const fieldElement = document.createElement('input');
  const message = 'Cannot do the thing!';

  errorMessages.add(fieldElement, message);
  errorMessages.clear();

  expect(errorMessages.any).toBe(false);
  expect(errorMessages.container).toHaveClass('error-messages_hidden');
  expect(errorMessages.errors).toHaveLength(0);
  expect(fieldElement).not.toHaveClass('section__error-highlight');

  const listItem = errorMessages.list.querySelector('li');
  expect(listItem).toBeNull();
});