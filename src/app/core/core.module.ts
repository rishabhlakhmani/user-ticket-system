import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { NgxsModule } from '@ngxs/store';
import { CoreState } from './store/state/core.state';
import { CoreService } from './services/core.service';
import { HttpClientModule } from '@angular/common/http';

// Noop handler for factory function
export function noop() {
    return function() {};
  }

@NgModule({
  declarations: [AppHeaderComponent, AppSidebarComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([CoreState]),
    HttpClientModule
  ],
  providers: [CoreService],
  exports: [
    AppHeaderComponent,
    AppSidebarComponent
  ]
})
export class CoreModule { }
