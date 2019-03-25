import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { of } from 'rxjs/index';
import { catchError, map, tap } from 'rxjs/operators';

import { Curso } from './curso';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: 'Bearer ' + Cookie.get('access_token')
  })
};

@Injectable({ providedIn: 'root' })
export class CursoService {

  private cursosUrl = 'api/cursos';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET cursos from the server */
  getCursos (): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.cursosUrl)
      .pipe(
        tap(_ => console.log('fetched cursos')),
        catchError(this.handleError<Curso[]>('getCursos', []))
      );
  }

  /** GET curso by id. Return `undefined` when id not found */
  getCursoNo404<Data>(id: number): Observable<Curso> {
    const url = `${this.cursosUrl}/?id=${id}`;
    return this.http.get<Curso[]>(url)
      .pipe(
        map(cursos => cursos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} curso id=${id}`);
        }),
        catchError(this.handleError<Curso>(`getCurso id=${id}`))
      );
  }

  /** GET curso by id. Will 404 if id not found */
  getCurso(id: number): Observable<Curso> {
    const url = `${this.cursosUrl}/${id}`;
    return this.http.get<Curso>(url).pipe(
      tap(_ => console.log(`fetched curso id=${id}`)),
      catchError(this.handleError<Curso>(`getCurso id=${id}`))
    );
  }

  /* GET cursos whose name contains search term */
  searchCursos(term: string): Observable<Curso[]> {
    if (!term.trim()) {
      // if not search term, return empty curso array.
      return of([]);
    }
    return this.http.get<Curso[]>(`${this.cursosUrl}/?name=${term}`).pipe(
      tap(_ => console.log(`found cursos matching "${term}"`)),
      catchError(this.handleError<Curso[]>('searchCursos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new curso to the server */
  addCurso (curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.cursosUrl, curso, httpOptions).pipe(
      tap((newCurso: Curso) => console.log(`added curso w/ id=${newCurso.id}`)),
      catchError(this.handleError<Curso>('addCurso'))
    );
  }

  /** DELETE: delete the curso from the server */
  deleteCurso (curso: Curso | number): Observable<Curso> {
    const id = typeof curso === 'number' ? curso : curso.id;
    const url = `${this.cursosUrl}/${id}`;

    return this.http.delete<Curso>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted curso id=${id}`)),
      catchError(this.handleError<Curso>('deleteCurso'))
    );
  }

  /** PUT: update the curso on the server */
  updateCurso (curso: Curso): Observable<any> {
    return this.http.put(this.cursosUrl, curso, httpOptions).pipe(
      tap(_ => console.log(`updated curso id=${curso.id}`)),
      catchError(this.handleError<any>('updateCurso'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
