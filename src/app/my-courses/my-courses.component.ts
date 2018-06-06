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
            err => console.error(err)
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

    handleCourseData(data, type) {
        for(let i=0; i<data.length; i++) {
            this._courses.getLangDetails(data[i].fields['language']).subscribe(
                languageData => {this.handleLangDet(languageData,data, type)},
                err => console.log(err)
            );
        }
    }


    handleLangDet(langDet,data, type) {
        let courses = [];
        let author = "";
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
                                subsribers: data[i].fields['subscribers'],
                                author: userName[0].fields['name'] 
                            }
                        );
                    },
                    err => console.log(err)
                );   
            }
        }
        if(type == 0) {
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
            
        } else if(type == 1) {
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
        }
    }


    ngOnInit() {
        this.subCourses = [];
        this.favCourses = [];
        this.getSubCourses();
        this.getFavCourses();
        this.miniMenu = [
            {name: "Subscribed courses", function: () => this.showSubCourses()},
            {name: "Created by me",        function: () => this.showUserCourses()},
            {name: "Favourite Courses", function: () => this.showFavCourses()},
        ];

        this.myCourses = [
            {
                language: "Dutch",
                flag: "netherlands",
                courses: [
                    {
                        id: 4, 
                        name: "Dutch: the language of the world",    
                        author: "Jelmer",
                        subscribers: 4380,
                        image: "https://2.bp.blogspot.com/-HqC8Dl_8T2M/ThTY8yrQZOI/AAAAAAAACm8/laJZ2RuvF1I/s1600/kinderdijk.jpg",
                        description: "Integer non urna vitae libero vestibulum posuere et at nibh. Quisque interdum ullamcorper neque, eget molestie neque fermentum ut. Sed finibus nisi a congue lacinia. Sed vitae tempor elit. Pellentesque ac tellus sodales enim vulputate facilisis condimentum pulvinar odio. Pellentesque accumsan aliquam massa quis blandit."
                    }
                ]
            },
            {
                language: "French",
                flag: "france",
                courses: [
                    {
                        id: 5, 
                        name: "French for beginners",  
                        author: "Jelmer",
                        subscribers: 21300,
                        image: "https://3.bp.blogspot.com/-RNOP8XlpuOE/UQgMghYlnDI/AAAAAAAAjb4/1mMrhWMi4ck/s1600/2171-1280x960.jpg",
                        description: "Integer sollicitudin et massa quis sodales. Mauris faucibus euismod metus, ut auctor nisl blandit id. Ut erat ipsum, gravida at ipsum sit amet, tincidunt fringilla diam. Aenean tempor ante euismod bibendum finibus."
                    }
                ]
            },
            {
                language: "German",
                flag: "germany",
                courses: [
                    {
                        id: 6, 
                        name: "Angela Merkel\'s guide to German",    
                        author: "Jelmer",
                        subscribers: 24000,
                        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Berlin_-_0266_-_16052015_-_Brandenburger_Tor.jpg/1200px-Berlin_-_0266_-_16052015_-_Brandenburger_Tor.jpg",
                        description: "Nunc pulvinar, dolor vel vulputate aliquet, sapien risus sodales metus, luctus cursus ante justo in orci. Sed vitae bibendum sem. Aenean vitae urna lacinia, placerat leo in, commodo nulla. Donec enim dolor, bibendum quis consequat eget, consequat sed nisl. Donec nec aliquam ex, non posuere nisl."
                    }
                ]
            },
            {
                language: "Japanese",
                flag: "japan",
                courses: [
                    {
                        id: 7,
                        name: "An introduction to Japanese",
                        author: "Jelmer",
                        subscribers: 12123,
                        image: "http://paradiseintheworld.com/wp-content/uploads/2012/03/Kiyomizu-dera-kyoto-japan.jpg",
                        description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis efficitur quis enim nec rhoncus. Donec sagittis, tellus ut consectetur gravida, elit velit elementum enim, maximus tempor dui sapien ac turpis."
                    }
                ]
            }
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
                let newCourse = {id: this.currentId, name: courseInput.value, author: "Jelmer"}
                this._courses.createCourse(courseInput.value, 1).subscribe(response => console.log(response));
                courseInput.value = "";
                courseInput.style.display = 'none';
            }
        }.bind(this);
    }
}