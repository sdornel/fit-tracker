import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor() {}

  ngOnInit() {

  }
}
