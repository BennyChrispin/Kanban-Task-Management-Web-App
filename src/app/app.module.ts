import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskComponent } from './components/task/task.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './shared/header/header.component';
import { ModalComponent } from './shared/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { boardReducer } from './store/board.reducer';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { TaskDisplayComponent } from './components/task-display/task-display.component';
import { ColumnsFormComponent } from './components/columns-form/columns-form.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    BoardComponent,
    HeaderComponent,
    ModalComponent,
    FormComponent,
    BoardFormComponent,
    TaskDisplayComponent,
    ColumnsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature('boards', boardReducer),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
