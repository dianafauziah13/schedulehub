import './App.css';
import Login from './pages/login';
import SideBar from './component/sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import KelolaAkun from './pages/kelolaAkun';
import JadwalJumat from './pages/JadwalJumat';
import KelolaPimpinanJemaah from './pages/KelolaPimpinanJemaah';
import GeneratePengajian from './pages/GeneratePengajian';
import ValidasiJumat from './pages/ValidasiJumat';
import KelolaMubaligh from './pages/kelolaMubaligh';
import RekapMubaligh from './pages/rekapMubaligh';


function App() {
  const isLoggedIn = true; 
  return (    
      <Router>
        <Routes>
          {/* Rute untuk halaman login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rute untuk halaman dashboard */}
          <Route
            path="/dashboard/*"
            element={
              isLoggedIn ? (
                <div className="App">
                  <div className='AppGlass'>
                    <SideBar />
                    <Routes>
                      <Route path="/Accounts" element={<KelolaAkun />} />
                      <Route path="/JadwalJumat" element={<JadwalJumat />} />
                      <Route path="/PimpinanJemaah" element={<KelolaPimpinanJemaah />} />
                      <Route path="/mubaligh" element={<KelolaMubaligh />} />
                      <Route path="/rekapMubaligh" element={<RekapMubaligh/>} />
                      <Route path="/jadwal/pengajian" element={<GeneratePengajian />} />
                      <Route path="/Validate/jumat" element={<ValidasiJumat />} />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
