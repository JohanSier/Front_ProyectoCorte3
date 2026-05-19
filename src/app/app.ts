import {Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Header } from './components/header/header';
import { Loading } from './components/loading/loading';
import {PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Header, Loading],
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
