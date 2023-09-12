import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ReactiveFormsModule, BrowserModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
