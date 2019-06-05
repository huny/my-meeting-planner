import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  public allUserDetails: any;
  public userName: string;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userName = Cookie.get('userName');
    this.getAllUsers();
  }

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
        this.toastr.error(`some error occured: ${err.message}`);
        this.router.navigate(['/login']);
      })
  }//end logout

  public getAllUsers: any = () => {
    this.appService.getAllUsers()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allUserDetails = apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error(`some error occured: ${err.message}`)
      })
  }//end getAll Users

}
