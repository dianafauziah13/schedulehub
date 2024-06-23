import './App.css';
import Login from './pages/login';
import SideBar from './component/sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import KelolaAkun from './pages/kelolaAkun';
import JadwalJumat from './pages/JadwalJumat';
import KelolaPimpinanJemaah from './pages/KelolaPimpinanJemaah';
import GeneratePengajian from './pages/GeneratePengajian';
import HasilGenerateJumat from './pages/HasilGenerateJumat';
import HasilGeneratePengajian from './pages/HasilGeneratePengajian';
import KelolaMubaligh from './pages/kelolaMubaligh';
import RekapMubaligh from './pages/rekapMubaligh';
import PenugasanMubaligh from './pages/PenugasanMubaligh';
import GenerateJumat from './pages/GenerateJumat';
import JadwalPengajian from './pages/JadwalPengajian';
import TampilHasilGenerate from './pages/TampilHasilGenerate';
import HistoryGenerateJumat from './pages/HistoryGenerateJumat';
import HistoryGeneratePengajian from './pages/HistoryGeneratePengajian';
import DetailMubaligh from './pages/detailMubaligh'

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
                      <Route path="/JadwalPengajian" element={<JadwalPengajian />} />
                      <Route path="/PimpinanJemaah" element={<KelolaPimpinanJemaah />} />
                      <Route path="/kelolaMubaligh" element={<KelolaMubaligh />} />
                      <Route path="/rekapMubaligh" element={<RekapMubaligh/>} />
                      <Route path="/penugasanMubaligh" element={<PenugasanMubaligh/>} />
                      <Route path="/jadwal/jumat" element={<GenerateJumat />} />
                      <Route path="/jadwal/pengajian" element={<GeneratePengajian />} />
                      <Route path="/hasil-generate/jumat" element={<HasilGenerateJumat />} />
                      <Route path="/hasil-generate/pengajian" element={<HasilGeneratePengajian />} />
                      <Route path="/history-generate/jumat" element={<HistoryGenerateJumat />} />
                      <Route path="/history-generate/pengajian" element={<HistoryGeneratePengajian />} />
                      <Route path="/tampilGenerate" element={<TampilHasilGenerate />} />
                      <Route path="/detailMubaligh" element={<DetailMubaligh />} />
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
// import './App.css';
// import Login from './pages/login';
// import SideBar from './component/sidebar/Sidebar';
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import KelolaAkun from './pages/kelolaAkun';
// import JadwalJumat from './pages/JadwalJumat';
// import KelolaPimpinanJemaah from './pages/KelolaPimpinanJemaah';
// import GeneratePengajian from './pages/GeneratePengajian';
// import HasilGenerateJumat from './pages/HasilGenerateJumat';
// import HasilGeneratePengajian from './pages/HasilGeneratePengajian';
// import KelolaMubaligh from './pages/kelolaMubaligh';
// import RekapMubaligh from './pages/rekapMubaligh';
// import PenugasanMubaligh from './pages/PenugasanMubaligh';
// import GenerateJumat from './pages/GenerateJumat';
// import JadwalPengajian from './pages/JadwalPengajian';
// import TampilHasilGenerate from './pages/TampilHasilGenerate';
// import ProtectedRoute from './pages/ProtectedRoute'; // import ProtectedRoute

// function App() {
//   const isLoggedIn = !!localStorage.getItem('token');

//   return (
//     <Router>
//       <Routes>
//         {/* Rute untuk halaman login */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />

//         {/* Rute untuk halaman dashboard */}
//         <Route
//           path="/dashboard/*"
//           element={
//             isLoggedIn ? (
//               <div className="App">
//                 <div className='AppGlass'>
//                   <SideBar />
//                   <Routes>
//                     <Route path="Accounts" element={<KelolaAkun />} />
//                     <Route path="JadwalJumat" element={<ProtectedRoute roles={['ketua', 'bidang-garapan']} element={<JadwalJumat />} />} />
//                     <Route path="JadwalPengajian" element={<ProtectedRoute roles={['ketua', 'bidang-garapan']} element={<JadwalPengajian />} />} />
//                     <Route path="PimpinanJemaah" element={<ProtectedRoute roles={['bidang-garapan']} element={<KelolaPimpinanJemaah />} />} />
//                     <Route path="kelolaMubaligh" element={<ProtectedRoute roles={['bidang-garapan']} element={<KelolaMubaligh />} />} />
//                     <Route path="rekapMubaligh" element={<ProtectedRoute roles={['bidang-garapan']} element={<RekapMubaligh/>} />} />
//                     <Route path="penugasanMubaligh" element={<ProtectedRoute roles={['bidang-garapan']} element={<PenugasanMubaligh/>} />} />
//                     <Route path="jadwal/jumat" element={<ProtectedRoute roles={['bidang-garapan']} element={<GenerateJumat />} />} />
//                     <Route path="jadwal/pengajian" element={<ProtectedRoute roles={['bidang-garapan']} element={<GeneratePengajian />} />} />
//                     <Route path="hasil-generate/jumat" element={<ProtectedRoute roles={['bidang-garapan']} element={<HasilGenerateJumat />} />} />
//                     <Route path="hasil-generate/pengajian" element={<ProtectedRoute roles={['bidang-garapan']} element={<HasilGeneratePengajian />} />} />
//                     <Route path="tampilGenerate" element={<ProtectedRoute roles={['ketua']} element={<TampilHasilGenerate />} />} />
//                   </Routes>
//                 </div>
//               </div>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

