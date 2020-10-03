import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'src/environments/environment';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    NoopAnimationsModule,
    NgxsModule.forRoot([] , { developmentMode: !environment.production }),
    // NgxsStoragePluginModule.forRoot({
    //   key: ['core']
    // }),
    NgxsWebsocketPluginModule.forRoot({
        url: 'ws://localhost:4200'
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
