import { Component } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent {
  notes: Note[] = []

  getNotes(): void {
    const notesFromLocalStorage = localStorage.getItem('notes');
    if (notesFromLocalStorage) {
      this.notes = JSON.parse(notesFromLocalStorage);
    }
  }

  ngOnInit(): void {
    this.getNotes()
  }

  addNote(): void {
    this.getNotes()

    const newNote: Note = {
      id: this.notes.length === 0 ? 0 : this.notes[this.notes.length - 1].id + 1,
      title: '',
      text: '',
      x: '50px',
      y: '50px',
      color: '#ffa',
    }

    this.notes.push(newNote)
    localStorage.setItem("notes", JSON.stringify(this.notes))
  }
}
