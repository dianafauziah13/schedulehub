import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileMatchingServiceJumat {
    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
        // Alternative = mubaligh, kriteria = pimpinan jemaah.
    }
    
    // Mapping nilai gap
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

  calculateWeight(scopes: { scope: string; weight: number; subcriteria: number }[]): { [key: string]: number } {
    const totalWeight = scopes.reduce((acc, { weight }) => acc + weight, 0);
    const weightedScopes: { [key: string]: number } = {};

    scopes.forEach(({ scope, weight, subcriteria }) => {
      const weightedValue = (weight / totalWeight) * subcriteria * 100;
      weightedScopes[scope] = weightedValue;
    });

    return weightedScopes;
  }

  

  /* Menghitung rata - rata nilai secondary factor */
  CalculateSecondaryFactor(secondaryFactor: number[]): number {
    let nilaiSecondary = 0;
    let length = secondaryFactor.length;

    for (let i = 0; i < secondaryFactor.length; i++) {
      if (secondaryFactor[i] === 0) {
        if (length > 1) length -= 1;
      }
      nilaiSecondary += secondaryFactor[i];
    }

    if (nilaiSecondary === 0) {
      console.log('Calculated secondary factor', nilaiSecondary);
      return nilaiSecondary;
    } else {
      console.log('Calculated secondary factor', nilaiSecondary / length);
      return nilaiSecondary / length;
    }
  }

  // Analisis total nilai gap
  calculateTotalGap(gapCF: number, gapSF: number): number{
    const mappingGapCF = this.mapGapToScore(gapCF);
    const mappingGapSF = this.mapGapToScore(gapSF);

    const cfScore = mappingGapCF * 0.6;
    const sfScore = mappingGapSF * 0.4;

    return cfScore + sfScore;
  }

}