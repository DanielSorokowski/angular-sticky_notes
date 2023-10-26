import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePageComponent } from './note-page/note-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NotePageComponent },
  { path: 'settings', component: SettingsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
