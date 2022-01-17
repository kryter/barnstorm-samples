import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { ButtonInstrument, ListInstrument, TextBoxInstrument } from '@kryter/barnstorm/lib/instruments';
import { INSTRUMENT_TYPES } from '@kryter/barnstorm/lib/INSTRUMENT_TYPES';

// Export the column keys for a list for reference in expected data
// updates during tests.
export const TODO_ITEM_TEXT = 'TODO_ITEM_TEXT';
export const TODO_ITEM_CHECKBOX = 'TODO_ITEM_CHECKBOX';

const todoList = {
  id: 'todoList',
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
      selector: 'input[type="checkbox"].toggle',
      verifyStateWhenInvisible: true
    }
  ],
  initialState: {
    rows: [
      {
        [TODO_ITEM_TEXT]: {
          textContent: 'Pay electric bill'
        },
        [TODO_ITEM_CHECKBOX]: {
          isChecked: false,
          isVisible: false
        }
      },
      {
        [TODO_ITEM_TEXT]: {
          textContent: 'Walk the dog',
        },
        [TODO_ITEM_CHECKBOX]: {
          isChecked: false,
          isVisible: false
        }
      }
    ]
  }
};

const todoTextBox = {
  id: 'todoTextBox',
  instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
  selector: '[data-test=new-todo]',
  initialState: {
    textContent: ''
  }
};

const clearCompletedButton = {
  id: 'clearCompletedButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.todo-button.clear-completed',
  initialState: {
    textContent: '',
    isVisible: false
  }
};

const filterCompletedButton = {
  id: 'completedButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[href="#/completed"]',
  initialState: {
    textContent: 'Completed'
  }
};

const filterActiveButton = {
  id: 'activeButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[href="#/active"]',
  initialState: {
    textContent: 'Active'
  }
};

const configs = [
  todoList,
  todoTextBox,
  clearCompletedButton,
  filterCompletedButton,
  filterActiveButton
];

export function setupTodoTower(instruments: InstrumentSet) {
  instruments.createInstruments(configs);

  return {
    todoList: () => instruments.use<ListInstrument>(todoList.id),
    todoTextBox: () => instruments.use<TextBoxInstrument>(todoTextBox.id),
    clearCompletedButton: () => instruments.use<ButtonInstrument>(clearCompletedButton.id),
    filterCompletedButton: () => instruments.use<ButtonInstrument>(filterCompletedButton.id),
    filterActiveButton: () => instruments.use<ButtonInstrument>(filterActiveButton.id),
    instrumentIds: () => configs.map((config) => config.id)
  };
}

export type TodoTower = ReturnType<typeof setupTodoTower>;
