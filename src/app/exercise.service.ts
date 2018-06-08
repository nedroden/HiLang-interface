import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { Exercise } from './exercise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    constructor(private _httpClient: HttpClient) { }
}
