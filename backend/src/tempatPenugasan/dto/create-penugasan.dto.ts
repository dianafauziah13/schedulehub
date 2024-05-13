import mongoose, { Schema as MongooseSchema } from 'mongoose';

export class ScopedakwahJumatDto {
    Nama: String;
    minggu_ke: number;
  }
  
  export class ScopedakwahPengajianDto {
    Keahlian: { nama: String; MinimalKeahlian: Number }[];
    Minggu_ke: Number;
    hari: String;
    detailWaktu: String;
    TopikKajian: String;
  }
  
  export class PimpinanDto {
    _id: mongoose.Schema.Types.ObjectId;
    Nama: string;
    scope_dakwah_jumat: ScopedakwahJumatDto[];
    scope_dakwah_pengajian: ScopedakwahPengajianDto[];
  }
  
  export class MubalighJumatDto {
    _id: mongoose.Schema.Types.ObjectId;
    mubalighName: String; 
    scope_dakwah: String;
    AvailableKhutbahJumat: Number[];
  }

  export class AvailablePengajianRutin{
    Minggu_ke : [number];
    Hari : string;
  }
  
  export class MubalighPengajianDto {
    _id: MongooseSchema.Types.ObjectId;
    mubalighName: String; 
    AvailablePengajianRutin : AvailablePengajianRutin[];
    ListKeahlian: { nama: String; Rating: Number }[];
  }
  
  export class PenugasanDto {
    pimpinan: PimpinanDto;
    mubaligh_khutbah_jumat: MubalighJumatDto[];
    mubaligh_khutbah_pengajian: MubalighPengajianDto[];
  }
  
  export class TempatPenugasanSchemaDto {
    tgl_awal: Date;
    tgl_akhir: Date;
    Penugasan: PenugasanDto;
  }
  