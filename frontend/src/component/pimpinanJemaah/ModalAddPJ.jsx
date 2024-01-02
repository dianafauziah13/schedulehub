import React, { useState } from "react";
import Select from "react-select";
import { MdOutlineMosque } from "react-icons/md";


const ModalAddPJ = () => {
const [showModal, setShowModal] = useState(false);
    return (
        <>
          <button
            className="flex font-semibold"
            type="button"
            onClick={() => setShowModal(true)}
          >
           <MdOutlineMosque className="h-7 w-7 mr-1"/> Tambah Pimpinan Jemaah
          </button>
          {showModal ? (
            <>
              <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                      <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                          <div className="flex items-start justify-between p-5 rounded-t">
                              <h3 className="text-black text-xl font-semibold">Tambah Pimpinan Jemaah</h3>
                           </div>
                                <div className="relative px-6 flex-auto flex flex-wrap">
                                    {/* Kolom Kiri */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Name
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Masukan Nama" />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Username
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Username" />
                                    </div>

                                    {/* Kolom Kanan */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                                Role 
                                            </label>
                                            <Select
                                                required
                                                className=" appearance-none rounded w-full text-black"
                                                placeholder="Select role"
                                            />
                                        </form>
                                    </div>
                   
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Password
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Password"
                                        />
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

export default ModalAddPJ;