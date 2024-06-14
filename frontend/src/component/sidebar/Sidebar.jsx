import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaCalendarAlt, FaFile, FaUser, FaSignOutAlt } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { MdMosque } from "react-icons/md";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const ketuaRoutes = [
  {
    path: "/",
    name: "Jadwal Khutbah",
    icon: <FaCalendarAlt />,
    subRoutes: [
      {
        path: "/dashboard/JadwalJumat",
        name: "Khutbah Jum'at ",
      },
      {
        path: "/dashboard/JadwalPengajian",
        name: "Pengajian Rutin",
      },
    ],
  },
  {
    path: "/dashboard/hasil-generate",
    name: "Persetujuan Jadwal",
    icon: <RiAiGenerate />,
    subRoutes: [
      {
        path: "/dashboard/hasil-generate/jumat",
        name: "Khutbah Jum'at ",
      },
      {
        path: "/dashboard/hasil-generate/pengajian",
        name: "Pengajian Rutin",
      },
    ],
  }
]

const bidgarRoutes = [
  {
    path: "/",
    name: "Jadwal Khutbah",
    icon: <FaCalendarAlt />,
    subRoutes: [
      {
        path: "/dashboard/JadwalJumat",
        name: "Khutbah Jum'at ",
      },
      {
        path: "/dashboard/JadwalPengajian",
        name: "Pengajian Rutin",
      },
    ],
  },
  {
    path: "/dashboard/PimpinanJemaah",
    name: "Pimpinan Jamaah",
    icon: <MdMosque />,
  },
  {
    path: "/dashboard/kelolaMubaligh",
    name: "Kelola Mubaligh",
    icon: <FaUser />,
  },
  {
    path: "/dashboard/penugasanMubaligh",
    name: "Penugasan Mubaligh",
    icon: <FaFile />,
  },
  {
    path: "/dashboard/generate-jadwal",
    name: "Buat Jadwal",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/dashboard/jadwal/jumat",
        name: "Khutbah Jum'at ",
      },
      {
        path: "/dashboard/jadwal/pengajian",
        name: "Pengajian Rutin",
      },
    ],
  },
  {
    path: "/dashboard/history-generate",
    name: "History Generate",
    icon: <RiAiGenerate />,
    subRoutes: [
      {
        path: "/dashboard/history-generate/jumat",
        name: "Khutbah Jum'at ",
      },
      {
        path: "/dashboard/history-generate/pengajian",
        name: "Pengajian Rutin",
      },
    ],
  }
]

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <div className="main-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  SCHEDULEHUB
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes" style={{ flexGrow: 1 }}>
            {(localStorage.getItem("role") === "ketua" ? ketuaRoutes : bidgarRoutes).map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className="logout-section" style={{ marginTop: 'auto' }}>
            <div className="link" onClick={handleLogout}>
              <div className="icon"><FaSignOutAlt /></div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Exit
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
