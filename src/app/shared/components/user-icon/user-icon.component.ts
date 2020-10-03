import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.svg',
})
export class UserIconComponent {
  @Input() fillColor: string;
}
