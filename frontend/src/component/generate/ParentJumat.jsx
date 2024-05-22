import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenerateJumat from '../../pages/GenerateJumat';

const ParentJumat = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/mubaligh');
                setData(response.data);
                console.log('Data berhasil diambil:', response.data);
            } catch (error) {
                console.error('Terjadi kesalahan saat mengambil data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Jadwal Khutbah Jum'at</h1>
            {data ? <GenerateJumat data={data.Jadwal} /> : <p>Memuat data...</p>}
        </div>
    );
};

export default ParentJumat;
