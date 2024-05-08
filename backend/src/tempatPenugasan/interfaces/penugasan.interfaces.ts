import { Schema as MongooseSchema } from 'mongoose';

export interface ScopedakwahJumat {
  Nama: String;
  minggu_ke: number;
}

export interface ScopedakwahPengajian  {
  Keahlian: { nama: String; MinimalKeahlian: Number }[];
  Minggu_ke: Number;
  hari: String;
  detailWaktu: String;
  TopikKajian: String;
}

export interface Pimpinan {
  _id: MongooseSchema.Types.ObjectId;
  nama: string;
  scope_dakwah_jumat: ScopedakwahJumat[];
  scope_dakwah_pengajian: ScopedakwahPengajian[];
}

export interface MubalighJumat {
  _id: MongooseSchema.Types.ObjectId;
  mubalighName: String; 
  scope_dakwah: String;
  AvailableKhutbahJumat: Number[];
}

export interface MubalighPengajian {
  _id: MongooseSchema.Types.ObjectId;
  Nama: String; 
  scope_dakwah: String;
  AvailablePengajianRutin: { Minggu_ke: Number; Hari: String }[];
  ListKeahlian: { nama: String; Rating: Number }[];
}

export interface Penugasan  {
  pimpinan: Pimpinan;
  mubaligh_khutbah_jumat: MubalighJumat[];
  mubaligh_khutbah_pengajian: MubalighPengajian[];
}

export interface TempatPenugasanSchema  {
  tgl_awal: Date;
  tgl_akhir: Date;
  Penugasan: Penugasan;
}
