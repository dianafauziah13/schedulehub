import './App.css';
import SideBar from './component/sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KelolaAkun from './pages/kelolaAkun';
import JadwalJumat from './pages/JadwalJumat';
import KelolaPimpinanJemaah from './pages/KelolaPimpinanJemaah';
import GeneratePengajian from './pages/GeneratePengajian';
import ValidasiJumat from './pages/ValidasiJumat';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className='AppGlass'>
        <Router>
        <SideBar/>
          <Routes>
              <Route path="/Accounts" element={<KelolaAkun />} />
              <Route path="/JadwalJumat" element={<JadwalJumat />} />
              <Route path="/PimpinanJemaah" element={<KelolaPimpinanJemaah />} />
              <Route path="/jadwal/pengajian" element={<GeneratePengajian />} />
              <Route path="/Validate/jumat" element={<ValidasiJumat />} />
            </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
