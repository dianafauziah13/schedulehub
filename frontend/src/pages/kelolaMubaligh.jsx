import React, { useState, useEffect } from 'react';
import ModalAddMubaligh from "../component/mubaligh/ModalAddMubaligh";
import ModalUpdateMubaligh from "../component/mubaligh/ModalUpdateMubaligh";
import ModalDeleteMubaligh from "../component/mubaligh/ModalDeleteMubaligh";



const KelolaMubaligh = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/mubaligh");
                const mubaligh = await response.json();
                console.log(mubaligh);
                let tampilMubaligh = [];
                mubaligh.forEach(value => {
                    tampilMubaligh.push({
                        "mubalighName": value.mubalighName,
                        "scope_dakwah": value.scope_dakwah,
                        "AvailableKhutbahJumat": value.AvailableKhutbahJumat,
                        "Minggu_ke": value.AvailablePengajianRutin?.Minggu_ke?.toString()
                    })
                });
                setData(tampilMubaligh);
                console.log(tampilMubaligh)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    if (!data) {
        return <div> Loading </div>
    }
    return (

        // <div className='bg-bg h-screen w-screen overflow-hidden'>
            <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
                <h1 className='text-[30px] font-montserrat mb-7'>Kelola Mubaligh</h1>
                <div  className='flex justify-start w-[100%] pb-10'>  
                    <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" >
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
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Ketersediaan Waktu Jumat</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Ketersediaan Waktu Pengajian</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    data.map((v,i)=>{
                                        return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                        <td className="text-center w-10 px-4 py-2 rounded-l-lg">{i+1}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.mubalighName}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.scope_dakwah}</td>
                                        <td className="text-center px-4 py-2">{v.AvailableKhutbahJumat.toString()}</td>
                                        <td className="text-center px-4 py-2"> {v.Minggu_ke}</td>
                                        <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                            <div className='flex justify-center m-2'>
                                                <ModalUpdateMubaligh/>
                                                <button>
                                                <ModalDeleteMubaligh/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                   
                </div>
            </div>
        // </div>
    );
};
export default KelolaMubaligh;
