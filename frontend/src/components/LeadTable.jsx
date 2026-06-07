function LeadTable({
    leads,
    onDelete,
    onEdit,
  }) {
    const getStatusBadge = (status) => {
      switch (status) {
        case "New":
          return "bg-blue-100 text-blue-700";
  
        case "Contacted":
          return "bg-yellow-100 text-yellow-700";
  
        case "Qualified":
          return "bg-purple-100 text-purple-700";
  
        case "Converted":
          return "bg-green-100 text-green-700";
  
        case "Lost":
          return "bg-red-100 text-red-700";
  
        default:
          return "bg-gray-100 text-gray-700";
      }
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Phone</th>
              <th className="p-3 border text-left">Company</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6"
                >
                  No Leads Found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border">
                    {lead.name}
                  </td>
  
                  <td className="p-3 border">
                    {lead.email}
                  </td>
  
                  <td className="p-3 border">
                    {lead.phone}
                  </td>
  
                  <td className="p-3 border">
                    {lead.company}
                  </td>
  
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
  
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(lead)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
  
                      <button
                        onClick={() =>
                          onDelete(lead._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default LeadTable;