import data from "../../components/Data/TopPerformerData";
import arrow from "../../assets/right_arrow.png";

const TopPerformer = ({ performers }) => {
  console.log("performersperformers", performers);

  return (
    <div className="  ">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold">Top Performer</h1>
        <div className="flex items-center px-3 py-1 rounded-lg border gap-2 cursor-pointer">
          <button className="text-sm font-medium">View all</button>
          <img src={arrow} alt="arrow" className="w-3 h-3" />
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col py-4">
        {performers.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-3 hover:bg-gray-100 rounded-lg transition"
          >
            {/* Avatar */}
            <div className="w-12 h-12">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-grow">
              <p className="text-base font-semibold">{item.fullName}</p>
              <p className="text-sm text-gray-500">Agent ID: 36254</p>
            </div>

            {/* Score */}
            <div className="text-gray-700 font-semibold">
              {item.completedCount}/{item.completedCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformer;
