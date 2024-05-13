import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JumatDto } from './dto/create-jumat.dto';
import { JadwalJumatSchema } from './schemas/jumat.schema';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema } from 'src/tempatpenugasan/schemas/penugasan.schema';

@Injectable()
export class ProfileMatchingServiceJumat {
  constructor(
    // @InjectModel('TempatPenugasanSchema')
    private readonly tempatPenugasanService: TempatPenugasanService,
    // private tempatPenugasanModel : Model<TempatPenugasanSchema>,
    // @InjectModel('PengajianSchema')
    // private jumatModel: Model <JadwalJumatSchema>

  ) {}
    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
        // Alternative = mubaligh, kriteria = pimpinan jemaah.
    }
    
    determinasiBobot(scope: String){
      switch (true){
        case scope === "Jemaah":
          return 1;
        case scope === "Ranting":
          return 2;
        case scope === "Cabang":
          return 3;
      }
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
  calculateBobot(kriteria: number, mappingGapCF: number): number{
    switch(true){
      case kriteria === 1:
        return mappingGapCF * 0.25;
      case kriteria === 2:
        return mappingGapCF * 0.35;
      case kriteria === 3:
        return mappingGapCF * 0.4;
    }
  }

  sortDescending(values: number[]): number[] {
    return values.slice().sort((a, b) => b - a);
  }

  findIndexHighest(values: number[]): number {
    let highestIndices: number[] = [];
    let maxValue = Number.MIN_SAFE_INTEGER;

    values.forEach((value, index) => {
      if (value > maxValue) {
        highestIndices = [index];
        maxValue = value;
      } else if (value === maxValue) {
        highestIndices.push(index);
      }
    });

    const randomIndex = Math.floor(Math.random() * highestIndices.length);
    return highestIndices[randomIndex];
  }

async generateProfileJumat(){
   /* Mendapatkan semua penugasan pimpinan jamaah */
  const penugasan = await this.tempatPenugasanService.findAllTempatPenugasan();

   // Ambil PimpinanJemaah dan mubaligh dari Penugasan 
   const pimpinanJemaah = penugasan[0].Penugasan.pimpinan;
   const mubaligh = penugasan[0].Penugasan.mubaligh_khutbah_jumat;
  //  const pj = penugasan.map(item=> item.Penugasan);

  /**
   * Determinasi Bobot Untuk Mubaligh
   */
   const bobot_alternatif: number[] = [];
   mubaligh.forEach((mubalighdata) => {
    const dataMubaligh = this.determinasiBobot(mubalighdata.scope_dakwah);
    bobot_alternatif.push(dataMubaligh); 
  });

  /**
   * Ambil jumlah khutbah
   */
    const Nkhutbah: number[] = [];
    mubaligh.forEach((mubalighdata) => {
     const result = mubalighdata.Nkhutbah;
     Nkhutbah.push(result); 
   });

   const bobot_kriteria: number[] = [];
   const Value_calculateGAP: number[]=[];
   const Value_MappingGAP: number[]=[];
   const totalBobot: number[]=[];

   for (let i = 1; i <= 5; i++) {
      const kriteria = this.determinasiBobot(pimpinanJemaah.scope_dakwah_jumat.find(s => s.minggu_ke == i).Nama);
      bobot_kriteria.push(kriteria);
      bobot_alternatif.forEach((alternatif)=>{
        const result = this.calculateGap(alternatif, kriteria );
        Value_calculateGAP.push(result); 
      });
      Value_calculateGAP.forEach((GAP)=>{
        const result = this.mapGapToScore(GAP);
        Value_MappingGAP.push(result);
      });
      bobot_kriteria.forEach((kriteria)=>{
        for(let i= 0; i < mubaligh.length; i++){
         const result = this.calculateBobot(kriteria, Value_MappingGAP[i]);
         const value = result-mubaligh[i].Nkhutbah[i];
        //  console.log(Nkhutbah);
         totalBobot.push(value);
        }
      });

      // const ranking = this.sortDescending(totalBobot);
      const Rankindx= this.findIndexHighest(totalBobot);
      const mubalighName = mubaligh[Rankindx].mubalighName;
      mubaligh[Rankindx].Nkhutbah = mubaligh[Rankindx].Nkhutbah[Rankindx]+1;
      console.log(mubaligh[Rankindx]._id)

      // console.log(mubaligh[Rankindx].Nkhutbah);
      console.log(bobot_kriteria);
      console.log(bobot_alternatif);
      console.log(Value_calculateGAP);
      console.log(Value_MappingGAP);
      console.log(totalBobot);
      console.log(Rankindx);
      console.log(mubalighName);

      bobot_kriteria.length =0;
      Value_calculateGAP.length = 0;
      Value_MappingGAP.length = 0;
      totalBobot.length =0;
   }

}

}