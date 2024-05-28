import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const GeneratePengajian = () => {
    const [data, setData] = useState([])

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
            setData(tampilHistory) 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
            <h1 className='text-[30px] font-montserrat mb-7'>Hasil Generate Pengajian Rutin</h1>

            <div className="flex flex-col items-center w-[98%] ml-[80px] pt-6">
                <table className="table-auto w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Keterangan</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Bulan</th>
                            <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Tahun</th>
                            <th className="px-30 py-1 border-line border-b-2 text-line font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            data.map((v,i)=>{
                                return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                <td className="relative text-center px-10 py-2 rounded-l-lg">{i+1}</td>    
                                <td className="relative text-center px-10 py-2 rounded-l-lg">Hasil Generate Pengajian Rutin</td>
                                <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryBulan}</td>
                                <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryTahun}</td>
                                <td className="relative text-center px-10 py-2 rounded-l-lg "> </td>
                                <div className='flex justify-center m-2'></div>
                            </tr>
                            })
                        }       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GeneratePengajian;
