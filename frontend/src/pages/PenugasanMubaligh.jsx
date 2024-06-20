import React, { useState, useEffect, useRef} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ModalUpdatePenugasan from '../component/penugasan/ModalUpdatePenugasan';
import ModalAddPenugasan from '../component/penugasan/ModalAddPenugasan';
import { FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const PenugasanMubaligh = () => {
    const [data, setData] = useState(null)
    const [data2, setData2] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const toast = useRef(null);

    useEffect(() => { 
        fetchData();
        // fetchPimpinanJemaah();
    }, [])

    useEffect(() => {
        if (data) {
            const filtered = data.filter(item => 
                item.Nama.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const openModal = (Id) => {
        console.log(Id);
        setSelectedId(Id);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchData = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/tempatpenugasan")
            const penugasan = await response.json()
            console.log(penugasan)
            let tampilPenugasan = []
            penugasan.forEach(value => {
                tampilPenugasan.push({
                    "_id" : value._id,
                    "tglAwal" : convertToIndTime(value.tgl_awal),
                    "tglAkhir" : convertToIndTime(value.tgl_akhir),
                    "idPimpinan" : value.Penugasan.pimpinan._id,
                    "Nama": value.Penugasan.pimpinan ? value.Penugasan.pimpinan.Nama : null,
                    "idmubalighjumat" :value.Penugasan.mubaligh_khutbah_jumat.map(m => m._id),
                    "idmubalighpengajian" : value.Penugasan.Mubaligh_Khutbah_pengajian.map(m => m._id),
                    "mubalighJumatName" : value.Penugasan.mubaligh_khutbah_jumat.map(m => m.mubalighName),
                    "mubalighPengajianName" : value.Penugasan.Mubaligh_Khutbah_pengajian.map(m => m.mubalighName),
                    "TopikKajian": value.TopikKajian || null
                })
            });
            setData(tampilPenugasan) 
            console.log("tampildata", tampilPenugasan)
        } catch (error) {
            console.log(error)
        }
    }
    

    const deletePenugasan = async () => {
        try {
        const response = await fetch(`http://localhost:3000/tempatpenugasan/${selectedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log("Data successfully deleted!");
            fetchData(); // Setelah penghapusan berhasil, perbarui daftar PJ.
            closeModal(); // Tutup modal setelah penghapusan selesai.
             // Handle response from server
            toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Penugasan berhasil di hapus', life: 3000 });
        } else {
            console.error("Failed to delete data");
        }
    } catch (error) {
        console.log(error);
        toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal mengahapus penugasan: ${error.message}`, life: 3000 });
        // Handle error if necessary
    }
    };

    const isDatePassed = (date) => {
        const today = new Date();
        const endDate = new Date(date);
        return endDate < today;
    };

    const maxRowsToShow = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * maxRowsToShow;
    const indexOfFirstRow = indexOfLastRow - maxRowsToShow;
    const currentData = filteredData ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : [];

    const handleNextPage = () => {
        if (indexOfLastRow < filteredData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const convertToIndTime = (utcDateStr) => {
        // Create a Date object from the input UTC date string
        const utcDate = new Date(utcDateStr);
      
        // Convert to Asia/Jakarta timezone
        const jakartaTime = utcDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
      
        // Convert the locale string back to ISO format
        const [date, time] = jakartaTime.split(', ');
        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`
      }
        if (!data) {
            return <div> Loading </div>
        }
        return (
                <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
                    <h1 className='text-[30px] font-montserrat mb-7'>Kelola Tempat Penugasan</h1>
                    <div  className='flex justify-start w-[100%] pb-10'>  
                        <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" >
                        <ModalAddPenugasan/>
                        </button>
                    </div>
                    <div className="flex flex-col items-center w-full bg-white px-0 py-0 shadow-md font-montserrat rounded-md">
                        <div className=" w-full">
                        <input
                            type="text"
                            className="border rounded p-2"
                            placeholder="Cari Nama Pimpinan Jemaah"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                            <table className="table-auto w-full border-separate border-spacing-y-3">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">No</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Pimpinan Jemaah</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Tanggal Mulai</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Tanggal Akhir</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Penugasan Jumat</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Penugasan Pengajian</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Topik Kajian</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Actions</th>

                                    </tr>
                                </thead>
                                <tbody className=''>
                                {currentData.length === 0 ? (
                                    <div className="absolute flex justify-center items-center w-[90%]">
                                        <div className="w-full mb-10 rounded-lg bg-white p-3">
                                            <p className="font-montserrat text-xl font-semibold mb-4 text-center">
                                                Tidak ada Data Penugasan 
                                            </p>
                                        </div>
                                    </div>
                                ) :
                                currentData.map((v,i)=>{
                                    const isDisabled = isDatePassed(v.tglAkhir);
                                            return <tr className={`bg-[#F5F5F5] rounded-md shadow-md ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} key={v._id}>
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">{i+indexOfFirstRow + 1}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.Nama}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.tglAwal?.split('T')[0]}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.tglAkhir?.split('T')[0]}</td>
                                            <td className="text-center px-50 py-2">{v.mubalighJumatName.join(", ")}</td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.mubalighPengajianName.join(", ")}</td>
                                            <td className="text-center px-4 py-2">{v.TopikKajian}</td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    
                                                    <button>
                                                    <ModalUpdatePenugasan penugasan_id={v._id} initialValues={{tgl_awal: v.tglAwal, tgl_akhir: v.tglAkhir, TopikKajian:v.TopikKajian, pimpinan:v.idPimpinan, selectedMubalighKhutbahJumat: v.idmubalighjumat, selectedMubalighPengajian: v.idmubalighpengajian }}/>
                                                        {/* <FaRegEdit className="mr-2"/> */}
                                                    </button>
                                                    <button onClick={() => openModal(v._id)}>
                                                        <FaRegTrashAlt className="mr-2"/>
                                                    </button>
                                                    {isModalOpen && (
                                                    <div className="flex items-center justify-center fixed inset-0 z-50 outline-none focus:outline-none">
                                                    <div className="bg-white p-8 rounded-lg shadow-md">
                                                    <h3 className="text-lg font-semibold mb-4">Hapus Tempat Penugasan</h3>
                                                    <p>Anda yakin ingin menghapus tempat penugasan ini?</p>
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
                                                        onClick={deletePenugasan}
                                                        >
                                                        Hapus
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                                )}
                                                </div>
                                            </td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                            </td>
                                        </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ConfirmDialog />
                        <Toast ref={toast} />
                        <div className='flex justify-between w-[100%]'>
                        <p className='mt-2 py-2'>Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {data.length} entries</p>
                        <p className='mt-2 py-2'>{currentPage}</p>
                        <div className='gap-0 flex'>
                            {currentPage > 1 && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handlePrevPage}
                                >
                                    <FaArrowLeft className='w-[25px]' />
                                </button>
                            )}
                            {indexOfLastRow < data.length && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handleNextPage}
                                >
                                    <FaArrowRight className='w-[25px]' />
                                </button>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
            // </div>
        );
    };
export default PenugasanMubaligh;
