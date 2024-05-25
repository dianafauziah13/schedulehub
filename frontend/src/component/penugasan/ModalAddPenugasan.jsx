import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BiUserPlus } from "react-icons/bi";
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';

const ModalAddPenugasan = () => {
    const [showModal, setShowModal] = useState(false);
    const [topikKajian, setTopikKajian] = useState('');
    const [mubalighOptions, setMubalighOptions] = useState([]);
    const [PJOptions, setPJOptions] = useState([]);
    const [selectedMubalighKhutbahJumat, setSelectedMubalighKhutbahJumat] = useState([]);
    const [selectedMubalighPengajian, setSelectedMubalighPengajian] = useState([]);
    const [selectedPJ, setSelectedPJ] = useState(null);
    const [tglAwal, setTglAwal] = useState(new Date())
    const [tglAkhir, setTglAkhir] = useState(new Date())
  
    useEffect(() => {
      fetchMubalighJumat();
      fetchPimpinanJemaah();
    }, []);
  
    const closeModal = () => {
        setShowModal(false);
    };
    
    const postData = async (data) => {
      try {
        const response = await fetch("http://localhost:3000/tempatpenugasan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          console.log("Data successfully posted!");
          return await response.json();
        } else {
          console.error("Failed to post data");
        }
      } catch (error) {
        console.error("Error posting data:", error);
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
  
    const handleTambahClick = async () => {
        const formattedTglAwal = convertToISOFormat(tglAwal);
        const formattedTglAkhir = convertToISOFormat(tglAkhir);
      const data = {
        tgl_awal: formattedTglAwal,
        tgl_akhir: formattedTglAkhir,
        TopikKajian: topikKajian,
        Penugasan: {
          pimpinan: {
            _id: selectedPJ.value
          },
          mubaligh_khutbah_jumat: selectedMubalighKhutbahJumat.map(option => ({ _id: option.value })),
          mubaligh_khutbah_pengajian: selectedMubalighPengajian.map(option => ({ _id: option.value }))
        }
      };
      console.log("ini data", data);
      try {
        const response = await postData(data); // Using postData module to send data
        closeModal(); // Tutup modal setelah penghapusan selesai.
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
    
    const convertToISOFormat = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
      };

    return (
        <>
          <button
            className="flex font-semibold"
            type="button"
            onClick={() => setShowModal(true)}
          >
           <BiUserPlus className="h-6 w-7 mr-1 text-center"/> Tambah Tempat Penugasan
          </button>
          {showModal ? (
            <>
              <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                      <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                          <div className="flex items-start justify-between p-5 rounded-t">
                              <h3 className="text-black text-xl font-semibold">Tambah Penugasan</h3>
                           </div>
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
                                <div className="relative px-6 flex-auto flex flex-wrap">
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
                                                value={selectedPJ}
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
                                                value={selectedMubalighKhutbahJumat}
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
                                                value={selectedMubalighPengajian}
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
                                        onClick={handleTambahClick}
                                    >
                                        Tambah
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

export default ModalAddPenugasan;