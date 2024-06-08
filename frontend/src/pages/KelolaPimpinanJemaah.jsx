import React, { useState, useEffect, useRef } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import ModalAddPJ from "../component/pimpinanJemaah/ModalAddPJ";
import ModalUpdatePJ from '../component/pimpinanJemaah/ModalUpdatePJ'
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiAlertCircle } from "react-icons/fi";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const KelolaPimpinanJemaah = () => {
    const [data, setData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [data2, setData2] = useState([])
    
    const toast = useRef(null);

    useEffect(() => { 
        fetchData()
    }, [])

    const openModal = (Id) => {
        console.log(Id);
        setSelectedId(Id);
        setIsModalOpen(true);
    };


    const openDetail = (id) => {
        setSelectedId(id);
        fetchDataByID(id)
        setIsDetailOpen(true);
    }

    const closeDetail = () => {
        setIsDetailOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchData = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/pimpinanjemaah")
            const pimpinanJemaah = await response.json()
            // console.log(pimpinanJemaah)
            let tampilPimpinanJemaah = []
            pimpinanJemaah.forEach(value => {
                tampilPimpinanJemaah.push({
                    "_id": value._id,
                    "Nama": value.Nama,
                    "idketua": value.idKetuaPJ,
                    "KetuaPJ": value.KetuaPJ,
                    "scope_dakwah_jumat": value.scope_dakwah_jumat,
                    "scope_dakwah_pengajian": value.scope_dakwah_pengajian
                })
            });
            setData(tampilPimpinanJemaah) 
            console.log("ppp",tampilPimpinanJemaah);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataByID = async(selectedId)=>{
        try{
            const response = await fetch(`http://localhost:3000/pimpinanjemaah/${selectedId}`)
            const pimpinan = await response.json()
            // console.log(pimpinan)
            let profilMubaligh= []

            let tampilProfil = {
                "ketuaPJ":pimpinan.KetuaPJ,
                "NamaPJ": pimpinan.Nama,
                "mingguPengajian": pimpinan.scope_dakwah_pengajian.Minggu_ke,
                "hariPengajian": pimpinan.scope_dakwah_pengajian.hari,
                "detailWaktuPengajian": pimpinan.scope_dakwah_pengajian.detailWaktu,
                "scopeDakwaJumat1": pimpinan.scope_dakwah_jumat.find(m=>m.minggu_ke == 1)?.Nama,
                "scopeDakwaJumat2": pimpinan.scope_dakwah_jumat.find(m=>m.minggu_ke == 2)?.Nama,
                "scopeDakwaJumat3": pimpinan.scope_dakwah_jumat.find(m=>m.minggu_ke == 3)?.Nama,
                "scopeDakwaJumat4": pimpinan.scope_dakwah_jumat.find(m=>m.minggu_ke == 4)?.Nama,
                "scopeDakwaJumat5": pimpinan.scope_dakwah_jumat.find(m=>m.minggu_ke == 5)?.Nama,
                "Keahlian": []
            }

            pimpinan.scope_dakwah_pengajian.Keahlian.forEach(k =>{
                tampilProfil.Keahlian.push({
                    "namaKeahlian": k.nama,
                    "Minimal" : k.MinimalKeahlian
                })
            })
            // pimpinan.forEach(value => {
                profilMubaligh.push(tampilProfil)
            // });
            console.log(profilMubaligh)
            setData2(profilMubaligh)

        } catch (error) {
            console.log(error)
        }
    }

    const deletePJ = async () => {
        try {
        const response = await fetch(`http://localhost:3000/pimpinanjemaah/${selectedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log("Data successfully deleted!");
            fetchData(); // Setelah penghapusan berhasil, perbarui daftar PJ.
            closeModal(); // Tutup modal setelah penghapusan selesai.
            toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Mubaligh berhasil dihapus', life: 3000 });
        } else {
            console.error("Failed to delete data");
            }
            } catch (error) {
                console.log(error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal menghapus Mubaligh: ${error.message}`, life: 3000 });
    }
    };
    
    if (!data) {
        return <div> Loading </div>
    }
    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
        <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
        <h1 className='text-[30px] font-montserrat mb-7'>Kelola Pimpinan Jemaah</h1>
        <div  className='flex justify-start w-[100%] pb-10'>  
            <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" >
            <ModalAddPJ />
            </button>
        </div>
        <div className="flex flex-col items-center w-full bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
            <div className=" w-full">
                <table className="table-auto w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Pimpinan Jemaah</th>
                            <th className="px-30 py-1 border-line border-b-2 text-line font-normal">Ketua Pimpinan Jemaah</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            data.map((v,i)=>{
                                return <tr className='bg-[#F5F5F5] rounded-md shadow-md' key={v._id}>
                                <td className="text-center w-10 px-4 py-2 rounded-l-lg">{i+1}</td>
                                <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.Nama}</td>
                                <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.KetuaPJ}</td>
                                <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                    <div className='flex justify-center m-2'>
                                        <button onClick={()=> openDetail(v._id)}>
                                        <FiAlertCircle className="mr-2"/>
                                        </button>
                                        {isDetailOpen && (
                                <>
                                <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                                        <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                                            <div className="flex items-start justify-between p-5 rounded-t">
                                                <h3 className='text-[20px] font-montserrat mb-5 font-bold'>Requirement Pimpinan Jamaah</h3>
                                            </div>
                                            <div className="w-full">
                                                
                                                {data2.map((val, i) => (
                                                    <>
                                                <div className="mb-4">
                                                <div className="text-[15px] font-montserrat mb-2">
                                                    <span className="w-1/3 font-bold">=================== Khutbah Pengajian Rutin ===================</span>
                                                </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Pimpinan Jemaah:</span>
                                                        <span className="w-2/3">{val.NamaPJ}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Ketua PJ:</span>
                                                        <span className="w-2/3">{val.ketuaPJ}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Khutbah Pengajian:</span>
                                                        <span className="w-2/3">Minggu-ke {val.mingguPengajian}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-7">
                                                        <span className="w-2/3">Waktu Detail:</span>
                                                        <span className="w-2/3">Hari {val.hariPengajian} {val.detailWaktuPengajian}</span>
                                                    </div>
                                                    <div className="text-[15px] font-montserrat mb-2">
                                                         <span className="w-1/3 font-bold"> List Keahlian </span>
                                                            </div>
                                                            {val.Keahlian.map((val2, i) => (
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Nama Keahlian: </span>
                                                                <span className="w-2/3">{val2.namaKeahlian}</span>
                                                                <span className="w-2/3">Rating Keahlian: </span>
                                                                <span className="w-2/3">{val2.Minimal}</span>
                                                            </div>
                                                        ))}
                                                <div className="text-[15px] font-montserrat mb-2">
                                                    <span className="w-1/3 font-bold">======================= Khutbah Jumat ======================</span>
                                                </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Lingkup Dakwah Minggu Ke-1: </span>
                                                        <span className="w-2/3">{val.scopeDakwaJumat1}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Lingkup Dakwah Minggu Ke-2: </span>
                                                        <span className="w-2/3">{val.scopeDakwaJumat2}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Lingkup Dakwah Minggu Ke-3: </span>
                                                        <span className="w-2/3">{val.scopeDakwaJumat3}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Lingkup Dakwah Minggu Ke-4: </span>
                                                        <span className="w-2/3">{val.scopeDakwaJumat4}</span>
                                                    </div>
                                                    <div className="flex text-[15px] font-montserrat mb-2">
                                                        <span className="w-2/3">Lingkup Dakwah Minggu Ke-5: </span>
                                                        <span className="w-2/3">{val.scopeDakwaJumat5}</span>
                                                    </div>
                                                </div>
                                                    </>
                                                 ))} 
                                                </div>
                                                  <div className="flex items-center justify-between p-6 rounded-b">
                                                      <button
                                                           className="text-black bg-[#F4F4F4] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                          type="button"
                                                          onClick={closeDetail}
                                                      >
                                                          Kembali
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                     </>
                                 )}
                                           <ModalUpdatePJ  idPJ = {v._id} initialValues={{NamaPJ: v.Nama, namaKetua: v.KetuaPJ, idKetua:v.idketua, scopedakwahjumat: v.scope_dakwah_jumat, scopedakwahpengajian:v.scope_dakwah_pengajian}}/>
                                        <button onClick={() => openModal(v._id)}>
                                            <FaRegTrashAlt className="mr-2"/>
                                        </button>
                                        {isModalOpen && (
                                            <div className="flex items-center justify-center fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="bg-white p-8 rounded-lg shadow-md">
                                              <h3 className="text-lg font-semibold mb-4">Hapus Pimpinan Jemaah</h3>
                                              <p>Anda yakin ingin menghapus Pimpinan Jemaah ini?</p>
                                              <div className="flex justify-center mt-6">
                                                <button
                                                  className="text-white bg-[#FA8072] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                  type="button"
                                                  onClick={closeModal}
                                                >
                                                  Batal
                                                </button>
                                                <button
                                                  className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                  type="button"
                                                  onClick={deletePJ}
                                                >
                                                  Hapus
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ConfirmDialog />
            <Toast ref={toast} />
        </div>
    </div>
        // </div>
    );
  };
export default KelolaPimpinanJemaah;
