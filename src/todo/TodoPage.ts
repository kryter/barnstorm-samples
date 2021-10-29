import {
  ButtonInstrument,
  CheckboxInstrument,
  ElementInstrument,
  ListInstrument,
  TextBoxInstrument,
  UrlInstrument
 } from "@kryter/barnstorm/lib/instruments";

class TodoPage {
  public entryUrl(): UrlInstrument {
    return new UrlInstrument({
      url: 'https://example.cypress.io/todo'
    });
  }

  public todoList(): ListInstrument {
    return new ListInstrument({
      selector: '.todo-list',
      relativeItemSelector: 'li'
    });
  }

  public todoListItem(itemNumber: number): ElementInstrument {
    return new ElementInstrument({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: ''
    });
  }

  public todoListItemCheckbox(itemNumber: number): CheckboxInstrument {
    return new CheckboxInstrument({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: 'input[type="checkbox"].toggle'
    });
  }

  public todoTextBox(): TextBoxInstrument {
    return new TextBoxInstrument({
      selector: '[data-test=new-todo]'
    });
  }

  public completedFilterButton(): ButtonInstrument {
    return new ButtonInstrument({
      selector: '[href="#/completed"]'
    });
  }

  public activeFilterButton(): ButtonInstrument {
    return new ButtonInstrument({
      selector: '[href="#/active"]'
    });
  }

  public clearCompletedButton(): ButtonInstrument {
    return new ButtonInstrument({
      selector: '.todo-button.clear-completed'
    });
  }
}

export const todoPage = new TodoPage();
