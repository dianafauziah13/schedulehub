import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiUserPlus } from "react-icons/bi";
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { FiAlertCircle } from "react-icons/fi";

const ModalAddPenugasan = () => {
    const [showModal, setShowModal] = useState(false);
    const [topikKajian, setTopikKajian] = useState('');
    const [mubalighJumatOptions, setMubalighJumatOptions] = useState([]);
    const [mubalighPengajianOptions, setMubalighPengajianOptions] = useState([]);
    const [PJOptions, setPJOptions] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState([]);
    const [selectedMubalighKhutbahJumat, setSelectedMubalighKhutbahJumat] = useState([]);
    const [selectedMubalighPengajian, setSelectedMubalighPengajian] = useState([]);
    const [selectedPJ, setSelectedPJ] = useState(null);
    const [tglAwal, setTglAwal] = useState(null)
    const [tglAkhir, setTglAkhir] = useState(null)
    const [data, setData] = useState([])
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
  
    const toast = useRef(null);

    useEffect(() => {
      fetchMubalighJumat();
      fetchMubalighPengajian();
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
        const mubalighDataJumat = await response.json();
        console.log(mubalighDataJumat);
  
        const mubalighListJumat = mubalighDataJumat.map((mubaligh) => ({
          value: mubaligh._id,
          label: mubaligh.mubalighName,
        }));
  
        setMubalighJumatOptions(mubalighListJumat);
      } catch (error) {
        console.error("Error fetching mubaligh:", error);
      }
    };

    const fetchMubalighPengajian = async () => {
      try {
        const response = await fetch("http://localhost:3000/mubaligh/");
        const mubalighDataPengajian = await response.json();
        console.log(mubalighDataPengajian);
        
        const filteredMubaligh = mubalighDataPengajian.filter(mubaligh => mubaligh.scope_dakwah === "Cabang");
        const mubalighListPengajian = filteredMubaligh.map((mubaligh) => ({
          value: mubaligh._id,
          label: mubaligh.mubalighName,
        }));
  
        setMubalighPengajianOptions(mubalighListPengajian);
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
  
    const handleTambahClick = async (event) => {
      event.preventDefault();
      if (!selectedPJ || selectedMubalighKhutbahJumat.length == 0 || !tglAwal || !tglAkhir ) {
        toast.current?.show({ severity: 'error', summary: 'Gagal Menambahkan penugasan', detail: `Pastikan input benar`, life: 3000 });
        return; // Stop form submission
      }
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
        toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Penugasan berhasil ditambahkan', life: 3000 });
      } catch (error) {
        console.error("Error posting data:", error);
        toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal menambahkan penugasan: ${error.message}`, life: 3000 });
        // Handle error if necessary
      }
    };

    const fetchDataByID = async(selectedId)=>{
      try{
          const response = await fetch(`http://localhost:3000/mubaligh/${selectedId}`)
          const mubaligh = await response.json()
          let tampilProfil = [];

      let profilMubaligh = {
          "NamaMubaligh": mubaligh.mubalighName,
          "LingkupDakwah": mubaligh.scope_dakwah,
          "AvailableJumat": mubaligh.AvailableKhutbahJumat.toString(),
          "AvailablePengajianMinggu": mubaligh.AvailablePengajianRutin.Minggu_ke.toString(),
          "AvailablePengajianHari": mubaligh.AvailablePengajianRutin.Hari.toString(),
          "Keahlian": []
      };

      mubaligh.ListKeahlian.forEach(keahlian => {
          profilMubaligh.Keahlian.push({
              "NamaKeahlian": keahlian.nama,
              "RatingKeahlian": keahlian.Rating
          });
      });
      tampilProfil.push(profilMubaligh); 
          // console.log(tampilProfil)
          setData(tampilProfil)

      } catch (error) {
          console.log(error)
      }
    }
  
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
      console.log("waktu", dateStr)
        let date = new Date();
        if (dateStr) date = dateStr;
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
      };
    
    const handleDetail = (selectedOption) => {
        setSelectedDetail(selectedOption);
        
    };

    const openDetail = (id) => {
      fetchDataByID(id)
      setIsDetailOpen(true);
      console.log(data)
  }
  

    const closeDetail = () => {
      setIsDetailOpen(false);
  }

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
                                                options={mubalighJumatOptions}
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
                                                options={mubalighPengajianOptions}
                                                isMulti
                                                value={selectedMubalighPengajian}
                                                onChange={handleSelectChangePengajian}
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Detail
                                            </label>
                                            <div className="flex items-center">
                                                <Select
                                                    required
                                                    className="appearance-none rounded w-full text-black"
                                                    placeholder="Pilih Mubaligh"
                                                    options={mubalighJumatOptions}
                                                    value={selectedDetail}
                                                    onChange={handleDetail}
                                                />
                                                <button type="button" className="text-black ml-2" onClick={() => openDetail(selectedDetail.value)}>
                                                <FiAlertCircle className="mr-2 text-2xl" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* // Coba-coba */}
                                        {isDetailOpen && (
                                        <>
                                        <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                                                <div className="border-0 rounded-lg shadow relative flex flex-col w-full text-black bg-white outline-none focus:outline-none px-10 font-montserrat">
                                                    <div className="flex items-start justify-between p-5 rounded-t">
                                                        <h3 className='text-[20px] font-montserrat mb-5 font-bold'>Requirement Mubaligh</h3>
                                                    </div>
                                                    <div className="w-full">
                                                        {data.map((val, i) => (
                                                            <>
                                                        <div className="mb-4">
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Nama Mubaligh</span>
                                                                <span className="w-2/3">{val.NamaMubaligh}</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Lingkup Dakwah</span>
                                                                <span className="w-2/3">{val.LingkupDakwah}</span>
                                                            </div>
                                                            
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">=================== Khutbah Pengajian Rutin ===================</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Ketersediaan Waktu</span>
                                                                <span className="w-2/3">Minggu-ke {val.AvailablePengajianMinggu}</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-7">
                                                                <span className="w-2/3">Detail Hari</span>
                                                                <span className="w-2/3">Hari {val.AvailablePengajianHari}</span>
                                                            </div>
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">======================= Khutbah Jumat ======================</span>
                                                            </div>
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Ketersediaan Waktu </span>
                                                                <span className="w-2/3">Minggu-ke {val.AvailableJumat}</span>
                                                            </div>
                                                            <div className="text-[15px] font-montserrat mb-2">
                                                                <span className="w-1/3 font-bold">=================== List Keahlian ===================</span>
                                                            </div>
                                                            {val.Keahlian.map((val2, i) => (
                                                            <div className="flex text-[15px] font-montserrat mb-2">
                                                                <span className="w-2/3">Nama Keahlian: </span>
                                                                <span className="w-2/3">{val2.NamaKeahlian}</span>
                                                                <span className="w-2/3">Rating Keahlian: </span>
                                                                <span className="w-2/3">{val2.RatingKeahlian}</span>
                                                            </div>
                                                        ))}

                                                        </div>
                                                            </>
                                                        ))} 
                                                        </div>
                                                        <div className="flex items-center justify-between p-6 rounded-b">
                                                            <button
                                                                className="text-black bg-[#F4F4F4] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                                type="button"
                                                                onClick={closeDetail}
                                                            >
                                                                Kembali
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            )}
                                    {/* // Batas coba-coba */}
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
          <ConfirmDialog />
          <Toast ref={toast} />
        </>
      );
    
};

export default ModalAddPenugasan;