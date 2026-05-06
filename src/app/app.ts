import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {Navbar} from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent { }
