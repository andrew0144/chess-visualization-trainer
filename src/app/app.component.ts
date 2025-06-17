import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessTrainerComponent } from './chess-trainer/chess-trainer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChessTrainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess-visualization-trainer';
}
