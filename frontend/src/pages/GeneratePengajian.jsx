import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Toast } from 'primereact/toast';
import 'react-datepicker/dist/react-datepicker.css';

const GeneratePengajian = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [data, setData] = useState([])
    const [statusValidasi, setStatusValidasi] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [countBuat, setCountBuat] = useState(0);

    const toast = useRef(null);

    useEffect(() => {
        if (data) {
            const filtered = data.filter(item => 
                item.PimpinanJemaah.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatePengajian/by-date", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept'  : 'application/json'
            },    
            body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1,
                        tahun: startDate.getFullYear()
                    }
                )
            });
            // console.log("result",reponse);
            let result;
            try{
                result =  await response.json();
            }catch{
                result = null
            }
           
            if(result?.statusValidasi){
                setStatusValidasi(true);
            }else {
                // Pengecekan apakah sudah mencapai 5 kali buat
                if (countBuat < 5) {
                    postData();
                    setStatusValidasi(false);
                    setCountBuat(countBuat + 1); // Tambahkan hitungan
                } else {
                    setStatusValidasi(false);
                    alert("Anda sudah mencapai batas maksimal 5 kali pembuatan jadwal untuk bulan ini.");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const postHistoriPengajian = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/historipengajian", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }); 
            const result = await response.json();
            console.log("histori", result)
        } catch (error) {
            console.log(error)
        }
        
    }

    const postData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatePengajian", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1 ,
                        tahun: startDate.getFullYear(),
                        statusValidasi: false
                    }
                )
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const result = await response.json();
            if(response.status == 400) throw result;
            postHistoriPengajian(result)
            
            // Setelah POST, tambahkan data baru ke state
            let tampilJadwal = [];
            result.jadwal.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJamaah,
                    "Minggu_ke": value.minggu_ke,
                    "hari":value.hari,
                    "Mubaligh":value.Mubaligh
                })
            });
            setData(tampilJadwal);
            if (result?.statusValidasi) {
                setStatusValidasi(true);
            }else {
                setStatusValidasi(false);
            }
        } catch (error) {
            console.log(error)
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal menambahkan Generate Jadwal: ${error.message}`, life: 3000 });
        }
    }

    const maxRowsToShow = 4;
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

    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
            <h1 className='text-[30px] font-montserrat mb-7'>Generate Pengajian Rutin</h1>
            <div className='flex items-center w-[98%] pb-10'>
                <DatePicker
                    className="rounded mx-auto text-center"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    minDate={new Date()}
                />
                <FaCalendarAlt className="ml-2" />
            </div>

            <div className='flex justify-end py-0 items-center w-[98%]'>
                <button
                    className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                   // Tambahkan event handler onClick untuk memanggil getData
                    onClick={postData}
                >
                    Buat
                </button>
            </div>

            {statusValidasi && (
            <div className='flex justify-center py-5 items-center w-[98%]'>
                <span className="text-red-500 text-2xl">Jadwal Telah Disetujui</span>
            </div>
            )}

            {!statusValidasi && (
            <>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <div className="flex flex-col items-center w-[98%] bg-white px-1 py-0 shadow-md font-montserrat rounded-md">
                    <div className="w-full">
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
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Detail Hari</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Mubaligh</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentData.length === 0 ? (
                                    <div className="absolute flex justify-center items-center w-[90%]">
                                        <div className="w-full mb-10 rounded-lg bg-white p-3">
                                            <p className="font-montserrat text-xl font-semibold mb-4 text-center">
                                                Tidak ada jadwal 
                                            </p>
                                        </div>
                                    </div>
                                ) :
                                currentData.map((v,i)=>{
                                        return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{i+indexOfFirstRow + 1}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.hari}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Mubaligh}</td>
                                    </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
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
                    <ConfirmDialog />
                    <Toast ref={toast} />
            </>
        )}
        </div>
        
    );
};

export default GeneratePengajian;

