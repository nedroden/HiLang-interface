import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { HilangApiService } from '../hilang-api.service';
import { ErrorNotification } from '../utils/errornotification';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    private searchResults = [];
    private courses = {
        subscribers : {
            active : [],
            courses : []
        },
        newest : {
            active : [],
            courses : []
        },
        searchResults : {
            active : [],
            courses : []
        }
    }
    private languages = [];
    private filteredLanguages = [];

    constructor(private _courses : CourseService,
                private _api : HilangApiService) { }

    getCourses(callback: () => any) {
        let courses = [];
        callback().subscribe(
            data => {
                for(let course of <Object[]>data) {
                    this._courses.getUser(course['fields']['user']).subscribe(userName => {
                        courses.push({
                            id          : course['pk'],
                            description : course['fields']['description'],
                            name        : course['fields']['name'],
                            subscribers : course['fields']['subscribers'],
                            image       : course['fields']['image'],
                            author      : userName['name'],
                            trans_lang  : course['fields']['trans_lang'],
                            native_lang : course['fields']['native_lang'],
                        });
                    });
                }
                this.updateCourses();
            },
            err => console.log(err)
        );
        return courses;
    }

    ngOnInit() {
        this.courses.subscribers.courses = this.getCourses(() => {
          return this._api.call('/course/popular/', {});
        });
        this.courses.subscribers.active = this.courses.subscribers.courses;

        this.courses.newest.courses = this.getCourses(() => {
          return this._api.call('/course/newest/', {});
        });
        this.courses.newest.active = this.courses.newest.courses

        this._courses.getLanguages().subscribe(languages => {
            this.languages = <any[]>languages;
        });
        (<HTMLInputElement>document.getElementById('browseBar')).onkeypress = function(event) {
            if(event.keyCode === 13 && document.getElementById('browseBar')['value'] != '')
                this.search();
        }.bind(this);
    }

    search() {
        this.courses.searchResults.courses = [];
        let searchFor = document.getElementById('browseBar')['value'];
        this._courses.searchForPublicCourse(searchFor).subscribe(response => {
            if ((<any[]>response).length > 0) {
                for(let course of <any[]>response) {
                    this.courses.searchResults.courses.push({
                        id          : course['id'],
                        description : course['description'],
                        name        : course['name'],
                        subscribers : course['subscribers'],
                        image       : course['image'],
                        author      : course['author'],
                        trans_lang  : course['trans_lang'],
                        native_lang : course['native_lang'],
                    });
                }
                this.courses.searchResults.active = this.courses.searchResults.courses;
                this.updateCourses();
            } else {
                let errorNotification = new ErrorNotification("No search results found", 'errorField', 'danger');
                errorNotification.setTimeout(3000);
                errorNotification.render();
            }
        });
    }

    clearSearch() {
        this.courses.searchResults.courses = [];
        this.courses.searchResults.active = [];
        (<HTMLInputElement>document.getElementById('browseBar')).value = "";
    }

    sort(array: any[]) {
        let needNextPass = true;

        for (let k = 1; k < array.length && needNextPass; k++) {
            needNextPass = false;
            for (let i = 0; i < array.length - k; i++) {
                if (array[i] > array[i + 1]) {
                    array[i] = [array[i + 1], array[i + 1] = array[i]][0];
                    needNextPass = true;
                }
            }
        }
        return array;
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

    updateCourses() {
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
