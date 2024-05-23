import { ConsoleLogger, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema } from 'src/tempatpenugasan/schemas/penugasan.schema';
import { Jadwal, JadwalJumatSchema } from './schemas/jumat.schema';
import { JadwalJumatSchemaDto } from './dto/create-jumat.dto';
import { jadwal } from 'src/jadwalpengajianrutin/schemas/pengajian.schema';

@Injectable()
export class ProfileMatchingServiceJumat {
  constructor(
    // @InjectModel('TempatPenugasanSchema')
    private readonly tempatPenugasanService: TempatPenugasanService,
    // private tempatPenugasanModel : Model<TempatPenugasanSchema>,
    @InjectModel('JadwalJumatSchema')
    private jadwalJumatModel: Model <JadwalJumatSchema>,
   @InjectModel('Jadwal')
    private jadwalModel: Model <Jadwal>
  ) {}
    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
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
  
  calculateWeight(scopes: { scope: string; weight: number; subcriteria: number }[]): { [key: string]: number } {
    const totalWeight = scopes.reduce((acc, { weight }) => acc + weight, 0);
    const weightedScopes: { [key: string]: number } = {};

    scopes.forEach(({ scope, weight, subcriteria }) => {
      const weightedValue = (weight / totalWeight) * subcriteria * 100;
      weightedScopes[scope] = weightedValue;
    });

    return weightedScopes;
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

  get_random (list) {
    const idx = Math.floor((Math.random()*list.length))
    return {obj:list[idx], index: idx};
  }

  
async generateProfileJumat(jadwalJumatDTO: JadwalJumatSchemaDto): Promise<JadwalJumatSchema>{
  const newJadwalJumat = new this.jadwalJumatModel(jadwalJumatDTO);

  class BobotKriteria {
    nama = '';
    hasilPerhitungan = []
  }

  class BobotAlternatif {
    nama = '';
    hasilPerhitungan = []
    jmlKhutbah = 0;
    sudahTerjadwal = false
  }

  class PerhitunganAlternatif {
    minggu_ke = 1;
    bobot = 0;
    Value_calculateGAP = 0;
    Value_MappingGAP = 0;
    totalBobot = 0;
  }

  class PerhitunganKriteria {
    minggu_ke = 1;
    bobot = 0;
  }

  let bobot_alternatif = []
  let bobot_kriteria = []
  let pemenang = []

  // Pengambilan semua penugasan 
  const penugasan = await this.tempatPenugasanService.findAllTempatPenugasan();

  // Lakukan Looping sepanjang 5 (untuk 5 minggu)
  for (let i = 1; i <= 5; i++) {
    // penugasan = [penugasan[0]]

    // Looping sebanyak penugasan
    penugasan.forEach(p => {
      const pimpinanJemaah = p.Penugasan.pimpinan;
      let mubaligh = p.Penugasan.mubaligh_khutbah_jumat;

      //Melakukan determinasi bobot pimpinan jemaah pada minggu ke-i
      const kriteria = this.determinasiBobot(pimpinanJemaah.scope_dakwah_jumat.find(s => s.minggu_ke == i).Nama);
      const indexKriteria = bobot_kriteria.findIndex(a=>a.nama==pimpinanJemaah.Nama);
      const kriteria_PJ = (indexKriteria != -1) ? bobot_kriteria[indexKriteria] : new BobotKriteria;
      kriteria_PJ.nama = pimpinanJemaah.Nama;
      const perhitunganKriteria= new PerhitunganKriteria;
      perhitunganKriteria.bobot = kriteria;
      perhitunganKriteria.minggu_ke = i;
      kriteria_PJ.hasilPerhitungan.push(perhitunganKriteria);
      
      if (indexKriteria != -1) bobot_kriteria[indexKriteria] == kriteria_PJ
      else bobot_kriteria.push(kriteria_PJ)

      // mubaligh = [mubaligh[0]]
      // Melakukan filter mubaligh yang available khutbah jumat == minggu ke i
      let mubalighMingguIni = mubaligh.filter(m => m.AvailableKhutbahJumat.find(a => a == i))
      let rank_minggu_ini = []
      
      //Looping mubaligh hasil filter
      mubalighMingguIni.forEach(m => {
        const indexAlternatif = bobot_alternatif.findIndex(a => a.nama == m.mubalighName)

        const alternatif = bobot_alternatif[indexAlternatif] || new BobotAlternatif;
        alternatif.nama = m.mubalighName
        
        const indexHasilPerhitungan = alternatif.hasilPerhitungan.findIndex(p => p.minggu_ke == i)
        const hasilPerhitungan = (indexHasilPerhitungan != -1) ? alternatif.hasilPerhitungan[indexHasilPerhitungan] : new PerhitunganAlternatif
        if (indexHasilPerhitungan !=  -1) return;
        hasilPerhitungan.minggu_ke = i
        hasilPerhitungan.bobot = this.determinasiBobot(m.scope_dakwah)
        hasilPerhitungan.Value_calculateGAP = this.calculateGap(hasilPerhitungan.bobot, kriteria)
        hasilPerhitungan.Value_MappingGAP = this.mapGapToScore(hasilPerhitungan.Value_calculateGAP)
        hasilPerhitungan.totalBobot = this.calculateBobot(kriteria, hasilPerhitungan.Value_MappingGAP) - alternatif.jmlKhutbah

        if (indexHasilPerhitungan != -1) alternatif.hasilPerhitungan[indexHasilPerhitungan] = hasilPerhitungan
        else alternatif.hasilPerhitungan.push(hasilPerhitungan)
        
        if (indexAlternatif != -1) bobot_alternatif[indexAlternatif] = alternatif
        else bobot_alternatif.push(alternatif)
        rank_minggu_ini.push(alternatif)
      })

      rank_minggu_ini = rank_minggu_ini.filter(a => !a.sudahTerjadwal || (a.sudahTerjadwal && !a.hasilPerhitungan.find(p => p.minggu_ke == i)))
      rank_minggu_ini = rank_minggu_ini.sort((a,b)=> b.hasilPerhitungan.find(p=>p.minggu_ke==i).totalBobot - a.hasilPerhitungan.find(p=>p.minggu_ke==i).totalBobot);
      
      const rank_kandidat = rank_minggu_ini.filter(a => a.hasilPerhitungan.find(b => b.minggu_ke == i).totalBobot == rank_minggu_ini[0].hasilPerhitungan.find(b => b.minggu_ke == i).totalBobot)
      if (rank_kandidat.length == 0) return
      const terpilih = this.get_random(rank_kandidat)
      const alternatif_terpilih = terpilih.obj
      alternatif_terpilih.sudahTerjadwal = true
      alternatif_terpilih.jmlKhutbah += 1
      pemenang.push({alternatif: alternatif_terpilih, minggu_ke: i, tempat: pimpinanJemaah.Nama})
      // console.log('Mubaligh Terpilih: ', alternatif_terpilih.nama, ', Bobot:', alternatif_terpilih.hasilPerhitungan.find(a => a.minggu_ke == i).totalBobot, ' Tempat: ', pimpinanJemaah.Nama, 'jml khutbah', alternatif_terpilih.jmlKhutbah);
      
    })
    // console.log('\n');


  }
  

  const jadwal: Jadwal []=[];
  pemenang.forEach(a=> {
    const idxjadwal= jadwal.findIndex(j=>j.PimpinanJemaah==a.tempat)
    const j = idxjadwal != -1 ? jadwal[idxjadwal] : new this.jadwalModel();
    j.PimpinanJemaah = a.tempat;
    j.Jumat.push({minggu_ke:a.minggu_ke, Mubaligh: a.alternatif.nama})
    if(idxjadwal != -1){
      jadwal[idxjadwal] = j;
    }else{
      jadwal.push(j);
    }

  });

  newJadwalJumat.Jadwal = jadwal;
  
  return await newJadwalJumat.save();

  //  log(bobot_alternatif);
  // pemenang.filter(p => p.alternatif.hasilPerhitungan.find(a => a.minggu_ke == 1 || a.minggu_ke == 2)).filter(p => p.alternatif.nama == "Deni Sumpena").forEach(c => {
  //   console.log(c.alternatif.nama, ' minggu ke-', c.minggu_ke);
  //   console.log('\n');
  //   c.alternatif.hasilPerhitungan.forEach(element => {
  //     console.log(element);
  //   });
  // })

  pemenang.forEach(e => {
    console.log('nama: ', e.alternatif.nama, ', minggu ke:', e.minggu_ke, ', tempat:', e.tempat);
  })
}

log = (obj) => {
  console.dir(obj, {depth: null});
}

async findAllJadwalJumat(): Promise<JadwalJumatSchema[]> {
  return await this.jadwalJumatModel.find().exec();
}

async findByDate(bulan : number, tahun: number): Promise<JadwalJumatSchema > {
  const jumatList = await this.jadwalJumatModel.find({
    bulan: bulan,
    tahun: tahun
  }).exec();
  return await jumatList.at(0) ;
}

async deleteJadwalJumat(id: string): Promise<JadwalJumatSchema> {
  return await this.jadwalJumatModel.findByIdAndDelete(id).exec();
}
  
}