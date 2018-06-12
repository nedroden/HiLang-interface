import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonDetailsService {
	lesson = {
		id: "",
		name: "",
		category: "",
		description: "",
		grammer: "",
		course: "",
		vocabulary: []
	}
	

	constructor() { }

	saveDetails(details) {
		this.lesson['id'] = details['id'];
		this.lesson['name'] = details['name'];
		this.lesson['category'] = details['category'];
		this.lesson['description'] = details['description'];
		this.lesson['grammer'] = details['grammer'];
		this.lesson['course'] = details['course'];
		this.lesson['vocabulary'] = details['vocabulary'];
	}

	getDetails() {
		return this.lesson
	}

	emptyDetails() {
		this.lesson = {
			id: "",
			name: "",
			category: "",
			description: "",
			grammer: "",
			course: "",
			vocabulary: []
		}
	}
}
