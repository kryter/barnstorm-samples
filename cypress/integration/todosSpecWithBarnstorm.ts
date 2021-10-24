/// <reference types="cypress" />

import { register } from '@kryter/barnstorm-cypress/lib/register';
import { KeyboardInstrument } from '@kryter/barnstorm/lib/instruments/KeyboardInstrument';
import { todoPage } from '../../src/todos/TodosPage';

describe('example to-do app (with Barnstorm)', () => {
  beforeEach(() => {
    register();
    todoPage.entryUrl().visit();
  });

  it('have the todo text box initially in focus', () => {
    todoPage.todosTextBox().verifyIsInFocus();
  });

  it('displays two todo items by default', () => {
    const expectedContent = [
      'Pay electric bill',
      'Walk the dog'
    ];

    todoPage.todosList().verifyListContent(expectedContent);
  });

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';

    todoPage.todosTextBox().enterText(newItem);
    KeyboardInstrument.pressEnter();

    const expectedContent = [
      'Pay electric bill',
      'Walk the dog',
      newItem
    ];

    todoPage.todosList().verifyListContent(expectedContent);
  });

  it('can check off an item as completed', () => {
    todoPage.todoListItemCheckbox(1).check();

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    todoPage.todoListItem(1).verifyHasClass('completed');
  })

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      todoPage.todoListItemCheckbox(1).check();
      todoPage.todoListItem(1).verifyHasClass('completed');
    })

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      todoPage.activeFilterButton().verifyTextContent('Active');
      todoPage.activeFilterButton().click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      // By verifying the full content, we can also assert that the task we checked off
      // does not exist on the page.
      const expectedContent = [
        'Walk the dog'
      ];
      todoPage.todosList().verifyListContent(expectedContent);
    });

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      todoPage.completedFilterButton().verifyTextContent('Completed');
      todoPage.completedFilterButton().click();

      const expectedContent = [
        'Pay electric bill'
      ];
      todoPage.todosList().verifyListContent(expectedContent);
    });

    it('can delete all completed tasks', () => {
      todoPage.clearCompletedButton().verifyTextContent('Clear completed');
      todoPage.clearCompletedButton().click()

      const expectedContent = [
        'Walk the dog'
      ];
      todoPage.todosList().verifyListContent(expectedContent);

      // Finally, make sure that the clear button no longer exists.
      todoPage.clearCompletedButton().verifyIsNotVisible();
    })
  })
})
