import { ButtonInstrument } from '@kryter/barnstorm/lib/instruments/button/ButtonInstrument';
import { CheckboxInstrument } from '@kryter/barnstorm/lib/instruments/checkbox/CheckboxInstrument';
import { ElementInstrument } from '@kryter/barnstorm/lib/instruments/element/ElementInstrument';
import { KeyboardInstrument } from '@kryter/barnstorm/lib/instruments/keyboard/KeyboardInstrument';
import { ListInstrument } from '@kryter/barnstorm/lib/instruments/list/ListInstrument';
import { TextBoxInstrument } from '@kryter/barnstorm/lib/instruments/textBox/TextBoxInstrument';
import { UrlInstrument } from '@kryter/barnstorm/lib/instruments/url/UrlInstrument';
import instrumentSet from '../AppInstrumentSet';

class TodoPage {
  public keyboard(): KeyboardInstrument {
    return instrumentSet.setupKeyboard();
  }

  public entryUrl(): UrlInstrument {
    return instrumentSet.setupUrl({
      url: 'https://example.cypress.io/todo'
    });
  }

  public todoList(): ListInstrument {
    return instrumentSet.setupList({
      selector: '.todo-list',
      relativeItemSelector: 'li'
    });
  }

  public todoListItem(itemNumber: number): ElementInstrument {
    return instrumentSet.setupElement({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: ''
    });
  }

  public todoListItemCheckbox(itemNumber: number): CheckboxInstrument {
    return instrumentSet.setupCheckbox({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: 'input[type="checkbox"].toggle'
    });
  }

  public todoTextBox(): TextBoxInstrument {
    return instrumentSet.setupTextBox({
      selector: '[data-test=new-todo]'
    });
  }

  public completedFilterButton(): ButtonInstrument {
    return instrumentSet.setupButton({
      selector: '[href="#/completed"]'
    });
  }

  public activeFilterButton(): ButtonInstrument {
    return instrumentSet.setupButton({
      selector: '[href="#/active"]'
    });
  }

  public clearCompletedButton(): ButtonInstrument {
    return instrumentSet.setupButton({
      selector: '.todo-button.clear-completed'
    });
  }
}

export const todoPage = new TodoPage();
