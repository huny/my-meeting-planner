import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from './month-view/month-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DemoUtilsModule } from '../demo-utils/module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';



@NgModule({
  declarations: [MonthViewComponent, DetailsViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModalModule,
    NgxSmartModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoUtilsModule,
    RouterModule.forChild([
      { path: 'month-view/:userId/:isAdmin', component: MonthViewComponent },
      { path: 'details-view/:userId/:meetingId/:isAdmin', component: DetailsViewComponent },
      { path: 'details-view/:userId/:isAdmin', component: DetailsViewComponent }
    ])
  ],
  exports: [DetailsViewComponent]
})
export class MeetingModule { }
