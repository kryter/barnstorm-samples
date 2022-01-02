import { FlightPlan } from '@kryter/barnstorm/lib/FlightPlan';
import { KeyboardInstrument, ListInstrument, KEYBOARD_INSTRUMENT_ID, ButtonInstrument, TextBoxInstrument, CheckboxInstrument, SimpleElementInstrument, UrlInstrument, URL_INSTRUMENT_ID } from '@kryter/barnstorm/lib/instruments';
import {InstrumentSet} from '@kryter/barnstorm/lib/InstrumentSet';
import { TODO_LIST_ID, ACTIVE_FILTER_BUTTON_ID, TODO_ITEM_TEXT_BOX_ID, TODO_LIST_ITEM_TEXT_ID, TODO_LIST_ITEM_CHECKBOX_ID, COMPLETED_FILTER_BUTTON_ID, CLEAR_COMPLETED_BUTTON_ID } from './TodoPage';
import { COMPLETED_FILTER_URL, ACTIVE_FILTER_URL } from './AppUrls';

export interface AddTodoItemOptions {
  newItemText: string;
}

export function addTodoItemFlightPlan({newItemText}: AddTodoItemOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<TextBoxInstrument>(TODO_ITEM_TEXT_BOX_ID).enterText(newItemText);
          instrumentSet.use<KeyboardInstrument>(KEYBOARD_INSTRUMENT_ID).pressEnter();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<ListInstrument>(TODO_LIST_ID).addRow({
            [TODO_LIST_ITEM_TEXT_ID]: newItemText
          });
        }
      }
    ]
  };
}

export interface CheckOffItemOptions {
  todoItemIndex: number;
}

export function checkOffTaskFlightPlan({todoItemIndex}: CheckOffItemOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          const listInstrument = instrumentSet.use<ListInstrument>(TODO_LIST_ID);
          const cellId = listInstrument.getCellId(todoItemIndex, TODO_LIST_ITEM_CHECKBOX_ID);
          instrumentSet.use<CheckboxInstrument>(cellId).check();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          // TODO move expectation here
          const listInstrument = instrumentSet.use<ListInstrument>(TODO_LIST_ID);
          const cellId = listInstrument.getCellId(todoItemIndex, TODO_LIST_ITEM_TEXT_ID);
          instrumentSet.use<SimpleElementInstrument>(cellId).verifyHasClass('completed')
        }
      }
    ]
  };
}

export interface FilterUncompletedTasksOptions {
  expectedContent: Record<string, unknown>[];
}

export function filterUncompletedTasksFlightPlan({expectedContent}: FilterUncompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<ButtonInstrument>(ACTIVE_FILTER_BUTTON_ID).verifyTextContent('Active');
          instrumentSet.use<ButtonInstrument>(ACTIVE_FILTER_BUTTON_ID).click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).setState(ACTIVE_FILTER_URL);
          instrumentSet.use<ListInstrument>(TODO_LIST_ID).setState(expectedContent);
        }
      }
    ]
  };
}

export interface FilterCompletedTasksOptions {
  expectedContent: Record<string, unknown>[];
}

export function filterCompletedTasksFlightPlan({expectedContent}: FilterCompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<ButtonInstrument>(COMPLETED_FILTER_BUTTON_ID).verifyTextContent('Completed');
          instrumentSet.use<ButtonInstrument>(COMPLETED_FILTER_BUTTON_ID).click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).setState(COMPLETED_FILTER_URL);
          instrumentSet.use<ListInstrument>(TODO_LIST_ID).setState(expectedContent);
        }
      }
    ]
  };
}

export interface DeleteCompletedTasksOptions {
  expectedContent: Record<string, unknown>[];
}

export function deleteCompletedTasksFlightPlan({expectedContent}: DeleteCompletedTasksOptions): FlightPlan {
  return {
    legs: [
      {
        doTestAction: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<ButtonInstrument>(CLEAR_COMPLETED_BUTTON_ID).verifyTextContent('Clear completed');
          instrumentSet.use<ButtonInstrument>(CLEAR_COMPLETED_BUTTON_ID).click();
        },
        updateExpectations: (instrumentSet: InstrumentSet) => {
          instrumentSet.use<ListInstrument>(TODO_LIST_ID).setState(expectedContent);
        }
      }
    ]
  };
}

