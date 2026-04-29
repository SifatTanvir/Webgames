import React, {
  useState,
  useCallback,
  FC,
  SVGProps,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const PASSWORD_SqlRun = "RunningWasNoFun";

export const TASK_ID_SqlRun = "projectmanagement-logging-runsqldownloadresults";

// --- TYPE DEFINITIONS --- //

type Page = "dashboard" | "tables" | "sql-editor" | "settings";

interface ToastState {
  id: number;
  message: string;
  type: "success" | "error";
}

interface SqlResult {
  columns: string[];
  rows: (string | number)[][];
  rowCount: number;
  executionTime: number;
  isCorrectQuery?: boolean;
}

interface TableSchema {
  name: string;
  type: string;
  nullable: boolean;
}

interface Table {
  name: string;
  schema: TableSchema[];
  rowCount: number;
  size: string;
  data: Record<string, string | number | boolean>[];
}

interface TaskProgress {
  hasGone: boolean;
  hasRun: boolean;
  hasDownloaded: boolean;
}

// --- MOCK DATA GENERATION --- //

const generateMockData = (
  tableName: string,
  count: number,
): Record<string, string | number | boolean>[] => {
  const data: Record<string, string | number | boolean>[] = [];
  const statuses = ["shipped", "pending", "delivered", "cancelled"];
  for (let i = 1; i <= count; i++) {
    switch (tableName) {
      case "orders":
        data.push({
          order_id: 1000 + i,
          user_id: 200 + i,
          status: statuses[i % statuses.length],
          total: (Math.random() * 200 + 20).toFixed(2),
          created_at: new Date(Date.now() - Math.random() * 1e10)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        });
        break;
      case "users":
        data.push({
          user_id: 200 + i,
          email: `user${i}@example.com`,
          first_name: `FirstName${i}`,
          last_name: `LastName${i}`,
          last_login: new Date(Date.now() - Math.random() * 1e10)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        });
        break;
      case "products":
        data.push({
          product_id: 500 + i,
          name: `Product ${i}`,
          price: (Math.random() * 100 + 5).toFixed(2),
          in_stock: Math.random() > 0.2,
        });
        break;
    }
  }
  return data;
};

// --- MOCK DATA --- //

const MOCK_TABLES: Table[] = [
  {
    name: "orders",
    rowCount: 10580,
    size: "1.2 MB",
    schema: [
      { name: "order_id", type: "INTEGER", nullable: false },
      { name: "user_id", type: "INTEGER", nullable: false },
      { name: "status", type: "VARCHAR(255)", nullable: false },
      { name: "total", type: "DECIMAL(10, 2)", nullable: false },
      { name: "created_at", type: "TIMESTAMP", nullable: false },
    ],
    data: generateMockData("orders", 10),
  },
  {
    name: "users",
    rowCount: 2500,
    size: "350 KB",
    schema: [
      { name: "user_id", type: "INTEGER", nullable: false },
      { name: "email", type: "VARCHAR(255)", nullable: false },
      { name: "first_name", type: "VARCHAR(255)", nullable: true },
      { name: "last_name", type: "VARCHAR(255)", nullable: true },
      { name: "last_login", type: "TIMESTAMP", nullable: true },
    ],
    data: generateMockData("users", 10),
  },
  {
    name: "products",
    rowCount: 150,
    size: "50 KB",
    schema: [
      { name: "product_id", type: "INTEGER", nullable: false },
      { name: "name", type: "VARCHAR(255)", nullable: false },
      { name: "price", type: "DECIMAL(10, 2)", nullable: false },
      { name: "in_stock", type: "BOOLEAN", nullable: false },
    ],
    data: generateMockData("products", 10),
  },
];

// --- SVG ICONS (as React Components) --- //

const DatabaseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const LayoutDashboardIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1"></rect>
    <rect width="7" height="5" x="14" y="3" rx="1"></rect>
    <rect width="7" height="9" x="14" y="12" rx="1"></rect>
    <rect width="7" height="5" x="3" y="16" rx="1"></rect>
  </svg>
);

const TableIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18"></path>
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M3 9h18"></path>
    <path d="M3 15h18"></path>
  </svg>
);

const TerminalIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" x2="20" y1="19" y2="19"></line>
  </svg>
);

const SettingsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const CheckCircleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertTriangleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" x2="12" y1="9" y2="13"></line>
    <line x1="12" x2="12.01" y1="17" y2="17"></line>
  </svg>
);

const XIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LoaderIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const DownloadIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
);

// --- HOOKS --- //

const useToasts = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      const newToast: ToastState = { id: Date.now(), message, type };
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    },
    [],
  );

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
};

// --- UI COMPONENTS --- //

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onGoToSqlEditor: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  onGoToSqlEditor,
}) => {
  const navItems: {
    id: Page;
    name: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  }[] = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboardIcon },
    { id: "tables", name: "Tables", icon: TableIcon },
    { id: "sql-editor", name: "SQL Editor", icon: TerminalIcon },
    { id: "settings", name: "Settings", icon: SettingsIcon },
  ];

  const handlePageChange = (page: Page) => {
    if (page === "sql-editor") {
      onGoToSqlEditor();
    }
    setCurrentPage(page);
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex">
      <div className="p-4 border-b border-slate-200 flex items-center space-x-3">
        <DatabaseIcon className="w-8 h-8 text-pink-500" />
        <div>
          <h1 className="font-bold text-lg text-slate-800">DataSphere</h1>
          <p className="text-xs text-slate-500">Main Production DB</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-pink-50 text-pink-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${isActive ? "text-pink-500" : "text-slate-400"}`}
              />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://placehold.co/40x40/E9D5FF/4C1D95?text=AV"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm text-slate-800">Alex Vance</p>
            <p className="text-xs text-slate-500">DB Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageTitle: FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
    <p className="text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const StatCard: FC<{
  title: string;
  value: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}> = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center space-x-4">
    <div className="p-3 bg-pink-50 rounded-lg">
      <Icon className="w-6 h-6 text-pink-500" />
    </div>
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const DashboardPage: FC = () => {
  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle="Overview of your production database."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tables" value="3" icon={TableIcon} />
        <StatCard title="Active Connections" value="17" icon={DatabaseIcon} />
        <StatCard title="Avg. Query Time" value="23ms" icon={TerminalIcon} />
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between text-sm">
            <p className="text-slate-600">
              User <span className="font-medium text-slate-800">admin</span> ran
              a query on `orders`.
            </p>
            <span className="text-slate-400">2 minutes ago</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <p className="text-slate-600">Table `users` was updated.</p>
            <span className="text-slate-400">15 minutes ago</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <p className="text-slate-600">
              New connection established from{" "}
              <span className="font-mono text-xs bg-slate-100 p-1 rounded">
                192.168.1.10
              </span>
              .
            </p>
            <span className="text-slate-400">1 hour ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const TablesPage: FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table>(MOCK_TABLES[0]);

  return (
    <div>
      <PageTitle
        title="Tables"
        subtitle="Browse and inspect your database tables and schemas."
      />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <h3 className="font-bold text-slate-800 mb-4">All Tables</h3>
          <div className="space-y-2">
            {MOCK_TABLES.map((table) => (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${selectedTable.name === table.name ? "bg-pink-50 text-pink-600" : "hover:bg-slate-100"}`}
              >
                <p className="font-medium text-sm">{table.name}</p>
                <p className="text-xs text-slate-500">
                  {table.rowCount.toLocaleString()} rows
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-1">
              {selectedTable.name}
            </h3>
            <p className="text-sm text-slate-500 mb-6">Schema definition</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="p-3">Column Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Nullable</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTable.schema.map((col) => (
                    <tr
                      key={col.name}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <td className="p-3 font-mono text-slate-700">
                        {col.name}
                      </td>
                      <td className="p-3 font-mono text-pink-600">
                        {col.type}
                      </td>
                      <td className="p-3">{col.nullable ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">
              Preview Data (First 10 Rows)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    {selectedTable.schema.map((col) => (
                      <th key={col.name} className="p-3 whitespace-nowrap">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedTable.data.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      {selectedTable.schema.map((col) => (
                        <td
                          key={col.name}
                          className="p-3 font-mono text-slate-700 whitespace-nowrap"
                        >
                          {String(row[col.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SqlEditorPageProps {
  showToast: (message: string, type: "success" | "error") => void;
  onRunCorrectQuery: () => void;
  onDownloadResult: () => void;
  setCanComplete: Dispatch<SetStateAction<boolean>>;
  canComplete: boolean;
}

const SqlEditorPage: FC<SqlEditorPageProps> = ({
  showToast,
  onRunCorrectQuery,
  onDownloadResult,
  setCanComplete,
  canComplete,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [result, setResult] = useState<SqlResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunQuery = () => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const trimmedQuery = query.trim().replace(/;/g, "").toLowerCase();

      if (
        trimmedQuery === "select count(*) from orders where status = 'shipped'"
      ) {
        const executionTime = Math.floor(Math.random() * (60 - 20 + 1) + 20);
        setResult({
          columns: ["count"],
          rows: [[142]],
          rowCount: 1,
          executionTime: executionTime,
          isCorrectQuery: true,
        });
        showToast("Query executed successfully.", "success");
        if (canComplete) {
          onRunCorrectQuery();
        }
      } else if (trimmedQuery.startsWith("select * from")) {
        setCanComplete(false);
        const tableNameMatch = trimmedQuery.match(/select \* from (\w+)/);
        const tableName = tableNameMatch ? tableNameMatch[1] : null;
        const table = MOCK_TABLES.find((t) => t.name === tableName);

        if (table) {
          const executionTime = Math.floor(Math.random() * (150 - 50 + 1) + 50);
          const dataRows = table.data.map((row) =>
            table.schema.map((col) => String(row[col.name])),
          );
          setResult({
            columns: table.schema.map((col) => col.name),
            rows: dataRows,
            rowCount: table.data.length,
            executionTime: executionTime,
          });
          showToast(
            `Query executed successfully. Displaying ${table.data.length} rows.`,
            "success",
          );
        } else {
          setError(`Error: Table '${tableName}' not found.`);
          showToast("Query failed to execute.", "error");
        }
      } else if (trimmedQuery.startsWith("select")) {
        setError(
          "Error: Query not supported. This app only supports SELECT * queries.",
        );
        showToast("Query failed to execute.", "error");
      } else {
        setError("Error: This app only supports SELECT * queries.");
        showToast("Invalid query type.", "error");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    showToast("Preparing your download...", "success");
    setTimeout(() => {
      setIsDownloading(false);
      showToast("Download started.", "success");
      if (canComplete && result?.isCorrectQuery) {
        onDownloadResult();
      } else if (canComplete) {
        setCanComplete(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <PageTitle
        title="SQL Editor"
        subtitle="Run SQL queries directly on your database."
      />
      <div className="flex-grow flex flex-col bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., SELECT * FROM users;"
            className="w-full h-40 p-3 font-mono text-sm bg-slate-50 rounded-lg border border-slate-300 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none resize-none"
          />
          <div className="mt-2 flex items-center gap-x-3 text-xs text-slate-500">
            <span className="font-medium">Try an example:</span>
            <button
              onClick={() => setQuery("SELECT * FROM users;")}
              className="font-mono bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
            >
              Users
            </button>
            <button
              onClick={() => setQuery("SELECT * FROM products;")}
              className="font-mono bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
            >
              Products
            </button>
          </div>
        </div>
        <div className="p-4 flex justify-between items-center">
          <p className="text-xs text-slate-500">
            Enter a query or use an example, then press Run.
          </p>
          <button
            onClick={handleRunQuery}
            disabled={isLoading || !query}
            className="px-5 py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {isLoading && <LoaderIcon className="w-4 h-4" />}
            <span>{isLoading ? "Running..." : "Run Query"}</span>
          </button>
        </div>
      </div>
      <div className="mt-6">
        {result && (
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Query Result</h3>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Success
                </span>
                <span className="text-xs text-slate-500">
                  {result.rowCount} row(s)
                </span>
                <span className="text-xs text-slate-500">
                  {result.executionTime}ms
                </span>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 disabled:opacity-50 flex items-center space-x-1.5 transition-colors"
                >
                  {isDownloading ? (
                    <LoaderIcon className="w-3 h-3" />
                  ) : (
                    <DownloadIcon className="w-3 h-3" />
                  )}
                  <span>{isDownloading ? "Preparing..." : "Download"}</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    {result.columns.map((col) => (
                      <th key={col} className="p-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="p-3 font-mono text-slate-700 whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface SettingsPageProps {
  showToast: (message: string, type: "success" | "error") => void;
  setCanComplete: Dispatch<SetStateAction<boolean>>;
}

const SettingsPage: FC<SettingsPageProps> = ({ showToast, setCanComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [host, setHost] = useState("db.datasphere.cloud");
  const [port, setPort] = useState("5432");
  const [username, setUsername] = useState("prod_user_readonly");

  const handleSaveChanges = () => {
    setCanComplete(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Settings saved successfully!", "success");
    }, 1200);
  };

  return (
    <div>
      <PageTitle
        title="Settings"
        subtitle="Manage your database connection and preferences."
      />
      <div className="bg-white p-8 rounded-xl border border-slate-200 max-w-2xl">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Connection Details
        </h3>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="host"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Host
            </label>
            <input
              type="text"
              id="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label
              htmlFor="port"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Port
            </label>
            <input
              type="text"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              Changes to connection details will require an application restart.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleSaveChanges}
            disabled={isLoading}
            className="px-5 py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            {isLoading && <LoaderIcon className="w-4 h-4" />}
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ToastContainer: FC<{
  toasts: ToastState[];
  removeToast: (id: number) => void;
}> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-3 w-80">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`w-full bg-white shadow-lg rounded-lg p-4 flex items-start space-x-3 border-l-4 ${toast.type === "success" ? "border-green-500" : "border-red-500"}`}
        >
          <div className="flex-shrink-0">
            {toast.type === "success" ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangleIcon className="w-6 h-6 text-red-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-slate-800">
              {toast.type === "success" ? "Success" : "Error"}
            </p>
            <p className="text-sm text-slate-600">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const SecretPasswordCard: FC = () => (
  <div className="fixed bottom-5 left-5 z-50 bg-white shadow-lg rounded-xl p-6 border border-pink-200">
    <p className="text-sm text-slate-600">Secret password:</p>
    <p className="text-3xl font-bold text-pink-600 tracking-wider">
      {PASSWORD_SqlRun}
    </p>
  </div>
);

// --- MAIN APP COMPONENT --- //

export default function SqlRun() {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_SqlRun);

  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const { toasts, showToast, removeToast } = useToasts();
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    hasGone: false,
    hasRun: false,
    hasDownloaded: false,
  });
  const [canComplete, setCanComplete] = useState(true);

  const handleGoToSqlEditor = () => {
    setTaskProgress((prev) => ({ ...prev, hasGone: true }));
  };

  const handleRunCorrectQuery = () => {
    if (canComplete && taskProgress.hasGone) {
      setTaskProgress((prev) => ({ ...prev, hasRun: true }));
    } else if (canComplete) {
      setCanComplete(false);
    }
  };

  const handleDownloadResult = () => {
    if (canComplete && taskProgress.hasGone && taskProgress.hasRun) {
      setTaskProgress((prev) => ({ ...prev, hasDownloaded: true }));
    } else if (canComplete) {
      setCanComplete(false);
    }
  };

  const allTasksCompleted =
    taskProgress.hasGone && taskProgress.hasRun && taskProgress.hasDownloaded;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (canComplete && Object.values(taskProgress).every((el) => el)) {
      recordSuccess();
    }
  }, [canComplete, taskProgress, recordSuccess]);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "tables":
        return <TablesPage />;
      case "sql-editor":
        return (
          <SqlEditorPage
            showToast={showToast}
            onRunCorrectQuery={handleRunCorrectQuery}
            onDownloadResult={handleDownloadResult}
            canComplete={canComplete}
            setCanComplete={setCanComplete}
          />
        );
      case "settings":
        return (
          <SettingsPage showToast={showToast} setCanComplete={setCanComplete} />
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onGoToSqlEditor={handleGoToSqlEditor}
      />
      <main className="flex-1 p-8 overflow-y-auto">{renderPage()}</main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {allTasksCompleted && <SecretPasswordCard />}
    </div>
  );
}
