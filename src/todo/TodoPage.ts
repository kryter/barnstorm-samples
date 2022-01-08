import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { ButtonInstrument, ListInstrument, TextBoxInstrument } from '@kryter/barnstorm/lib/instruments';
import { INSTRUMENT_TYPES } from '@kryter/barnstorm/lib/INSTRUMENT_TYPES';

const TODO_LIST = 'TODO_LIST';
export const TODO_ITEM_TEXT = 'TODO_ITEM_TEXT';
export const TODO_ITEM_CHECKBOX = 'TODO_ITEM_CHECKBOX';

const TODO_TEXT_BOX = 'TODO_TEXT_BOX';
const CLEAR_COMPLETED_BUTTON = 'CLEAR_COMPLETED_BUTTON';
const COMPLETED_BUTTON = 'COMPLETED_BUTTON';
const ACTIVE_BUTTON = 'ACTIVE_BUTTON';

export function setupTodoPage(instrumentSet: InstrumentSet) {
  instrumentSet.setup({
    id: TODO_LIST,
    instrumentType: INSTRUMENT_TYPES.LIST,
    selector: '.todo-list',
    relativeItemSelector: 'li',
    columns: [
      {
        id: TODO_ITEM_TEXT,
        instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
        selector: '',
      },
      {
        id: TODO_ITEM_CHECKBOX,
        instrumentType: INSTRUMENT_TYPES.CHECKBOX,
        selector: 'input[type="checkbox"].toggle'
      }
    ],
    initialState: {
      rows: [
        {
          [TODO_ITEM_TEXT]: {
            textContent: 'Pay electric bill'
          },
          [TODO_ITEM_CHECKBOX]: {
            isChecked: false
          }
        },
        {
          [TODO_ITEM_TEXT]: {
            textContent: 'Walk the dog',
          },
          [TODO_ITEM_CHECKBOX]: {
            isChecked: false
          }
        }
      ]
    }
  });

  instrumentSet.setup({
    id: TODO_TEXT_BOX,
    instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
    selector: '[data-test=new-todo]',
    initialState: {
      inputText: ''
    }
  });

  instrumentSet.setup({
    id: CLEAR_COMPLETED_BUTTON,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '.todo-button.clear-completed',
    initialState: {
      textContent: ''
    }
  });

  instrumentSet.setup({
    id: COMPLETED_BUTTON,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '[href="#/completed"]',
    initialState: {
      textContent: 'Completed'
    }
  });

  instrumentSet.setup({
    id: ACTIVE_BUTTON,
    instrumentType: INSTRUMENT_TYPES.BUTTON,
    selector: '[href="#/active"]',
    initialState: {
      textContent: 'Active'
    }
  });

  return {
    todoList: () => instrumentSet.use<ListInstrument>(TODO_LIST),
    todoTextBox: () => instrumentSet.use<TextBoxInstrument>(TODO_TEXT_BOX),
    clearCompletedButton: () => instrumentSet.use<ButtonInstrument>(CLEAR_COMPLETED_BUTTON),
    completedButton: () => instrumentSet.use<ButtonInstrument>(COMPLETED_BUTTON),
    activeButton: () => instrumentSet.use<ButtonInstrument>(ACTIVE_BUTTON),
    teardownTodoPage: () => {
      instrumentSet.teardown([
        TODO_LIST,
        TODO_ITEM_TEXT,
        TODO_ITEM_CHECKBOX ,
        TODO_TEXT_BOX,
        CLEAR_COMPLETED_BUTTON,
        COMPLETED_BUTTON,
        ACTIVE_BUTTON
      ]);
    }
  };
}

export type TodoPage = ReturnType<typeof setupTodoPage>;
