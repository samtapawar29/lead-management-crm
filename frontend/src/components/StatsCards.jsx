function StatsCards({ stats }) {
    const cards = [
      {
        title: "Total Leads",
        value: stats.totalLeads || 0,
      },
      {
        title: "New",
        value: stats.newLeads || 0,
      },
      {
        title: "Contacted",
        value: stats.contacted || 0,
      },
      {
        title: "Qualified",
        value: stats.qualified || 0,
      },
      {
        title: "Converted",
        value: stats.converted || 0,
      },
      {
        title: "Lost",
        value: stats.lost || 0,
      },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h3 className="text-gray-500 text-sm">
              {card.title}
            </h3>
  
            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default StatsCards;