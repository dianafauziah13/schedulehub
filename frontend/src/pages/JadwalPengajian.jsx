import React, { useState, useEffect } from 'react';
import {FaCalendarAlt, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from 'xlsx'

const JadwalPengajian = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [statusValidasi, setStatusValidasi] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data) {
            const filtered = data.filter(item => 
                item.PimpinanJemaah.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Jadwal Pengajian Rutin.xlsx");
    }

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatePengajian/by-date", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1,
                        tahun: startDate.getFullYear()
                    }
                )
            });
            const result = await response.json();
            console.log(result);

            let tampilJadwal = [];
            if(result.statusValidasi){
            result.jadwal.forEach(value => {
                const tanggal = getDateByWeekAndDay(startDate.getFullYear(), startDate.getMonth(), value.minggu_ke, value.hari);
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJamaah,
                    "Minggu_ke": value.minggu_ke,
                    "hari":value.hari,
                    "Mubaligh":value.Mubaligh,
                    "tanggal": tanggal,
                })
            });
            setData(tampilJadwal);
            setStatusValidasi(true);
            }else{
                setStatusValidasi(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDateByWeekAndDay = (year, month, week, day) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const dayIndex = (day === 'Minggu') ? 0 : (day === 'Senin') ? 1 : (day === 'Selasa') ? 2 : (day === 'Rabu') ? 3 : (day === 'Kamis') ? 4 : (day === 'Jumat') ? 5 : (day === 'Sabtu') ? 6 : -1;
        if (dayIndex === -1) return 'Invalid Day';

        const dayOffset = (dayIndex - firstDayOfMonth + 7) % 7;
        const firstOccurrence = 1 + dayOffset;
        const date = new Date(year, month, firstOccurrence + (week - 1) * 7);

        return date;
    };

    const maxRowsToShow = 3;
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
        // <div className='bg-bg h-screen w-screen overflow-hidden'>
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
        <h1 className='text-[30px] font-montserrat mb-7'>Jadwal Pengajian Rutin</h1>
        <div className='flex items-center w-[98%] pb-10'>
            <DatePicker
                className="rounded mx-auto text-center"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
            />
            <FaCalendarAlt className="ml-2" />
        </div>

        <div className='flex justify-end py-0 items-center w-[98%]'>
            <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" onClick={fetchData}>
            Tampil Jadwal
            </button>
        </div>
                {/* Tambahkan kondisi untuk menampilkan pesan jika statusValidasi false */}
        {!statusValidasi && (
            <div className='flex justify-center py-5 items-center w-[98%]'>
                <span className="text-red-500 text-2xl">Jadwal Belum Disetujui atau Belum Digenerate</span>
            </div>
        )}

        {statusValidasi && (
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
                                <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke</th>
                                <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Tanggal</th>
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
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{i+indexOfFirstRow + 1}</td>
                                    <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.tanggal instanceof Date && !isNaN(v.tanggal) ? v.tanggal.toLocaleDateString() : 'Invalid Date'}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.hari}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Mubaligh}</td>
                                    <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                    </td>
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
        <div className='flex justify-center py-5 items-center w-[98%]'>
            <button className="text-white bg-[#293a8e] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" onClick={exportToExcel}>
                Download Jadwal Pengajian Rutin
            </button>
        </div>
        </>
        )}

    </div>
    );
  };
export default JadwalPengajian;
