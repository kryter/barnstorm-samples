import { FlightPlan } from '@kryter/barnstorm/lib/FlightPlan';
import { CheckboxInstrument, UIElementInstrument } from '@kryter/barnstorm/lib/instruments';
import {InstrumentSet} from '@kryter/barnstorm/lib/InstrumentSet';
import { TODO_ITEM_TEXT, TODO_ITEM_CHECKBOX, TodoPage } from './todoPage';
import { COMPLETED_FILTER_URL, ACTIVE_FILTER_URL } from '../AppUrls';

export interface AddTodoItemOptions {
  todoPage: TodoPage;
  newItemText: string;
}

export function addTodoItem({todoPage, newItemText}: AddTodoItemOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          todoPage.todoTextBox().enterText(newItemText);
          instrumentSet.keyboard().pressEnter();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          todoPage.todoList().addRow({
            [TODO_ITEM_TEXT]: {
              textContent: newItemText
            },
            [TODO_ITEM_CHECKBOX]: {
              isVisible: false,
              isChecked: false
            }
          });
        }
      }
    ]
  };
}

export interface CheckOffItemOptions {
  todoPage: TodoPage;
  todoItemIndex: number;
}

export function checkOffTask({todoPage, todoItemIndex}: CheckOffItemOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          const cellId = todoPage.todoList().getCellId(todoItemIndex, TODO_ITEM_CHECKBOX);
          instrumentSet.use<CheckboxInstrument>(cellId).check();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          todoPage.clearCompletedButton().updateState({
            textContent: 'Clear completed',
            isVisible: true
          });
          const cellId = todoPage.todoList().getCellId(todoItemIndex, TODO_ITEM_TEXT);
          instrumentSet.use<UIElementInstrument>(cellId).updateState({
            hasClasses: ['completed']
          });
        }
      }
    ]
  };
}

export interface FilterUncompletedTasksOptions {
  todoPage: TodoPage;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function filterUncompletedTasks({todoPage, expectedContent}: FilterUncompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          todoPage.activeButton().click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.url().updateState({
            currentUrl: ACTIVE_FILTER_URL
          });
          todoPage.todoList().updateState({
            rows: expectedContent
          });
        }
      }
    ]
  };
}

export interface FilterCompletedTasksOptions {
  todoPage: TodoPage;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function filterCompletedTasks({todoPage, expectedContent}: FilterCompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          todoPage.completedButton().click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.url().updateState({
            currentUrl: COMPLETED_FILTER_URL
          });
          todoPage.todoList().updateState({
            rows: expectedContent
          });
        }
      }
    ]
  };
}

export interface DeleteCompletedTasksOptions {
  todoPage: TodoPage;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function deleteCompletedTasks({todoPage, expectedContent}: DeleteCompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          todoPage.clearCompletedButton().click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          // Make sure that the clear button no longer exists.
          todoPage.clearCompletedButton().updateState({
            textContent: '',
            isVisible: false
          });
          todoPage.todoList().updateState({
            rows: expectedContent
          });
        }
      }
    ]
  };
}
