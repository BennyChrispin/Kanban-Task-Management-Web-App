import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    BoardComponent,
    HeaderComponent,
    ModalComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
