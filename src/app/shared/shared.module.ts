import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotIconComponent } from './components/dot-icon/dot-icon.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';

@NgModule({
  declarations: [DotIconComponent, UserIconComponent],
  imports: [CommonModule],
  exports: [
    DotIconComponent,
    UserIconComponent
]
})
export class SharedModule { }
