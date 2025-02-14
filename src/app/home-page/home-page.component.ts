import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// material apis
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink, MatButtonModule,MatCardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
