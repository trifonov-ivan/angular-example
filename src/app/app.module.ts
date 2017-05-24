import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsService } from './reservations.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'reservations',
    pathMatch: 'full'
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ReservationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
