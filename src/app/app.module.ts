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

import { CourseDetailsComponent } from './course-details/course-details.component';
import { DialogComponent } from './dialog/dialog.component';

import { HttpClientModule } from '@angular/common/http';

import { CourseService } from './course.service';
import { LoginService } from './login.service';
import { AccountService } from './account.service';
import { CookieService } from './cookie.service';
import { HilangApiService } from './hilang-api.service';

import { UserwelcomeComponent } from './userwelcome/userwelcome.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { UserinfoblockComponent } from './userinfoblock/userinfoblock.component';

import { ExerciseResultComponent } from './exercise-result/exercise-result.component';

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
        path: 'dialog',
        component: DialogComponent
    },
    {
        path: 'user',
        children: [
            {
                path: '',
                component: UserwelcomeComponent
            },
            {
                path: 'flashcards',
                component: FlashcardsComponent
            },
            {
                path: 'grammar',
                component: GrammarComponent
            },
            {
                path: 'lesson/:author_id/:lesson_id',
                component: LessonviewComponent
            },
            {
                path: 'mc',
                component: MultipleChoiceComponent
            },
            {
                path: 'browse',
                component: BrowseComponent
            },
            {
                path: 'courses',
                component: MyCoursesComponent
            },
            {
                path: 'course-details/:id',
                component: CourseDetailsComponent
            },
            {
                path: 'create-list',
                component: CreateWordListComponent
            },
            {
                path: "settings",
                component: AccountsettingsComponent
            },
            {
                path: "exercise-result",
                component: ExerciseResultComponent
            }
        ]
    },
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
        MyCoursesComponent,
        HeaderComponent,
        ContentComponent,
        BrowseComponent,
        CreateWordListComponent,
        LandingpageComponent,
        LoginComponent,
        FooterComponent,
        SentenceStructureComponent,
        MultipleChoiceComponent,
        CourseDetailsComponent,
        UserwelcomeComponent,
        AccountsettingsComponent,
        UserinfoblockComponent,
        ExerciseResultComponent,
        DialogComponent
    ],
    entryComponents: [
        HeaderComponent,
        LessonviewComponent,
        MyCoursesComponent,
        FlashcardsComponent,
        GrammarComponent,
        BrowseComponent,
        MultipleChoiceComponent,
        CreateWordListComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true
            }
        )
    ],
    providers: [CourseService,
                LoginService,
                AccountService,
                CookieService,
                HilangApiService
                ],
    bootstrap: [AppComponent]
})
export class AppModule { }
