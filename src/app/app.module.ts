import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GrammarComponent } from './exercises/grammar/grammar.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { LessonviewComponent } from './lessonview/lessonview.component';

@NgModule({
  declarations: [
    AppComponent,
    GrammarComponent,
    FlashcardsComponent,
    LessonviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
