import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { GrammarComponent } from './exercises/grammar/grammar.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { LessonviewComponent } from './lessonview/lessonview.component';
import { HeaderComponent } from './header/header.component';
import { SentenceStructueComponentComponent } from './sentence-structue-component/sentence-structue-component.component';
import { SentenceStructureComponentComponent } from './sentence-structure-component/sentence-structure-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    MenuBarComponent,
    GrammarComponent,
    FlashcardsComponent,
    LessonviewComponent,
    HeaderComponent,
    SentenceStructueComponentComponent,
    SentenceStructureComponentComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
