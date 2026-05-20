import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading implements OnInit {

  @Input() load!: Boolean;
  constructor() { }

  ngOnInit(): void {
  }
}
