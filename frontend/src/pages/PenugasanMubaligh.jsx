import React, { useState, useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ModalDeletePenugasan from '../component/penugasan/ModalDeletePenugasan';
import ModalUpdatePenugasan from '../component/penugasan/ModalUpdatePenugasan';
import ModalDetailPenugasan from '../component/penugasan/ModalDetailPenugasan';
import ModalAddPenugasan from '../component/penugasan/ModalAddPenugasan';

const PenugasanMubaligh = () => {
    const [data, setData] = useState(null)
    useEffect(() => { 
        const fetchData = async ()=> {
            try {
                const response = await fetch("http://localhost:3000/tempatpenugasan")
                const penugasan = await response.json()
                console.log(penugasan)
                let tampilPenugasan = []
                penugasan.forEach(value => {
                    tampilPenugasan.push({
                        "Nama": value.Penugasan.pimpinan ? value.Penugasan.pimpinan.Nama : null,
                        "mubalighJumatName" : value.Penugasan.mubaligh_khutbah_jumat.map(m => m.mubalighName),
                        "mubalighPengajianName" : value.Penugasan.Mubaligh_Khutbah_pengajian.map(m => m.mubalighName),
                        "TopikKajian": value.TopikKajian || null
                    })
                });
                setData(tampilPenugasan) 
            } catch (error) {
                console.log(error)
            }
        }
    fetchData()
    }, [])

        if (!data) {
            return <div> Loading </div>
        }
        return (
                <div className='flex flex-col items-center w-[100%] ml-[80px] pt-6'>
                    <h1 className='text-[30px] font-montserrat mb-7'>Kelola Tempat Penugasan</h1>
                    <div  className='flex justify-start w-[100%] pb-10'>  
                        <button className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" >
                        <ModalAddPenugasan/>
                        </button>
                    </div>
                    <div className="flex flex-col items-center w-full bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                        <div className=" w-full">
                            <table className="table-auto w-full border-separate border-spacing-y-3">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Penugasan Jumat</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Penugasan Pengajian</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Topik Kajian</th>
                                        <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>

                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {
                                        data.map((v,i)=>{
                                            return <tr className='bg-[#F5F5F5] rounded-md shadow-md' >
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">{i+1}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">{v.Nama}</td>
                                            <td className="text-center px-50 py-2">{v.mubalighJumatName.join(", ")}</td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">{v.mubalighPengajianName.join(", ")}</td>
                                            <td className="text-center px-4 py-2">{v.TopikKajian}</td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    <button>
                                                    <ModalDetailPenugasan/>
                                                    </button>
                                                    <button>
                                                    <ModalUpdatePenugasan/>
                                                    </button>
                                                    <button>
                                                    <ModalDeletePenugasan/>
                                                    </button>
                                                </div>
                                            </td>
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
            // </div>
        );
    };
export default PenugasanMubaligh;
