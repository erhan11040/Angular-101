import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
//#region variables

  // hero:Hero ={
  //   id : 1,
  //   name : "Wind Runner"
  // };
  heroes : Hero[];
  // selectedHero:Hero;

//#endregion

//#region lifecycle events

  ngOnInit() {
    // this.selectedHero=this.heroes[0]
    this.getHeroes();
  }
  constructor(private heroService: HeroService ) { }

//#endregion

//#region methods

  // onSelect(hero : Hero):void{
  //   this.selectedHero=hero
  //   console.log(hero);
  // }
  
  getHeroes():void{
    this.heroService.getHeroesAsync()
    .subscribe(data => this.heroes = data);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

//#endregion
}
