import { Injectable } from '@angular/core';


import * as io from 'socket.io-client';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';

  private socket;

  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);
  }

  //events to be listened

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verifyUser', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser

  public onAuthError = () => {

    return Observable.create((observer) => {

      this.socket.on('auth-error', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end onAuthError

  public comingMeetingAlert = () => {

    return Observable.create((observer) => {

      this.socket.on(`show-meeting-alert-${Cookie.get('userId')}`, (meeting) => {

        observer.next(meeting);

      }); // end Socket

    }); // end Observable

  } // end comingMeetingAlert

  public createMeetingAlert = () => {

    return Observable.create((observer) => {

      this.socket.on(`create-meeting-${Cookie.get('userId')}`, (meeting) => {

        observer.next(meeting);

      }); // end Socket

    }); // end Observable

  } // end createMeetingAlert

  public updateMeetingAlert = () => {

    return Observable.create((observer) => {
      this.socket.on(`edit-meeting-${Cookie.get('userId')}`, (meeting) => {

        observer.next(meeting);

      }); // end Socket

    }); // end Observable

  } // end updateMeetingAlert

  //end events to be listened


  //events to be emitted

  public setUser = (authToken) => {

    this.socket.emit("set-user", authToken);

  } // end setUser

  public emitCreateMeeting = (meeting) => {

    this.socket.emit("create-meeting", meeting);

  } // end emitCreateMeeting

  public emitEditMeeting = (meeting) => {
    this.socket.emit("edit-meeting", meeting);

  } // end emitEditMeeting

  //end events to be emitted

  public exitSocket = () => {


    this.socket.disconnect();


  }// end exit socket


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    return Observable.throw(errorMessage);

  }  // END handleError
}
