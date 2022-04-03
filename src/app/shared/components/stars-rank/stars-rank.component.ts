import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-rank',
  templateUrl: './stars-rank.component.html',
  styleUrls: ['./stars-rank.component.scss']
})
export class StarsRankComponent implements OnInit {
  @Input() rank: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
