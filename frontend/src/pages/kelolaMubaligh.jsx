import React, { useState, useEffect } from 'react';
import ModalAddMubaligh from "../component/mubaligh/ModalAddMubaligh";
import ModalUpdateMubaligh from "../component/mubaligh/ModalUpdateMubaligh";
import { FiAlertCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";


const KelolaMubaligh = () => {
    const [data, setData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [data2, setData2] = useState([])
    
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

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/mubaligh");
            const mubaligh = await response.json();
            console.log(mubaligh);
            let tampilMubaligh = [];
            mubaligh.forEach(value => {
                tampilMubaligh.push({
                    "_id": value._id,
                    "mubalighName": value.mubalighName,
                    "scope_dakwah": value.scope_dakwah,
                    "AvailableKhutbahJumat": value.AvailableKhutbahJumat,
                    "Minggu_ke": value.AvailablePengajianRutin?.Minggu_ke?.toString()
                })
            });
            setData(tampilMubaligh);
            console.log(tampilMubaligh)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataByID = async(selectedId)=>{
        try{
            const response = await fetch(`http://localhost:3000/mubaligh/${selectedId}`)
            const mubaligh = await response.json()
            let tampilProfil = [];

        let profilMubaligh = {
            "NamaMubaligh": mubaligh.mubalighName,
            "LingkupDakwah": mubaligh.scope_dakwah,
            "AvailableJumat": mubaligh.AvailableKhutbahJumat.toString(),
            "AvailablePengajianMinggu": mubaligh.AvailablePengajianRutin.Minggu_ke.toString(),
            "AvailablePengajianHari": mubaligh.AvailablePengajianRutin.Hari.toString(),
            "Keahlian": []
        };

        mubaligh.ListKeahlian.forEach(keahlian => {
            profilMubaligh.Keahlian.push({
                "NamaKeahlian": keahlian.nama,
                "RatingKeahlian": keahlian.Rating
            });
        });
        tampilProfil.push(profilMubaligh);

            
            console.log(tampilProfil)
            setData2(tampilProfil)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteMubaligh = async () => {
        try {
        const response = await fetch(`http://localhost:3000/mubaligh/${selectedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log("Data successfully deleted!");
            fetchData(); // Setelah penghapusan berhasil, perbarui daftar PJ.
            closeModal(); // Tutup modal setelah penghapusan selesai.
        } else {
            console.error("Failed to delete data");
        }
    } catch (error) {
        console.log(error);
    }
    }
        

    if (!data) {
        return <div> Loading </div>
    }
    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Mubaligh</h1>
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" >
                    <ModalAddMubaligh />
                    </button>
                </div>
                <div className="flex flex-col items-center w-full bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className=" w-full">

                        
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Mubaligh</th>
                                    <th className="px-30 py-1 border-line border-b-2 text-line font-normal">Lingkup Dakwah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Ketersediaan Waktu Jumat</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Ketersediaan Waktu Pengajian</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    data.map((v,i)=>{
                                        return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                        <td className="text-center w-10 px-4 py-2 rounded-l-lg">{i+1}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.mubalighName}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.scope_dakwah}</td>
                                        <td className="text-center px-4 py-2">{v.AvailableKhutbahJumat.toString()}</td>
                                        <td className="text-center px-4 py-2"> {v.Minggu_ke}</td>
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
                                                        <h3 className='text-[20px] font-montserrat mb-5 font-bold'>Requirement Mubaligh</h3>
                                                    </div>
                                                    <div className="w-full">
                                                        
                                                        {data2.map((val, i) => (
                                                            <>
                                                        <div className="mb-4">
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Nama Mubaligh</span>
                                                                <span className="w-2/3">{val.NamaMubaligh}</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Lingkup Dakwah</span>
                                                                <span className="w-2/3">{val.LingkupDakwah}</span>
                                                            </div>
                                                            
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">=================== Khutbah Pengajian Rutin ===================</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Ketersediaan Waktu</span>
                                                                <span className="w-2/3">Minggu-ke {val.AvailablePengajianMinggu}</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-7">
                                                                <span className="w-2/3">Detail Hari</span>
                                                                <span className="w-2/3">Hari {val.AvailablePengajianHari}</span>
                                                            </div>
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">======================= Khutbah Jumat ======================</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Ketersediaan Waktu </span>
                                                                <span className="w-2/3">{val.AvailableJumat}</span>
                                                            </div>
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">=================== List Keahlian ===================</span>
                                                            </div>
                                                            {val.Keahlian.map((val2, i) => (
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Nama Keahlian: </span>
                                                                <span className="w-2/3">{val2.NamaKeahlian}</span>
                                                                <span className="w-2/3">Rating Keahlian: </span>
                                                                <span className="w-2/3">{val2.RatingKeahlian}</span>
                                                            </div>
                                                        ))}
                                                            {/* <div className="flex text-[15px] font-montserrat mb-7">
                                                                <span className="w-2/3">Rating Keahlian</span>
                                                                <span className="w-2/3">{val.RatingKeahlian}</span>
                                                            </div> */}

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
                                           <ModalUpdateMubaligh/>
                                        <button onClick={() => openModal(v._id)}>
                                            <FaRegTrashAlt className="mr-2"/>
                                        </button>
                                        {isModalOpen && (
                                            <div className="flex items-center justify-center fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="bg-white p-8 rounded-lg shadow-md">
                                              <h3 className="text-lg font-semibold mb-4">Hapus Mubaligh</h3>
                                              <p>Anda yakin ingin menghapus Mubaligh ini?</p>
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
                                                  onClick={deleteMubaligh}
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
                   
                </div>
            </div>
        // </div>
    );
};
export default KelolaMubaligh;