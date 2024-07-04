import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[trimWhiteSpace]'
})
export class TrimDirective {
  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) { }
  
  @HostListener('focusout')
  onFocusout() { 
    const abstractControl = this.control.control;
    const inputElement = this.elementRef.nativeElement;

    if (!inputElement || !abstractControl) return;
    const value = inputElement.value?.trim();
    inputElement.value = value;
    abstractControl.patchValue(value);
  }
}