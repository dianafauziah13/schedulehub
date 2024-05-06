import { Schema as MongooseSchema } from 'mongoose';

export interface ScopedakwahJumat {
  Nama: String;
  minggu_ke: number;
}

export interface ScopedakwahPengajian  {
  Keahlian: { nama: String; minimal: number }[];
  minggu_ke: number;
  hari: string;
  waktu: string;
  topik_kajian: string;
}

export interface Pimpinan {
  _id: MongooseSchema.Types.ObjectId;
  nama: string;
  scope_dakwah_jumat: ScopedakwahJumat[];
  scope_dakwah_pengajian: ScopedakwahPengajian[];
}

export interface MubalighJumat {
  _id: MongooseSchema.Types.ObjectId;
  nama: string;
  scope_dakwah: string;
  ketersediaan_waktu_jumat: number[];
  Keahlian: { nama: String; rating: number }[];
}

export interface MubalighPengajian {
  _id: MongooseSchema.Types.ObjectId;
  nama: string;
  scope_dakwah: string;
  ketersediaan_waktu_pengajian: { minggu_ke: string; hari: string }[];
  Keahlian: { nama: String; rating: number }[];
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
