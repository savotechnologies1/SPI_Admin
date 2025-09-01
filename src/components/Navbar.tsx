import { useEffect, useRef, useState } from "react";
import search from "../assets/search.png";
import language from "../assets/language.png";
import notification from "../assets/notification.png";
import profileImg from "../assets/profile.png";
import flag1 from "../assets/flag1.png";
import flag2 from "../assets/flag2.png";
import flag3 from "../assets/flag3.png";
import NotificationList, {
  getAllStationNotification,
} from "./NotificationList";
import Account from "./Account";
import { useSelector } from "react-redux";
import { getProfile } from "../pages/settings/https/profileApi";
import profile from "../assets/profile.png";

// const Navbar = () => {
//   const [isLanguage, isLanguageOpen] = useState(false);
//   const [isNotification, isNotificationOpen] = useState(false);
//   const [isProfile, isProfileOpen] = useState(false);
//   const languageRef = useRef<HTMLDivElement>(null);
//   const notificationRef = useRef<HTMLDivElement>(null);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   const [profileDetail, setProfileDetail] = useState<Profile | null>(null);
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       languageRef.current &&
//       !languageRef.current.contains(event.target as Node)
//     ) {
//       isLanguageOpen(false);
//     }
//   };

//   // Add event listener for clicks outside the language dropdown
//   useEffect(() => {
//     if (isLanguage) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }
//   }, [isLanguage]);

//   useEffect(() => {
//     const handleClickOutsideNotification = (event: MouseEvent) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target as Node)
//       ) {
//         isNotificationOpen(false);
//       }
//     };

//     if (isNotification) {
//       document.addEventListener("mousedown", handleClickOutsideNotification);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideNotification);
//     };
//   }, [isNotification]);

//   const getProfileApi = async () => {
//     try {
//       const response = await getProfile();
//       setProfileDetail(response.data);
//     } catch (error) {
//       console.error("Failed to fetch profile", error);
//     }
//   };

//   useEffect(() => {
//     getProfileApi();
//   }, []);
//   return (
//     <div className="fixed top-0 right-0 w-full z-30 items-center  ">
//       <div className="flex items-center justify-end  bg-white p-4 shadow   w-full ">
//         <div className="flex items-center space-x-4  justify-between relative ">
//           <div className="rounded-lg bg-[#E9ECF1] md:flex  p-2 hidden items-center gap-2">
//             <div className="">
//               <img src={search} alt="" />
//             </div>
//             <div className=" flex items-center justify-between">
//               <input
//                 className="px- rounded-lg bg-transparent w-full outline-none"
//                 type="text"
//                 placeholder=""
//               />
//               <div className="P-2 bg-white rounded-md">
//                 <p className="px-2 ">SEARCH</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <img
//               src={language}
//               alt="avatar"
//               className="w-10"
//               onClick={() => {
//                 isLanguageOpen(true);
//               }}
//             />
//           </div>
//           <div className="flex space-x-4">
//             <img
//               src={notification}
//               alt="avatar"
//               className="w-10"
//               onClick={() => {
//                 isNotificationOpen(true);
//               }}
//             />
//           </div>
//           <div className="flex space-x-4">
//             <img
//               src={
//                 profileDetail?.profileImg
//                   ? `${BASE_URL}/uploads/profileImg/${profileDetail.profileImg}`
//                   : profile
//               }
//               alt="Profile"
//               onClick={() => {
//                 isProfileOpen(true);
//               }}
//               className="rounded-full w-[60px] border-2 border-green-400 mb-2 py-2 cursor-pointer"
//             />
//             {/* <img
//               src={profileImg}
//               alt="avatar"
//               className="w-10"
//               onClick={() => {
//                 isProfileOpen(true);
//               }}
//             /> */}
//           </div>
//         </div>

//         {isLanguage && (
//           <div
//             ref={languageRef}
//             className=" flex flex-col gap-4 absolute top-16 right-12 z-10 p-4"
//           >
//             <div className="flex flex-col i gap-2 bg-white py-2">
//               <div className="flex gap-2 hover:bg-[#919EAB29] items-center cursor-pointer px-6">
//                 <div>
//                   <img src={flag1} alt="" />
//                 </div>
//                 <div>
//                   <p>English</p>
//                 </div>
//               </div>
//               <div className="flex gap-2 hover:bg-[#919EAB29] items-center cursor-pointer px-6">
//                 <div>
//                   <img src={flag2} alt="" />
//                 </div>
//                 <div>
//                   <p>French</p>
//                 </div>
//               </div>
//               <div className="flex gap-2 hover:bg-[#919EAB29] items-center justi cursor-pointer px-6">
//                 <div>
//                   <img src={flag3} alt="" />
//                 </div>

//                 <div>
//                   <p> German</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {isNotification && (
//           <div className="relative">
//             <div className="fixed inset-0 bg-black opacity-30 z-10" />
//             {/* Background overlay */}
//             <div ref={notificationRef} className="absolute right-0 top-0 z-20">
//               <NotificationList />
//             </div>
//           </div>
//         )}
//         {isProfile && (
//           <div className="relative">
//             <div className="fixed inset-0 bg-black opacity-30 z-10" />{" "}
//             {/* Background overlay */}
//             <div className="absolute right-0 top-0 z-20">
//               <Account
//                 onClose={() => isProfileOpen(false)}
//                 profileDetail={profileDetail}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

interface Profile {
  profileImg: string;
  // ... other profile properties
}

const Navbar = () => {
  const [isLanguage, isLanguageOpen] = useState(false);
  const [isNotification, isNotificationOpen] = useState(false);
  const [isProfile, isProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // New state for unread count
  const languageRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [profileDetail, setProfileDetail] = useState<Profile | null>(null);

  // Function to fetch unread notification count
  const fetchUnreadNotificationCount = async () => {
    try {
      const res = await getAllStationNotification(false); // Fetch only unread
      setUnreadCount(res.counts.unread || 0);
    } catch (error) {
      console.error("Error fetching unread notification count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadNotificationCount(); // Fetch on component mount
    // You might want to refetch this periodically or after a notification is acted upon
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(event.target as Node)
    ) {
      isLanguageOpen(false);
    }
  };

  useEffect(() => {
    if (isLanguage) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isLanguage]);

  useEffect(() => {
    const handleClickOutsideNotification = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        isNotificationOpen(false);
      }
    };

    if (isNotification) {
      document.addEventListener("mousedown", handleClickOutsideNotification);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNotification);
    };
  }, [isNotification]);

  const getProfileApi = async () => {
    try {
      const response = await getProfile();
      setProfileDetail(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  return (
    <div className="fixed top-0 right-0 w-full z-30 items-center">
      <div className="flex items-center justify-end bg-white p-4 shadow w-full">
        <div className="flex items-center space-x-4 justify-between relative">
          <div className="rounded-lg bg-[#E9ECF1] md:flex p-2 hidden items-center gap-2">
            <div className="">
              <img src={search} alt="" />
            </div>
            <div className=" flex items-center justify-between">
              <input
                className="px- rounded-lg bg-transparent w-full outline-none"
                type="text"
                placeholder=""
              />
              <div className="P-2 bg-white rounded-md">
                <p className="px-2 ">SEARCH</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <img
              src={language}
              alt="avatar"
              className="w-10 cursor-pointer"
              onClick={() => {
                isLanguageOpen(true);
              }}
            />
          </div>
          <div className="flex space-x-4 relative">
            {" "}
            {/* Added relative for positioning the badge */}
            <img
              src={notification}
              alt="notification"
              className="w-10 cursor-pointer"
              onClick={() => {
                isNotificationOpen(true);
                fetchUnreadNotificationCount(); // Refresh count when opening
              }}
            />
            {unreadCount > 0 && ( // Conditionally render the badge
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <img
              src={
                profileDetail?.profileImg
                  ? `${BASE_URL}/uploads/profileImg/${profileDetail.profileImg}`
                  : profile
              }
              alt="Profile"
              onClick={() => {
                isProfileOpen(true);
              }}
              className="rounded-full w-[60px] border-2 border-green-400 mb-2 py-2 cursor-pointer"
            />
          </div>
        </div>

        {isLanguage && (
          <div
            ref={languageRef}
            className=" flex flex-col gap-4 absolute top-16 right-12 z-10 p-4"
          >
            <div className="flex flex-col i gap-2 bg-white py-2">
              <div className="flex gap-2 hover:bg-[#919EAB29] items-center cursor-pointer px-6">
                <div>
                  <img src={flag1} alt="" />
                </div>
                <div>
                  <p>English</p>
                </div>
              </div>
              <div className="flex gap-2 hover:bg-[#919EAB29] items-center cursor-pointer px-6">
                <div>
                  <img src={flag2} alt="" />
                </div>
                <div>
                  <p>French</p>
                </div>
              </div>
              <div className="flex gap-2 hover:bg-[#919EAB29] items-center justi cursor-pointer px-6">
                <div>
                  <img src={flag3} alt="" />
                </div>

                <div>
                  <p> German</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isNotification && (
          <div className="relative">
            <div className="fixed inset-0 bg-black opacity-30 z-10" />
            <div ref={notificationRef} className="absolute right-0 top-0 z-20">
              <NotificationList
                onClose={() => {
                  isNotificationOpen(false);
                  fetchUnreadNotificationCount(); // Refresh count when notification list is closed
                }}
                onNotificationAction={fetchUnreadNotificationCount} // Pass a function to refresh count
              />
            </div>
          </div>
        )}
        {isProfile && (
          <div className="relative">
            <div className="fixed inset-0 bg-black opacity-30 z-10" />
            <div className="absolute right-0 top-0 z-20">
              <Account
                onClose={() => isProfileOpen(false)}
                profileDetail={profileDetail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
