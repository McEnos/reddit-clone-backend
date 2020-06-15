import {Component, OnInit} from '@angular/core';
import {SubredditService} from '../subreddit.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {
  subreddits: [];

  constructor(private subredditService: SubredditService) {
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

}
