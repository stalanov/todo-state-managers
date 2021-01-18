import { Component, EventEmitter, Output } from '@angular/core';
import { CompleteFilter, TodoParams } from 'src/app/shared/types';

const filterHash = {
  [CompleteFilter.ALL]: {},
  [CompleteFilter.COMPLETED]: { completed: true },
  [CompleteFilter.NON_COMPLETED]: { completed: false }
};

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent {
  @Output() filterChange: EventEmitter<Partial<TodoParams>> = new EventEmitter();

  completeFilter: typeof CompleteFilter = CompleteFilter;

  onChange(filter: CompleteFilter): void {
    this.filterChange.emit(filterHash[filter]);
  }
}
