import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit {
  events: any[] = []
  errorMessage: string = ''
  displayedColumns: string[] = ['_id', 'title', 'organizer', 'participants', 'date', 'location', 'action'];
  dataSource: any;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getAllEvent().subscribe({
      next: (res) => {
        this.events = res
        this.dataSource = this.events
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
}
