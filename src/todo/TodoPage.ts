import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { INSTRUMENT_TYPES } from '@kryter/barnstorm/lib/InstrumentOptions';

export const TODO_LIST_ID = 'TODO_LIST_ID';
export const TODO_LIST_ITEM_TEXT_ID = 'TODO_LIST_ITEM_TEXT_ID';
export const TODO_LIST_ITEM_CHECKBOX_ID = 'TODO_LIST_ITEM_CHECKBOX_ID';
export const TODO_ITEM_TEXT_BOX_ID = 'TODO_ITEM_TEXT_BOX_ID';
export const CLEAR_COMPLETED_BUTTON_ID = 'CLEAR_COMPLETED_BUTTON_ID';
export const COMPLETED_FILTER_BUTTON_ID = 'COMPLETED_FILTER_BUTTON_ID';
export const ACTIVE_FILTER_BUTTON_ID = 'ACTIVE_FILTER_BUTTON_ID';

export function todoListPage(instrumentSet: InstrumentSet): void {
  instrumentSet.setup({
    id: TODO_LIST_ID,
    instrumentType: INSTRUMENT_TYPES.LIST,
    selector: '.todo-list',
    relativeItemSelector: 'li',
    columns: [
      {
        id: TODO_LIST_ITEM_TEXT_ID,
        instrumentType: INSTRUMENT_TYPES.SIMPLE_ELEMENT,
        selector: '',
      },
      {
        id: TODO_LIST_ITEM_CHECKBOX_ID,
        instrumentType: INSTRUMENT_TYPES.CHECKBOX,
        selector: 'input[type="checkbox"].toggle'
      }
    ],
    initialState: [
      {
        [TODO_LIST_ITEM_TEXT_ID]: 'Pay electric bill',
        [TODO_LIST_ITEM_CHECKBOX_ID]: false
      },
      {
        [TODO_LIST_ITEM_TEXT_ID]: 'Walk the dog',
        [TODO_LIST_ITEM_CHECKBOX_ID]: false
      }
    ]
  });

  instrumentSet.setup({
    id: TODO_ITEM_TEXT_BOX_ID,
    instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
    selector: '[data-test=new-todo]'
  });

  instrumentSet.setup({
    id: COMPLETED_FILTER_BUTTON_ID,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '[href="#/completed"]'
  });

  instrumentSet.setup({
    id: ACTIVE_FILTER_BUTTON_ID,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '[href="#/active"]'
  });

  instrumentSet.setup({
    id: CLEAR_COMPLETED_BUTTON_ID,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '.todo-button.clear-completed'
  });
}
