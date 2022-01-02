/// <reference types="cypress" />

import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { fly } from '@kryter/barnstorm/lib/fly';
import {ButtonInstrument, TextBoxInstrument, UrlInstrument, URL_INSTRUMENT_ID} from '@kryter/barnstorm/lib/instruments';
import { buildInstrumentSet } from '../../src/AppInstrumentSet';
import {todoListPage, TODO_ITEM_TEXT_BOX_ID, ACTIVE_FILTER_BUTTON_ID, TODO_LIST_ITEM_TEXT_ID, TODO_LIST_ITEM_CHECKBOX_ID, CLEAR_COMPLETED_BUTTON_ID} from '../../src/todo/TodoPage';
import {addTodoItemFlightPlan, checkOffTaskFlightPlan, filterTasksFlightPlan, filterCompletedTasksFlightPlan, filterUncompletedTasksFlightPlan, deleteCompletedTasksFlightPlan} from '../../src/todo/TodoPilot';
import {ENTRY_URL} from '../../src/todo/AppUrls';
import { instrumentSet } from '@kryter/barnstorm/lib/instrumentSet';

describe('example to-do app (with Barnstorm)', () => {
  let instrumentSet: InstrumentSet;

  beforeEach(() => {
    instrumentSet = buildInstrumentSet();
    todoListPage(instrumentSet);

    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).visit(ENTRY_URL);
  });

  it('Verify the todo text box is initially in focus', () => {
    instrumentSet.use<TextBoxInstrument>(TODO_ITEM_TEXT_BOX_ID).verifyIsInFocus();
  });

  it('Add a new todo item', () => {
    fly(instrumentSet, addTodoItemFlightPlan({
      newItemText: 'Feed the cat'
    }));
  });

  it('Check off an item as completed', () => {
    fly(instrumentSet, checkOffTaskFlightPlan({
      todoItemIndex: 0
    }));
  });

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      fly(instrumentSet, checkOffTaskFlightPlan({
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
      fly(instrumentSet, filterUncompletedTasksFlightPlan({
        expectedContent: [
          {
            [TODO_LIST_ITEM_TEXT_ID]: 'Walk the dog',
            [TODO_LIST_ITEM_CHECKBOX_ID]: false
          }
        ]
      }));
    });

    it('Filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      fly(instrumentSet, filterCompletedTasksFlightPlan({
        expectedContent: [
          {
            [TODO_LIST_ITEM_TEXT_ID]: 'Pay electric bill',
            [TODO_LIST_ITEM_CHECKBOX_ID]: true
          }
        ]
      }));
    });

    it('Delete all completed tasks', () => {
      fly(instrumentSet, deleteCompletedTasksFlightPlan({
        expectedContent: [
          {
            [TODO_LIST_ITEM_TEXT_ID]: 'Walk the dog',
            [TODO_LIST_ITEM_CHECKBOX_ID]: false
          }
        ]
      }));

      // Finally, make sure that the clear button no longer exists.
      instrumentSet.use<ButtonInstrument>(CLEAR_COMPLETED_BUTTON_ID).verifyIsNotVisible();
    })
  });
});
