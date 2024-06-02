import React, { useState } from 'react';
import { FiAlertCircle } from "react-icons/fi";

const ModalDetailRekap = ({ no, nama, penugasan, tanggal, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="flex text-black-500 font-semibold"
        type="button"
        onClick={handleShowModal}
      >
        <FiAlertCircle  className="mr-2"/>
      </button>
    {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-2xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-2 border-gray-300 rounded-md shadow-md outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-xl font-semibold">Detail Informasi</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}

            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">No:</p>
              <p className="text-lg font-semibold">{no}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Nama:</p>
              <p className="text-lg font-semibold">{nama}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Penugasan:</p>
              <p className="text-lg font-semibold">{penugasan}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Tanggal:</p>
              <p className="text-lg font-semibold">{tanggal}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Rincian Penugasan</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pimpinan Jemaah
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Penugasan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Isi tabel sesuai dengan data yang diterima */}
                  {/* Contoh satu baris data */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{no}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nama Pimpinan Jemaah</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jumlah Penugasan</td>
                  </tr>
                  {/* Tambahkan baris data sesuai kebutuhan */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> 
    )}
    </div>
  );
};
export default ModalDetailRekap;
