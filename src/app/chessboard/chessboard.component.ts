import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FILES, RANKS } from '../chess-trainer/chess-trainer.component';

@Component({
  selector: 'app-chessboard',
  imports: [CommonModule],
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent {
  @Input() showSquareCoordinates: boolean = false;
  @Input() currentSquare: string = '';
  @Input() gameActive: boolean = false;
  @Output() squareClicked = new EventEmitter<string>();

  chessSquares: Array<{coordinate: string, isLight: boolean}> = [];

  constructor() {
    this.initializeChessboard();
  }

  private initializeChessboard(): void {
    this.chessSquares = [];
    
    for (let rankIndex = 0; rankIndex < RANKS.length; rankIndex++) {
      for (let fileIndex = 0; fileIndex < FILES.length; fileIndex++) {
        const coordinate = FILES[fileIndex] + RANKS[rankIndex];
        const isLight = (fileIndex + rankIndex) % 2 === 0;
        
        this.chessSquares.push({ coordinate, isLight });
      }
    }
  }

  handleSquareClicked(coordinate: string): void {
    if (this.gameActive) {
      this.squareClicked.emit(coordinate);
    }
  }
}
