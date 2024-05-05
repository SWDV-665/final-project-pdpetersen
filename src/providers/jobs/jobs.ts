import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the JobsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobsProvider {

  jobs: any = []

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = 'http://localhost:8080';

  constructor(public http: HttpClient ) {
    console.log('Hello JobsProvider Provider');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  getJobs(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/jobs').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.status ? error.message: error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeJob(id) {
    console.log('#### Removing Job - id = ', id);
    this.http.delete(this.baseURL + '/api/jobs/' + id).subscribe(res => {
      this.jobs = res;
      this.dataChangeSubject.next(true);
    })
  }

  addJob(job) {
      this.http.post(this.baseURL + '/api/jobs/', job).subscribe((res) => {
      this.jobs = res;
      this.dataChangeSubject.next(true);
    })
  }

  editJob(job, index) {
    this.http.put(this.baseURL + '/api/jobs/' + job._id, job).subscribe((res) => {
      this.jobs = res;
      this.dataChangeSubject.next(true);
  })
}

}