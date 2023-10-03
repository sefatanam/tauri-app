import { NgModule, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [importProvidersFrom(HttpClientModule)],
  bootstrap: [AppComponent],
})
export class AppModule { }
