import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt,  FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const GenerateJumat = () => {
    // const [startDate, setStartDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [statusValidasi, setStatusValidasi] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [countBuat, setCountBuat] = useState(0);


    useEffect(() => {
        if (data) {
            const filtered = data.filter(item => 
                item.PimpinanJemaah.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const fetchDataJumat = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatejadwaljumat/by-date", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept'  : 'application/json'
                },
                body: JSON.stringify(
                    {
                        bulan: startDate.getMonth() + 1,
                        tahun: startDate.getFullYear()
                    }
                )
            });

            let result;
            try {
                result = await response.json();
            } catch {
                setData([])
                result = null;
                return;
            }
    
            if (result?.statusValidasi) {
                setStatusValidasi(true);
            } else {
                console.log("sdfsdfsdf")
                if (countBuat < 5) {
                    postDataJumat();
                    setStatusValidasi(false);
                    setCountBuat(countBuat + 1); // Tambahkan hitungan
                } else {
                    alert("Anda sudah mencapai batas maksimal 5 kali pembuatan jadwal untuk bulan ini.");
                    setStatusValidasi(false);
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    }
    
    const postHistoriJumat = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/historijumat", {
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

    const postDataJumat = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatejadwaljumat", {
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
            const result = await response.json();
            if(response.status == 400) throw result;
            postHistoriJumat(result)
            // Setelah POST, tambahkan data baru ke state
            let tampilJadwal = [];
            result?.Jadwal?.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJemaah,
                    "Minggu_ke_1": value.Jumat.find(m=>m.minggu_ke == 1)?.Mubaligh,
                    "Minggu_ke_2": value.Jumat.find(m=>m.minggu_ke == 2)?.Mubaligh,
                    "Minggu_ke_3": value.Jumat.find(m=>m.minggu_ke == 3)?.Mubaligh,
                    "Minggu_ke_4": value.Jumat.find(m=>m.minggu_ke == 4)?.Mubaligh,
                    "Minggu_ke_5": value.Jumat.find(m=>m.minggu_ke == 5)?.Mubaligh,
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
            alert(error.message);
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
            <h1 className='text-[30px] font-montserrat mb-7'>Generate Khutbah Jum'at</h1>
            <div className='flex items-center w-[98%] pb-10'>
                <DatePicker
                    className="rounded mx-auto text-center"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    minDate={new Date()}
                    showMonthYearPicker
                />
                <FaCalendarAlt className="ml-2" />
            </div>

            <div className='flex justify-end py-0 items-center w-[98%]'>
            <button
                className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={postDataJumat}
                disabled={countBuat >= 5}
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
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Pimpinan Jemaah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-1 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 1).toLocaleDateString()}</p></th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-2 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 2).toLocaleDateString()}</p></th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-3 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 3).toLocaleDateString()}</p></th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-4 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 4).toLocaleDateString()}</p></th>
                                    {getFridays(startDate.getFullYear(), startDate.getMonth(), 4).getMonth() === getFridays(startDate.getFullYear(), startDate.getMonth(), 5).getMonth() && (
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal text-center">Jumat ke-5 <p>{getFridays(startDate.getFullYear(), startDate.getMonth(), 5).toLocaleDateString()}</p></th>
                                    )}
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
                                ) : (
                                    currentData.map((v, i) => {
                                        const hasFifthFriday = getFridays(startDate.getFullYear(), startDate.getMonth(), 4).getMonth() === getFridays(startDate.getFullYear(), startDate.getMonth(), 5).getMonth();
                                        return (
                                            <tr className="bg-[#F5F5F5] rounded-md shadow-md" key={i}>
                                                <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                                <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_1}</td>
                                                <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_2}</td>
                                                <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_3}</td>
                                                <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_4}</td>
                                                {hasFifthFriday && (
                                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_5}</td>
                                                )}
                                            </tr>
                                        );
                                    })
                                )}
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
            </>
            
        )}
       
        </div>
    );
};

export default GenerateJumat;