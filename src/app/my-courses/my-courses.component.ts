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
    private subLanguages = [];
    private subCourses = [];
    private myCourses = [];
    private favCourses = [];
    private languages;
    private knownUsers = {};
    private currentId: number;
    private loadingCounter: number;
    private loadingScreen: LoadingScreen;
    constructor(private _courses: CourseService,
                private _cookies: CookieService,
                private _api: HilangApiService,
                private _router: Router) {}

    //for debug no other use
    //---------------------------
    getCourses() {
        this._courses.getCourses().subscribe(
            data => {this.doWithData(data)},
            err => console.error(err)
        );
    }

    doWithData(data) {
        for(let i=0; i<data['length']; i++) {
            this.subCourses[0].courses.push(data[i].fields);
        }
    }
    //---------------------------

    getMyCourses(callback: (u_id: number) => any) {
        let courses = [];
        callback(this._cookies.getValue()['user_id']).subscribe(
            data => {
                for(let course of <Object[]>data) {
                    // Check if user exists in user array (used for caching)
                    //if (!(course['fields']['user'] in this.knownUsers)) {
                    this._courses.getUser(course['fields']['user']).subscribe(userName => {
                        this.knownUsers[course['fields']['user']] = (userName['name']);
                        this.myCourses.push({id: course['pk'],
                                            description: course['fields']['description'],
                                            image: course['fields']['image'],
                                            name: course['fields']['name'],
                                            subscribers: course['fields']['subscribers'],
                                            author: userName['name']});
                    });
                    //}
                }
                this.loadingCounter += 1;
                if (this.loadingCounter < 3)
                    this.loadingScreen.disable();
            },
            err => console.log(err)
        );
        return courses;
    }

    ngOnInit() {
        this.loadingCounter = 0;
        this.loadingScreen = new LoadingScreen();
        this._api.call('http://localhost:8000/api/languages/', {}).subscribe(data => {
            this.languages = data;
        });

        this.subCourses = this.getMyCourses((u_id: number) => {
          return this._api.call('http://localhost:8000/api/user/subscriptions/' + u_id + '/', {});
        });

        this.favCourses = this.getMyCourses((u_id: number) => {
          return this._api.call('http://localhost:8000/api/user/favorites/' + u_id + '/', {});
        });
        this.myCourses = this.getMyCourses((u_id: number) => {
            return this._api.call('http://localhost:8000/api/courses/' + u_id + '/', {});
        });
        this.loadingScreen.render(document.body);
        console.log('loading.....');
    }

    addCourse() {
        let courseInput = <HTMLInputElement>document.getElementById('courseInput');
        let targetLang = <HTMLInputElement>document.getElementById('target_lang')['value'];
        let nativeLang = <HTMLInputElement>document.getElementById('native_lang')['value'];
        if (courseInput.value != "") {
            let newCourse = {id: this.currentId, name: courseInput.value, author: ""}
            this._courses.createCourse({name: courseInput.value, targetLang: targetLang, nativeLang: nativeLang}).subscribe(data => {
                //this._router.navigate('/user/course/' + data[0].pk + '/');
                // navigate to course page!
            });
            courseInput.value = "";
        }
    }
}
