
const Timeline = () => {
  const events = [
    {
      label: "Start Exception",
      date: "15 May 2020 9:30 am",
      color: "bg-green-500",
    },
    { label: "End Lunch", date: "15 May 2020 9:30 am", color: "bg-yellow-500" },
    { label: "Start Lunch", date: "15 May 2020 8:00 am", color: "bg-blue-500" },
    {
      label: "Clock In Punch",
      date: "15 May 2020 8:30 am",
      color: "bg-red-500",
    },
    {
      label: "Login Successfully",
      date: "15 May 2020 9:00 am",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Timeline</h2>

      <div className="relative  pl-6">
        {events.map((event, index) => (
          <div key={index} className="mb-4 relative ">
            {/* Dot */}
            <div
              className={`absolute -left-4 top-2 w-3 h-3   ${event.color} rounded-full`}
            ></div>
            <div
              className={`absolute -left-3 top-4 w-8 h-8   border-b-2 mt-2 rotate-90`}
            ></div>

            <div className="">
              <p className="text-[#1C252E] font-semibold ">{event.label}</p>
              <p className="text-gray-500 text-sm">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
