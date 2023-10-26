import { Component } from '@angular/core';
import { Backgrounds } from '../data';
import { Background } from '../background';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  backgrounds: Background[] = [];
  selectedBackground: string | null = null; // Track the selected background

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.backgrounds = Backgrounds;
    this.selectedBackground = localStorage.getItem('background');
  }

  changeBackground(url: string): void {
    localStorage.setItem('background', url);
    this.appComponent.updateBackground(url);

    // Update the selected background
    this.selectedBackground = url;
  }
}
