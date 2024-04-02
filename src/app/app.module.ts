import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // 确保路由配置正确
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, // 包含路由配置
    HttpClientModule, // 如果需要发起HTTP请求
    FormsModule,
  ],

  bootstrap: [AppComponent] // 启动AppComponent
})
export class AppModule { }
