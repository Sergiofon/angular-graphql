import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Course, Query } from '../../types';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Observable<Course[]>;

  constructor( private apollo: Apollo ) { }

  ngOnInit() {
    this.courses = this.apollo.watchQuery<Query>({
      query: gql `
        query allCourses {
          allCourses {
            id
            title
            author
            description
            topic
            url
          }
        }
      `
    })
     .valueChanges
     .pipe(
       map(result => result.data.allCourses)
      );
  }
}
