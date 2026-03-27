// import { useState, useEffect } from "react";
// import setting from "../assets/settings_icon.png";
// import axiosInstance from "../utils/axiosInstance";
// // const BASE_URL = import.meta.env.VITE_SERVER_URL;
// export const getAllStationNotification = async (status) => {
//   try {
//     const query = status !== undefined ? `?status=${status}` : "";
//     const response = await axiosInstance.get(
//       `/all-station-notification${query}`,
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateNotificationStatus = async (id, status) => {
//   try {
//     const res = await axiosInstance.patch(
//       `/change-station-notification-status/${id}`,
//       { status },
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error updating status:", error);
//   }
// };

// const NotificationList = ({ onClose, onNotificationAction }) => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [counts, setCounts] = useState({ all: 0, unread: 0, archived: 0 });
//   const [message, setMessage] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");

//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       let statusFilter;
//       if (activeTab === "unread") statusFilter = false;
//       if (activeTab === "archived") statusFilter = true;

//       const res = await getAllStationNotification(statusFilter);
//       setNotifications(res.data || []);
//       setCounts(res.counts || { all: 0, unread: 0, archived: 0 });
//       setMessage(res.message || "");
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [activeTab]);

//   const handleStatusChange = async (id, status) => {
//     await updateNotificationStatus(id, status);
//     fetchNotifications();
//     if (onNotificationAction) {
//       onNotificationAction();
//     }
//   };

//   const openModal = (imgName) => {
//     setSelectedImage(`${BASE_URL}/uploads/PartEnquiryImg/${imgName}`);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="w-[420px] bg-white min-h-screen py-4 fixed right-0 top-0 z-20 overflow-auto shadow-xl border-l">
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               className="absolute -top-10 right-0 text-white text-3xl font-bold"
//               onClick={() => setIsModalOpen(false)}
//             >
//               &times;
//             </button>
//             <img
//               src={selectedImage}
//               alt="Enlarged"
//               className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center pb-2 mb-2 px-4">
//         <h2 className="text-lg font-semibold">Notifications</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-black">
//           ✕
//         </button>
//       </div>

//       {message && <p className="text-sm text-gray-500 px-4 pb-2">{message}</p>}

//       <div className="flex justify-between px-4 py-4 bg-[#F4F6F8] items-center">
//         {/* All Tab */}
//         <div className="flex gap-2 items-center">
//           <button
//             className={`text-sm font-semibold cursor-pointer ${activeTab === "all" ? "text-black" : "text-gray-400"}`}
//             onClick={() => setActiveTab("all")}
//           >
//             All
//           </button>
//           <p className="bg-black px-2 py-0.5 rounded-md text-white text-xs">
//             {counts.all}
//           </p>
//         </div>

//         <div className="flex gap-2 items-center">
//           <button
//             className={`text-sm font-semibold cursor-pointer ${activeTab === "unread" ? "text-black" : "text-gray-400"}`}
//             onClick={() => setActiveTab("unread")}
//           >
//             Unread
//           </button>
//           <p className="bg-[#00B8D929] px-2 py-0.5 rounded-md text-[#006C9C] text-xs font-bold">
//             {counts.unread}
//           </p>
//         </div>

//         <div className="flex gap-2 items-center">
//           <button
//             className={`text-sm font-semibold cursor-pointer ${activeTab === "archived" ? "text-black" : "text-gray-400"}`}
//             onClick={() => setActiveTab("archived")}
//           >
//             Archived
//           </button>
//           <p className="bg-[#22C55E29] px-2 py-0.5 rounded-md text-[#118D57] text-xs font-bold">
//             {counts.archived}
//           </p>
//         </div>
//       </div>

//       <div className="mt-2">
//         {loading ? (
//           <p className="text-center py-10 text-gray-500">Loading...</p>
//         ) : notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 p-4 hover:bg-gray-100 border-b border-dashed"
//             >
//               <div className="flex-shrink-0">
//                 {notification.enqueryImg ? (
//                   <img
//                     src={`${BASE_URL}/uploads/PartEnquiryImg/${notification.enqueryImg}`}
//                     alt="icon"
//                     className="w-12 h-12 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform border"
//                     onClick={() => openModal(notification.enqueryImg)}
//                   />
//                 ) : (
//                   <div className="w-12 h-12 rounded-full bg-gray-300" />
//                 )}
//               </div>

//               <div className="flex-1 mt-1">
//                 <p className="text-sm font-medium text-[#052C89]">
//                   {notification.comment || "No comment"}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {new Date(notification.createdAt).toLocaleDateString()} ·{" "}
//                   {notification.status ? "Archived" : "Unread"}
//                 </p>
//               </div>

//               <div className="flex gap-2 mt-2 sm:mt-0">
//                 <button
//                   onClick={() => handleStatusChange(notification.id, true)}
//                   className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
//                 >
//                   OK
//                 </button>
//                 <button
//                   onClick={() => handleStatusChange(notification.id, false)}
//                   className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center py-10 text-gray-500 font-medium">
//             No notifications found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationList;
import React, { useState, useEffect } from "react";
// import setting from "../assets/settings_icon.png"; // Unused import
import axiosInstance from "../utils/axiosInstance";

// --- 1. Interfaces Define Karein ---

export interface NotificationItem {
  id: string | number;
  enqueryImg?: string;
  comment?: string;
  createdAt: string;
  status: boolean; // false for unread, true for archived
}

export interface NotificationCounts {
  all: number;
  unread: number;
  archived: number;
}

export interface NotificationResponse {
  data: NotificationItem[];
  counts: NotificationCounts;
  message?: string;
}

// --- 2. API Functions with Types ---

export const getAllStationNotification = async (
  status?: boolean,
): Promise<NotificationResponse> => {
  try {
    const query = status !== undefined ? `?status=${status}` : "";
    const response = await axiosInstance.get(
      `/all-station-notification${query}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationStatus = async (
  id: string | number,
  status: boolean,
) => {
  try {
    const res = await axiosInstance.patch(
      `/change-station-notification-status/${id}`,
      { status },
    );
    return res.data;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// --- 3. Component Props Interface ---

interface NotificationListProps {
  onClose: () => void;
  onNotificationAction?: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  onClose,
  onNotificationAction,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">(
    "all",
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [counts, setCounts] = useState<NotificationCounts>({
    all: 0,
    unread: 0,
    archived: 0,
  });
  const [message, setMessage] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      let statusFilter: boolean | undefined;
      if (activeTab === "unread") statusFilter = false;
      if (activeTab === "archived") statusFilter = true;

      const res = await getAllStationNotification(statusFilter);
      setNotifications(res.data || []);
      setCounts(res.counts || { all: 0, unread: 0, archived: 0 });
      setMessage(res.message || "");
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const handleStatusChange = async (id: string | number, status: boolean) => {
    await updateNotificationStatus(id, status);
    fetchNotifications();
    if (onNotificationAction) {
      onNotificationAction();
    }
  };

  const openModal = (imgName: string) => {
    setSelectedImage(`${BASE_URL}/uploads/PartEnquiryImg/${imgName}`);
    setIsModalOpen(true);
  };

  return (
    <div className="w-[420px] bg-white h-screen py-4 fixed right-0 top-0 z-20 overflow-auto shadow-xl border-l">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-10 right-0 text-white text-3xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pb-2 mb-2 px-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      {message && <p className="text-sm text-gray-500 px-4 pb-2">{message}</p>}

      <div className="flex justify-between px-4 py-4 bg-[#F4F6F8] items-center">
        <div className="flex gap-2 items-center">
          <button
            className={`text-sm font-semibold cursor-pointer ${activeTab === "all" ? "text-black" : "text-gray-400"}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <p className="bg-black px-2 py-0.5 rounded-md text-white text-xs">
            {counts.all}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className={`text-sm font-semibold cursor-pointer ${activeTab === "unread" ? "text-black" : "text-gray-400"}`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
          <p className="bg-[#00B8D929] px-2 py-0.5 rounded-md text-[#006C9C] text-xs font-bold">
            {counts.unread}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className={`text-sm font-semibold cursor-pointer ${activeTab === "archived" ? "text-black" : "text-gray-400"}`}
            onClick={() => setActiveTab("archived")}
          >
            Archived
          </button>
          <p className="bg-[#22C55E29] px-2 py-0.5 rounded-md text-[#118D57] text-xs font-bold">
            {counts.archived}
          </p>
        </div>
      </div>

      <div className="mt-2">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 p-4 hover:bg-gray-100 border-b border-dashed"
            >
              <div className="flex-shrink-0">
                {notification.enqueryImg ? (
                  <img
                    src={`${BASE_URL}/uploads/PartEnquiryImg/${notification.enqueryImg}`}
                    alt="icon"
                    className="w-12 h-12 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform border"
                    onClick={() => openModal(notification.enqueryImg || "")}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300" />
                )}
              </div>

              <div className="flex-1 mt-1">
                <p className="text-sm font-medium text-[#052C89]">
                  {notification.comment || "No comment"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.createdAt).toLocaleDateString()} ·{" "}
                  {notification.status ? "Archived" : "Unread"}
                </p>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleStatusChange(notification.id, true)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                >
                  OK
                </button>
                <button
                  onClick={() => handleStatusChange(notification.id, false)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500 font-medium">
            No notifications found
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
