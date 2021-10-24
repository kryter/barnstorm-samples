import { ButtonInstrument } from "@kryter/barnstorm/lib/instruments/ButtonInstrument";
import { CheckboxInstrument } from "@kryter/barnstorm/lib/instruments/CheckboxInstrument";
import { ElementInstrument } from "@kryter/barnstorm/lib/instruments/ElementInstrument";
import { ListInstrument } from "@kryter/barnstorm/lib/instruments/ListInstrument";
import { TextBoxInstrument } from "@kryter/barnstorm/lib/instruments/TextBoxInstrument";
import { UrlInstrument } from "@kryter/barnstorm/lib/instruments/UrlInstrument";

class TodoPage {
  public entryUrl(): UrlInstrument {
    return new UrlInstrument({
      url: 'https://example.cypress.io/todo'
    });
  }

  public todosList(): ListInstrument {
    return new ListInstrument({
      selector: '.todo-list',
      relativeItemSelector: 'li'
    });
  }

  public todoListItem(itemNumber: number): ElementInstrument {
    return new ElementInstrument({
      listInstrument: this.todosList(),
      itemNumber: itemNumber,
      selector: ''
    });
  }


  public todoListItemCheckbox(itemNumber: number): CheckboxInstrument {
    return new CheckboxInstrument({
      listInstrument: this.todosList(),
      itemNumber: itemNumber,
      selector: 'input[type="checkbox"].toggle'
    });
  }

  public todosTextBox(): TextBoxInstrument {
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
