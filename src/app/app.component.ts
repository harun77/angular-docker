import { Component, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChildren('dotRef') dotRef: QueryList<any> | undefined;

  title = 'fill with dots';

  dots = [...Array(192).keys()];

  colors = ['red', 'green', 'blue', 'purple', 'yellow', 'aqua', 'pink', 'brown', 'sienna', 'teal'];

  counter: number = 25;

  cleanDots: number = 0;

  dirtyDots: number = 0;

  gameStarted: boolean = false;

  gameEnded: boolean = false;

  timer: any;

  constructor() {
    // Do nothing
  }

  addColor(dot: HTMLElement): void {
    if (!this.gameEnded) {
      const randColorIndex = Math.floor(Math.random() * 10);
      dot.classList.add(this.colors[randColorIndex]);
    }
    this.checkGameStatus();
  }

  private checkGameStatus(): void {
    if (!this.gameStarted) {
      this.startTimer();
    }

    this.cleanDots = 0;
    this.dirtyDots = 0;
    this.dotRef?.forEach(dot => {
      if (dot.nativeElement.classList.length > 1) ++this.dirtyDots;
      else ++this.cleanDots;
    });

    if (this.dirtyDots == 192) {
      this.gameEnded = true;
    }
  }

  private startTimer(): void {
    this.gameStarted = true;
    this.timer = setInterval(() => {
      --this.counter;
      if (this.counter == 0) {
        clearInterval(this.timer);
        this.gameEnded = true;
      }
    }, 1000);
  }
}
