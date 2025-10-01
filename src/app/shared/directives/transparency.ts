import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[transparency]',
  standalone: true
})
export class Transparency implements OnInit{

  private el = inject(ElementRef);
  transparency = input<boolean>();

  ngOnInit(): void {
    if(this.transparency()){
      this.el.nativeElement.style.backgroundColor = 'transparent';
    } else {
      return
    }

  }

}
