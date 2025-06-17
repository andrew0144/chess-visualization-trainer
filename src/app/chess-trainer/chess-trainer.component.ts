// chess-training.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface GameStats {
  score: number;
  highScore: number;
  mistakes: number;
  totalTime: number;
  startTime: number | null;
}

@Component({
  selector: 'app-chess-trainer',
  imports: [CommonModule],
  templateUrl: './chess-trainer.component.html',
  styleUrls: ['./chess-trainer.component.css'],
})
export class ChessTrainerComponent {
  showSquareCoordinates: boolean = false;
  currentSquare: string = '';
  gameActive: boolean = false;
  gameOver: boolean = false;
  chessSquares: Array<{coordinate: string, isLight: boolean}> = [];
  
  gameStats: GameStats = {
    score: 0,
    highScore: 0,
    mistakes: 0,
    totalTime: 0,
    startTime: null
  };

  private files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  private ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  constructor() {
    this.initializeChessboard();
  }

  private initializeChessboard(): void {
    this.chessSquares = [];
    
    for (let rankIndex = 0; rankIndex < this.ranks.length; rankIndex++) {
      for (let fileIndex = 0; fileIndex < this.files.length; fileIndex++) {
        const coordinate = this.files[fileIndex] + this.ranks[rankIndex];
        const isLight = (fileIndex + rankIndex) % 2 === 0;
        
        this.chessSquares.push({ coordinate, isLight });
      }
    }
  }

  private generateSquare(): string {
    const file = this.files[Math.floor(Math.random() * 8)];
    const rank = this.ranks[Math.floor(Math.random() * 8)];
    return file + rank;
  }

  startGame(): void {
    this.gameStats.score = 0;
    this.gameStats.mistakes = 0;
    this.gameStats.totalTime = 0;
    this.gameActive = true;
    this.gameOver = false;
    
    this.currentSquare = this.generateSquare();
    this.gameStats.startTime = Date.now();
  }

  handleSquareClick(clickedSquare: string): void {
    if (!this.gameActive || this.gameOver) return;

    const timeElapsed = Date.now() - (this.gameStats.startTime || 0);
    
    if (clickedSquare === this.currentSquare) {
      // Correct answer
      this.gameStats.score++;
      this.gameStats.totalTime += timeElapsed;
      this.currentSquare = this.generateSquare();
      this.gameStats.startTime = Date.now();
    } else {
      // Wrong answer
      this.gameStats.mistakes++;
      if (this.gameStats.mistakes >= 3) {
        this.gameActive = false;
        this.gameOver = true;
        if (this.gameStats.score > this.gameStats.highScore) {
          this.gameStats.highScore = this.gameStats.score;
        }
      }
    }
  }

  resetGame(): void {
    this.gameActive = false;
    this.gameOver = false;
    this.currentSquare = '';
    this.gameStats.score = 0;
    this.gameStats.mistakes = 0;
    this.gameStats.totalTime = 0;
    this.gameStats.startTime = null;
  }

  getAverageTime(): string {
    if (this.gameStats.score === 0 || this.gameStats.totalTime === 0) return '0.0';
    return (this.gameStats.totalTime / this.gameStats.score / 1000).toFixed(1);
  }
}