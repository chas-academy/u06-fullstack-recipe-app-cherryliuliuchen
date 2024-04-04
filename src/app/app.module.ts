import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, // include the routing setting
    HttpClientModule, 
    FormsModule,
  ],

  bootstrap: [AppComponent] // start AppComponent
})
export class AppModule { }
