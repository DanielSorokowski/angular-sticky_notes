import { Component } from '@angular/core';
import { Note } from './note';
import { Notes } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Notes'

  notes: Note[] = []

  getNotes(): void {
    this.notes = Notes
  }

  ngOnInit(): void {
    this.getNotes()
  }

  addNote(): void {
    this.notes.push({
      id: this.notes[this.notes.length - 1].id,
      title: '',
      text: '',
      x: '500px',
      y: '500px',
      color: '#ffa',
    })
  }
}
