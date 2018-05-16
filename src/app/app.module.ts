import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { GrammarComponent } from './exercises/grammar/grammar.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { LessonviewComponent } from './lessonview/lessonview.component';
import { HeaderComponent } from './header/header.component';
import { CreateWordListComponent} from './create-word-list/create-word-list.component';
import { SentenceStructureExerciseComponent } from './sentence-structure-exercise/sentence-structure-exercise.component';
import { MultiplechoiseComponent } from './exercises/multiplechoise/multiplechoise.component';


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
        ContentComponent,
        CreateWordListComponent,
        LandingpageComponent,
        LoginComponent,
        SentenceStructureExerciseComponent,
        MultiplechoiseComponent,
    ],
    entryComponents: [
        HeaderComponent,
        LessonviewComponent,
        FlashcardsComponent,
        CreateWordListComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
