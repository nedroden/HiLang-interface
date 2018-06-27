import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { HilangApiService } from '../hilang-api.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    private searchResults = [];
    private courses = {
        popular : {
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
                console.log(data)
                for(let course of <Object[]>data) {
                    this._courses.getUser(course['fields']['user']).subscribe(userName => {
                        //this.knownUsers[course['fields']['user']] = (userName['name']);
                        courses.push({
                            id          : course['pk'],
                            description : course['fields']['description'],
                            name        : course['fields']['name'],
                            subscribers : course['fields']['subscribers'],
                            image       : course['fields']['image'],
                            author      : userName['name'],
                            trans_lang  : course['fields']['trans_lang'],
                            native_lang : course['fields']['native_lang']
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
        this.courses.popular.courses = this.getCourses(() => {
          return this._api.call('http://localhost:8000/api/course/popular/', {});
        });
        this.courses.popular.active = this.courses.popular.courses;

        this.courses.newest.courses = this.getCourses(() => {
          return this._api.call('http://localhost:8000/api/course/newest/', {});
        });
        this.courses.newest.active = this.courses.newest.courses

        //this.searchResults.push(1);
        // this.addKeyEvent();
        // let ulrParts = (window.location.href).split("/");
        // if(ulrParts[5] != null) {
        //     this.search(ulrParts[5]);
        //     let searchBar = (<HTMLInputElement>document.getElementById('browseBar'));
        //     searchBar.value = ulrParts[5];
        // }
        this._courses.getLanguages().subscribe(languages => {
            console.log(languages);
            this.languages = <any[]>languages;
        });
    }
    //
    // addKeyEvent() {
    //     let searchInput = (<HTMLInputElement>document.getElementById('browseBar'));
    //     searchInput.onkeypress = function(event) {
    //         if(event.keyCode === 13) {
    //             this.search((<HTMLInputElement>document.getElementById('browseBar')).value);
    //         }
    //     }.bind(this);
    // }
    //
    // doSearch() {
    //     this.search((<HTMLInputElement>document.getElementById('browseBar')).value);
    // }
    //
    search() {
        this.courses.searchResults.courses = [];
        let searchFor = document.getElementById('browseBar')['value'];
        this._courses.searchForPublicCourse(searchFor).subscribe(response => {
            for(let course of <any[]>response) {
                this.courses.searchResults.courses.push({
                    id          : course['id'],
                    description : course['description'],
                    name        : course['name'],
                    subscribers : course['subscribers'],
                    image       : course['image'],
                    author      : course['author'],
                    trans_lang  : course['trans_lang'],
                    native_lang : course['native_lang']
                });
            }
            this.courses.searchResults.active = this.courses.searchResults.courses;
            this.updateCourses();
        });
    }

    clearSearch() {
        this.courses.searchResults.courses = [];
        this.courses.searchResults.active = [];
    }

    // SORT FUNCTION MAKEN
    // SORT FUNCTION MAKEN
    // SORT FUNCTION MAKEN
    // SORT FUNCTION MAKEN
    // SORT FUNCTION MAKEN

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
