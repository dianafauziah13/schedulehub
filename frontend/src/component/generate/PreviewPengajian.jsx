import React, { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
  } from "tw-elements-react";

const ModalPreviewPengajian = () => {
    const [showModal, setShowModal] = useState(false);
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value='') => {
      if (value === basicActive) {
        return;
      }
      setBasicActive(value);
    };
        return (
            <>
              <button
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                type="button"
                onClick={() => setShowModal(true)}
              >
               Generate
              </button>
              {showModal ? (
                <>
                  <div className="flex w-[98%] ml-[80px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative  w-auto my-6 mx-auto max-w-6xl mt-24">
                          <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                            <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}

                            >
                            <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                            </button>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">      

    <div className="mb-3 ">
      <TETabs className="space-x-4">
        <TETabsItem
          onClick={() => handleBasicClick("tab1")}
          active={basicActive === "tab1"}
        >
          Mubaligh
        </TETabsItem>
        <TETabsItem
          onClick={() => handleBasicClick("tab2")}
          active={basicActive === "tab2"}
        >
          Pimpinan Jemaah
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
        <div className="flex items-start justify-between p-5 rounded-t">
            <h3 className="text-black text-xl font-semibold">Profile Mubaligh</h3>
        </div>
        <table className="text-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">No</th>
                <th scope="col" className="px-6 py-4">Nama</th>
                <th scope="col" className="px-6 py-4">Lingkup Dakwah</th>
                <th scope="col" className="px-6 py-4">Bidang Ilmu</th>
                <th scope="col" className="px-6 py-4">Ketersediaan Waktu</th>
                <th scope="col" className="px-6 py-4">Penugasan</th>
                </tr>
            </thead>
            <tbody>
            <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4">Mark</td>
                <td className="whitespace-nowrap px-6 py-4">Otto</td>
                <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                            <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                                            <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                            <td className="whitespace-nowrap px-6 py-4">Larry</td>
                                            <td className="whitespace-nowrap px-6 py-4">Wild</td>
                                            <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                                            </tr>
                                        </tbody>
                                        </table>
        </TETabsPane>
        <TETabsPane show={basicActive === "tab2"}>
        <div className="flex items-start justify-between p-5 rounded-t">
            <h3 className="text-black text-xl font-semibold">Profile Pimpinan Jemaah</h3>
        </div>
        <table className="text-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">No</th>
                <th scope="col" className="px-6 py-4">Nama Masjid</th>
                <th scope="col" className="px-6 py-4">Lingkup Dakwah</th>
                <th scope="col" className="px-6 py-4">Topik Kajian</th>
                <th scope="col" className="px-6 py-4">Waktu Pengajian Rutin</th>
                </tr>
            </thead>
            <tbody>
            <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4">Mark</td>
                <td className="whitespace-nowrap px-6 py-4">Otto</td>
                </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                            <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                                            </tr>
                                        
                                        </tbody>
                                        </table>
        </TETabsPane>
      </TETabsContent>
    </div>                        
                                    

                                    </div>
                                    </div>
                            
                                    <button
                                        type="button"
                                        className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Generate
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block rounded-full bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                
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
    
    export default ModalPreviewPengajian;