import React, { useState, useEffect } from 'react';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';

const HistoryGenerateJumat = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => { 
        getHistory()
    }, [])

    const openModal = (Id) => {
        // console.log(Id);
        setSelectedId(Id);
        setIsModalOpen(true);
        getJadwal(Id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const getHistory = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/historijumat")
            const tanggaljumat = await response.json()
            let tampilHistory = []

            tanggaljumat.forEach(value => {
                tampilHistory.push({
                    "_id": value._id,
                    "statusValidasi": value.statusValidasi,
                    "HistoryBulan":value.bulan,
                    "HistoryTahun":value.tahun,
                    "komentar" : value.comment
                })
                
                if(tampilHistory.statusValidasi === true){
                    makeStyle(true)
                }else{
                    makeStyle(false)
                }
            });
            setData(tampilHistory) 
           

        } catch (error) {
            console.log(error)
        }
    }

    const getJadwal = async (selectedId)=> {
        try {
            const response = await fetch(`http://localhost:3000/historijumat/${selectedId}`)
            const jadwaljumat = await response.json()
            console.log(jadwaljumat)
            let tampilJadwal = []

            jadwaljumat.Jadwal.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJemaah,
                    "Minggu_ke_1": value.Jumat.find(m=>m.minggu_ke == 1)?.Mubaligh,
                    "Minggu_ke_2": value.Jumat.find(m=>m.minggu_ke == 2)?.Mubaligh,
                    "Minggu_ke_3": value.Jumat.find(m=>m.minggu_ke == 3)?.Mubaligh,
                    "Minggu_ke_4": value.Jumat.find(m=>m.minggu_ke == 4)?.Mubaligh,
                    "Minggu_ke_5": value.Jumat.find(m=>m.minggu_ke == 5)?.Mubaligh,
                })
            });
            
            setData2(tampilJadwal)

        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (selectedId) => {
        try {
            const response = await fetch(`http://localhost:3000/generatejadwaljumat/${selectedId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        statusValidasi: true
                    }
                )
            });
            const result = await response.json();
            console.log(result);
            window.location.reload();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteJadwalJumat = async () => {
        try {
        const response = await fetch(`http://localhost:3000/historijumat/${selectedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log("Data successfully deleted!");
            getHistory(); // Setelah penghapusan berhasil, perbarui daftar PJ.
            closeModal(); // Tutup modal setelah penghapusan selesai.
        } else {
            console.error("Failed to delete data");
        }
    } catch (error) {
        console.log(error);
    }
    };

    const makeStyle=(currentStatus)=>{
        if(currentStatus === true)
            {
              return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green'
              }
            }
            else if(currentStatus === false)
            {
              return{
                background: '#ffadad8f',
                color: 'red',
              }
            }
            else{
              return{
                background: '#59bfff',
                color: 'white',
              }
            }
    }


    const getFridays = (year, month, week) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const dayIndex = 5
       
        const dayOffset = (dayIndex - firstDayOfMonth + 7) % 7;
        const firstOccurrence = 1 + dayOffset;
        const date = new Date(year, month, firstOccurrence + (week - 1) * 7);

        return date;
    };
    
    const maxRowsToShow = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * maxRowsToShow;
    const indexOfFirstRow = indexOfLastRow - maxRowsToShow;
    const currentData = data ? data.slice(indexOfFirstRow, indexOfLastRow) : [];

    const handleNextPage = () => {
        if (indexOfLastRow < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getStatusText = (statusValidasi, komentar) => {
        if (statusValidasi === true) {
            return "Disetujui";
        } else if (statusValidasi === false && komentar) {
            return "Tidak Disetujui";
        } else if (statusValidasi === false && !komentar) {
            return "Belum Disetujui";
        } else {
            return "Unknown";
        }
    };

    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
            <h1 className='text-[30px] font-montserrat mb-7'>History Generate Khutbah Jum'at</h1>
            <div className="flex flex-col items-center w-[98%] ml-[80px] pt-6">
                <table className="table-auto w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">No</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Keterangan</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Bulan</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line text-center font-normal">Tahun</th>
                            <th className="px-30 py-1 border-line border-b-2 text-line text-center font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {currentData.length === 0 ? (
                                    <div className="absolute flex justify-center items-center w-[90%]">
                                        <div className="w-full mb-10 rounded-lg bg-white p-3">
                                            <p className="font-montserrat text-xl font-semibold mb-4 text-center">
                                                Tidak ada jadwal 
                                            </p>
                                        </div>
                                    </div>
                                ) :
                                currentData.map((v, i) => {
                            return (
                            <tr className='bg-[#F5F5F5] rounded-md shadow-md' key={i}>
                            <td className="relative text-center px-10 py-2 rounded-l-lg">{i +indexOfFirstRow + 1}</td>    
                            <td className="relative text-center px-10 py-2 rounded-l-lg"> {v.komentar ? v.komentar : "Tidak ada Komentar"}</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryBulan}</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryTahun}</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg " >
                                
                                    <div className='flex justify-center m-1'>
                                            <td
                                                className="text-sky-300 relative items-center px-4 py-2 rounded-r-lg"
                                                key={v.statusValidasi}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <span
                                                    className="p-2 rounded-md "
                                                    style={makeStyle(v.statusValidasi)}
                                                >
                                               {getStatusText(v.statusValidasi, v.komentar)}
                                                </span>
                                            </td>
              
                                    </div>
<<<<<<< HEAD
                                
                                {/* {isModalOpen && (
=======
                                </button> 
                                {isModalOpen && (
>>>>>>> 693da00380350f2c177030c067a8ce6f849c7644
                                <>
                                <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                                        <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                                            <div className="flex items-start justify-between p-5 rounded-t">
                                                <h3 className='text-[30px] font-montserrat mb-7'>Jadwal Khutbah Jumat</h3>
                                            </div>
                                            <div className="w-full">
                                                <div className="grid grid-cols-6 gap-3 border-b-2 pb-2">
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-1 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 1).toLocaleDateString()}</p></div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-2 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 2).toLocaleDateString()}</p></div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-3 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 3).toLocaleDateString()}</p></div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-4 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 4).toLocaleDateString()}</p></div>
                                                    {getFridays(startDate.getFullYear(), startDate.getMonth(), 4).getMonth() === getFridays(startDate.getFullYear(), startDate.getMonth(), 5).getMonth() && (
                                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-5 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 5).toLocaleDateString()}</p></th>
                                                    )}
                                                </div>
                                                {data2.map((v, i) => (
                                                    <div key={i} className="grid grid-cols-6 gap-3 bg-[#F5F5F5] rounded-md shadow-md mt-3">
                                                    <div className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_1}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_2}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_3}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_4}</div>
                                                    {getFridays (startDate.getFullYear(), startDate.getMonth(), 4).getMonth() == getFridays (startDate.getFullYear(), startDate.getMonth(), 5).getMonth()
                                                        ?
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_5} </div> : <div className="text-center w-36 px-4 py-2"> </div> }
                                                    </div>
                                                ))}
                                                </div>
                                                <div className="flex items-center justify-between p-6 rounded-b">
                                                    <button
                                                        className="text-black bg-[#F4F4F4] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                        type="button"
                                                        onClick={closeModal}
                                                    >
                                                        Kembali
                                                    </button>
                                                    <div className="flex space-x-2">
                                                        <button
                                                        className="text-white bg-[#FA8072] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                        type="button"
                                                        onClick={deleteJadwalJumat}
                                                        >
                                                        Hapus
                                                        </button>
                                                        {/* <button
                                                        className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                        type="button"
                                                        onClick={() => updateStatus(selectedId)}
                                                        >
                                                        Setujui
                                                        </button> */}
                                                    </div>
                                                    </div>
                                              </div>
                                          </div>
                                      </div>
                              </>
                                                )}
                            </td>
                            </tr>
                            );
                            })
                        }
                    </tbody>
                </table>
            </div>
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
    );
};

export default HistoryGenerateJumat;
