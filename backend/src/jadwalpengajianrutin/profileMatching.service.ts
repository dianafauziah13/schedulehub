import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileMatchingService {
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
    }
    
    mapGapToScore(gap: number): number {
    switch (true) {
      case gap === 0:
        return 5;
      case gap === 1:
        return 4.5;
      case gap === -1:
        return 4;
      case gap === 2:
        return 3.5;
      case gap === -2:
        return 3;
      case gap === 3:
        return 2.5;
      case gap === -3:
        return 2;
      case gap === 4:
        return 1.5;
      case gap === -4:
        return 1;
      default:
        return 0; 
    }
  }

  calculateTotalGap(){
    
  }

}