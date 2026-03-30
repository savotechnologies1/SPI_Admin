import { useEffect, useState } from "react";
import img from "../assets/pofile_img.jpg";
import cross from "../assets/cross.png";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../pages/settings/https/profileApi";
import { FiHome, FiUser } from "react-icons/fi";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
interface AccountProps {
  onClose: () => void;
}

interface Profile {
  name: string;
  email: string;
  profileImg?: string;
}

const Account = ({ onClose }: AccountProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [profileDetail, setProfileDetail] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const section = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <FiHome size={20} />,
      path: "dashboardDetailes",
    },
    {
      key: "Profile",
      label: "Profile",
      icon: <FiUser size={20} />,
      path: "settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/sign-in");
  };

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
    <div>
      <div className="fixed overflow-y-auto right-0 top-0 z-60 w-[320px] h-full bg-white shadow-lg">
        <div className="p-4 mt-5">
          <div>
            <img
              src={cross}
              alt="Close sidebar"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="flex flex-col items-center pt-6">
            <div>
              <img
                src={
                  profileDetail?.profileImg
                    ? `${BASE_URL}/uploads/profileImg/${profileDetail.profileImg}`
                    : img
                }
                alt="Profile"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-[100px] border-2 border-green-400 mb-2 "
              />
            </div>
            <div className="ml-3">
              <p className="font-semibold text-center">
                {profileDetail?.name ?? "Loading..."}
              </p>
              <p className="text-sm text-gray-500">{profileDetail?.email}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <ul className="space-y-2 px-2 py-4 h-[500px]">
                {section.map((section) => (
                  <li key={section.key}>
                    <Link to={`/${section.path}`}>
                      <button
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300
        ${
          activeTab === section.key
            ? "bg-brand text-white"
            : "text-gray-700 hover:bg-brand hover:text-white"
        }`}
                        onClick={() => setActiveTab(section.key)}
                      >
                        <span className="text-xl">{section.icon}</span>

                        <span
                          className={`text-sm font-medium transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {section.label}
                        </span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="mt-4 w-full bg-[#FF563014] text-[#B71D18] py-2 rounded-lg font-semibold text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
