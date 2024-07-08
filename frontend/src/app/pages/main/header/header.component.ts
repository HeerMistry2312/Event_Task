import { UserService } from 'src/app/core/services/user.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  errorMessage: string = ''
  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router, private shared: SharedService) { }
  logout() {
    const confirmation = confirm('Are You Sure you want to logout?')
    console.log(confirmation)
    if (confirmation) {
      // this.userService.logout().subscribe({
      //   next: (res) => {
      //     console.log(res)
      localStorage.clear()
      this.shared.clearUser()
      this.snackbar.open("User Logged Out", 'Close', { duration: 3000 })
      this.router.navigate(['/login'])
      //   },
      //   error: (err) => {
      //     console.error(err)
      //     this.errorMessage = err.message
      //   }
      // })
    }
  }
  profile() {
    this.router.navigate(['/main/profile'])
  }
}
