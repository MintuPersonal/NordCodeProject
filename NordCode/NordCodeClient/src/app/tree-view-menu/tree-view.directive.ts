import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appTreeView]'
})
export class TreeViewDirective {
  @Input() menuList: any; 
  constructor() { }

}
