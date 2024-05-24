import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const GeneratePengajian = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [data, setData] = useState([])
    const [data2, setData2] = useState([]);

    const postData = async () => {
        try {
            const response = await fetch("http://localhost:3000/genetarePengajian", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1 ,
                        tahun: startDate.getFullYear()
                    }
                )
            });
            const result = await response.json();
            console.log(result);

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
        } catch (error) {
            console.log(error);
        }
    }

    const getHistory = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/genetarePengajian")
            const tanggaljumat = await response.json()
            let tampilHistory = []

            tanggaljumat.forEach(value => {
                tampilHistory.push({
                    "HistoryBulan":value.bulan,
                    "HistoryTahun":value.tahun
                })
            });
            setData2(tampilHistory) 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

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
                />
                <FaCalendarAlt className="ml-2" />
            </div>

            <div className="flex flex-col items-center w-[98%] ml-[80px] pt-6">
                <table className="table-auto w-full border-separate border-spacing-y-3">
                    <tbody className=''>
                        {
                            data2.map((v,i)=>{
                                return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                <td className="relative text-center px-10 py-2 rounded-l-lg">History Jadwal Pengajian Rutin</td>
                                <td className="relative items-center px-4 py-2 rounded-r-lg ">{v.HistoryBulan}</td>
                                <td className="relative items-center px-4 py-2 rounded-r-lg ">{v.HistoryTahun}</td>
                                <div className='flex justify-center m-2'></div>
                                <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                </td>
                            </tr>
                            })
                        }       
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end py-5 items-center w-[98%]'>
                <button
                    className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={postData} // Tambahkan event handler onClick untuk memanggil getData
                >
                    Generate
                </button>
            </div>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className="w-full">
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
                            {data.map((v,i)=>{
                                        return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{i+1}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke}</td>
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
        </div>
    );
};

export default GeneratePengajian;
