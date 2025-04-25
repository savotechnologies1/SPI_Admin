import profile from "../../assets/profile.png";

const data = [
  { hr: "23:00", actual: 10, scrap: 5 },
  { hr: "18:00", actual: 5, scrap: 4 },
  { hr: "20:00", actual: 7, scrap: 8 },
  { hr: "13:00", actual: 17, scrap: 4 },
  { hr: "17:00", actual: 15, scrap: 7 },
  { hr: "06:00", actual: 3, scrap: 11 },
];

// Calculate total row
const total = data.reduce(
  (acc, curr) => {
    acc.actual += curr.actual;
    acc.scrap += curr.scrap;
    return acc;
  },
  { target: 0, actual: 0, scrap: 0 }
);

const Inspection = () => {
  return (
    <div className=" p-2 rounded-lg   mx-auto">
      <h2 className=" font-semibold mb-4 text-center text-[#1C252E]">
        Inspection
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-xs">
            <th className="py-1 px-2 text-left text-xs">Hour</th>
            <th className="py-1 px-2 text-left text-xs">Actual</th>
            <th className="py-1 px-2 text-left text-xs">Scrap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-1 px-2 text-xs border">{item.hr}</td>
              <td className="py-1 px-2 text-xs border">{item.actual}</td>
              <td className="py-1 px-2 text-xs border">{item.scrap}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr className=" font-semibold">
            <td className="py-1 px-2 text-xs border">Total</td>
            <td className="py-1 px-2 text-xs border">{total.actual}</td>
            <td className="py-1 px-2 text-xs border">{total.scrap}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <p className="bg-gray-100 text-sm font-semibold p-1">EMP</p>
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-1 border-b">
            <img className="w-[20px]" src={profile} alt="" />
            <p className="text-xs">Jayvion Simon</p>
          </div>
          <div className="flex items-center gap-4 p-1 border-b">
            <img className="w-[20px]" src={profile} alt="" />
            <p className="text-xs">Jayvion Simon</p>
          </div>
          <div className="flex items-center gap-4 p-1 border-b">
            <img className="w-[20px]" src={profile} alt="" />
            <p className="text-xs">Jayvion Simon</p>
          </div>
          <div className="flex items-center gap-4 p-1 border-b">
            <img className="w-[20px]" src={profile} alt="" />
            <p className="text-xs">Jayvion Simon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspection;
