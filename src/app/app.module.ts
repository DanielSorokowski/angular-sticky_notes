import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { SettingsComponent } from './settings/settings.component';
import { NotePageComponent } from './note-page/note-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    SettingsComponent,
    NotePageComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
