import {
  Plus,
  Search,
  Filter,
  TrendingDown,
  Calendar,
  Tag,
} from "lucide-react";
import { useState } from "react";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - vous pourrez remplacer par vos vraies données
  const expenses = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: 85.5,
      date: "2025-07-05",
      category: "Food",
      color: "bg-orange-500",
    },
    {
      id: 2,
      description: "Electric Bill",
      amount: 120.0,
      date: "2025-07-03",
      category: "Utilities",
      color: "bg-blue-500",
    },
    {
      id: 3,
      description: "Gas Station",
      amount: 45.2,
      date: "2025-07-02",
      category: "Transport",
      color: "bg-purple-500",
    },
    {
      id: 4,
      description: "Restaurant Dinner",
      amount: 68.9,
      date: "2025-07-01",
      category: "Food",
      color: "bg-orange-500",
    },
    {
      id: 5,
      description: "Movie Tickets",
      amount: 24.0,
      date: "2025-06-30",
      category: "Entertainment",
      color: "bg-pink-500",
    },
    {
      id: 6,
      description: "Gym Membership",
      amount: 49.99,
      date: "2025-06-28",
      category: "Health",
      color: "bg-green-500",
    },
  ];

  const categories = [
    "all",
    "Food",
    "Utilities",
    "Transport",
    "Entertainment",
    "Health",
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-2">Track and manage your expenses</p>
        </div>
        <button className="btn btn-primary gap-2">
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100">Total Expenses</p>
            <p className="text-3xl font-bold mt-2">
              ${totalExpenses.toFixed(2)}
            </p>
            <p className="text-red-100 mt-2">This month</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <TrendingDown size={32} />
          </div>
        </div>
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
              placeholder="Search expenses..."
              className="input input-bordered w-full pl-10 text-gray-900 bg-white placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />{" "}
            <select
              className="select select-bordered pl-10 text-gray-900 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Expense History ({filteredExpenses.length})
          </h2>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="p-12 text-center">
            <TrendingDown size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No expenses found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${expense.color}`}>
                    <Tag size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {expense.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {expense.date}
                      </div>
                      <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {expense.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600 text-lg">
                    -${expense.amount.toFixed(2)}
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

export default Expenses;
