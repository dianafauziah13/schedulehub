import { NavLink } from "react-router-dom";
import { FaBars, FaCalendarAlt, FaFile, FaUser } from "react-icons/fa";
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
        // icon: <FaUser />,
      },
      {
        path: "/dashboard/JadwalPengajian",
        name: "Pengajian Rutin",
        // icon: <FaLock />,
      },
    ],
  },
  {
    path: "/dashboard/hasil-generate",
    name: "Persetujuan Jadwal",
    icon: <RiAiGenerate  />,
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
        // icon: <FaUser />,
      },
      {
        path: "/dashboard/JadwalPengajian",
        name: "Pengajian Rutin",
        // icon: <FaLock />,
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
    icon: <FaFile/> ,
  },
  {
    path: "/dashboard/generate-jadwal",
    name: "Buat Jadwal",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/dashboard/jadwal/jumat",
        name: "Khutbah Jum'at ",
        // icon: <FaUser />,
      },
      {
        path: "/dashboard/jadwal/pengajian",
        name: "Pengajian Rutin",
        // icon: <FaLock />,
      },
    ],
  }
]

// const routes = [
//   {
//     path: "/",
//     name: "Jadwal Khutbah",
//     icon: <FaCalendarAlt />,
//     subRoutes: [
//       {
//         path: "/dashboard/JadwalJumat",
//         name: "Khutbah Jum'at ",
//         // icon: <FaUser />,
//       },
//       {
//         path: "/dashboard/JadwalPengajian",
//         name: "Pengajian Rutin",
//         // icon: <FaLock />,
//       },
//     ],
//   },
//   // {
//   //   path: "/dashboard/accounts",
//   //   name: "Kelola Akun",
//   //   icon: <FaUserGroup />,
//   // },
//   {
//     path: "/dashboard/PimpinanJemaah",
//     name: "Pimpinan Jamaah",
//     icon: <MdMosque />,
//   },
//   {
//     path: "/dashboard/kelolaMubaligh",
//     name: "Kelola Mubaligh",
//     icon: <FaUser />,
//     // subRoutes: [
//     //   {
//     //     path: "/dashboard/kelolaMubaligh",
//     //     name: "Kelola Mubaligh",
//     //     // icon: <FaUser />,
//     //   },
//     //   {
//     //     path: "/dashboard/rekapMubaligh",
//     //     name: "Rekap Mubaligh",
//     //     // icon: <FaLock />,
//     //   },
//     // ],
//   },
//   {
//     path: "/dashboard/penugasanMubaligh",
//     name: "Penugasan Mubaligh",
//     icon: <FaFile/> ,
//   },
//   {
//     path: "/dashboard/generate-jadwal",
//     name: "Buat Jadwal",
//     icon: <AiTwotoneFileExclamation />,
//     subRoutes: [
//       {
//         path: "/dashboard/jadwal/jumat",
//         name: "Khutbah Jum'at ",
//         // icon: <FaUser />,
//       },
//       {
//         path: "/dashboard/jadwal/pengajian",
//         name: "Pengajian Rutin",
//         // icon: <FaLock />,
//       },
//     ],
//   },
//   {
//     path: "/dashboard/hasil-generate",
//     name: "Persetujuan Jadwal",
//     icon: <RiAiGenerate  />,
//     subRoutes: [
//       {
//         path: "/dashboard/hasil-generate/jumat",
//         name: "Khutbah Jum'at ",
//       },
//       {
//         path: "/dashboard/hasil-generate/pengajian",
//         name: "Pengajian Rutin",
//       },
//     ],
//   }
// ];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
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

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
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
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {(localStorage.getItem("role") == "ketua" ? ketuaRoutes : bidgarRoutes).map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
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
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;