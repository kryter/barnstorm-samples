import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { ButtonInstrument, ListInstrument, TextBoxInstrument } from '@kryter/barnstorm/lib/instruments';
import { INSTRUMENT_TYPES } from '@kryter/barnstorm/lib/INSTRUMENT_TYPES';

// Export the column keys for a list for reference in expected data
// updates during tests.
const TODO_LIST = 'TODO_LIST';
export const TODO_ITEM_TEXT = 'TODO_ITEM_TEXT';
export const TODO_ITEM_CHECKBOX = 'TODO_ITEM_CHECKBOX';

const TODO_TEXT_BOX = 'TODO_TEXT_BOX';
const TODO_CLEAR_COMPLETED_BUTTON = 'TODO_CLEAR_COMPLETED_BUTTON';
const TODO_FILTER_COMPLETED_BUTTON = 'TODO_FILTER_COMPLETED_BUTTON';
const TODO_FILTER_ACTIVE_BUTTON = 'TODO_FILTER_ACTIVE_BUTTON';

const todoListConfig = {
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

const todoTextBoxConfig = {
  id: TODO_TEXT_BOX,
  instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
  selector: '[data-test=new-todo]',
  initialState: {
    inputText: ''
  }
};

const clearCompletedButtonConfig = {
  id: TODO_CLEAR_COMPLETED_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.todo-button.clear-completed',
  initialState: {
    textContent: '',
    isVisible: false
  }
};

const completedButtonConfig = {
  id: TODO_FILTER_COMPLETED_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[href="#/completed"]',
  initialState: {
    textContent: 'Completed'
  }
};

const activeButtonConfig = {
  id: TODO_FILTER_ACTIVE_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[href="#/active"]',
  initialState: {
    textContent: 'Active'
  }
};

const configs = [
  todoListConfig,
  todoTextBoxConfig,
  clearCompletedButtonConfig,
  completedButtonConfig,
  activeButtonConfig
];

export function setupTodoPage(instrumentSet: InstrumentSet) {
  configs.forEach(config => instrumentSet.setup(config));

  return {
    todoList: () => instrumentSet.use<ListInstrument>(TODO_LIST),
    todoTextBox: () => instrumentSet.use<TextBoxInstrument>(TODO_TEXT_BOX),
    clearCompletedButton: () => instrumentSet.use<ButtonInstrument>(TODO_CLEAR_COMPLETED_BUTTON),
    completedButton: () => instrumentSet.use<ButtonInstrument>(TODO_FILTER_COMPLETED_BUTTON),
    activeButton: () => instrumentSet.use<ButtonInstrument>(TODO_FILTER_ACTIVE_BUTTON),
    teardownTodoPage: () => instrumentSet.teardown(configs.map(config => config.id))
  };
}

export type TodoPage = ReturnType<typeof setupTodoPage>;
