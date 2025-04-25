import { useState } from "react";
import search from "../assets/search.png";
import language from "../assets/language.png";
import notification from "../assets/notification.png";
import profile from "../assets/profile.png";
import flag1 from "../assets/flag1.png";
import flag2 from "../assets/flag2.png";
import flag3 from "../assets/flag3.png";
import NotificationList from "./NotificationList";
import Account from "./Account";

const Navbar = () => {
  const [isLanguage, isLanguageOpen] = useState(false);
  const [isNotification, isNotificationOpen] = useState(false);
  const [isProfile, isProfileOpen] = useState(false);
  return (
    <div className="fixed top-0 right-0 w-full z-30 items-center ">
    <div className="flex items-center justify-end  bg-white p-4 shadow   w-full ">
      <div className="flex items-center space-x-4  justify-between relative ">
        <div className="rounded-lg bg-[#E9ECF1] md:flex  p-2 hidden items-center gap-2">
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
            className="w-10"
            onClick={() => {
              isLanguageOpen(true);
            }}
          />
        </div>
        <div className="flex space-x-4">
          <img
            src={notification}
            alt="avatar"
            className="w-10"
            onClick={() => {
              isNotificationOpen(true);
            }}
          />
        </div>
        <div className="flex space-x-4">
          <img src={profile} alt="avatar" className="w-10" 
          onClick={()=>{
            isProfileOpen(true)
          }}/>
        </div>
      </div>

      {isLanguage && (
        <div className=" flex flex-col gap-4 absolute top-16 right-12 z-10 p-4">
          <div className="flex flex-col i gap-2 bg-white py-2">
            <div className="flex gap-2 hover:bg-[#919EAB29] items-center cursor-pointer px-6">
              <div>
                {" "}
                <img src={flag1} alt="" />
              </div>
              <div>
                {" "}
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
                {" "}
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
          <div className="fixed inset-0 bg-black opacity-30 z-10" />{" "}
          {/* Background overlay */}
          <div className="absolute right-0 top-0 z-20">
            <NotificationList />
          </div>
        </div>
      )}
      {isProfile && (
        <div className="relative">
          <div className="fixed inset-0 bg-black opacity-30 z-10" />{" "}
          {/* Background overlay */}
          <div className="absolute right-0 top-0 z-20">
            <Account  />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
