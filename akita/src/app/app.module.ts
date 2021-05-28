import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoQuery, TodoService, TodoStore } from './state';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoListComponent, SpinnerComponent, TodoFilterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [TodoService, TodoStore, TodoQuery],
  bootstrap: [AppComponent]
})
export class AppModule {}
