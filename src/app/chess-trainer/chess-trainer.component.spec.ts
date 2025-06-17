import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessTrainerComponent } from './chess-trainer.component';

describe('ChessTrainerComponent', () => {
  let component: ChessTrainerComponent;
  let fixture: ComponentFixture<ChessTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessTrainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
