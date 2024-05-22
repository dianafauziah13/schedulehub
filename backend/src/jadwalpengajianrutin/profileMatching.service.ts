import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema} from 'src/tempatpenugasan/schemas/penugasan.schema';
import { PengajianSchema, jadwal } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';
import { PenugasanDto } from 'src/tempatpenugasan/dto/create-penugasan.dto';
import { map, reduce } from 'rxjs';
import { promises } from 'dns';




@Injectable()
export class ProfileMatchingService {
  constructor(
    // @InjectModel('TempatPenugasanSchema')
    private readonly tempatPenugasanService: TempatPenugasanService,
    @InjectModel('PengajianSchema')
    private pengajianModel: Model <PengajianSchema>,
    @InjectModel('jadwal')
    private jadwalModel : Model<jadwal>

  ) {}

    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
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
    // console.log(secondaryFactor)
    let nilaiSecondary  = secondaryFactor.reduce((a,b)=> {return a+b}, 0);
    let length = secondaryFactor.filter(q=> q != 0).length;

    if (length === 0) {
      console.log('Calculated secondary factor', nilaiSecondary);
      return 0;
    } else {
      console.log('Calculated secondary factor', nilaiSecondary / length);
      return nilaiSecondary / length;
    }
  }

  // Analisis total nilai gap
  calculateTotalGap( TotalgapSF: number): number{
    const mappingGapCF = 5;
    const mappingGapSF = TotalgapSF;

    const cfScore = mappingGapCF * 0.6;
    const sfScore = mappingGapSF * 0.4;

    return cfScore + sfScore;
  }

  async generateProfilePengajian(jadwalPengajianDTO: PengajianSchemaDTO) : Promise <PengajianSchema>{
    const newJadwalPengajian = new this.pengajianModel (jadwalPengajianDTO);

    // Pengambilan semua penugasan 
    const penugasan = await this.tempatPenugasanService.findAllTempatPenugasan();

    class KeahliahMubaligh {
      nama :String ;
      hasilPerhitungan : number[] = [];
      total_SF : number;
      total_GAP : number;
    }
    let keahlian_mubaligh  = [] ;

    let mubaligh_terjadwal = [];

    penugasan.forEach(a=>{
      const PimpinanJemaah = a.Penugasan.pimpinan;
      const Mubaligh = a.Penugasan.Mubaligh_Khutbah_pengajian;
      const pimpinanjemaah_available_minggu = a.Penugasan.pimpinan.scope_dakwah_pengajian.Minggu_ke;
      const pimpinan_available_hari = a.Penugasan.pimpinan.scope_dakwah_pengajian.hari;


      /* Melakukan filter Mubaligh berdasarkan Available khutbah pengajian pada pimpinan jemaah */
        let mubaligh_available =  Mubaligh.filter(m=>{
          const mubaligh_minggu_ke = m.AvailablePengajianRutin.Minggu_ke;
          const mubaligh_hari_ke = m.AvailablePengajianRutin.Hari;
      
          //bukan array 
          const result_minggu =   mubaligh_minggu_ke.some( item=> pimpinanjemaah_available_minggu == item);
          const result_hari = mubaligh_hari_ke.some(i=> pimpinan_available_hari == i);
          if (result_minggu && result_hari ) return true;
          else return false;
        })
        // console.log(mubaligh_available.map(a=>a.mubalighName));

      /* Melakukan perhitungan GAP untuk secondary factor dari mubaligh dan pimpinan jemaah yang bersesuaian */
      const pimpinan_jemaah = a.Penugasan.pimpinan.scope_dakwah_pengajian.Keahlian;
      const pimpinan_keahlian_nama = a.Penugasan.pimpinan.scope_dakwah_pengajian.Keahlian.map(k=>k.nama);
      let mubaligh_terpilih = mubaligh_available.filter(q=>{
          const mubaligh_keahlian_nama = q.ListKeahlian.map(q=>q.nama);
          const isKeahlian =   mubaligh_keahlian_nama.some( item=> pimpinan_keahlian_nama.includes(item));
          if(isKeahlian) return true;
          else return false;
      });

        pimpinan_jemaah.forEach(p => {
        mubaligh_terpilih.forEach(element=>{
          const indexKriteria = keahlian_mubaligh.findIndex(a=>a.nama==element.mubalighName);
          const keahlian = (indexKriteria != -1) ? keahlian_mubaligh[indexKriteria] : new KeahliahMubaligh;
          element.ListKeahlian.forEach(e=>{
            if(p.nama == e.nama){
              const hasil = this.calculateGap(e.Rating, p.MinimalKeahlian);
              const determinasi = this.mapGapToScore(hasil);
              // const total = this.calculateTotalGap(determinasi);
              keahlian.nama = element.mubalighName;
              keahlian.hasilPerhitungan.push(determinasi);
              // console.log(hasil);
            }
          })
          if(indexKriteria !=-1) keahlian_mubaligh[indexKriteria] = keahlian;
          else keahlian_mubaligh.push(keahlian);
        })
      });

      keahlian_mubaligh = keahlian_mubaligh.map(t => {
      /* Melakukan Perhitungan rata-rata secondary factor yang dimiliki mubaligh*/
        t.total_SF = this.CalculateSecondaryFactor(t.hasilPerhitungan);
      /* Melakukan Perhitungan total rata-rata secondary factor yang dimiliki mubaligh */
        t.total_GAP = this.calculateTotalGap(t.total_SF);
        return t;
        // console.log(t.hasilPerhitungan);
      }).sort((a,b)=>b.total_GAP - a.total_GAP);

      const terpilih = keahlian_mubaligh.filter(m=> !mubaligh_terjadwal.includes(m)).at(0)
      if( !terpilih || mubaligh_terjadwal.find(m=> m.nama == terpilih.nama)) return;
      mubaligh_terjadwal.push(terpilih);
      console.log(terpilih);
      const jadwal = new this.jadwalModel;
      jadwal.PimpinanJamaah = PimpinanJemaah.Nama;
      jadwal.Mubaligh = terpilih.nama;
      jadwal.minggu_ke = pimpinanjemaah_available_minggu;
      jadwal.hari = pimpinan_available_hari;

      newJadwalPengajian.jadwal.push(jadwal);
      // console.log(keahlian_mubaligh);
      // console.log(terpilih.nama);

    })

    return await newJadwalPengajian.save();

  }

  log = (obj) => {
    console.dir(obj, {depth: null});
  }
}