import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],

})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup
  errorMessage: string = ''
  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d ? d > today : false;
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private dialog: MatDialog) { }
  ngOnInit(): void {
    if (this.data === null) {
      this.eventForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        location: ['', Validators.required],
      })
    } else {
      this.eventForm = this.fb.group({
        title: [this.data.title || '', Validators.required],
        description: [this.data.description || '', Validators.required],
        date: [this.data.date || '', Validators.required],
        location: [this.data.location || '', Validators.required],
      })
    }
  }
  onSubmit() {
    if (this.eventForm.valid) {
      if (this.data === null) {
        this.userService.createEvent(this.eventForm.value).subscribe({
          next: (res) => {
            this.dialog.closeAll()
            this.snackbar.open(`Event Registered Success`, 'Close', { duration: 3000 })
          },
          error: (err) => {
            console.error(err)
            this.errorMessage = err.message
          }
        })
      } else {
        this.userService.updateEvent(this.data._id, this.eventForm.value).subscribe({
          next: (res) => {
            this.dialog.closeAll()
            this.snackbar.open(`Event Updated Success`, 'Close', { duration: 3000 })
          },
          error: (err) => {
            console.error(err)
            this.errorMessage = err.message
          }
        })
      }

    }
  }
}
