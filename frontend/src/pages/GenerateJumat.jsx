import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const GenerateJumat = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/generatejadwaljumat');
            setData(response.data);
            console.log('Data berhasil diambil:', response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data:', error);
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
                    showMonthYearPicker
                />
                <FaCalendarAlt className="ml-2" />
            </div>
            <div className='flex justify-end py-5 items-center w-[98%]'>
                <button
                    type="button"
                    onClick={getData} // Tambahkan event handler onClick untuk memanggil getData
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
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-1</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-2</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-3</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-4</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    data.map((item, index) => (
                                        <tr key={index} className='bg-[#F5F5F5] rounded-md shadow-md'>
                                            <td className="relative text-center px-10 py-2 rounded-l-lg">{item.pimpinanJemaah}</td>
                                            <td className="relative text-center px-4 py-2">{item.minggu1}</td>
                                            <td className="relative text-center px-4 py-2">{item.minggu2}</td>
                                            <td className="relative text-center px-4 py-2">{item.minggu3}</td>
                                            <td className="relative text-center px-4 py-2">{item.minggu4}</td>
                                            <td className="relative text-center px-4 py-2 rounded-r-lg">{item.minggu5}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">Tidak ada data yang tersedia</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateJumat;
