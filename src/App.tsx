import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import { useAuth, AdminPortal, useAuthActions } from "@frontegg/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState("");
  const { user, isAuthenticated } = useAuth();
  //const loginWithRedirect = useLoginWithRedirect();
  const { switchTenant } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      setSelectedTenant(user.tenantId);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    }
  }, [isAuthenticated, navigate]);
  
  const handleSwitchTenant = (tenantId: string) => {
    switchTenant({ tenantId });
    window.location.reload();
  };

  const logout = () => {
    // const baseUrl = ContextHolder.getContext().baseUrl;
    // window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    navigate("/account/logout");
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const handleClick = () => {
    AdminPortal.show();
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-900 text-gray-100">
          {/* Sidebar */}
          <aside
            className={`bg-gray-800 ${
              isSidebarCollapsed ? "w-16" : "w-64"
            } min-h-screen p-4 transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                {!isSidebarCollapsed && (
                  <h2 className="text-xl font-bold">Dashboard</h2>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-full"
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight className="h-6 w-6" />
                  ) : (
                    <ChevronLeft className="h-6 w-6" />
                  )}
                </Button>
              </div>
              <nav className="space-y-4 flex-grow">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${
                    isSidebarCollapsed ? "px-2" : "px-4"
                  }`}
                >
                  <LayoutDashboard
                    className={`h-5 w-5 ${
                      isSidebarCollapsed ? "mr-0" : "mr-2"
                    }`}
                  />
                  {!isSidebarCollapsed && <span>Dashboard</span>}
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${
                    isSidebarCollapsed ? "px-2" : "px-4"
                  }`}
                >
                  <FileText
                    className={`h-5 w-5 ${
                      isSidebarCollapsed ? "mr-0" : "mr-2"
                    }`}
                  />
                  {!isSidebarCollapsed && <span>Documents</span>}
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${
                    isSidebarCollapsed ? "px-2" : "px-4"
                  }`}
                  onClick={handleClick}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      isSidebarCollapsed ? "mr-0" : "mr-2"
                    }`}
                  />
                  {!isSidebarCollapsed && <span>Settings</span>}
                </Button>
              </nav>
              <div className="mt-auto">
                {!isSidebarCollapsed && (
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="bg-black text-white">
                      <AvatarImage
                        src={
                          user?.profilePictureUrl ??
                          `${user?.name?.charAt(0).toUpperCase()}`
                        }
                        alt="User"
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${
                    isSidebarCollapsed ? "px-2" : "px-4"
                  }`}
                  onClick={logout}
                >
                  <LogOut
                    className={`h-5 w-5 ${
                      isSidebarCollapsed ? "mr-0" : "mr-2"
                    }`}
                  />
                  {!isSidebarCollapsed && <span>Logout</span>}
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full md:w-[300px] bg-gray-700 border-gray-600 text-white placeholder-black"
                />
                {user?.tenantIds && user?.tenantIds.length > 0 && (
                  <div className="relative">
                    <select
                      value={selectedTenant}
                      onChange={(e) => handleSwitchTenant(e.target.value)}
                      className="appearance-none bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {user?.tenantIds.map((tenant) => (
                        <option key={tenant} value={tenant}>
                          {tenant}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <Avatar>
                  <AvatarImage
                    src={
                      user?.profilePictureUrl ??
                      `${user?.name?.charAt(0).toUpperCase()}`
                    }
                    alt="User"
                  />

                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 bg-gray-900">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">
                  Welcome back, {user?.name ?? "User"}!
                </h2>
                <p className="text-gray-400">
                  Here's what's happening with your projects today.
                </p>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <LoaderCircle className="text-blue-500" />
        </div>
      )}
    </div>
  );
}
