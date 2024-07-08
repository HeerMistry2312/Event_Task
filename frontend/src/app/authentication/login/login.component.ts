import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup
  errorMessage: string = ''
  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.login.valid) {
      const username = this.login.get('username')!.value;
      const password = this.login.get('password')!.value;
      this.userService.login(username, password).subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('isLoggedIn', 'true')
          this.snackbar.open(`${username} is Logged in`, 'Close', { duration: 3000 })
          this.router.navigate(['/main'])
        },
        error: (err) => {
          console.error(err)
          this.errorMessage = err.message
        }
      })
    }
  }
}
