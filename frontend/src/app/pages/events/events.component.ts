import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: any[] = []
  user: any
  errorMessage: string = ''
  constructor(private userService: UserService, private router: Router, private share: SharedService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.userService.getAllEvent().subscribe({
      next: (res) => {
        this.user = this.share.getUser()
        this.events = res
        //.filter((event: any) => new Date(event.date) > new Date());
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = err.message
      }
    })
  }
  view(id: string) {
    this.router.navigate([`/main/events`, id])
  }
  isPast(eventDate: string): boolean {
    return new Date(eventDate) < new Date();
  }
  openEventForm() {
    this.dialog.open(EventFormComponent)
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
