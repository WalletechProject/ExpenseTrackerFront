import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const Income = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  // Mock data - vous pourrez remplacer par vos vraies données
  const incomes = [
    {
      id: 1,
      description: "Monthly Salary",
      amount: 3200.0,
      date: "2025-07-01",
      source: "Salary",
      color: "bg-blue-500",
    },
    {
      id: 2,
      description: "Freelance Project",
      amount: 450.0,
      date: "2025-07-04",
      source: "Freelance",
      color: "bg-purple-500",
    },
    {
      id: 3,
      description: "Investment Dividends",
      amount: 125.5,
      date: "2025-07-02",
      source: "Investment",
      color: "bg-green-500",
    },
    {
      id: 4,
      description: "Online Course Sales",
      amount: 280.0,
      date: "2025-06-30",
      source: "Business",
      color: "bg-orange-500",
    },
    {
      id: 5,
      description: "Consulting Fee",
      amount: 750.0,
      date: "2025-06-28",
      source: "Freelance",
      color: "bg-purple-500",
    },
    {
      id: 6,
      description: "Rental Income",
      amount: 800.0,
      date: "2025-06-25",
      source: "Rental",
      color: "bg-teal-500",
    },
  ];

  const sources = [
    "all",
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Rental",
  ];

  const filteredIncomes = incomes.filter((income) => {
    const matchesSearch = income.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSource =
      selectedSource === "all" || income.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const totalIncome = filteredIncomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your income sources
          </p>
        </div>
        <button className="btn btn-success gap-2">
          <Plus size={20} />
          Add Income
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Total Income</p>
            <p className="text-3xl font-bold mt-2">${totalIncome.toFixed(2)}</p>
            <p className="text-green-100 mt-2">This month</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <TrendingUp size={32} />
          </div>
        </div>
      </div>

      {/* Income Sources Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.slice(1).map((source, index) => {
          const sourceIncomes = incomes.filter(
            (income) => income.source === source
          );
          const sourceTotal = sourceIncomes.reduce(
            (sum, income) => sum + income.amount,
            0
          );
          const colors = [
            "bg-blue-500",
            "bg-purple-500",
            "bg-green-500",
            "bg-orange-500",
            "bg-teal-500",
          ];

          return (
            <div
              key={source}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{source}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ${sourceTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {sourceIncomes.length} entries
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${colors[index % colors.length]}`}
                >
                  <Briefcase size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />{" "}
            <input
              type="text"
              placeholder="Search income..."
              className="input input-bordered w-full pl-10 text-gray-900 bg-white placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Source Filter */}
          <div className="relative">
            <Filter
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />{" "}
            <select
              className="select select-bordered pl-10 text-gray-900 bg-white"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source === "all" ? "All Sources" : source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Income List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Income History ({filteredIncomes.length})
          </h2>
        </div>

        {filteredIncomes.length === 0 ? (
          <div className="p-12 text-center">
            <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No income found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredIncomes.map((income) => (
              <div
                key={income.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${income.color}`}>
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {income.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {income.date}
                      </div>
                      <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {income.source}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 text-lg">
                    +${income.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
