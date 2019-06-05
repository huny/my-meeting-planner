import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({

  selector: 'mwl-demo-utils-calendar-header',

  template: `

    <div class="row text-center">

      <div class="col-md-4">

        <div class="btn-group">

          <div *ngIf = '!isPrevButtonDisabled'

            class="btn btn-primary"

            mwlCalendarPreviousView

            [view]="view"

            [(viewDate)]="viewDate"

            (viewDateChange)="moveToNext()"

          >

            Previous

          </div>

          <div

            class="btn btn-outline-secondary"

            mwlCalendarToday

            [(viewDate)]="viewDate"

            (viewDateChange)="moveToNext()"

          >

            Today

          </div>

          <div *ngIf = '!isNextButtonDisabled'

            class="btn btn-primary"

            mwlCalendarNextView

            [view]="view"

            [(viewDate)]="viewDate"

            (viewDateChange)="moveToNext()"

          >

            Next

          </div>

        </div>

      </div>

      <div class="col-md-4">

        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>

      </div>

      <div class="col-md-4">

        <div class="btn-group">

          <div

            class="btn btn-primary"

            (click)="setMonthView()"

            [class.active]="view === 'month'"

          >

            Month

          </div>
          
          <div

          class="btn btn-primary"

          (click)="setDayView()"

          [class.active]="view === 'day'"

        >

          Day

        </div>

    </div>

    <br />

  `

})

export class CalendarHeaderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Input() dayClicked: boolean;

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  public isNextButtonDisabled: boolean = false;

  public isPrevButtonDisabled: boolean = false;

  public isMonthView: boolean = true;

  public isDayView: boolean = false;

  public moveToNext: any = () => {
    if (this.isMonthView) {
      this.viewDateChange.next(this.viewDate)
      if (this.viewDate.getMonth() === 0) {
        this.isPrevButtonDisabled = true;
      } else if (this.viewDate.getMonth() === 11) {
        this.isNextButtonDisabled = true;
      } else {
        this.isNextButtonDisabled = false;
        this.isPrevButtonDisabled = false;
      }
    }//end if month view

    if (this.isDayView || this.dayClicked) {
      this.viewDateChange.next(this.viewDate)
      if (this.viewDate.getMonth() === 0 && this.viewDate.getDate() === 1) {
        this.isPrevButtonDisabled = true;
      } else if (this.viewDate.getMonth() === 11 && this.viewDate.getDate() === 31) {
        this.isNextButtonDisabled = true;
      } else {
        this.isPrevButtonDisabled = false;
        this.isNextButtonDisabled = false;
      }
    }

  }//end moveToNext

  public setMonthView: any = () => {
    this.viewChange.emit('month')
    this.isMonthView = true;
    this.isDayView = false;
    this.dayClicked = false;

    if (this.viewDate.getMonth() === 0) {
      this.isPrevButtonDisabled = true;
    } else if (this.viewDate.getMonth() === 11) {
      this.isNextButtonDisabled = true;
    } else {
      this.isNextButtonDisabled = false;
      this.isPrevButtonDisabled = false;
    }
  }//end setMonthView

  public setDayView: any = () => {
    this.viewChange.emit('day')
    this.isMonthView = false;
    this.isDayView = true;

    if (this.viewDate.getMonth() === 0 && this.viewDate.getDate() === 1) {
      this.isPrevButtonDisabled = true;
    } else if (this.viewDate.getMonth() === 11 && this.viewDate.getDate() === 31) {
      this.isNextButtonDisabled = true;
    } else {
      this.isPrevButtonDisabled = false;
      this.isNextButtonDisabled = false;
    }
  }

  // public currentMonth:any;

  // constructor(){
  //   this.currentMonth = this.viewDate.getMonth();
  // }

}