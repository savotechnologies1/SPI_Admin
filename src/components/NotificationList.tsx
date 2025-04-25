import  { useState } from "react";
import setting from "../assets/settings_icon.png";

import notifications from "./Data/notificationsData";

const NotificationList = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = notifications.filter(
    (notification) => activeTab === "all" || notification.type === activeTab
  );

  return (
    <div className="w-[420px] bg-white min-h-screen  py-4 fixed right-0 top-0 z-20 overflow-auto">
      <div className="bg-[] flex justify-between items-center  pb-2 mb-2 px-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-green-600">✔</div>
          <div>
            <img src={setting} alt="" />
          </div>
        </div>
      </div>
      <div className="flex  justify-between px-2  py-4 bg-[#F4F6F8] items-center">
        <div className="flex gap-2">
          <button
            className={`${
              activeTab === "all" ? "text-black " : "text-gray-400"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <p className="bg-black px-2 rounded-md text-white">22</p>
        </div>

        <div className="flex gap-2">
          <button
            className={`${
              activeTab === "unread" ? "text-black " : "text-gray-400"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
          <p className="bg-[#00B8D929]  px-2 rounded-md text-[#006C9C]">11</p>
        </div>

        <div className="flex gap-2">
          <button
            className={`${
              activeTab === "archived" ? "text-black " : "text-gray-400"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            Archived
          </button>
          <p className="bg-[#22C55E29] px-2 rounded-md text-[#118D57]">12</p>
        </div>
      </div>

      <div className="mt-2">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-6 hover:bg-gray-100 border-b border-dashed"
          >
            <div className="rounded-full bg-gray-100 p-3">
              <img src={notification.icon} alt="" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium text-[#052C89]">
                {notification.title}
              </p>
              <p className="text-xs sm:text-base text-gray-400">
                {notification.date} · {notification.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
