import React, { useState } from 'react';
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const JadwalPengajian = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Jadwal Pengajian</h1>
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
                    <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className="w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Tanggal</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Waktu</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Mubaligh</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            <tr className='bg-[#F5F5F5] rounded-md shadow-md'>
                            <td className="relative text-center px-10 py-2 rounded-l-lg">1</td>
                            <td className="relative text-center px-4 py-2">Banjaran</td>
                            <td className="relative text-center px-4 py-2">11-12-2023</td>
                            <td className="relative text-center px-4 py-2">Minggu Pagi</td>
                            <td className="relative text-center px-4 py-2 rounded-r-lg">H.O Surachman</td>
                            <div className='flex justify-center m-2'></div>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

            </div>
        // </div>
    );
  };
export default JadwalPengajian;
