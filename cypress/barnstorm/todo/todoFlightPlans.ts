import { CheckboxInstrument, UIElementInstrument } from '@kryter/barnstorm/lib/instruments';
import {InstrumentSet} from '@kryter/barnstorm/lib/InstrumentSet';
import { TODO_ITEM_TEXT, TODO_ITEM_CHECKBOX, TodoTower } from './todoTower';
import { useUrls } from '../useUrls';
import { FlightLeg } from '@kryter/barnstorm/lib/FlightLeg';

export interface AddTodoItemOptions {
  todoTower: TodoTower;
  newItemText: string;
}

export function addTodoItem({todoTower, newItemText}: AddTodoItemOptions): FlightLeg {
  return {
    doTestAction: (instruments: InstrumentSet) => {
      todoTower.todoTextBox().enterText(newItemText);
      instruments.keyboard().pressEnter();
    },
    updateExpectations: (instruments: InstrumentSet) => {
      todoTower.todoList().addRow({
        [TODO_ITEM_TEXT]: {
          textContent: newItemText
        },
        [TODO_ITEM_CHECKBOX]: {
          isVisible: false,
          isChecked: false
        }
      });
    }
  };
}

export interface CheckOffItemOptions {
  todoTower: TodoTower;
  todoItemIndex: number;
}

export function checkOffTask({todoTower, todoItemIndex}: CheckOffItemOptions): FlightLeg {
  return {
    doTestAction: (instruments: InstrumentSet) => {
      const cellId = todoTower.todoList().getCellId(todoItemIndex, TODO_ITEM_CHECKBOX);
      instruments.use<CheckboxInstrument>(cellId).check();
    },
    updateExpectations: (instruments: InstrumentSet) => {
      todoTower.clearCompletedButton().updateState({
        textContent: 'Clear completed',
        isVisible: true
      });
      const cellId = todoTower.todoList().getCellId(todoItemIndex, TODO_ITEM_TEXT);
      instruments.use<UIElementInstrument>(cellId).updateState({
        hasClasses: ['completed']
      });
    }
  };
}

export interface FilterUncompletedTasksOptions {
  todoTower: TodoTower;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function filterUncompletedTasks({todoTower, expectedContent}: FilterUncompletedTasksOptions): FlightLeg {
  return {
    doTestAction: (instruments: InstrumentSet) => {
      todoTower.filterActiveButton().click();
    },
    updateExpectations: (instruments: InstrumentSet) => {
      instruments.url().updateState({
        currentUrl: useUrls().activeFilterUrl
      });
      todoTower.todoList().updateState({
        rows: expectedContent
      });
    }
  };
}

export interface FilterCompletedTasksOptions {
  todoTower: TodoTower;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function filterCompletedTasks({todoTower, expectedContent}: FilterCompletedTasksOptions): FlightLeg {
  return {
    doTestAction: (instruments: InstrumentSet) => {
      todoTower.filterCompletedButton().click();
    },
    updateExpectations: (instruments: InstrumentSet) => {
      instruments.url().updateState({
        currentUrl: useUrls().completedFilterUrl
      });
      todoTower.todoList().updateState({
        rows: expectedContent
      });
    }
  };
}

export interface DeleteCompletedTasksOptions {
  todoTower: TodoTower;
  expectedContent: Record<string, Record<string, unknown>>[];
}

export function deleteCompletedTasks({todoTower, expectedContent}: DeleteCompletedTasksOptions): FlightLeg {
  return {
    doTestAction: (instruments: InstrumentSet) => {
      todoTower.clearCompletedButton().click();
    },
    updateExpectations: (instruments: InstrumentSet) => {
      // Make sure that the clear button no longer exists.
      todoTower.clearCompletedButton().updateState({
        textContent: '',
        isVisible: false
      });
      todoTower.todoList().updateState({
        rows: expectedContent
      });
    }
  };
}
