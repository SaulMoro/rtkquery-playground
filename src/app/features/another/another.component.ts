import { Component, OnInit } from '@angular/core';
import { useGetCountQuery } from 'src/app/services/counter';

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.css'],
})
export class AnotherComponent implements OnInit {
  countQuery$ = useGetCountQuery(0);

  constructor() {}

  ngOnInit(): void {}
}
