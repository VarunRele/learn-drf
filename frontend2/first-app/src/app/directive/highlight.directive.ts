import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  el!: ElementRef
  constructor(el: ElementRef) {
    this.el = el
   }

  @HostBinding("style.backgroundColor")
  bgColor = "red"

  @HostListener("mouseenter") 
  mouseEnter() {
    this.el.nativeElement.style.fontSize = "2rem"
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.el.nativeElement.style.fontSize = "1rem"
  }

}
