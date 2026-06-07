import { useEffect, useState } from "react";

import {
  getLeads,
  searchLeads,
  deleteLead,
  updateLead,
  getStats,
} from "../services/leadService";

import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";
import SearchBar from "../components/SearchBar";
import StatsCards from "../components/StatsCards";
import StatusFilter from "../components/StatusFilter";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
  useState("All");
  const [editLead, setEditLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const leadsPerPage = 5;

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();

      setLeads(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    try {
      if (!value.trim()) {
        fetchLeads();
        return;
      }

      const res = await searchLeads(value);

      setLeads(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      fetchLeads();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLead = async (id, data) => {
    try {
      await updateLead(id, data);

      setEditLead(null);

      fetchLeads();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeadAdded = () => {
    fetchLeads();
    fetchStats();
  };

  // PAGINATION

  const indexOfLastLead =
    currentPage * leadsPerPage;

  const indexOfFirstLead =
    indexOfLastLead - leadsPerPage;

    const filteredLeads =
    selectedStatus === "All"
      ? leads
      : leads.filter(
          (lead) =>
            lead.status === selectedStatus
        );
  
  const currentLeads =
    filteredLeads.slice(
      indexOfFirstLead,
      indexOfLastLead
    );
  
  const totalPages = Math.ceil(
    filteredLeads.length / leadsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Lead Management CRM
        </h1>

        <StatsCards stats={stats} />

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <LeadForm
            onLeadAdded={handleLeadAdded}
            editLead={editLead}
            onUpdateLead={handleUpdateLead}
          />
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <LeadTable
            leads={currentLeads}
            onDelete={handleDelete}
            onEdit={setEditLead}
          />

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;