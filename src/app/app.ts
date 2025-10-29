import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'portfolio';
  fullText = "Hello, I'm Vanshika Parihar 👋";
  ft = 'Software development Engineer II';
  displayedText = '';
  displayedText2 = '';
  private index = 0;
  private index2 = 0;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.typeWriter();
  }

  typeWriter() {
    if (this.index < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeWriter(), 100); // typing speed
    } else {
      // Wait a bit, then start typing the second line
      setTimeout(() => this.typeWriterSecond(), 800);
    }
  }

  typeWriterSecond() {
    if (this.index2 < this.ft.length) {
      this.displayedText2 += this.ft.charAt(this.index2);
      this.index2++;
      setTimeout(() => this.typeWriterSecond(), 100);
    }
  }
   ngAfterViewInit(): void {
    this.revealOnScroll(); // Trigger immediately on load
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.revealOnScroll();
  }

  private revealOnScroll(): void {
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('appear');
      }
    });
  }
}
