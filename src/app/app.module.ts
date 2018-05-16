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
import { ContentComponent } from './content/content.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuBarComponent,
        GrammarComponent,
        FlashcardsComponent,
        LessonviewComponent,
        HeaderComponent,
        ContentComponent,
        LandingpageComponent,
        LoginComponent
    ],
    entryComponents: [
        HeaderComponent,
        LessonviewComponent,
        FlashcardsComponent,
        GrammarComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
