import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const GeneratePengajian = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [data, setData] = useState([])
    const [statusValidasi, setStatusValidasi] = useState(false);

    // useEffect(() => { 
    //     fetchData()
    // }, [])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatePengajian/by-date", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept'  : 'application/json'
            },    
            body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1,
                        tahun: startDate.getFullYear()
                    }
                )
            });
            // console.log("result",reponse);
            let result;
            try{
                result =  await response.json();
            }catch{
                result = null
            }
           
            if(result?.statusValidasi){
                setStatusValidasi(true);
            }else{
                postData();
                setStatusValidasi(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const postData = async () => {
        try {
            const response = await fetch("http://localhost:3000/generatePengajian", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        bulan: startDate.getMonth()+1 ,
                        tahun: startDate.getFullYear(),
                        statusValidasi: false
                    }
                )
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            
            // Setelah POST, tambahkan data baru ke state
            let tampilJadwal = [];
            result.jadwal.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJamaah,
                    "Minggu_ke": value.minggu_ke,
                    "hari":value.hari,
                    "Mubaligh":value.Mubaligh
                })
            });
            setData(tampilJadwal);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
            <h1 className='text-[30px] font-montserrat mb-7'>Generate Pengajian Rutin</h1>
            <div className='flex items-center w-[98%] pb-10'>
                <DatePicker
                    className="rounded mx-auto text-center"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    minDate={new Date()}
                />
                <FaCalendarAlt className="ml-2" />
            </div>

            <div className='flex justify-end py-5 items-center w-[98%]'>
                <button
                    className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                   // Tambahkan event handler onClick untuk memanggil getData
                    onClick={fetchData}
                >
                    Generate
                </button>
            </div>

            {statusValidasi && (
            <div className='flex justify-center py-5 items-center w-[98%]'>
                <span className="text-red-500 text-2xl">Jadwal Telah Disetujui</span>
            </div>
            )}

            {!statusValidasi && (
            <>
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <div className="flex flex-col items-center w-[98%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className="w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Detail Hari</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Nama Mubaligh</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((v,i)=>{
                                        return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{i+1}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Minggu_ke}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.hari}</td>
                                        <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.Mubaligh}</td>
                                    </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
        
    );
};

export default GeneratePengajian;
