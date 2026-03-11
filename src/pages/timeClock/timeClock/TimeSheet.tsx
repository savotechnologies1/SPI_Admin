import { FC, useEffect, useState, useCallback } from "react";
import { employeeAllTimeLine } from "./https/timeClock";
import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";

interface TimeSheetEntry {
  date: string;
  employeeName: string;
  employeeEmail: string;
  loginTime: string | null;
  logout: string | null;
  workHours: string | number;
  vacationHours: string | number;
  totalHours: string | number;
  vacationStatus: string;
  status: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const TimeSheet: FC = () => {
  const [timeSheetData, setTimeSheetData] = useState<TimeSheetEntry[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<string>("This Week");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pageSize = 8;
  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr || dateStr === "-") return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchTimeSheet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await employeeAllTimeLine(
        currentPage,
        pageSize,
        currentFilter,
        searchQuery,
      );
      setTimeSheetData(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Error fetching data");
      } else {
        setError("Error fetching data");
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, currentFilter, searchQuery]);

  useEffect(() => {
    fetchTimeSheet();
  }, [fetchTimeSheet]);

  const handleNextPage = () =>
    pagination?.hasNext && setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    pagination?.hasPrevious && setCurrentPage((prev) => prev - 1);
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };
  const tableHeaders = [
    "Date",
    "Employee",
    "Login",
    "Logout",
    "Work Hrs",
    "Vac Hrs",
    "Total Hrs",
    "Vacation Status",
    "Action",
  ];
  const handleApprove = async (date: string, employeeId: string) => {
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}/api/admin/approve-timesheet`,
        {
          employeeId: employeeId,
          date: date,
        },
      );

      alert(res.data.message);
      fetchTimeSheet(); // Table ko refresh karne ke liye
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };
  return (
    <div className="p-4 sm:p-6 mt-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Time List</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dashboard • timeO'clock • time Sheet
        </p>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <select
            className="block w-full sm:w-48 pl-3 pr-10 py-2 border-gray-300 rounded-md text-sm"
            value={currentFilter}
            onChange={(e) => {
              setCurrentFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="This Month">This Month</option>
          </select>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search employee..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-[11px] font-bold text-gray-600 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : timeSheetData.length > 0 ? (
                timeSheetData.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-800">
                        {entry.employeeName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.employeeEmail}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-600">
                      {formatDateTime(entry.loginTime)}
                    </td>

                    {/* Logout Time Column (Updated) */}
                    <td className="px-4 py-4 text-xs text-gray-600">
                      {formatDateTime(entry.logout)}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-blue-600">
                      {entry.workHours}
                    </td>

                    <td className="px-4 py-4 text-sm text-orange-600">
                      {entry.vacationHours}
                    </td>

                    <td className="px-4 py-4 text-sm font-black text-gray-900 bg-gray-50/50">
                      {entry.totalHours} hrs
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          entry.vacationStatus === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {entry.vacationStatus}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() =>
                          handleApprove(entry.date, entry.employeeEmail)
                        }
                        disabled={entry.status === "APPROVED"}
                        className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded transition-all shadow-sm ${
                          entry.status === "APPROVED"
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {entry.status === "APPROVED" ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-400">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-xs text-gray-500">
            Showing Page {pagination?.page} of {pagination?.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={!pagination?.hasPrevious || isLoading}
              className="px-3 py-1 border rounded text-sm disabled:opacity-30"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!pagination?.hasNext || isLoading}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
