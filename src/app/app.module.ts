import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';//for bindings
import { AppRoutingModule , RouteViews } from './app-routing.module';//routing himself
import { AppComponent } from './app.component';//apphimself
import { MessagesComponent } from './messages/messages.component';//componenet
import { HttpClientModule }    from '@angular/common/http';//gor http
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';//in memory http
import { InMemoryDataService }  from './services/in-memory-data.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';//in memory thşng
@NgModule({
  declarations: [
    AppComponent,
    RouteViews,
    MessagesComponent,
    HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
