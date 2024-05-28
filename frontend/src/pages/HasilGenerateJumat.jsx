import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const GenerateJumat = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => { 
        getHistory()
    }, [])

    const openModal = (Id) => {
        // console.log(Id);
        setSelectedId(Id);
        setIsModalOpen(true);
        getJadwal(Id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const getHistory = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/generatejadwaljumat")
            const tanggaljumat = await response.json()
            let tampilHistory = []

            tanggaljumat.forEach(value => {
                tampilHistory.push({
                    "_id": value._id,
                    "statusValidasi": value.statusValidasi,
                    "HistoryBulan":value.bulan,
                    "HistoryTahun":value.tahun
                })
                
                if(tampilHistory.statusValidasi === true){
                    makeStyle(true)
                }else{
                    makeStyle(false)
                }
            });
            setData(tampilHistory) 
           

        } catch (error) {
            console.log(error)
        }
    }

    const getJadwal = async (selectedId)=> {
        try {
            const response = await fetch(`http://localhost:3000/generatejadwaljumat/${selectedId}`)
            const jadwaljumat = await response.json()
            console.log(jadwaljumat)
            let tampilJadwal = []

            jadwaljumat.Jadwal.forEach(value => {
                tampilJadwal.push({
                    "PimpinanJemaah":value.PimpinanJemaah,
                    "Minggu_ke_1": value.Jumat.find(m=>m.minggu_ke == 1)?.Mubaligh,
                    "Minggu_ke_2": value.Jumat.find(m=>m.minggu_ke == 2)?.Mubaligh,
                    "Minggu_ke_3": value.Jumat.find(m=>m.minggu_ke == 3)?.Mubaligh,
                    "Minggu_ke_4": value.Jumat.find(m=>m.minggu_ke == 4)?.Mubaligh,
                    "Minggu_ke_5": value.Jumat.find(m=>m.minggu_ke == 5)?.Mubaligh,
                })
            });
            
            setData2(tampilJadwal)

        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (selectedId) => {
        try {
            const response = await fetch(`http://localhost:3000/generatejadwaljumat/${selectedId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        statusValidasi: true
                    }
                )
            });
            const result = await response.json();
            console.log(result);
            window.location.reload();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteJadwalJumat = async () => {
        try {
        const response = await fetch(`http://localhost:3000/generatejadwaljumat/${selectedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log("Data successfully deleted!");
            getHistory(); // Setelah penghapusan berhasil, perbarui daftar PJ.
            closeModal(); // Tutup modal setelah penghapusan selesai.
        } else {
            console.error("Failed to delete data");
        }
    } catch (error) {
        console.log(error);
    }
    };

    const makeStyle=(currentStatus)=>{
        if(currentStatus === true)
            {
              return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green'
              }
            }
            else if(currentStatus === false)
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
    
    return (
        <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
            <h1 className='text-[30px] font-montserrat mb-7'>Hasil Generate Khutbah Jum'at</h1>

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
                            data.map((v, i) => {
                            return (
                            <tr className='bg-[#F5F5F5] rounded-md shadow-md' key={i}>
                            <td className="relative text-center px-10 py-2 rounded-l-lg">{i + 1}</td>    
                            <td className="relative text-center px-10 py-2 rounded-l-lg">Hasil Generate Khutbah Jumat</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryBulan}</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg ">{v.HistoryTahun}</td>
                            <td className="relative text-center px-10 py-2 rounded-l-lg " >
                                <button onClick={() => openModal(v._id)}>
                                    <div className='flex justify-center m-2'>
                                            <td
                                                className="text-sky-300 relative items-center px-4 py-2 rounded-r-lg"
                                                key={v.statusValidasi}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <span
                                                    className="p-2 rounded-md"
                                                    style={makeStyle(v.statusValidasi)}
                                                >
                                                {v.statusValidasi ? "Disetujui" : "Belum Disetujui"}
                                                </span>
                                            </td>
              
                                    </div>
                                </button> 
                                {isModalOpen && (
                                <>
                                <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                                        <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                                            <div className="flex items-start justify-between p-5 rounded-t">
                                                <h3 className='text-[30px] font-montserrat mb-7'>Jadwal Khutbah Jumat</h3>
                                            </div>
                                            <div className="w-full">
                                                <div className="grid grid-cols-6 gap-3 border-b-2 pb-2">
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Pimpinan Jemaah</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-1</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-2</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-3</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-4</div>
                                                    <div className="px-4 py-1 border-line border-b-2 text-line font-normal">Minggu ke-5</div>
                                                </div>
                                                {data2.map((v, i) => (
                                                    <div key={i} className="grid grid-cols-6 gap-3 bg-[#F5F5F5] rounded-md shadow-md mt-3">
                                                    <div className="text-center max-w-[25px] h-auto px-4 py-2">{v.PimpinanJemaah}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_1}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_2}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_3}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_4}</div>
                                                    <div className="text-center w-36 px-4 py-2">{v.Minggu_ke_5}</div>
                                                    </div>
                                                ))}
                                                </div>
                                                  <div className="flex items-center justify-between p-6 rounded-b">
                                                      <button
                                                           className="text-black bg-[#F4F4F4] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                          type="button"
                                                          onClick={closeModal}
                                                      >
                                                          Kembali
                                                      </button>
                                                      <button
                                                           className="text-white bg-[#FA8072] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                          type="button"
                                                          onClick={deleteJadwalJumat}
                                                      >
                                                          Tidak Setuju
                                                      </button>
                                                      <button
                                                          className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                          type="button"
                                                          onClick={() => updateStatus(selectedId)}
                                                      >
                                                          Setujui
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                              </>
                                                )}
                            </td>
                            </tr>
                            );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GenerateJumat;
