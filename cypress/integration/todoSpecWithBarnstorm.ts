/// <reference types="cypress" />

import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { useAirplane, FlyFunction } from '@kryter/barnstorm/lib/useAirplane';
import { useInstruments} from '../barnstorm/useInstruments';
import {addTodoItem, checkOffTask, filterCompletedTasks, filterUncompletedTasks, deleteCompletedTasks} from '../barnstorm/todo/todoFlightPlans';
import { useUrls } from '../barnstorm/useUrls';
import { TodoTower, setupTodoTower, TODO_ITEM_TEXT, TODO_ITEM_CHECKBOX } from '../barnstorm/todo/todoTower';

describe('example to-do app (with Barnstorm)', () => {
  let instruments: InstrumentSet;
  let fly: FlyFunction;
  let todoTower: TodoTower;

  beforeEach(() => {
    instruments = useInstruments();
    fly = useAirplane(instruments);
    todoTower = setupTodoTower(instruments);

    instruments.url().visit(useUrls().baseUrl);
  });

  it('Verify the todo text box is initially in focus', () => {
    todoTower.todoTextBox().verifyIsInFocus();
  });

  it('Add a new todo item', () => {
    fly(addTodoItem({
      todoTower,
      newItemText: 'Feed the cat'
    }));
  });

  it('Check off an item as completed', () => {
    fly(checkOffTask({
      todoTower,
      todoItemIndex: 0
    }));
  });

  context('Start each test with a checked task', () => {
    beforeEach(() => {
      fly(checkOffTask({
        todoTower,
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
      fly(filterUncompletedTasks({
        todoTower,
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
      fly(filterCompletedTasks({
        todoTower,
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
      fly(deleteCompletedTasks({
        todoTower,
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
