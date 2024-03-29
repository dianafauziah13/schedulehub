import React, { useState } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ModalPreviewPengajian from '../component/generate/PreviewPengajian';
import ModalDeletePengajian from '../component/generate/ModalDeletePengajian';

function createData(status) {
    return { status };
}
  
const rows = [
    createData("Disetujui"),
    // createData("Pending"),
    // createData("Approved"),
    // createData("Delivered"),
];

const makeStyle=(status)=>{
    if(status === 'Disetujui')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if(status === 'Pending')
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
  

const GeneratePengajian = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Generate Pengajian Rutin</h1>
                <div  className='flex items-center w-[98%] pb-10'>  
                    <DatePicker
                        className="rounded mx-auto text-center"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                    />
                        <FaCalendarAlt className="ml-2"/>
                </div>
                <div className='flex justify-end py-5 items-center w-[98%]'>
                    <button
                        type="button"
                    >
                    <ModalPreviewPengajian/>
                    </button>
                </div>
                <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            {/* <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Role</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Username</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Password</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>

                                </tr>
                            </thead> */}
                            <tbody className=''>
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="relative text-center px-10 py-2 rounded-l-lg">Jadwal Khutbah Pengajian Rutin</td>
                                            <td className="relative items-center px-4 py-2 rounded-r-lg">
                                            Desember, 2023
                                            </td>
                                            <div className='flex justify-center m-2'>
                                            {rows.map((row) => (
                                                
                                                <td className="text-sky-300 relative items-center px-4 py-2 rounded-r-lg" 
                                                    key={row.name}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                > 
                                                     <span className="p-2 rounded-md" style={makeStyle(row.status)}>{row.status}</span>
                                                </td>
                                            ))}
                                            </div>
                                           
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>

                                                    <button>
                                                       <ModalDeletePengajian/>
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
export default GeneratePengajian;
