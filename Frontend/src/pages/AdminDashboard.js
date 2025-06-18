import React, { act, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Routes from "../components/admin/Routes";
import Airlines from "../components/admin/Airlines";
import Flights from "../components/admin/Flights";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/parvaaz";
import Passengers from "../components/admin/passengers";
import Booking from "../components/admin/booking";
import { FaBars, FaTimes } from "react-icons/fa"; // Add this at the top
import Dashboard from "../components/admin/dashboard";
import { toast } from "react-toastify";
import Inquiries from "../components/admin/inquiries";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const tabs = [
    "dashboard",
    "passengers",
    "bookings",
    "inquiries",
    "flights",
    "airlines",
    "Routes",
    "content",
  ];
  const [content, setContent] = useState([
    {
      id: 1,
      page: "home",
      section: "hero-title",
      content: "Welcome to Parvaaz",
    },
    {
      id: 2,
      page: "home",
      section: "hero-subtitle",
      content: "Explore the world with comfort and ease",
    },
  ]);

  
  const [newContent, setNewContent] = useState({
    page: "",
    section: "",
    content: "",
  });
  const { setAdmin } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  // Passenger Handlers

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    toast.success("Successfully Logged Out")
    setAdmin({ username: "", password: "" });
    navigate("/", { replace: true });
  };

 // Content Handlers
  const handleUpdateContent = (e) => {
    e.preventDefault();
    if (!newContent.page || !newContent.section) {
      toast.warn("Page and section are required.");
      return;
    }
    const existing = content.find(
      (c) => c.page === newContent.page && c.section === newContent.section
    );
    if (existing) {
      setContent(
        content.map((c) =>
          c.id === existing.id ? { ...c, content: newContent.content } : c
        )
      );
    } else {
      const newId = content.length + 1;
      setContent([...content, { id: newId, ...newContent }]);
    }
    setNewContent({ page: "", section: "", content: "" });
    toast.success("Successfully Added!");
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 mt-[8.2vh] lg:mt-[7vh] xl:mt-[6vh] ">
        {/* Horizontal Admin Navigation */}
        <nav className="bg-primary shadow-md w-full px-6 py-4">
  <div className="flex items-center justify-between px-8 md:px-0 lg:justify-evenly">
    {/* Title */}
    <h1 className="text-white text-2xl font-bold ">Admin</h1>

    {/* Inline tabs ≥768px */}
    <div className="hidden ms-7 lg:flex gap-4">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-2 py-2 rounded ${
            activeTab === tab
              ? 'bg-blue-800 text-white'
              : 'text-blue-200 hover:bg-blue-800 hover:text-white'
          }`}
        >
          {tab[0].toUpperCase() + tab.slice(1)}
        </button>
      ))}
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded text-blue-200 hover:bg-blue-800 hover:text-white"
      >
        Logout
      </button>
    </div>

    {/* Hamburger <768px */}
    <button
      className="lg:hidden text-white text-2xl"
      onClick={() => setMenuOpen(o => !o)}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>

  {/* Dropdown <768px */}
  {menuOpen && (
    <div className="flex flex-col gap-2 mt-4 lg:hidden">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            setMenuOpen(false);
          }}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === tab
              ? 'bg-blue-800 text-white'
              : 'text-blue-200 hover:bg-blue-800 hover:text-white'
          }`}
        >
          {tab[0].toUpperCase() + tab.slice(1)}
        </button>
      ))}
      <button
        onClick={() => {
          handleLogout();
          setMenuOpen(false);
        }}
        className="w-full text-left px-4 py-2 rounded text-blue-200 hover:bg-blue-800 hover:text-white"
      >
        Logout
      </button>
    </div>
  )}
</nav>
            {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto p-8">
        

          {activeTab === "dashboard" && (
            <Dashboard />
          )}

          {activeTab === "passengers" && <Passengers />}

          {activeTab === "bookings" && <Booking />}

          {activeTab === "inquiries" && (
           <Inquiries/>
          )}

          {activeTab === "airlines" && <Airlines />}

          {activeTab === "Routes" && <Routes />}

          {activeTab === "flights" && <Flights />}

          {activeTab === "content" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Content Management</h2>
              <form
                onSubmit={handleUpdateContent}
                className="mb-8 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Page"
                    value={newContent.page}
                    onChange={(e) =>
                      setNewContent({ ...newContent, page: e.target.value })
                    }
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Section"
                    value={newContent.section}
                    onChange={(e) =>
                      setNewContent({ ...newContent, section: e.target.value })
                    }
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Content"
                    value={newContent.content}
                    onChange={(e) =>
                      setNewContent({ ...newContent, content: e.target.value })
                    }
                    className="input"
                  />
                </div>
                <button type="submit" className="btn-primary mt-4">
                  Update Content
                </button>
              </form>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700 font-medium">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-gray-700 font-medium">
                        Page
                      </th>
                      <th className="px-6 py-3 text-left text-gray-700 font-medium">
                        Section
                      </th>
                      <th className="px-6 py-3 text-left text-gray-700 font-medium">
                        Content
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-6 py-4">{item.id}</td>
                        <td className="px-6 py-4">{item.page}</td>
                        <td className="px-6 py-4">{item.section}</td>
                        <td className="px-6 py-4">{item.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;