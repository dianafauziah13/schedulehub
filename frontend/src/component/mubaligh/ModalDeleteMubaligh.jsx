import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const ModalDeleteMubaligh = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    return (
      <>
        <button
          className="flex text-black-500 font-semibold"
          type="button"
          onClick={() => setShowDeleteModal(true)}
        >
          <FaRegTrashAlt className="mr-2"/>
        </button>
  
        {showDeleteModal ? (
          <>
            <div className="flex items-center justify-center fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Hapus Mubaligh</h3>
                <p>Anda yakin ingin menghapus mubaligh ini?</p>
                <div className="flex justify-center mt-6">
                  <button
                    className="text-white bg-[#FA8072] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      // Tambahkan logika penghapusan mubaligh di sini
                      // Misalnya, panggil fungsi untuk menghapus mubaligh dari database
                      // dan setelah berhasil hapus, tutup modal
                      // Contoh:
                      // deleteMubaligh(); // Fungsi untuk menghapus mubaligh
                      // setShowDeleteModal(false);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75"></div>
          </>
        ) : null}
      </>
    );
  };

export default ModalDeleteMubaligh;