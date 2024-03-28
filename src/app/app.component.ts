import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NgRx-Project';

  //Practing Signals
  count = signal(1);

  increment(): void {
    this.count.update((count: number) => {
      return count + 1;
    });
  }

  //Practing @defer
  isVisible: boolean = false;
}
