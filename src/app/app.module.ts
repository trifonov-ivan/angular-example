import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';  

import { AppComponent } from './app.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsService } from './reservations.service';
import { RestarauntViewComponent } from './restaraunt-view/restaraunt-view.component';
import { TableSelectorComponent } from './table-selector/table-selector.component';
import { AdminLookupComponent } from './admin-lookup/admin-lookup.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReserveComponent } from './reserve/reserve.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  },
  {
    path: 'view',
    component: RestarauntViewComponent
  },
  {
    path: 'admin',
    component: AdminLookupComponent
  },
  {
    path: 'reserve',
    component: ReserveComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    RestarauntViewComponent,
    TableSelectorComponent,
    AdminLookupComponent,
    CalendarComponent,
    ReserveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NKDatetimeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ReservationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
