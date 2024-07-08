import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss']
})
export class UpdateProfileFormComponent implements OnInit {
  updateProfile!: FormGroup
  errorMessage: string = ''
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private snackbar: MatSnackBar, private userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.updateProfile = this.fb.group({
      username: [this.data.username || '', Validators.required],
      email: [this.data.email || '', Validators.required],
    })
  }

  onSubmit() {
    if (this.updateProfile.valid) {
      this.userService.updateUser(this.updateProfile.value).subscribe({
        next: (res) => {
          this.dialog.closeAll()
          this.snackbar.open('User updated Success', 'Close', { duration: 3000 })
        },
        error: (err) => {
          console.error(err)
          this.errorMessage = err.message
        }
      })
    }
  }
}
