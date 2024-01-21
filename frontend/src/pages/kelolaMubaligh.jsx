// import React, { useState, useEffect } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import ModalAddMubaligh from "../component/mubaligh/ModalAddMubaligh";
import ModalUpdateMubaligh from "../component/mubaligh/ModalUpdateMubaligh";
import ModalDeleteMubaligh from "../component/mubaligh/ModalDeleteMubaligh";

const KelolaMubaligh = () => {

    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Mubaligh</h1>
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <button className="flex items-center bg-[#556B2F] text-white px-4 py-2 mr-2 " >
                    <ModalAddMubaligh />
                    </button>
                </div>
                <div className="flex flex-col items-center w-full bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Mubaligh</th>
                                    <th className="px-30 py-1 border-line border-b-2 text-line font-normal">Lingkup Dakwah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Asal PJ</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Ketersediaan Waktu</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">1</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                            H.O Surachman
                                            </td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">Cabang</td>
                                            <td className="text-center px-4 py-2 max-w-[200px]">Banjaran</td>
                                            <td className="text-center px-4 py-2">2,3,4</td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    <ModalUpdateMubaligh/>
                                                    <button>
                                                       <ModalDeleteMubaligh/>
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
export default KelolaMubaligh;
