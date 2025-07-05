import {
  BarChart3,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useState } from "react";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("monthly"); // 'monthly' or 'yearly'
  const [selectedMonth, setSelectedMonth] = useState(7); // Juillet (mois actuel)
  const [selectedYear, setSelectedYear] = useState(2025); // Année actuelle

  // Noms des mois
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  // Années disponibles
  const availableYears = Array.from({ length: 10 }, (_, i) => 2025 - i);

  // Générateur de données pour différents mois
  const generateMonthlyData = (month, year) => {
    const data = [];

    // Générer des données pour chaque semaine du mois
    for (let week = 1; week <= 4; week++) {
      const weekMultiplier = Math.random() * 0.5 + 0.75; // Variation entre 0.75 et 1.25
      data.push({
        period: `Semaine ${week}`,
        income: Math.round((800 + Math.random() * 400) * weekMultiplier),
        expenses: Math.round((600 + Math.random() * 200) * weekMultiplier),
        savings: 0,
      });
    }

    // Calculer les économies
    data.forEach((item) => {
      item.savings = item.income - item.expenses;
    });

    return data;
  };

  // Générateur de données pour différentes années
  const generateYearlyData = (selectedYear) => {
    const data = [];
    for (let i = selectedYear - 4; i <= selectedYear; i++) {
      const yearMultiplier = (i - 2020) * 0.1 + 1;
      const income = Math.round(
        (35000 + Math.random() * 10000) * yearMultiplier
      );
      const expenses = Math.round(
        (25000 + Math.random() * 8000) * yearMultiplier
      );

      data.push({
        period: i.toString(),
        income,
        expenses,
        savings: income - expenses,
      });
    }
    return data;
  };

  // Données basées sur la sélection
  const currentData =
    viewMode === "monthly"
      ? generateMonthlyData(selectedMonth, selectedYear)
      : generateYearlyData(selectedYear);

  // Catégories de dépenses (adaptées selon le mois/année)
  const expenseCategories = [
    {
      name: "Alimentation",
      value: Math.round(800 * (selectedMonth / 12 + 0.8)),
      color: "#FF6B6B",
    },
    {
      name: "Transport",
      value: Math.round(400 * (selectedMonth / 12 + 0.8)),
      color: "#4ECDC4",
    },
    {
      name: "Logement",
      value: Math.round(1200 * (selectedMonth / 12 + 0.8)),
      color: "#45B7D1",
    },
    {
      name: "Loisirs",
      value: Math.round(300 * (selectedMonth / 12 + 0.8)),
      color: "#96CEB4",
    },
    {
      name: "Santé",
      value: Math.round(150 * (selectedMonth / 12 + 0.8)),
      color: "#FFEAA7",
    },
    {
      name: "Autres",
      value: Math.round(250 * (selectedMonth / 12 + 0.8)),
      color: "#DDA0DD",
    },
  ];

  // Calcul des statistiques
  const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = currentData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;

  const stats = [
    {
      title: "Solde Total",
      value: `$${(totalIncome - totalExpenses).toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      bgColor: "bg-blue-500",
    },
    {
      title: "Revenus Totaux",
      value: `$${totalIncome.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      bgColor: "bg-green-500",
    },
    {
      title: "Dépenses Totales",
      value: `$${totalExpenses.toLocaleString()}`,
      change: "-3.1%",
      changeType: "negative",
      icon: TrendingDown,
      bgColor: "bg-red-500",
    },
    {
      title: "Taux d'Épargne",
      value: `${savingsRate}%`,
      change: "+5.4%",
      changeType: "positive",
      icon: BarChart3,
      bgColor: "bg-purple-500",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: "Courses alimentaires",
      amount: -85.5,
      date: "2025-07-05",
      type: "expense",
    },
    {
      id: 2,
      description: "Salaire",
      amount: 3200.0,
      date: "2025-07-01",
      type: "income",
    },
    {
      id: 3,
      description: "Facture électricité",
      amount: -120.0,
      date: "2025-07-03",
      type: "expense",
    },
    {
      id: 4,
      description: "Freelance",
      amount: 450.0,
      date: "2025-07-04",
      type: "income",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Bienvenue ! Voici votre aperçu financier.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "monthly"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calendar size={16} className="inline mr-2" />
              Mensuel
            </button>
            <button
              onClick={() => setViewMode("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "yearly"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 size={16} className="inline mr-2" />
              Annuel
            </button>
          </div>
        </div>

        {/* Date Selectors */}
        <div className="flex flex-col sm:flex-row gap-4">
          {viewMode === "monthly" ? (
            <>
              {/* Month Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mois
                </label>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="appearance-none text-black bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {monthNames.map((month, index) => (
                      <option key={index + 1} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Year Selector for Monthly View */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="appearance-none text-black bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Year Selector for Yearly View */
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Année de référence
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="text-black appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} depuis le mois dernier
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <IconComponent size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Revenus vs Dépenses (
            {viewMode === "monthly"
              ? `${monthNames[selectedMonth - 1]} ${selectedYear}`
              : `Tendance ${selectedYear}`}
            )
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="Revenus"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
                name="Dépenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Tendance d'Épargne (
            {viewMode === "monthly"
              ? `${monthNames[selectedMonth - 1]} ${selectedYear}`
              : `Tendance ${selectedYear}`}
            )
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Épargne"]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Categories and Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Expense Categories Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Catégories de Dépenses
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Montant"]} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-sm font-medium">${category.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Progression du Budget ({monthNames[selectedMonth - 1]})
          </h3>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => {
              const budget = category.value * 1.3; // Budget simulé (30% de plus que dépensé)
              const percentage = (category.value / budget) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      ${category.value} / ${budget.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor:
                          percentage > 90
                            ? "#EF4444"
                            : percentage > 70
                            ? "#F59E0B"
                            : category.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{percentage.toFixed(1)}% utilisé</span>
                    <span
                      className={`font-medium ${
                        percentage > 90
                          ? "text-red-600"
                          : percentage > 70
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      ${(budget - category.value).toFixed(0)} restant
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Transactions Récentes
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === "income"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}$
                {Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
