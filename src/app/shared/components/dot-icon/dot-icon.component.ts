import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dot-icon',
  templateUrl: './dot-icon.component.svg',
})
export class DotIconComponent {
  @Input() fillColor: string;
}
