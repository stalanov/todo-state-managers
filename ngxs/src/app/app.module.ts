import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { environment } from 'src/environments/environment';
import { TodoState } from './state/todo.state';

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoListComponent, SpinnerComponent, TodoFilterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([TodoState], { developmentMode: !environment.production }),
    environment.plugins
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
