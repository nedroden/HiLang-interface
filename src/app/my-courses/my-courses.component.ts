import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { CookieService } from '../cookie.service';
import { HilangApiService } from '../hilang-api.service';
import { LoadingScreen } from '../utils/loadingScreen';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
    private courses = {
        myCourses : {
            active : [],
            courses : []
        },
        subCourses : {
            active : [],
            courses : []
        },
        favCourses : {
            active : [],
            courses : []
        }
    }
    private languages = [];
    private flags = {};
    private filteredLanguages = [];
    private knownUsers = {};
    private currentId: number;
    private loadingCounter: number;
    private loadingScreen: LoadingScreen;
    constructor(private _courses: CourseService,
                private _cookie: CookieService,
                private _api: HilangApiService,
                private _router: Router) {}

    getMyCourses(callback: (u_id: number) => any) {
        let courses = [];
        callback(this._cookie.getValue()['user_id']).subscribe(
            data => {
                for(let course of <Object[]>data) {
                    console.log(course);
                    this._courses.getUser(course['fields']['user']).subscribe(userName => {
                        this.knownUsers[course['fields']['user']] = (userName['name']);
                        courses.push({
                            id          : course['pk'],
                            description : course['fields']['description'],
                            name        : course['fields']['name'],
                            subscribers : course['fields']['subscribers'],
                            image       : course['fields']['image'],
                            author      : userName['name'],
                            trans_lang  : course['fields']['trans_lang'],
                            native_lang : course['fields']['native_lang'],
                            flag_name   : course['fields']['flag_name'],
                        });
                    });
                }
                // this.loadingCounter += 1;
                // if (this.loadingCounter < 3)
                //     this.loadingScreen.disable();
            },
            err => console.log(err)
        );
        return courses;
    }

    ngOnInit() {
        // this.loadingCounter = 0;
        // this.loadingScreen = new LoadingScreen();
        // this.loadingScreen.render(document.body);
        this._api.call('/languages/', {}).subscribe(data => {
            this.languages = <Object[]>data;
            for (let flag of <Object[]>data) {
                this.flags[flag['pk']] = flag['fields']['flag'];
            }
        });

        this.courses.subCourses.courses = this.getMyCourses((u_id: number) => {
          return this._api.call('/user/subscriptions/' + u_id + '/', {});
        });
        this.courses.subCourses.active = this.courses.subCourses.courses;

        this.courses.favCourses.courses = this.getMyCourses((u_id: number) => {
          return this._api.call('/user/favorites/' + u_id + '/', {});
        });
        this.courses.favCourses.active = this.courses.favCourses.courses

        this.courses.myCourses.courses = this.getMyCourses((u_id: number) => {
            return this._api.call('/courses/' + u_id + '/', {});
        });
        this.courses.myCourses.active = this.courses.myCourses.courses
    }

    addCourse() {
        let courseInput = <HTMLInputElement>document.getElementById('courseInput');
        let targetLang = <HTMLInputElement>document.getElementById('target_lang')['value'];
        let nativeLang = <HTMLInputElement>document.getElementById('native_lang')['value'];
        if (courseInput.value != "") {
            let newCourse = {id: this.currentId, name: courseInput.value, author: ""}
            this._courses.createCourse({name: courseInput.value, targetLang: targetLang, nativeLang: nativeLang}).subscribe(data => {
                this._router.navigate(['/user/course-details/' + data[0].pk + '/']);
            });
            courseInput.value = "";
        }
    }

    updateFilter(languageId: number) {
        if (this.filteredLanguages.includes(languageId)) {
            for (let index in this.filteredLanguages) {
                if (this.filteredLanguages[index] == languageId)
                    this.filteredLanguages.splice(+index, 1);
            }
        } else
            this.filteredLanguages.push(languageId);

        this.updateCourses();
    }

    private updateCourses() {
        for (let category in this.courses) {
            if (this.filteredLanguages.length == 0) {
                this.courses[category].active = this.courses[category].courses;
                continue;
            } else
                this.courses[category].active = [];
            for (let course of this.courses[category].courses) {
                if (this.filteredLanguages.includes(course.trans_lang))
                    this.courses[category].active.push(course);
            }
        }
    }
}
