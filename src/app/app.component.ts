import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  background: string = localStorage.getItem('background') || 'https://raw.githubusercontent.com/DanielSorokowski/angular-sticky_notes/main/src/assets/basic.png';

  updateBackground(url: string): void {
    this.background = url;
  }
}
