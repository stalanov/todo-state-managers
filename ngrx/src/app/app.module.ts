import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { reducers, metaReducers } from './reducers';
import { TodoEffects } from './effects/todo.effects';
import { extModules } from './build-specifics';

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoListComponent, SpinnerComponent, TodoFilterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([TodoEffects]),
    extModules
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
