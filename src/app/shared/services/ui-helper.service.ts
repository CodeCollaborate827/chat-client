import { Injectable } from "@angular/core";

@Injectable()
export class UiHelperService {
  scrollIntoViewBySelector(selector: string): void {
    const element = document.querySelector(selector);

    if (!element) return;

    this.scrollIntoView(element);
  }

  scrollIntoView(element: Element): void {
    const stickyElements = Array.from(document.querySelectorAll('.sticky'));

    if (stickyElements.length) {
      const elementTop = element.getBoundingClientRect().top; 
      const lastStickyElementBottom = stickyElements.pop()?.getBoundingClientRect().bottom;

      if (!lastStickyElementBottom) return;

      const isElementTopVisible = elementTop >= lastStickyElementBottom;
      if (isElementTopVisible) return;

      const scrolledY = window.scrollY; 

      if (scrolledY) {
        window.scroll(0, scrolledY - lastStickyElementBottom);
      }
    }
  }

  isElementInViewPort(element: Element): boolean { 
    const position = element.getBoundingClientRect();
    const isElementVisible = position.top < window.innerHeight && position.top > 0;

    return isElementVisible;
  }
}