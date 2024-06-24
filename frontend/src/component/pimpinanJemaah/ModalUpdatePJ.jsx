import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { MdOutlineMosque } from "react-icons/md";
import {FaRegEdit } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button, Modal } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalUpdatePJ = ({  idPJ, initialValues }) => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [namaPJ, setNamaPJ] = useState(initialValues.NamaPJ);
    const [mubalighOptions, setMubalighOptions] = useState([]);
    const [LingkupOptions, setLingkupOptions] = useState([]);
    const [selectedMubaligh, setSelectedMubaligh] = useState(initialValues.idKetua);
    const [selectedNumbers, setSelectedNumbers] = useState(initialValues.scopedakwahpengajian.Minggu_ke);
    const [selectedDays, setSelectedDays] = useState(initialValues.scopedakwahpengajian.hari);
    const [selectedTimes, setSelectedTimes] = useState(initialValues.scopedakwahpengajian.detailWaktu);
    const [selectedLingkup1, setSelectedLingkup1] = useState(initialValues.scopedakwahjumat.find(m=>m.minggu_ke == 1));
    const [lingkupDakwah, setLingkupDakwah] = useState([])
    const [selectedLingkup2, setSelectedLingkup2] = useState(initialValues.scopedakwahjumat.find(m=>m.minggu_ke == 2));
    const [selectedLingkup3, setSelectedLingkup3] = useState(initialValues.scopedakwahjumat.find(m=>m.minggu_ke == 3));
    const [selectedLingkup4, setSelectedLingkup4] = useState(initialValues.scopedakwahjumat.find(m=>m.minggu_ke == 4));
    const [selectedLingkup5, setSelectedLingkup5] = useState(initialValues.scopedakwahjumat.find(m=>m.minggu_ke == 5));
    const [KeahlianOptions, setKeahlianOptions] = useState([]);
    const [keahlianInputs, setKeahlianInputs] = useState([{ keahlian: null, minimal: '' }]);
    
    const toast = useRef(null);

    useEffect(() => {
        fetchMubalighJumat();
        fetchLingkupDakwah();
        fetchKnowladge();
      }, []);
    
      const closeModal = () => {
        setShowModal(false);
    };
    
    const fetchMubalighJumat = async () => {
        try {
          const response = await fetch("http://localhost:3000/mubaligh/");
          const mubalighData = await response.json();
        //   console.log(mubalighData);
    
          const mubalighList = mubalighData.map((mubaligh) => ({
            value: mubaligh._id,
            label: mubaligh.mubalighName,
          }));
    
          setMubalighOptions(mubalighList);
        } catch (error) {
          console.error("Error fetching mubaligh:", error);
        }
      };
    
      const fetchLingkupDakwah = async () => {
        try {
          const response = await fetch("http://localhost:3000/scope-dakwah/");
          const lingkupDakwah = await response.json();
        //   console.log(lingkupDakwah);
    
          const LingkupList = lingkupDakwah.map((lingkup) => ({
            value: lingkup._id,
            label: lingkup.LingkupDakwah,
          }));
          
          setLingkupOptions(LingkupList);
          setLingkupDakwah(lingkupDakwah);
        } catch (error) {
          console.error("Error fetching mubaligh:", error);
        }
      };
    
      const fetchKnowladge = async () => {
        try {
          const response = await fetch("http://localhost:3000/keahlian");
          const keahlian = await response.json();
        //   console.log("ini keahlian", keahlian)
    
          const keahlianList = keahlian.map((keahlian) => ({
            value: keahlian._id,
            label: keahlian.NamaKeahlian,
          }));
    
          setKeahlianOptions(keahlianList);
        } catch (error) {
          console.error("Error fetching keahlian:", error);
        }
      };

      const updateData = async (id,data) => {
        try {
          // console.log(data)
          // console.log(selectedLingkup1)
          // return;
          const response = await fetch(`http://localhost:3000/pimpinanjemaah/${id}`, {
            method: "PUT",
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

      const handleEditClick = async () => {
        const scope_dakwah_pengajian = {
            Keahlian: keahlianInputs
              .filter(input => input.keahlian && input.minimal)
              .map(input => ({
                idKeahlian: input.keahlian.value,
                nama: input.keahlian.label,
                MinimalKeahlian: input.minimal.value
              })),
            Minggu_ke: selectedNumbers,
            hari: selectedDays,
            detailWaktu: selectedTimes,
          };
    
        const data = {
            idKetuaPJ: selectedMubaligh,
            Nama: namaPJ,
            scope_dakwah_jumat: [
                {
                    Nama: lingkupDakwah.find(l=> l._id == selectedLingkup1._id).LingkupDakwah,
                    minggu_ke: 1,
                    _id: selectedLingkup1._id
                },
                {
                    Nama: lingkupDakwah.find(l=> l._id == selectedLingkup2._id).LingkupDakwah,               
                    minggu_ke: 2,
                    _id: selectedLingkup2._id
                },
                {
                    Nama: lingkupDakwah.find(l=> l._id == selectedLingkup3._id).LingkupDakwah,
                    minggu_ke: 3,
                    _id: selectedLingkup3._id
                },
                {
                    Nama: lingkupDakwah.find(l=> l._id == selectedLingkup4._id).LingkupDakwah,
                    minggu_ke: 4,
                    _id: selectedLingkup4._id
                },
                {
                    Nama: lingkupDakwah.find(l=> l._id == selectedLingkup5._id).LingkupDakwah,
                    minggu_ke: 5,
                    _id: selectedLingkup5._id
                },
            ],
            scope_dakwah_pengajian,
        }
    
        console.log("ini data", data);
        try {
            const response = await updateData(idPJ, data); // Using postData module to send data
            closeModal(); // Tutup modal setelah penghapusan selesai.
            setShowConfirmationModal(false);
            window.location.reload();
            console.log("Response from server:", response);
            toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Pimpinan Jemaah berhasil diperbarui', life: 3000 });
            } catch (error) {
                console.error("Error posting data:", error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal Memperbarui Pimpinan Jemaah: ${error.message}`, life: 3000 });
            // Handle error if necessary
        }
    };

      const days = [
        { value: "Minggu", label: "Minggu"},
        { value: "Senin", label: "Senin" },
        { value: "Selasa", label: "Selasa" },
        { value: "Rabu", label: "Rabu" },
        { value: "Kamis", label: "Kamis" },
        { value: "Jumat", label: "Jumat" },
        { value: "Sabtu", label: "Sabtu" }
    ];

    const timesOfDay = [
        { value: 'morning', label: 'Pagi' },
        { value: 'afternoon', label: 'Siang' },
        { value: 'evening', label: 'Sore' },
        { value: 'night', label: 'Malam' }
    ];

    const minimalOptions = [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
      { value: 5, label: 5 }
  ];

    const numberOptions = Array.from({ length: 5 }, (_, i) => ({
        value: i + 1,
        label: i + 1
    }));

    const handlenamePJChange = (event) => {
        setNamaPJ(event.target.value);
      };

    const handleSelectNumberChange = (selectedOption) => {
        setSelectedNumbers(selectedOption.value)
    };
  
  const handleMubalighChange = (selectedOption) => {
    setSelectedMubaligh(selectedOption.value);
    console.log("select", selectedMubaligh);
  };

  const handleDayChange = (selectedOptions)=>{
    setSelectedDays(selectedOptions.value)
  }

  const handleHapusKeahlian = (index) => {
    const newKeahlianInputs = [...keahlianInputs];
    newKeahlianInputs.splice(index, 1);
    setKeahlianInputs(newKeahlianInputs);
};

  const handleTimeChange = (selectedOptions)=>{
    setSelectedTimes(selectedOptions.label)
  }
  
  const handleLingkupChange1 = (selectedOption)=>{
    setSelectedLingkup1(lingkupDakwah.find(a=> a._id == selectedOption.value))
  }

  const handleLingkupChange2 = (selectedOption)=>{
    console.log(selectedOption)
    setSelectedLingkup2(lingkupDakwah.find(a=> a._id == selectedOption.value))
  }

  const handleLingkupChange3 = (selectedOption)=>{
    setSelectedLingkup3(lingkupDakwah.find(a=> a._id == selectedOption.value))
  }

  const handleLingkupChange4 = (selectedOption)=>{
    setSelectedLingkup4(lingkupDakwah.find(a=> a._id == selectedOption.value))
  }

  const handleLingkupChange5 = (selectedOption)=>{
    setSelectedLingkup5(lingkupDakwah.find(a=> a._id == selectedOption.value))
  }

// Handle change for keahlian and minimal inputs
  const handleKeahlianChange = (index, selectedOption) => {
    const newKeahlianInputs = [...keahlianInputs];
    newKeahlianInputs[index].keahlian = selectedOption;
    setKeahlianInputs(newKeahlianInputs);
  };

  const handleMinimalChange = (index, selectedOption) => {
    const newKeahlianInputs = [...keahlianInputs];
    newKeahlianInputs[index].minimal = selectedOption;
    setKeahlianInputs(newKeahlianInputs);
  };

  const handleTambahKeahlian = () => {
    setKeahlianInputs([...keahlianInputs, { keahlian: null, minimal: '' }]);
  };

  const handleConfirmReject = () => {
    setShowConfirmationModal(false)
    toast.current?.show({ severity: 'info', summary: 'Dibatalkan', detail: 'Berhasil membatalkan perbarui pimpinan jemaah', life: 3000 });
};

const handleConfirmAccept = () => {
    setShowConfirmationModal(true);
};
    
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
                  <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-[#F4F4F4] outline-none focus:outline-none px-10 font-montserrat">
                      <div className="flex items-start justify-between p-5 rounded-t">
                          <h3 className="text-black text-xl font-semibold">Perbarui Pimpinan Jemaah</h3>
                       </div>
                            <div className="relative px-6 flex-auto flex flex-wrap overflow-y-auto max-h-[calc(100vh-200px)] scrollable-content">
                                {/* Kolom Kiri */}
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Nama Pimpinan Jemaah
                                    </label>
                                    <input
                                        required
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Masukan Nama Pimpinan Jemaah" 
                                        value={namaPJ}
                                        onChange={handlenamePJChange}    
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Ketua Pimpinan Jemaah
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Ketua Pimpinan Jemaah"
                                            options={mubalighOptions}
                                            defaultValue={mubalighOptions.find(m=> m.value == initialValues.idKetua)}
                                            onChange={handleMubalighChange}
                                        />
                                    </form>
                                </div>
                                
                                <div className="w-full px-4 mb-2">
                                    <p className="text-center text-black text-lg font-bold mt-4 mb-2">
                                        Requirement Khutbah Jumat
                                    </p>
                                </div>
                                
                                {/* Kolom Kanan */}
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu Ke-1 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Lingkup Dakwah"
                                            options={LingkupOptions}
                                            defaultValue={LingkupOptions.find(s=> s.value == initialValues.scopedakwahjumat.find(m=> m.minggu_ke == 1)._id)}
                                            onChange={handleLingkupChange1}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu Ke-2 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Lingkup Dakwah"
                                            options={LingkupOptions}
                                            defaultValue={LingkupOptions.find(s=> s.value == initialValues.scopedakwahjumat.find(m=> m.minggu_ke == 2)._id)}
                                            onChange={handleLingkupChange2}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu Ke-3 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Lingkup Dakwah"
                                            options={LingkupOptions}
                                            defaultValue={LingkupOptions.find(s=> s.value == initialValues.scopedakwahjumat.find(m=> m.minggu_ke == 3)._id)}
                                            onChange={handleLingkupChange3}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu Ke-4 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Lingkup Dakwah"
                                            options={LingkupOptions}
                                            defaultValue={LingkupOptions.find(s=> s.value == initialValues.scopedakwahjumat.find(m=> m.minggu_ke == 4)._id)}
                                            onChange={handleLingkupChange4}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu Ke-5 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Lingkup Dakwah"
                                            options={LingkupOptions}
                                            defaultValue={LingkupOptions.find(s=> s.value == initialValues.scopedakwahjumat.find(m=> m.minggu_ke == 5)._id)}
                                            onChange={handleLingkupChange5}
                                        />
                                    </form>
                                </div>
                                <div className="w-full px-4 mb-3">
                                    <p className="text-center text-black text-lg font-bold mt-4 mb-3">
                                        Requirement Khutbah Pengajian Rutin
                                    </p>
                                </div>
                                <div className="w-full px-3 mb-2">
                                    <p className="text-left text-black text-sm font-bold mt-4 mb-2">
                                        Waktu Pelaksanaan Pengajian Rutin
                                    </p>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Minggu-Ke 
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Minggu-ke"
                                            options={numberOptions}
                                            defaultValue={numberOptions.find(a=> a.value == selectedNumbers)}
                                            onChange={handleSelectNumberChange}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Hari
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Hari"
                                            options={days}
                                            value={days.find(d=> d.label == selectedDays)}
                                            onChange={handleDayChange}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Detail Waktu
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Detail Waktu"
                                            options={timesOfDay}
                                            value={timesOfDay.find(t=> t.label == selectedTimes)}
                                            onChange={handleTimeChange}
                                        />
                                    </form>
                                </div>
                                <div className="w-full px-3 mb-2">
                                    <p className="text-left text-black text-sm font-bold mt-4 mb-2">
                                        Bidang Keahlian
                                    </p>
                                </div>
                                <div className="flex flex-wrap">
                                {keahlianInputs.map((input, index) => (
                                <>
                                <React.Fragment key={index}>
                                <div  className="w-full lg:w-1/2 px-4 mb-4" >
                                    <form className="rounded w-full">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Nama Keahlian
                                        </label>
                                        <Select
                                            required
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Pilih Keahlian"
                                            options={KeahlianOptions}
                                            value={input.keahlian}
                                            onChange={(selectedOption) => handleKeahlianChange(index, selectedOption)}
                                        />
                                    </form>
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Minimal Keahlian
                                    </label>
                                    <div className="flex items-center">
                                    <input
                                        required
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Masukan Minimal Keahlian" 
                                        value={input.minimal}
                                        options ={minimalOptions}
                                        onChange={(event) => handleMinimalChange(index, event)}
                                    />
                                    <button
                                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleHapusKeahlian(index)}
                                        >
                                        Hapus
                                    </button>
                                    </div>
                                </div>
                                </React.Fragment>
                                </> 
                                
                                 ))}
                                      <div className="w-full px-4 mb-4">
                                            <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleTambahKeahlian}
                                            >
                                            Tambah Keahlian
                                            </button>
                                        </div>
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
                                    onClick={handleConfirmAccept}
                                >
                                    Perbarui
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
      ) : null}
       {/* Modal Konfirmasi */}
       <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Pesan Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin memperbarui Pimpinan Jemaah ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmReject}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleEditClick}>
                        Ya, perbarui
                    </Button>
                </Modal.Footer>
            </Modal>
            <ConfirmDialog />
            <Toast ref={toast} />
    </>
  );
};

export default ModalUpdatePJ;
