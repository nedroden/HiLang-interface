import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
	subCourses;
    myCourses;
    favCourses;
    courseId;
    courseName;
    courseAuthor;
    courseAuthorId;
    courseDesc;
    courseImg;
    lessons;
    editable = false;
  
	constructor(private courseService: CourseService) { }

    author = {
        avatar: "http://cdn.guardian.ng/wp-content/uploads/2016/05/Vladimir-Putin.jpg",
        about: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }

	ngOnInit() {
    this.subCourses = [];
    this.lessons = [];
    let ulrParts = (window.location.href).split("/");
	this.searchCourse(parseInt(ulrParts[ulrParts.length - 1]));
	}

	searchCourse(id) {
        this.courseService.getCourseDetails(id).subscribe(response => {
            this.courseId = response['id'];
            this.courseName = response['name'];
            this.courseAuthor = response['author'];
            this.courseAuthorId = response['authorId'];
            this.courseDesc = response['description'];
            this.courseImg = response['image'];
            if(response['favorite']) {
                document.getElementById('addFavorite').style.display = "none";
                document.getElementById('delFavorite').style.display = "block";
            } else {
                document.getElementById('addFavorite').style.display = "block";
                document.getElementById('delFavorite').style.display = "none";
            }
            if(response['subscription']) {
                document.getElementById('subscribeBtn').style.display = "none";
                document.getElementById('UnSubscribeBtn').style.display = "block";
            } else {
                document.getElementById('subscribeBtn').style.display = "block";
                document.getElementById('UnSubscribeBtn').style.display = "none";
            }
            //replace 1 with logged in user id
            if(this.courseAuthorId === 1) {
                document.getElementById('addLesson').style.display="block";
                this.editable = true;
            }
            this.getLessons();
        });
	}

    edit() {
        if(this.editable) {
            let editor = (<HTMLInputElement>document.getElementById("course_desc_edit"))
            let desc = (<HTMLInputElement>document.getElementById("course_desc"))
            editor.value = desc.innerText;

            editor.style.display = "block";
            document.getElementById("saveDesc").style.display = "block";
            desc.style.display = "none";
            document.getElementById("course_edit").style.display = "none";
        }
    }

    saveEdit() {
        let newDesc = (<HTMLInputElement>document.getElementById("course_desc_edit")).value;
        let courseData = {
            'id': this.courseId,
            'desc': newDesc,
        }
        this.courseService.editCourseDesc(courseData).subscribe(response => console.log(response));
        document.getElementById("course_desc_edit").style.display = "none";
        document.getElementById("saveDesc").style.display = "none";
        document.getElementById("course_desc").style.display = "block";
        document.getElementById("course_edit").style.display = "block";
    }

    getLessons() {
        this.courseService.getCourseLessons(this.courseId).subscribe(response => {
            let subLessons = [];
            for(let lesson of <Array<any>>response) {
                subLessons.push( {
                    id: lesson.pk,
                    name: lesson.fields['name'],
                    desc: lesson.fields['description'],
                });
            }
            this.lessons = subLessons;
        });
    }

    addFavorite() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.addFavorite(1,courseId).subscribe();
        document.getElementById('addFavorite').style.display = "none";
        document.getElementById('delFavorite').style.display = "block";
    }
    
    delFavorite() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.delFavorite(1,courseId).subscribe();
        document.getElementById('addFavorite').style.display = "block";
        document.getElementById('delFavorite').style.display = "none";
    }

    subscribe() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.subscribe(1,courseId).subscribe();
        document.getElementById('subscribeBtn').style.display = "none";
        document.getElementById('UnSubscribeBtn').style.display = "block";
    }

    unSubscribe() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.unSubscribe(1,courseId).subscribe();
        document.getElementById('subscribeBtn').style.display = "block";
        document.getElementById('UnSubscribeBtn').style.display = "none";
    }
}
