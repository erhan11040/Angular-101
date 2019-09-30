import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../models/hero';
import { Observable, of  } from 'rxjs';
import { catchError ,map ,tap } from "rxjs/operators"
import {MessageService} from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';

  private ApiStatus = true;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( public messageService : MessageService , private http:HttpClient ) { }//Angular only binds to public component properties.
  getHeroesSync():Hero[]{
    return HEROES;
  }

  getHeroesAsync(): Observable<Hero[]>{

    this.log("Heroes Fetching")
    if(this.ApiStatus)
      return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_=> this.log("fetched heroes")),//top is smtng like map but doesnt changes elements 
        catchError(this.handleError<Hero[]>("getHeroes",[]))
      );
    else
      return of(HEROES)

  }
  private handleError<T>(operation = 'operation' , result?:T ) {

    return (error: any):Observable<T>=>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getHeroDetailAsync(id:number ): Observable<Hero>{

    this.log(`fetched hero id=${id}`);
    if(this.ApiStatus)
    {
      const url =`${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_=>this.log(`getHero id=${id}`)),
        catchError(this.handleError<any>("getHero by id"))
      )
    }
    else
      return of(HEROES.find(x=>x.id===id));
    // return of(HEROES)
  }

  updateHero(hero :Hero){

    return this.http.put(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap(_=>this.log(`update hero id=${hero.id} name=${hero.name}`)),
      catchError(this.handleError<any>("updateHero"))
    )
  }
  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {

    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {

    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
