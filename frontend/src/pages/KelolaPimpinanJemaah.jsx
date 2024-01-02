// import React, { useState, useEffect } from 'react';
// import axios from "../axiosConfig";
// import styles from '../index.css';
import { FaRegTrashAlt } from "react-icons/fa";
import ModalAddPJ from "../component/pimpinanJemaah/ModalAddPJ";
import { TERipple } from 'tw-elements-react';

const KelolaPimpinanJemaah = () => {

    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Pimpinan Jemaah</h1>
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <button className="flex items-center bg-[#556B2F] text-white px-4 py-2 mr-2 " >
                    <ModalAddPJ />
                    </button>
                </div>
                <div className="mb-3 md:w-96">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1" />

                        {/* <!--Search button--> */}
                        <TERipple color='light'>
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                        </TERipple>
                    </div>
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
                                            <td className="text-center w-10 px-10 py-2 rounded-l-lg">Banjaran</td>
                                            <td className="relative items-center px-4 py-2 rounded-r-lg">
                                            JL. Banjaran Nomor 15
                                            </td>
                                            <div className='flex justify-center m-2'>
                                                <td className="text-sky-300 relative items-center px-4 py-2 rounded-r-lg"> 
                                                    <button className="underline">
                                                        Detail
                                                    </button>
                                                </td>
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
export default KelolaPimpinanJemaah;
