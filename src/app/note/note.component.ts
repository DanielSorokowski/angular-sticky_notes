import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Color } from '../color';
import { Colors } from '../data';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  constructor(private renderer: Renderer2) {}

  @Input() note: any
  @ViewChild('pinImage') pinImage: ElementRef | undefined;
  @ViewChild('noteElement') noteElement: ElementRef | undefined;

  colors: Color[] = []

  private isDragging = false;
  isEditing = false;
  selectedColor: string | null = null;

  noteStyles = {
    position: 'absolute',
    left: '50px',
    top: '50px',
    zIndex: '1',
    backgroundColor: '#ffa'
  }

  ngOnInit(): void {
    this.noteStyles = {
      ...this.noteStyles,
      left: this.note.x,
      top: this.note.y,
      backgroundColor: this.note.color,
    };

    this.getColors()
    this.selectedColor = this.noteStyles.backgroundColor
  }

  ngAfterViewInit() {
    if (this.pinImage) {
      // Attach the drag event handlers to the pin image
      this.renderer.listen(this.pinImage.nativeElement, 'mousedown', (event) => this.startDrag(event));
      this.renderer.listen(document, 'mousemove', (event) => this.onDrag(event));
      this.renderer.listen(document, 'mouseup', () => this.stopDrag());
    }
  }

  startDrag(event: MouseEvent) {
    if (this.pinImage && event.target === this.pinImage.nativeElement) {
      this.isDragging = true;
      this.noteStyles.zIndex = '1000'
    }
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging) {
      const x = event.clientX - 325;
      const y = event.clientY - 25;
      this.noteStyles.left = `${x}px`;
      this.noteStyles.top = `${y}px`;

      const updatedNote = this.getNote(this.note.id);

      updatedNote.x = this.noteStyles.left;
      updatedNote.y = this.noteStyles.top;

      this.updateNote(updatedNote)
    }
  }

  stopDrag() {
    this.isDragging = false;
    this.noteStyles.zIndex = '1'
  }

  handleNoteSettings(): void {
    this.isEditing = !this.isEditing
  }

  getColors(): void {
    this.colors = Colors
  }

  changeColor(color: string): void {
    this.noteStyles.backgroundColor = color
    this.selectedColor = color;

    const updatedNote = this.getNote(this.note.id);
    updatedNote.color = color
    this.updateNote(updatedNote)
  }

  onTitleChange() {
    this.changeTitle(this.note.title);
  }

  changeTitle(title: string): void {
    const updatedNote = this.getNote(this.note.id);

    updatedNote.title = title
    this.updateNote(updatedNote)
  }

  onTextChange() {
    this.changeText(this.note.text);
  }

  changeText(text: string): void {
    const updatedNote = this.getNote(this.note.id);

    updatedNote.text = text
    this.updateNote(updatedNote)
  }

  getNote(id: number): Note {
    const notesFromLocalStorage = localStorage.getItem('notes');
    return JSON.parse(notesFromLocalStorage!).find((note: Note) => note.id === id);
  }

  updateNote(updatedNote: Note): void {
    const notesFromLocalStorage = JSON.parse(localStorage.getItem('notes')!);
    const updatedNotes = notesFromLocalStorage.map((note: Note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  deleteNote() {
    if (this.noteElement) {
      this.renderer.removeChild(this.noteElement.nativeElement.parentElement, this.noteElement.nativeElement);
    }

    const notesFromLocalStorage = JSON.parse(localStorage.getItem('notes')!);
    const updatedNotes = notesFromLocalStorage.filter((note: Note) => note.id !== this.note.id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }
}
