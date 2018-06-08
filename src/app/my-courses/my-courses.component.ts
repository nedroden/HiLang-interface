import { Component, OnInit} from '@angular/core';
import { CourseService } from '../course.service';


@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
    miniMenu;
    subLanguages;
    subCourses;
    myCourses;
    favCourses;
    currentId: number;
    constructor(private _courses: CourseService) {
    }

    //for debug no other use
    //---------------------------
    getCourses() {
        this._courses.getCourses().subscribe(
            data => {this.doWithData(data)},
            err => console.error(err),
            () => console.log('Done loading courses')
        );
    }

    doWithData(data) {
        for(let i=0; i<data.length; i++) {
            this.subCourses[0].courses.push(data[i].fields);
        }
    }
    //---------------------------

    getSubCourses() {
        //replace 1 with user_id
        this._courses.getSubCourses(1).subscribe(
            data => { this.handleCourseData(data, 0)},
            err => console.log(err)
        );
    }

    getFavCourses() {
        this._courses.getFavCourses(1).subscribe(
            data => { this.handleCourseData(data, 1)},
            err => console.log(err)
        );
    }

    getMyCourses() {
        this._courses.getUserCourses(1).subscribe( 
            data => { this.handleCourseData(data, 2)},
            err => console.log(err)
        );
    }

    handleCourseData(data, type) {
        for(let i=0; i<data.length; i++) {
            this._courses.getLangDetails(data[i].fields['language']).subscribe(
                languageData => {this.handleLangDet(languageData,data)},
                err => console.log(err),
                () => console.log("Done loading this language")
            );
        }
    }

    handleLangDet(langDet,data) {
        let subribedCourses = [];
        for(let i = 0; i<data.length; i++) {
            if(data[i].fields['language'] == langDet[0].pk) {
                this._courses.getUser(data[i].fields['user']).subscribe(
                    userName => { 
                        courses.push(
                            {
                                id: data[i].pk,
                                description: data[i].fields['description'],
                                image: data[i].fields['image'],
                                name: data[i].fields['name'],
                                subscribers: data[i].fields['subscribers'],
                                author: userName[0].fields['name'] 
                            }
                        );
                    },
                    err => console.log(err)
                );   
            }
        }
        if(type === 0) {
            let unique = true;
            for(let lang of this.subCourses) {
                if(lang.id === langDet[0].pk) {
                    unique = false;
                }
            }
            if(unique) {
                this.subCourses.push( {
                    id: langDet[0].pk,
                    name: langDet[0].fields['name'],
                    flag: langDet[0].fields['flag'],
                    courses: courses
                });
            }
            
        } else if(type === 1) {
            let unique = true;
            for(let lang of this.favCourses) {
                if(lang.id === langDet[0].pk) {
                    unique = false;
                }
            }
            if(unique) {
                this.favCourses.push( {
                    id: langDet[0].pk,
                    name: langDet[0].fields['name'],
                    flag: langDet[0].fields['flag'],
                    courses: courses
                });
            }
        } else if(type === 2) {
            let unique = true;
            for(let lang of this.myCourses) {
                if(lang.id === langDet[0].pk) {
                    unique = false;
                }
            }
            if(unique) {
                this.myCourses.push( {
                    id: langDet[0].pk,
                    name: langDet[0].fields['name'],
                    flag: langDet[0].fields['flag'],
                    courses: courses
                });
            }
        }
        console.log(langDet[0].fields['name']);
        this.subCourses.push( {
            id: langDet[0].pk,
            name: langDet[0].fields['name'],
            flag: langDet[0].fields['flag'],
            courses: subribedCourses
        });
    }


    ngOnInit() {
        this.subCourses = [];
        this.favCourses = [];
        this.myCourses = [];
        this.getSubCourses();
        this.getFavCourses();
        this.getMyCourses();
        this.miniMenu = [
            {name: "Subscribed courses", function: () => this.showSubCourses()},
            {name: "Created by me",        function: () => this.showUserCourses()},
            {name: "Favourite Courses", function: () => this.showFavCourses()},
        ];

    }

    showSubCourses() {
        this.hideAll();
        document.getElementById('subCourses').style.display = 'block';
    }

    showUserCourses() {
        this.hideAll();
        document.getElementById('myCourses').style.display = 'block';
        document.getElementById('addCourse').style.display = 'block';
    }

    showFavCourses() {
        this.hideAll();
        document.getElementById('favCourses').style.display = 'block';
    }

    hideAll() {
        document.getElementById('addCourse').style.display = 'none';
        document.getElementById('subCourses').style.display = 'none';
        document.getElementById('myCourses').style.display = 'none';
        document.getElementById('favCourses').style.display = 'none';
    }

    addCourseInput() {
        document.getElementById('courseInput').style.display = 'block';
        let courseInput = (<HTMLInputElement>document.getElementById('courseInput'));

        courseInput.onkeypress = function(event) {
            if(event.keyCode === 13) {
                this._courses.createCourse({name: courseInput.value}).subscribe(course => console.log(course));
                courseInput.value = "";
                courseInput.style.display = 'none';
            }
        }.bind(this);
    }
}