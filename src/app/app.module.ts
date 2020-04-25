import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreviousUploadsComponent } from './components/previous-uploads/previous-uploads.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PreviewComponent } from './components/image-upload/preview/preview.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageDetailsComponent } from './components/previous-uploads/image-details/image-details.component';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PreviousUploadsComponent,
    ImageUploadComponent,
    PreviewComponent,
    NavbarComponent,
    ImageDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
