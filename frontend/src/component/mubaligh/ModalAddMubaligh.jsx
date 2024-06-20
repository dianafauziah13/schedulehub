import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiUserPlus } from "react-icons/bi";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button, Modal } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalAddMubaligh = () => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [namaMubaligh, setNamaMubaligh] = useState('');
    const [scopeOptions, setScopeOptions] = useState([]);
    const [selectedLingkup, setSelectedLingkup] = useState(null);
    const [selectedWaktuJumat, setSelectedWaktuJumat] = useState([])
    const [selectedWaktuPengajian, setSelectedWaktuPengajian] = useState([])
    const [selectedHariPengajian, setSelectedHariPengajian] = useState([])
    const [KeahlianOptions, setKeahlianOptions] = useState([]);
    const [keahlianInputs, setKeahlianInputs] = useState([{ keahlian: null, minimal: '' }]);

    const toast = useRef(null);
    
    useEffect(() => {
        fetchScopeOptions();
        fetchKeahlianOptions()
      }, []);

    

    const closeModal = () => {
        setShowModal(false);
    };
    
    const postData = async (data) => {
      try {
        const response = await fetch("http://localhost:3000/mubaligh", {
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
    }

    const fetchScopeOptions = async () => {
        try {
          const response = await fetch("http://localhost:3000/scope-dakwah");
          const scopeDakwahData = await response.json();
        //   console.log(scopeDakwahData);
    
          const scopeList = scopeDakwahData.map((scope) => ({
            value: scope._id,
            label: scope.LingkupDakwah,
          }));
    
          setScopeOptions(scopeList);
        } catch (error) {
          console.error("Error fetching scope dakwah:", error);
        }
      };

      const fetchKeahlianOptions = async () => {
        try {
          const response = await fetch("http://localhost:3000/keahlian");
          const keahlianData = await response.json();
        //   console.log(keahlianData);
    
          const keahlianList = keahlianData.map((keahlian) => ({
            value: keahlian._id,
            label: keahlian.NamaKeahlian,
          }));
          
          setKeahlianOptions(keahlianList);
        } catch (error) {
          console.error("Error fetching list keahlian:", error);
        }
      };

    const waktuOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
    ];
    const hariOptions = [
        { value: "Minggu", label: "Minggu"},
        { value: "Senin", label: "Senin" },
        { value: "Selasa", label: "Selasa" },
        { value: "Rabu", label: "Rabu" },
        { value: "Kamis", label: "Kamis" },
        { value: "Jumat", label: "Jumat" },
        { value: "Sabtu", label: "Sabtu" }
    ];
    const handleTambahClick = async (event) => {
        event.preventDefault();
        if (!namaMubaligh || !selectedLingkup) {
            toast.current?.show({ severity: 'error', summary: 'Gagal Menambahkan Mubaligh', detail: `Pastikan input data sudah benar`, life: 3000 });
          return; // Stop form submission
        }
        const data = {
            idScopeDakwah: selectedLingkup ? selectedLingkup.value : '',
            mubalighName: namaMubaligh,
            scope_dakwah: selectedLingkup ? selectedLingkup.label : '',
            AvailableKhutbahJumat: selectedWaktuJumat.map(option => option.value),
            AvailablePengajianRutin: {
                Minggu_ke: selectedWaktuPengajian.map(option => option.value),
                Hari: selectedHariPengajian.map(option => option.value)
            },
            ListKeahlian: keahlianInputs
            .filter(input => input.keahlian && input.minimal)
            .map(input => ({
                idListKeahlian: input.keahlian.value,
                nama: input.keahlian.label,
                Rating: input.minimal
            }))
        };
        console.log("ini data", data);
        try {
            const response = await postData(data);
            closeModal();
            setShowConfirmationModal(false);
            window.location.reload();
            // console.log("Response from server:", response);
            // Menampilkan pesan sukses
            toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Mubaligh berhasil ditambahkan', life: 3000 });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Gagal menambahkan Mubaligh: ${error.message}`, life: 3000 });
        }
    };
  
    const handleLingkupChange = (selectedOption) => {
      setSelectedLingkup(selectedOption);
    };
    const handleWaktuChangeJumat = (selectedOptions) => {
        setSelectedWaktuJumat(selectedOptions);
    };
    const handleWaktuChangePengajian = (selectedOptions) => {
        setSelectedWaktuPengajian(selectedOptions);
    };
    const handleHariChange = (selectedOptions) => {
        setSelectedHariPengajian(selectedOptions);
    }
    const handleNameChange = (event) => {
        setNamaMubaligh(event.target.value);
    };
    const handleKeahlianChange = (index, selectedOption) => {
        const newKeahlianInputs = [...keahlianInputs];
        newKeahlianInputs[index].keahlian = selectedOption;
        setKeahlianInputs(newKeahlianInputs);
    };
    
    const handleMinimalChange = (index, event) => {
    const newKeahlianInputs = [...keahlianInputs];
    const minimalValue = parseInt(event.target.value, 10); // Mengonversi input menjadi integer
        if (!isNaN(minimalValue)) {
          newKeahlianInputs[index].minimal = minimalValue;
        } else {
          newKeahlianInputs[index].minimal = '';
        }
        setKeahlianInputs(newKeahlianInputs);
    };
    
    const handleTambahKeahlian = () => {
        setKeahlianInputs([...keahlianInputs, { keahlian: null, minimal: '' }]);
    };

    const handleHapusKeahlian = (index) => {
        const newKeahlianInputs = [...keahlianInputs];
        newKeahlianInputs.splice(index, 1);
        setKeahlianInputs(newKeahlianInputs);
    };
    
    const handleConfirmReject = () => {
        setShowConfirmationModal(false)
        toast.current?.show({ severity: 'info', summary: 'Dibatalkan', detail: 'Berhasil membatalkan tambah mubaligh', life: 3000 });
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
           <BiUserPlus className="h-6 w-7 mr-1 text-center"/> Tambah Mubaligh
          </button>
          {showModal ? (
            <>
              <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                      <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                          <div className="flex items-start justify-between p-5 rounded-t">
                              <h3 className="text-black text-xl font-semibold">Tambah Mubaligh</h3>
                           </div>
                           <div className="flex-wrap relative px-6 flex-auto flex overflow-y-auto max-h-[calc(100vh-200px)] scrollable-content">
                                    {/* Kolom Kiri */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Nama Mubaligh
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Masukkan nama mubaligh" 
                                            value={namaMubaligh}
                                            onChange={handleNameChange}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Lingkup Dakwah
                                            </label>
                                            <Select
                                                required
                                                className="appearance-none rounded w-full text-black"
                                                placeholder="Pilih Lingkup Dakwah"
                                                options={scopeOptions}
                                                value={selectedLingkup}
                                                onChange={handleLingkupChange}
                                                
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Ketersediaan Waktu Jumat
                                            </label>
                                            <Select
                                                required
                                                isMulti
                                                className="appearance-none rounded w-full text-black"
                                                placeholder="Pilih Ketersediaan Waktu"
                                                options={waktuOptions}
                                                value={selectedWaktuJumat}
                                                onChange={handleWaktuChangeJumat}
                                                
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Detail Hari Ketersediaan
                                            </label>
                                            <Select
                                                required
                                                isMulti
                                                className="appearance-none rounded w-full text-black"
                                                placeholder="Pilih Ketersediaan Hari"
                                                options={hariOptions}
                                                value={selectedHariPengajian}
                                                onChange={handleHariChange}
                                               
                                            />
                                        </form>
                                    </div>


                                    {/* Kolom Kanan */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Ketersediaan Waktu Pengajian
                                            </label>
                                            <Select
                                                required
                                                isMulti
                                                className="appearance-none rounded w-full text-black"
                                                placeholder="Pilih Ketersediaan Waktu"
                                                options={waktuOptions}
                                                value={selectedWaktuPengajian}
                                                onChange={handleWaktuChangePengajian}
                                                
                                            />
                                            </form>
                                    </div>

                                    <div className="w-full px-3 mb-2">
                                        <p className="text-left text-black text-sm font-bold mt-4 mb-2">
                                            Bidang Keahlian
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap">
                                    <>
                                    {keahlianInputs.map((input, index) => (
                                        <React.Fragment key={index}>
                                            <div className="w-full lg:w-1/2 px-4 mb-4">
                                                <form className="rounded w-full">
                                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                        Nama Keahlian
                                                    </label>
                                                    <Select
                                                        required
                                                        className="appearance-none rounded w-full text-black"
                                                        placeholder="Pilih Keahlian"
                                                        options={KeahlianOptions}
                                                        value={input.keahlian}
                                                        onChange={(selectedOption) => handleKeahlianChange(index, selectedOption)}
                                                    />
                                                </form>
                                            </div>
                                            <div className="w-full lg:w-1/2 px-4 mb-4">
                                                <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                    Rating Keahlian
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        required
                                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                                        placeholder="Masukan Minimal Keahlian"
                                                        value={input.minimal}
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
                                    ))}
                                </>
                            </div>
                            <div className="w-full px-4 mb-4 flex justify-center space-x-4">
                                                {/* <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleHapusKeahlian(index)}
                                                >
                                                    Hapus Keahlian
                                                </button> */}
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handleTambahKeahlian}
                                                >
                                                    Tambah Keahlian
                                                </button>
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
                                    <div className="flex space-x-2">
                                    <button
                                        className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                        type="button"
                                        onClick={handleConfirmAccept}
                                    >
                                        Tambah
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

            {/* Modal Konfirmasi */}
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Pesan Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin menambahkan mubaligh ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmReject}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleTambahClick}>
                        Ya, Tambah
                    </Button>
                </Modal.Footer>
            </Modal>
            <ConfirmDialog />
            <Toast ref={toast} />
        </>
      );
    
};

export default ModalAddMubaligh;