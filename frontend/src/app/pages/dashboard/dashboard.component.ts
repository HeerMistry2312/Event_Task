import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private snackbar: MatSnackBar, private shared: SharedService) { }
  errorMessage: string = ''
  user: any
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.shared.setUser(res)
        this.user = res
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = err.message
      }
    })


  }

  viewAll() {
    this.router.navigate(['/main/events'])
  }

}
