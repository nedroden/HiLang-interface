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
import { BrowseComponent } from './browse/browse.component';
import { CreateWordListComponent} from './create-word-list/create-word-list.component';

import { SentenceStructureComponent } from './exercises/sentencestructure/sentencestructure.component';
import { MultipleChoiceComponent } from './exercises/multiplechoice/multiplechoice.component';
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
            },
            {
                path: 'mc',
                component: MultipleChoiceComponent
            },
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
        MyCoursesComponent,
        BrowseComponent,
        CreateWordListComponent,
        LandingpageComponent,
        LoginComponent,
        FooterComponent,
        SentenceStructureComponent,
        MultipleChoiceComponent
    ],
    entryComponents: [
        HeaderComponent,
        LessonviewComponent,
        FlashcardsComponent,
        GrammarComponent,
        MyCoursesComponent,
        BrowseComponent,
        MultipleChoiceComponent,
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
