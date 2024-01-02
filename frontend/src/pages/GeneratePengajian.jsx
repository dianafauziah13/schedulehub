import React, { useState } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import { FaRegTrashAlt, FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                    />
                        <FaCalendarAlt/>
                </div>
                <div className='flex justify-start py-5 ml-80'>
                    <button
                        type="button"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                        Generate
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
                                                       <FaRegTrashAlt/>
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
