import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ModalDeletePenugasan from '../component/penugasan/ModalDeletePenugasan';
import ModalAddPenugasan from '../component/mubaligh/ModalAddPenugasan';

const PenugasanMubaligh = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard/penugasanMubaligh/rekapBulanan'); // Ganti dengan path yang sesuai
    };

    const [startDate, setStartDate] = useState(new Date());
    return (
        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Tempat Penugasan</h1>
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
                <div  className='flex justify-start w-[98%] pb-10'>  
                    <button className="flex items-center bg-[#556B2F] text-white px-4 py-2 mr-2 " >
                    <ModalAddPenugasan />
                    </button>
                </div>
                <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className="w-full">
                    <table className="table-auto w-full border-separate border-spacing-y-3">
                            <tbody className=''>
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="relative text-center px-10 py-2 rounded-l-lg">Tempat Penugasan</td>
                                            <td className="relative items-center px-4 py-2 rounded-r-lg " onClick={handleClick}> Desember, 2023 </td>
                                            <div className='flex justify-center m-2'></div>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    <button>
                                                       <ModalDeletePenugasan/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        // </div>
    );
  };
export default PenugasanMubaligh;
