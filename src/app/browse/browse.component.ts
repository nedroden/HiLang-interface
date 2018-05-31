import { Component, OnInit } from '@angular/core';
import { Course } from './Course'
import { CourseService } from '../course.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    publicCourses = [];
    courses;

    constructor(private _courses : CourseService) { }

    ngOnInit() {
        this._courses.getPublicCourses().subscribe(courses => { courses.forEach(course => {this.publicCourses.push(course);})});
        console.log(this.publicCourses);
        this.courses = this.publicCourses;

      	// this.courses = [
        //     {
        //         language: "English",
        //         flag: "united-states-of-america",
        //         courses: [
        //             {
        //                 id: 0,
        //                 name: "English for beginners",
        //                 author: "Learning.co",
        //                 subscribers: 53200,
        //                 image: "https://4.bp.blogspot.com/-O5q3YjRkago/UI9JEEXttiI/AAAAAAAAK8E/IijPhTpQJCw/s1600/Statue+of+Liberty+NY+%282%29.jpg",
        //                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed nisl sit amet neque imperdiet hendrerit vel id urna. Duis dapibus dui interdum est venenatis sollicitudin. Morbi nec commodo neque, sed scelerisque velit. Pellentesque consequat eget ligula sed venenatis. Fusce venenatis vehicula tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tellus nisl, mollis nec neque vel, rutrum venenatis purus."
        //             }
        //         ]
        //     },
        //     {
        //         language: "Hungarian",
        //         flag: "hungary",
        //         courses: [
        //             {
        //                 id: 1,
        //                 name: "Hungarian Travel Phrases",
        //                 author: "Learning.co",
        //                 subscribers: 4954,
        //                 image: "http://www.tourist-destinations.com/wp-content/uploads/2012/03/budapest-hungary-european-union.jpg",
        //                 description: "Quisque vitae mi gravida, porta risus id, tempor turpis. Proin pellentesque, enim sollicitudin vestibulum porta, magna lectus euismod mi, id dignissim nunc elit rhoncus orci. Praesent augue turpis, ultricies sed quam non, vestibulum feugiat sem. Maecenas id ultricies enim. In pulvinar nisi ac augue euismod, ac consequat elit maximus. Vestibulum sit amet nulla diam. Aliquam erat volutpat."
        //             }
        //         ]
        //     },
        //     {
        //         language: "Spanish",
        //         flag: "spain",
        //         courses: [
        //             {
        //                 id: 2,
        //                 name: "Spanish for beginners",
        //                 author: "Learning.co",
        //                 subscribers: 28935,
        //                 image: "http://www.strangertickets.com/imager/b/original/36163974/7f89/Oleaje-Flamenco-042816-264-3-e1462950771638.jpg",
        //                 description: "Ut elementum urna at est mollis, venenatis efficitur diam eleifend. Nullam nec commodo dui, in iaculis dolor. Nullam vitae suscipit ante. Duis ac lobortis risus, eu sagittis felis. Donec accumsan odio quis magna pretium cursus. Sed faucibus tincidunt purus, id iaculis nisl iaculis nec. "
        //             }
        //         ]
        //     },
        //     {
        //         language: "Slovak",
        //         flag: "slovakia",
        //         courses: [
        //             {
        //                 id: 3,
        //                 name: "My holiday to Slovakia",
        //                 author: "Learning.co",
        //                 subscribers: 983,
        //                 image: "http://sacr3-files.s3-website-eu-west-1.amazonaws.com/_processed_/csm_Bratislava%2520mesto%2520okt%252010_243a1a482b.jpg",
        //                 description: "Vivamus eleifend vel lacus vestibulum finibus. Cras vestibulum suscipit convallis. Pellentesque ullamcorper eget velit eu eleifend. Vestibulum molestie, felis eu tincidunt maximus, nisi nisi convallis nisl, eget vulputate dui magna at dui. Nulla facilisi. Curabitur molestie erat eget velit semper, quis fermentum dolor viverra. Nam sit amet elementum neque. Curabitur sit amet ultrices nisi, vitae semper ipsum."
        //             }
        //         ]
        //     },
        //     {
        //         language: "Dutch",
        //         flag: "netherlands",
        //         courses: [
        //             {
        //                 id: 4,
        //                 name: "Dutch: the language of the world",
        //                 author: "Jelmer",
        //                 subscribers: 4380,
        //                 image: "https://2.bp.blogspot.com/-HqC8Dl_8T2M/ThTY8yrQZOI/AAAAAAAACm8/laJZ2RuvF1I/s1600/kinderdijk.jpg",
        //                 description: "Integer non urna vitae libero vestibulum posuere et at nibh. Quisque interdum ullamcorper neque, eget molestie neque fermentum ut. Sed finibus nisi a congue lacinia. Sed vitae tempor elit. Pellentesque ac tellus sodales enim vulputate facilisis condimentum pulvinar odio. Pellentesque accumsan aliquam massa quis blandit."
        //             }
        //         ]
        //     },
        //     {
        //         language: "French",
        //         flag: "france",
        //         courses: [
        //             {
        //                 id: 5,
        //                 name: "French for beginners",
        //                 author: "Jelmer",
        //                 subscribers: 21300,
        //                 image: "https://3.bp.blogspot.com/-RNOP8XlpuOE/UQgMghYlnDI/AAAAAAAAjb4/1mMrhWMi4ck/s1600/2171-1280x960.jpg",
        //                 description: "Integer sollicitudin et massa quis sodales. Mauris faucibus euismod metus, ut auctor nisl blandit id. Ut erat ipsum, gravida at ipsum sit amet, tincidunt fringilla diam. Aenean tempor ante euismod bibendum finibus."
        //             }
        //         ]
        //     },
        //     {
        //         language: "German",
        //         flag: "germany",
        //         courses: [
        //             {
        //                 id: 6,
        //                 name: "Angela Merkel\'s guide to German",
        //                 author: "Jelmer",
        //                 subscribers: 24000,
        //                 image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Berlin_-_0266_-_16052015_-_Brandenburger_Tor.jpg/1200px-Berlin_-_0266_-_16052015_-_Brandenburger_Tor.jpg",
        //                 description: "Nunc pulvinar, dolor vel vulputate aliquet, sapien risus sodales metus, luctus cursus ante justo in orci. Sed vitae bibendum sem. Aenean vitae urna lacinia, placerat leo in, commodo nulla. Donec enim dolor, bibendum quis consequat eget, consequat sed nisl. Donec nec aliquam ex, non posuere nisl."
        //             }
        //         ]
        //     },
        //     {
        //         language: "Japanese",
        //         flag: "japan",
        //         courses: [
        //             {
        //                 id: 7,
        //                 name: "An introduction to Japanese",
        //                 author: "Jelmer",
        //                 subscribers: 12123,
        //                 image: "http://paradiseintheworld.com/wp-content/uploads/2012/03/Kiyomizu-dera-kyoto-japan.jpg",
        //                 description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis efficitur quis enim nec rhoncus. Donec sagittis, tellus ut consectetur gravida, elit velit elementum enim, maximus tempor dui sapien ac turpis."
        //             }
        //         ]
        //     }
      	// ];
    }
}
