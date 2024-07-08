import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup!: FormGroup
  errorMessage: string = ''

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.signup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.signup.valid) {
      this.userService.signup(this.signup.value).subscribe({
        next: (res) => {
          this.snackbar.open(`${this.signup.get('username')?.value} Register Successful`, 'Close', { duration: 3000 })
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error(err)
          this.errorMessage = err.message
        }
      })
    }
  }
}
