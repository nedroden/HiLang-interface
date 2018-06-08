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
    // this.lessons = [{'id' : 1, 'name': "English lesson 1", 'desc': "Food"}];

    this.myCourses = [
        {id: 4, name: "Dutch",      author: "Jelmer"},
        {id: 5, name: "French",     author: "Jelmer"},
        {id: 6, name: "German",     author: "Jelmer"},
        {id: 7, name: "English",    author: "Jelmer"},
    ];

    this.favCourses = [
        {id: 4, name: "Dutch",      author: "Jelmer"},
        {id: 5, name: "French",     author: "Jelmer"},
        {id: 2, name: "Hongarian",  author: "Learning.co"},
        {id: 3, name: "Slovac",     author: "Learning.co"},
    ];
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
            let editor = document.getElementById("course_desc_edit")
            let desc = document.getElementById("course_desc")
            editor.innerText = desc.innerText;

            editor.style.display = "block";
            document.getElementById("saveDesc").style.display = "block";
            desc.style.display = "none";
        }
    }

    saveEdit() {
        let newDesc = document.getElementById("course_desc_edit");
        console.log(newDesc);
        let courseData = {
            'id': this.courseId,
            'desc': newDesc,
        }
        this.courseService.editCourseDesc(courseData).subscribe(response => console.log(response));
    }

    getLessons() {
        this.courseService.getCourseLessons(this.courseId).subscribe(response => {
            for(let lesson of <Array<any>>response) {
                this.lessons.push( {
                    id: lesson.pk,
                    name: lesson.fields['name'],
                    desc: lesson.fields['description'],
                });
            } 
        });
    }

    addFavorite() {
      let ulrParts = (window.location.href).split("/");
      let courseId = parseInt(ulrParts[ulrParts.length - 1]);
      this.courseService.addFavorite(1,courseId).subscribe(response => console.log(response));
      document.getElementById('addFavorite').style.display = "none";
      document.getElementById('delFavorite').style.display = "block";
    }
    
    delFavorite() {
      let ulrParts = (window.location.href).split("/");
      let courseId = parseInt(ulrParts[ulrParts.length - 1]);
      this.courseService.delFavorite(1,courseId).subscribe(response => console.log(response));
      document.getElementById('addFavorite').style.display = "block";
      document.getElementById('delFavorite').style.display = "none";
    }
}
