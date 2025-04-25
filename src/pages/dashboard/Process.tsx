import  { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const data = [
  { id: "#5632", name: "Process 01", assignedTo: "Kathryn Murphy", date: "27 Mar 2024", status: "Active" },
  { id: "#5632", name: "Process 04", assignedTo: "Kathryn Murphy", date: "27 Mar 2024", status: "Cancelled" },
  { id: "#5632", name: "Process 02", assignedTo: "Kathryn Murphy", date: "27 Mar 2024", status: "In process" },
  { id: "#5632", name: "Process 03", assignedTo: "Kathryn Murphy", date: "27 Mar 2024", status: "Active" },
  { id: "#5632", name: "Process 05", assignedTo: "Kathryn Murphy", date: "27 Mar 2024", status: "In process" },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    case "In process":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ProcessTable = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          {/* Tabs Header */}
          <TabList className="flex space-x-6 border-b-2 ">
            <Tab
              className={`cursor-pointer px-4 py-2 ${
                tabIndex === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
              }`}
            >
              Process 01
            </Tab>
            <Tab
              className={`cursor-pointer px-4 py-2 ${
                tabIndex === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
              }`}
            >
              Process 02
            </Tab>
          </TabList>

          {/* View All Button */}
          {/* <button className="ml-auto px-3 py-1 text-sm border rounded-lg flex items-center gap-2">
            View all
            <span>→</span>
          </button> */}

          {/* Tab Panels */}
          <TabPanel>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left mt-4">
                <thead>
                  <tr className="text-gray-500 whitespace-nowrap">
                    <th className="p-3">Process Working</th>
                    <th className="p-3">Assigned To</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition whitespace-nowrap"
                    >
                      <td className="p-3">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.id}</p>
                      </td>
                      <td className="p-3">{item.assignedTo}</td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="text-center p-4 ">
              <p className="text-gray-600"> Process 02</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProcessTable;
