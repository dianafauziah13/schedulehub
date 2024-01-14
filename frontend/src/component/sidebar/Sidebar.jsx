import { NavLink } from "react-router-dom";
import { FaBars, FaCalendarAlt, FaCalendarCheck, FaUser } from "react-icons/fa";
import {FaUserGroup} from "react-icons/fa6"
import { MdMosque } from "react-icons/md";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { CgAlbum } from "react-icons/cg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
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
        path: "/dashboard/settings/2fa",
        name: "Pengajian Rutin",
        // icon: <FaLock />,
      },
    ],
  },
  {
    path: "/dashboard/accounts",
    name: "Kelola Akun",
    icon: <FaUserGroup />,
  },
  {
    path: "/dashboard/PimpinanJemaah",
    name: "Pimpinan Jemaah",
    icon: <MdMosque />,
  },
  {
    path: "/dashboard/mubaligh",
    name: "Mubaligh",
    icon: <FaUser />,
  },
  {
    path: "/dashboard/rekapMubaligh",
    name: "Rekap Mubaligh",
    icon: <CgAlbum />,
  },
  {
    path: "/dashboard/generate-jadwal",
    name: "Generate Jadwal",
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
  },
  {
    path: "/dashboard/validate",
    name: "Validasi Jadwal",
    icon: <FaCalendarCheck />,
    subRoutes: [
      {
        path: "/dashboard/validate/jumat",
        name: "Khutbah Jum'at ",
        // icon: <FaUser />,
      },
      {
        path: "/dashboard/settings/2fa",
        name: "Pengajian Rutin",
        // icon: <FaLock />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

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
                  DoSomeCoding
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
            {routes.map((route, index) => {
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