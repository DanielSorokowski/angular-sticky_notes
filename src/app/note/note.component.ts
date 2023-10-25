import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Color } from '../color';
import { Colors } from '../data';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  colors: Color[] = []

  @Input() note: any

  @ViewChild('pinImage') pinImage: ElementRef | undefined;
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

  constructor(private renderer: Renderer2) {}

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
      console.log(this.note)
    }
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging) {
      const x = event.clientX - 325;
      const y = event.clientY - 25;
      this.noteStyles.left = `${x}px`;
      this.noteStyles.top = `${y}px`;
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
  }
}
