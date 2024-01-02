// import React, { useState, useEffect } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import { FaRegTrashAlt } from "react-icons/fa";
import ModalAddAccount from "../component/account/ModalAddAccount";
import ModalUpdateAccount from "../component/account/ModalUpdateAccount";

const KelolaAkun = () => {

    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Akun</h1>
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <button className="flex items-center bg-[#556B2F] text-white px-4 py-2 mr-2 " >
                    <ModalAddAccount />
                    </button>
                </div>
                <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Role</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Username</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Password</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">Contoh</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                            Contoh
                                            </td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">Contoh</td>
                                            <td className="text-center px-4 py-2 max-w-[200px]">Contoh</td>
                                            <td className="text-center px-4 py-2">Contoh</td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    <ModalUpdateAccount/>
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
export default KelolaAkun;
