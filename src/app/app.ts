import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit{
  constructor(private primeng: PrimeNG) {
  }
  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
