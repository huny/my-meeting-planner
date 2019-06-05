import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent, CalendarViewPeriod } from 'angular-calendar';
import { Subject } from 'rxjs';
import { colors } from './../../demo-utils/colors';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../../app.service';
import { SocketService } from './../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./month-view.component.css'],
  providers: [SocketService]
})
export class MonthViewComponent implements OnInit {

  public userId: any;
  public userName: string;
  public authToken: any;
  public isAdmin: boolean;
  public disconnectedSocket: boolean;
  public eventRanges: any = [];

  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  period: CalendarViewPeriod;
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  dayClicked: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    public appService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private toastr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService) {
    this.userId = this._route.snapshot.paramMap.get('userId');
    this.isAdmin = this._route.snapshot.paramMap.get('isAdmin') === 'true' ? true : false;
  }

  ngOnInit(): void {
    this.authToken = Cookie.get('authToken');
    this.userName = Cookie.get('userName');
    this.verifyUserConfirmation();
    this.handleAuthentictionError();
    this.comingMeetingAlert();
    this.createMeetingAlert();
    this.updateMeetingAlert();
    this.fetchEvents();
  }

  ngAfterViewChecked(): void {
    this.refresh.next();
  }



  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe(() => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);

      });
  }//end verifyUserConfirmation

  public handleAuthentictionError: any = () => {

    this.SocketService.onAuthError()
      .subscribe(() => {

        this.toastr.error('Invalid or expired authentication key');
        this.router.navigate(['/login'])

      });
  }//end handleAuthentictionError

  public comingMeetingAlert: any = () => {

    this.SocketService.comingMeetingAlert()
      .subscribe((meeting) => {

        //this.toastr.info(`You have a meeting in 1 minute\nMeeting Title:${meeting.title}\nPlace:${meeting.place}`);
        this.ngxSmartModalService.getModal('myModal').open();
        this.ngxSmartModalService.setModalData(meeting.title, 'myModal');

      });
  }//end comingMeetingAlert

  public createMeetingAlert: any = () => {

    this.SocketService.createMeetingAlert()
      .subscribe((meeting) => {

        this.toastr.info(`A new meeting has been created for you at time ${meeting.startAt}.\nPlease check your mail or calendar for the details.`);

      });
  }//end createMeetingAlert

  public updateMeetingAlert: any = () => {

    this.SocketService.updateMeetingAlert()
      .subscribe((meeting) => {

        this.toastr.info(`One of your meeting has been updated.\nMeeting Title: ${meeting.title}\nPlease check your mail or calendar for the details.`);

      });
  }//end updateMeetingAlert

  public snooze: any = () => {
    this.ngxSmartModalService.getModal('myModal').close();
    let modalData = this.ngxSmartModalService.getModalData('myModal');
    setTimeout(() => {
      this.ngxSmartModalService.getModal('myModal').open();
      this.ngxSmartModalService.setModalData(modalData, 'myModal');
    }, 5000);
  }//end snooze


  beforeViewRender(
    event:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ) {
    this.period = event.period;
    this.cdr.detectChanges();

  }//end beforeViewRender

  public goToCreateMeeting: any = () => {
    this.router.navigate([`/details-view/${this.userId}/${this.isAdmin}`]);
  }//end goToCreateMeeting

  fetchEvents(): void {

    let date = this.viewDate;
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.appService.getAllMeetingsOfUser(this.userId, firstDay, lastDay)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          if (apiResponse.data.length !== 0 || apiResponse.data !== undefined || apiResponse.data !== null) {
            this.events = apiResponse.data.map(item => {
              return {
                id: item.meetingId,
                start: new Date(new Date(item.startAt).getTime() + (new Date(item.startAt).getTimezoneOffset() * 60000)),
                end: new Date(new Date(item.endAt).getTime() + new Date(item.endAt).getTimezoneOffset() * 60000),
                title: item.title,
                color: colors.blue
              }
            })

            for (var event of this.events) {
              if (this.overlap(event, this.events)) {
                event.color = colors.yellow;
              }
            }
          }//end if apiresponse is null or empty
        }//end if apiRsponse stats is 200
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`)
      })
  }//end fetch events

  handleEvent(clicked, event: CalendarEvent): void {
    this.router.navigate([`/details-view/${this.userId}/${event.id}/${this.isAdmin}`]);
  }//end handleEvent 

  public dayClicking: any = () => {
    this.dayClicked = true;
  }//end dayClicked

  public logout: any = () => {
    this.appService.logout()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success('Logged out successfully.');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(apiResponse.message)
          this.router.navigate(['/login']);
        }
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`)
        this.router.navigate(['/login']);
      })
  }//end logout

  public overlap: any = (currentEvent: CalendarEvent, events: CalendarEvent[]) => {

    let eventRanges = []

    for (var event of events) {
      if (event.id !== currentEvent.id) {
        eventRanges.push([event.start, event.end]);
      }
    }//end for loop

    for (var eventRange of eventRanges) {
      let seg1 = [currentEvent.start, currentEvent.end]
      let seg2 = eventRange;
      let range1 = moment.range(moment(seg1[0]), moment(seg1[1]));
      let range2 = moment.range(moment(seg2[0]), moment(seg2[1]));

      if (range1.overlaps(range2)) {
        return true;
      }
    }//end for loop

    return false

  }//end overlap

  public GoBackToAllUsers: any = () => {
    this.router.navigate(['/all-users']);
  }
}