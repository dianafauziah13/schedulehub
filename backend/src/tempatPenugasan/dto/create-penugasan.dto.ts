import mongoose, { Schema as MongooseSchema } from 'mongoose';

export class ScopedakwahJumatDto {
    nama: String;
    minggu_ke: number;
  }
  
  export class ScopedakwahPengajianDto {
    Keahlian: { nama: String; minimal: number }[];
    minggu_ke: number;
    hari: string;
    waktu: string;
    topik_kajian: string;
  }
  
  export class PimpinanDto {
    _id: mongoose.Schema.Types.ObjectId;
    nama: string;
    scope_dakwah_jumat: ScopedakwahJumatDto[];
    scope_dakwah_pengajian: ScopedakwahPengajianDto[];
  }
  
  export class MubalighJumatDto {
    _id: mongoose.Schema.Types.ObjectId;
    nama: string;
    scope_dakwah: string;
    ketersediaan_waktu_jumat: number[];
    Keahlian: { nama: string; rating: number }[];
  }
  
  export class MubalighPengajianDto {
    _id: mongoose.Schema.Types.ObjectId;
    nama: string;
    scope_dakwah: string;
    ketersediaan_waktu_pengajian: { minggu_ke: string; hari: string }[];
    Keahlian: { nama: String; rating: number }[];
  }
  
  export class PenugasanDto {
    pimpinan: PimpinanDto;
    mubaligh_khutbah_jumat: MubalighJumatDto[];
    mubaligh_khutbah_pengajian: MubalighPengajianDto[];
  }
  
  export class TempatPenugasanSchemaDto {
    tgl_awal: Date;
    tgl_akhir: Date;
    Penugasan: PenugasanDto[];
  }
  