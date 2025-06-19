// chess-training.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChessboardComponent } from '../chessboard/chessboard.component';

interface GameStats {
  score: number;
  highScore: number;
  mistakes: number;
  totalTime: number;
  startTime: number | null;
}

export const FILES= ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

@Component({
  selector: 'app-chess-trainer',
  imports: [CommonModule, ChessboardComponent],
  templateUrl: './chess-trainer.component.html',
  styleUrls: ['./chess-trainer.component.css'],
})
export class ChessTrainerComponent {
  showSquareCoordinates: boolean = false;
  currentSquare: string = '';
  gameActive: boolean = false;
  gameOver: boolean = false;
  
  gameStats: GameStats = {
    score: 0,
    highScore: 0,
    mistakes: 0,
    totalTime: 0,
    startTime: null
  };

  private generateSquare(): string {
    const file = FILES[Math.floor(Math.random() * 8)];
    const rank = RANKS[Math.floor(Math.random() * 8)];
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${file}${rank}`);
      // Optional: Customize voice, language, pitch, rate
      // utterance.lang = 'en-US'; 
      // utterance.pitch = 1.2;
      // utterance.rate = 0.9;

      speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser.');
      alert('Your browser does not support text-to-speech.');
    }
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