import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { UpdateProfileFormComponent } from './update-profile-form/update-profile-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  errorMessage: string = '';
  events: any[] = []
  displayedColumns: string[] = ['_id', 'title', 'date', 'location', 'action'];
  dataSource: any;
  constructor(private share: SharedService, private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar, private router: Router) {

  }
  user: any
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.user = res
        this.events = res.registrations
        this.dataSource = res.registrations
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.message
      }
    })

  }
  view(id: string) {
    this.router.navigate([`/main/events`, id])
  }
  updateProfile(id: string) {
    this.dialog.open(UpdateProfileFormComponent, { data: this.user })
  }
}
