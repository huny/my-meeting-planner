import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../../app.service';
import { SocketService } from './../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css']
})
export class DetailsViewComponent implements OnInit {

  public title: string;
  public description: string;
  public startAt: Date;
  public endAt: Date;
  public place: string;
  public userId: string;
  public createdBy: string;
  private meetingId: string;
  public currentMeeting: any;
  public isAdmin: boolean;
  public userName: string;
  public min: Date = new Date(Date.now());
  public isPreviousDate: boolean = false;

  constructor(
    public appService: AppService,
    public socketService: SocketService,
    public router: Router,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.meetingId = this._route.snapshot.paramMap.get('meetingId');
    this.userId = this._route.snapshot.paramMap.get('userId');
    this.createdBy = Cookie.get('userName');
    this.isAdmin = this._route.snapshot.paramMap.get('isAdmin') === 'true' ? true : false;
    this.userName = Cookie.get('userName');
    if (this.meetingId) {
      this.getMeetingDetails();
    }
  }

  public logout: any = () => {
    this.appService.logout()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success('Logged out successfully.');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(apiResponse.message);
          this.router.navigate(['/login']);
        }
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`);
        this.router.navigate(['/login']);
      })
  }//end logout

  public goBackToAllMeetings: any = () => {
    this.router.navigate([`/month-view/${this.userId}/${this.isAdmin}`])
  }//end goBackToAllMeetings

  public getMeetingDetails: any = () => {
    this.appService.getMeetingDetails(this.meetingId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.currentMeeting = apiResponse.data;
          this.startAt = new Date(new Date(this.currentMeeting.startAt).getTime() + (new Date(this.currentMeeting.startAt).getTimezoneOffset() * 60000));
          this.endAt = new Date(new Date(this.currentMeeting.endAt).getTime() + (new Date(this.currentMeeting.endAt).getTimezoneOffset() * 60000));
          this.title = this.currentMeeting.title;
          this.description = this.currentMeeting.description;
          this.place = this.currentMeeting.place;
          this.userId = this.userId;
          this.createdBy = this.currentMeeting.createdBy;

          if (this.endAt < new Date()) {
            this.isPreviousDate = true;
          }
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`)
      })
  }//end get meeting details

  public createMeeting: any = () => {


    if (!this.startAt) {
      this.toastr.warning('Enter start time')

    } else if (!this.endAt) {
      this.toastr.warning('Enter end time')

    } else if (this.endAt < this.startAt) {
      this.toastr.warning('End time cannot be before start time')

    } else if (!this.title) {
      this.toastr.warning('Enter title')

    } else if (!this.description) {
      this.toastr.warning('Select description')

    } else if (!this.place) {
      this.toastr.warning('Enter place')
    } else {
      let data = {
        title: this.title,
        description: this.description,
        startAt: this.startAt,
        endAt: this.endAt,
        place: this.place,
        userId: this.userId,
      }

      this.appService.createMeeting(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('Meeting created successfully')
            this.socketService.emitCreateMeeting(apiResponse.data);
            this.router.navigate([`/month-view/${this.userId}/true`]);
          } else {
            this.toastr.error(apiResponse.message)
            this.router.navigate([`/month-view/${this.userId}/true`]);
          }
        }, (err) => {
          this.toastr.error(`some error occured: ${err.message}`)
          this.router.navigate([`/month-view/${this.userId}/true`]);
        })
    }


  }//end create meeting

  public editMeeting: any = () => {
    if (!this.startAt) {
      this.toastr.warning('Enter start time')

    } else if (!this.endAt) {
      this.toastr.warning('Enter end time')

    } else if (this.endAt < this.startAt) {
      this.toastr.warning('End time cannot be before start time')

    } else if (!this.title) {
      this.toastr.warning('Enter title')

    } else if (!this.description) {
      this.toastr.warning('Select description')

    } else if (!this.place) {
      this.toastr.warning('Enter place')
    } else {
      let data = {
        title: this.title,
        description: this.description,
        startAt: new Date(new Date(this.startAt).getTime() - (new Date(this.startAt).getTimezoneOffset() * 60000)),
        endAt: new Date(new Date(this.endAt).getTime() - (new Date(this.endAt).getTimezoneOffset() * 60000)),
        place: this.place,
        userId: this.userId,
        createdBy: this.createdBy
      }

      this.appService.editMeeting(data, this.meetingId)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('Meeting updated successfully')
            this.socketService.emitEditMeeting(apiResponse.data);
            this.router.navigate([`/month-view/${this.userId}/true`]);
          } else {
            this.toastr.error(apiResponse.message)
            this.router.navigate([`/month-view/${this.userId}/true`]);
          }
        }, (err) => {
          this.toastr.error(`some error occured: ${err.message}`)
          this.router.navigate([`/month-view/${this.userId}/true`]);
        })
    }
  }//end edit meeting

  public deleteMeeting: any = () => {
    this.appService.deleteMeeting(this.meetingId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success('Meeting deleted successfully')
          this.router.navigate([`/month-view/${this.userId}/true`]);
        } else {
          this.toastr.error(apiResponse.message)
          this.router.navigate([`/month-view/${this.userId}/true`]);
        }
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`)
        this.router.navigate([`/month-view/${this.userId}/true`]);
      })
  }//end delete meeting

}
