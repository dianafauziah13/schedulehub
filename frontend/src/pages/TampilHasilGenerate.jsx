import React, { useState, useEffect } from 'react';

const TampilHasilGenerate = () => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatejadwaljumat/by-date?bulan=${bulan}&tahun=${tahun}")
            const result = await response.json();
            console.log(result);

            let tampilJadwal = [];
            result.Jadwal.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJemaah,
                    "Minggu_ke_1": value.Jumat.find(m=>m.minggu_ke == 1)?.Mubaligh,
                    "Minggu_ke_2": value.Jumat.find(m=>m.minggu_ke == 2)?.Mubaligh,
                    "Minggu_ke_3": value.Jumat.find(m=>m.minggu_ke == 3)?.Mubaligh,
                    "Minggu_ke_4": value.Jumat.find(m=>m.minggu_ke == 4)?.Mubaligh,
                    "Minggu_ke_5": value.Jumat.find(m=>m.minggu_ke == 5)?.Mubaligh,
                })
            });
            setData(tampilJadwal)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
        <h1 className='text-[30px] font-montserrat mb-7'>Jadwal Khutbah Jumat</h1>
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
                        {data.map((v,i)=>{
                                    return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                    <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_1}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_2}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_3}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_4}</td>
                                    <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke_5}</td>
                                    <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* <div className='flex justify-center py-5 items-center w-[98%]'>
            <button className="text-white bg-[#293a8e] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" onClick={exportToExcel}>
                Download Jadwal Khutbah Jumat
            </button>
        </div> */}
</div>
)
  };
export default TampilHasilGenerate;
