import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { EventFormComponent } from '../../event-form/event-form.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private shared: SharedService,
    private dialog: MatDialog
  ) { }
  event: any
  user: any
  errorMessage: string = ''
  requestedId: string = ''
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.requestedId = data['id']
    })

    this.userService.getEvent(this.requestedId).subscribe({
      next: (res) => {
        this.user = this.shared.getUser()
        this.event = res
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = err.message
      }
    })

  }
  openEventForm() {
    this.dialog.open(EventFormComponent)
  }
  isPast(eventDate: string): boolean {
    return new Date(eventDate) < new Date();
  }


  onupdate(id: string) {
    this.userService.getEvent(id).subscribe({
      next: (res) => {
        this.dialog.open(EventFormComponent, { data: res })
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.message
      }
    })

  }
  onDelete(id: string) {
    const check = confirm('Are You sure you want to delete this event?')
    if (check) {
      this.userService.deleteEvent(id).subscribe({
        next: (res) => {
          this.snackbar.open('Event Deleted', 'Close', { duration: 3000 })
        },
        error: (err) => {
          console.log(err)
          this.errorMessage = err.message
        }
      })
    }
  }
  onRegister(id: string) {
    const check = confirm("Are you ready to registering yourself for this event?")
    if (check) {
      this.userService.RegisterForEVent(id).subscribe({
        next: (res) => {
          this.snackbar.open('Registration for this event successfull', 'Close', { duration: 3000 })
        },
        error: (err) => {
          console.log(err)
          this.errorMessage = err.message
        }
      })
    }
  }

}
