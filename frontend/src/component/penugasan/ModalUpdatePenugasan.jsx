import React, { useState, useEffect } from "react";
import Select from "react-select";
import {FaRegEdit } from "react-icons/fa";

const ModalUpdatePenugasan = ({ initialValues, penugasan_id }) => {
    const [showModal, setShowModal] = useState(false);
    const [topikKajian, setTopikKajian] = useState(initialValues.TopikKajian);
    const [mubalighOptions, setMubalighOptions] = useState([]);
    const [PJOptions, setPJOptions] = useState([]);
    const [selectedMubalighKhutbahJumat, setSelectedMubalighKhutbahJumat] = useState(initialValues.selectedMubalighKhutbahJumat);
    const [selectedMubalighPengajian, setSelectedMubalighPengajian] = useState(initialValues.selectedMubalighPengajian);
    const [selectedPJ, setSelectedPJ] = useState(initialValues.pimpinan);
    const [tglAwal, setTglAwal] = useState(initialValues.tgl_awal.split('T')[0])
    const [tglAkhir, setTglAkhir] = useState(initialValues.tgl_akhir.split('T')[0])

    useEffect(() => {
        fetchMubalighJumat();
        fetchPimpinanJemaah();
      }, []);
    const closeModal = () => {
        setShowModal(false);
    };

    const updateData = async (id, data) => {
      console.log("update data",data )
        try {
          const response = await fetch(`http://localhost:3000/tempatpenugasan/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(
              {
                tgl_awal: data.tgl_awal,
                tgl_akhir: data.tgl_akhir,
                TopikKajian: data.TopikKajian,
                Penugasan: {
                  pimpinan: {
                    _id: selectedPJ
                  },
                  mubaligh_khutbah_jumat: selectedMubalighKhutbahJumat.map(option => ({ _id: option.value })),
                  mubaligh_khutbah_pengajian: selectedMubalighPengajian.map(option => ({ _id: option.value }))
                }
              }
            )
          });

          if (response.ok) {
            console.log("Data successfully updated!");
            return await response.json();
          } else {
            console.error("Failed to update data");
          }
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };

      const fetchMubalighJumat = async () => {
        try {
          const response = await fetch("http://localhost:3000/mubaligh/");
          const mubalighData = await response.json();
          console.log(mubalighData);
    
          const mubalighList = mubalighData.map((mubaligh) => ({
            value: mubaligh._id,
            label: mubaligh.mubalighName,
          }));
    
          setMubalighOptions(mubalighList);
        } catch (error) {
          console.error("Error fetching mubaligh:", error);
        }
      };
    
      const fetchPimpinanJemaah = async () => {
        try {
          const response = await fetch("http://localhost:3000/pimpinanjemaah/");
          const PJData = await response.json();
          console.log(PJData);
    
          const PJList = PJData.map((pj) => ({
            value: pj._id,
            label: pj.Nama,
          }));
    
          setPJOptions(PJList);
        } catch (error) {
          console.error("Error fetching pimpinan jemaah:", error);
        }
      };
    
      const handleUpdateClick = async () => {
        //   const formattedTglAwal = convertToISOFormat(tglAwal);
        //   const formattedTglAkhir = convertToISOFormat(tglAkhir);
        const data = {
          tgl_awal: tglAwal,
          tgl_akhir: tglAkhir,
          TopikKajian: topikKajian,
          Penugasan: {
            pimpinan: {
              _id: selectedPJ
            },
            mubaligh_khutbah_jumat: selectedMubalighKhutbahJumat.map(option => ({ _id: option })),
            mubaligh_khutbah_pengajian: selectedMubalighPengajian.map(option => ({ _id: option }))
          }
        };
        console.log("ini data", data);
        try {
          const response = await updateData(penugasan_id,data); // Using postData module to send data
          // closeModal(); // Tutup modal setelah penghapusan selesai.
          window.location.reload();
          console.log("Response from server:", response);
          // Handle response from server
        } catch (error) {
          console.error("Error posting data:", error);
          // Handle error if necessary
        }
      };
    
      const handleSelectChangeJumat = (selectedOptions) => {
          setSelectedMubalighKhutbahJumat(selectedOptions);
    
      };
  
      const handleSelectChangePengajian = (selectedOptions) => {
          setSelectedMubalighPengajian(selectedOptions);
    
      };
    
      const handlePJChange = (selectedOption) => {
        setSelectedPJ(selectedOption);
      };
    
      const handleTopikKajianChange = (event) => {
        setTopikKajian(event.target.value);
      };
    
      const handleTglAwalChange = (event) => {
        setTglAwal(event.target.value);
      };
    
      const handleTglAkhirChange = (event) => {
        setTglAkhir(event.target.value);
      };
      
    //   const convertToISOFormat = (dateStr) => {
    //       const [day, month, year] = dateStr.split('/');
    //       return `${year}-${month}-${day}`;
    //     };
  

return (
    <>
      <button
        className="flex font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FaRegEdit className="mr-2"/>
      </button>
      {showModal ? (
        <>
          <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                      <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                          <div className="flex items-start justify-between p-5 rounded-t">
                              <h3 className="text-black text-xl font-semibold">Tambah Penugasan</h3>
                           </div>
                               
                                <div className="relative px-6 flex-auto flex flex-wrap">
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Tanggal Awal
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        value={tglAwal}
                                        onChange={handleTglAwalChange}
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Tanggal Akhir
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        value={tglAkhir}
                                        onChange={handleTglAkhirChange}
                                    />
                                 </div>

                                    {/* Kolom Kiri */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Nama Pimpinan Jemaah
                                            </label>
                                            <Select
                                                required
                                                className=" appearance-none rounded w-full text-black"
                                                placeholder="Pilih Pimpinan Jemaah"
                                                options={PJOptions}
                                                value={PJOptions.find(p=> p.value == selectedPJ)}
                                                onChange={handlePJChange}
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Mubaligh Khutbah Jumat
                                            </label>
                                            <Select
                                                required
                                                className="appearance-none rounded w-full text-black"
                                                placeholder="Pilih Mubaligh"
                                                options={mubalighOptions}
                                                isMulti 
                                                defaultValue={mubalighOptions.filter(m=> selectedMubalighKhutbahJumat.includes(m.value))}
                                                onChange={handleSelectChangeJumat}
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Topik Kajian
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Contoh : Keesaan Allah SWT" 
                                            value={topikKajian}
                                            onChange={handleTopikKajianChange}
                                />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Mubaligh Pengajian Rutin 
                                            </label>
                                            <Select
                                                required
                                                className=" appearance-none rounded w-full text-black"
                                                placeholder="Pilih Mubaligh"
                                                options={mubalighOptions}
                                                isMulti
                                                defaultValue={mubalighOptions.filter(m=> selectedMubalighPengajian.includes(m.value))}
                                                onChange={handleSelectChangePengajian}
                                            />
                                        </form>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-6 rounded-b">
                                    <button
                                         className="text-white bg-[#FA8072] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Kembali
                                    </button>
                                    <button
                                        className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleUpdateClick}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
      ) : null}
    </>
  );
    
};

export default ModalUpdatePenugasan;