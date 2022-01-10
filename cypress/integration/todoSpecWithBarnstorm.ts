/// <reference types="cypress" />

import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { fly } from '@kryter/barnstorm/lib/fly';
import { buildInstrumentSet } from '../../src/AppInstrumentSet';
import {addTodoItem, checkOffTask, filterCompletedTasks, filterUncompletedTasks, deleteCompletedTasks} from '../../src/todo/todoFlightPlans';
import { ENTRY_URL } from '../../src/AppUrls';
import {TODO_ITEM_CHECKBOX, TODO_ITEM_TEXT, setupTodoPage} from '../../src/todo/todoPage';

describe('example to-do app (with Barnstorm)', () => {
  let instrumentSet: InstrumentSet;
  let todoPage;

  beforeEach(() => {
    instrumentSet = buildInstrumentSet();
    todoPage = setupTodoPage(instrumentSet);

    instrumentSet.url().visit(ENTRY_URL);
  });

  it('Verify the todo text box is initially in focus', () => {
    todoPage.todoTextBox().verifyIsInFocus();
  });

  it('Add a new todo item', () => {
    fly(instrumentSet, addTodoItem({
      todoPage,
      newItemText: 'Feed the cat'
    }));
  });

  it('Check off an item as completed', () => {
    fly(instrumentSet, checkOffTask({
      todoPage,
      todoItemIndex: 0
    }));
  });

  context('Start each test with a checked task', () => {
    beforeEach(() => {
      fly(instrumentSet, checkOffTask({
        todoPage,
        todoItemIndex: 0,
      }));
    });

    it('Filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      // By verifying the full content, we can also assert that the task we checked off
      // does not exist on the page.
      fly(instrumentSet, filterUncompletedTasks({
        todoPage,
        expectedContent: [
          {
            [TODO_ITEM_TEXT]: {
              textContent: 'Walk the dog'
            },
            [TODO_ITEM_CHECKBOX]: {
              isChecked: false,
              isVisible: false
            }
          }
        ]
      }));
    });

    it('Filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      fly(instrumentSet, filterCompletedTasks({
        todoPage,
        expectedContent: [
          {
            [TODO_ITEM_TEXT]: {
              textContent: 'Pay electric bill'
            },
            [TODO_ITEM_CHECKBOX]: {
              isChecked: true,
              isVisible: false
            }
          }
        ]
      }));
    });

    it('Delete all completed tasks', () => {
      fly(instrumentSet, deleteCompletedTasks({
        todoPage,
        expectedContent: [
          {
            [TODO_ITEM_TEXT]: {
              textContent: 'Walk the dog'
            },
            [TODO_ITEM_CHECKBOX]: {
              isChecked: false,
              isVisible: false
            }
          }
        ]
      }));
    })
  });
});
