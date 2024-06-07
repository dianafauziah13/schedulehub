import React, { useState, useEffect } from "react";
import Select from "react-select";
import {FaRegEdit } from "react-icons/fa";

const ModalUpdateMubaligh = ({idMubaligh, initialValues}) => {
    const [showModal, setShowModal] = useState(false);
    const [namaMubaligh, setNamaMubaligh] = useState(initialValues.NamaMubaligh);
    const [mubalighOptions, setMubalighOptions] = useState([])
    const [lingkupDakwah, setLingkupDakwah] = useState([])
    const [scopeOptions, setScopeOptions] = useState([])
    const [selectedLingkup, setSelectedLingkup] = useState(initialValues.LingkupDakwah);
    const [selectedWaktuJumat, setSelectedWaktuJumat] = useState(initialValues.AvailableKhutbahJumat)
    const [selectedWaktuPengajian, setSelectedWaktuPengajian] = useState(initialValues.AvailablePengajianRutin)
    const [selectedHariPengajian, setSelectedHariPengajian] = useState(initialValues.hari)
    const [KeahlianOptions, setKeahlianOptions] = useState([]);
    const [keahlianInputs, setKeahlianInputs] = useState(initialValues.keahlian);

    
    useEffect(() => {
        fetchScopeOptions();
        fetchKeahlianOptions()
      }, []);

    

    const closeModal = () => {
        setShowModal(false);
    };
    
    const updateMubaligh = async (id,data) => {
        try {
          // console.log(data)
          // console.log(selectedLingkup1)
          // return;
          const response = await fetch(`http://localhost:3000/mubaligh/${id}`, {
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

    const fetchScopeOptions = async () => {
        try {
          const response = await fetch("http://localhost:3000/scope-dakwah");
          const scopeDakwahData = await response.json();
          console.log(scopeDakwahData);
    
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
          console.log(keahlianData);
    
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
    const handleEditClick = async () => {
        const data = {
            idScopeDakwah: selectedLingkup.value,
            mubalighName: namaMubaligh,
            scope_dakwah: selectedLingkup.label,
            AvailableKhutbahJumat: selectedWaktuJumat.value,
            AvailablePengajianRutin: {
                // Minggu_ke: selectedWaktuPengajian.value,
                // Hari: selectedHariPengajian.value
                Minggu_ke : waktuOptions.filter(option => selectedWaktuJumat.includes(option.value)),
                Hari : hariOptions.filter(option => selectedHariPengajian.includes(option.value))
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
            const response = await updateMubaligh(idMubaligh, data);
            closeModal();
            window.location.reload();
            console.log("Response from server:", response);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };
    
  
    const handleLingkupChange = (selectedOption) => {
      setSelectedLingkup(selectedOption.label);
    };
    const handleWaktuChangeJumat = (selectedOptions) => {
        setSelectedWaktuJumat(selectedOptions.map(a=> a.value));
    };
    const handleWaktuChangePengajian = (selectedOptions) => {
        setSelectedWaktuPengajian(selectedOptions.map(b=>b.value));
    };
    const handleHariChange = (selectedOptions) => {
        setSelectedHariPengajian(selectedOptions.map(c=>c.value));
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
                              <h3 className="text-black text-xl font-semibold">Edit Mubaligh</h3>
                           </div>
                           <div className="relative px-6 flex-auto flex flex-wrap overflow-y-auto max-h-[calc(100vh-200px)] scrollable-content">
                                    {/* Kolom Kiri */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Nama Mubaligh
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Nama mubaligh" 
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
                                                placeholder="Lingkup Dakwah"
                                                options={scopeOptions}
                                                defaultValue={scopeOptions.find(l=>l.label == initialValues.LingkupDakwah)}
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
                                                placeholder="Ketersediaan Waktu"
                                                options={waktuOptions}
                                                defaultValue={waktuOptions.filter(wj=> selectedWaktuJumat.includes(wj.value))}
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
                                                placeholder="Ketersediaan Hari"
                                                options={hariOptions}
                                                defaultValue={hariOptions.filter(h => selectedHariPengajian.includes(h.value))}
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
                                                placeholder="Ketersediaan Waktu"
                                                options={waktuOptions}
                                                defaultValue={waktuOptions.filter(wp=> selectedWaktuPengajian.includes(wp.value))}
                                                
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
                                                        placeholder="Keahlian"
                                                        options={KeahlianOptions}
                                                        defaultValue={input.keahlian}
                                                        onChange={(selectedOption) => handleKeahlianChange(index, selectedOption)}
                                                    />
                                                </form>
                                            </div>
                                            <div className="w-full lg:w-1/2 px-4 mb-4">
                                                <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                    Rating Keahlian
                                                </label>
                                                <input
                                                    required
                                                    className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                                    placeholder="Minimal Keahlian"
                                                    value={input.minimal}
                                                    onChange={(event) => handleMinimalChange(index, event)}
                                                />
                                            </div>
                                            <div className="w-full px-4 mb-4 flex justify-center space-x-4">
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleHapusKeahlian(index)}
                                                >
                                                    Hapus Keahlian
                                                </button>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handleTambahKeahlian}
                                                >
                                                    Tambah Keahlian
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </>
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
                                        onClick={handleEditClick}
                                    >
                                        Tambah
                                    </button>
                                    {/* <button
                                        className="text-white bg-[#1026cd] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                        type="button"
                                        onClick={handleAddKeahlian}
                                    
                                    >
                                        Tambah List Keahlian
                                    </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
          ) : null}
        </>
      );
    
};

export default ModalUpdateMubaligh;