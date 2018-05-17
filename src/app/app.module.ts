import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { MultipleChoiseComponent } from './exercises/multiplechoise/multiplechoise.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: LandingpageComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'user',
        children: [
            {
                path: 'flashcards',
                component: FlashcardsComponent
            },
            {
                path: 'grammar',
                component: GrammarComponent
            },
            {
                path: 'lesson',
                component: LessonviewComponent
            }
        ]
    }
];

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
        MultipleChoiseComponent,
        FooterComponent,
    ],
    entryComponents: [
        HeaderComponent,
        LessonviewComponent,
        MultipleChoiseComponent,
        CreateWordListComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
