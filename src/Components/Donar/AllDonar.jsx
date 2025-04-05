import React, { useContext, useEffect, useState } from "react";
import useUsers from "./../../Hooks/useUsers";
import Loading from "../../Layouts/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

function AllDonar() {
  const { users } = useUsers();

  const { user: owner } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const usersPerPage = 12;
  // Details modal state
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Blood groups for filter dropdown
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Initialize AOS only once when component mounts
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  // Handle loading state when users change
  useEffect(() => {
    if (users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  // Refresh AOS only when currentPage changes, not on every render
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [currentPage, loading]);

  // Filter users based on search term, blood group, and role
  useEffect(() => {
    if (users.length > 0) {
      let result = [...users];

      result = result.filter((user) => user.role === "member");

      // Filter by blood group if selected
      if (selectedBloodGroup) {
        result = result.filter(
          (user) => user.bloodGroup === selectedBloodGroup
        );
      }

      // Filter by search term (name or email)
      if (searchTerm) {
        result = result.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredUsers(result);
    }
  }, [users, searchTerm, selectedBloodGroup]);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBloodGroup("");
    setCurrentPage(1);
  };

  // Pagination logic - computed values, not state
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return <Loading />;
  }

  const handleDetails = (user) => {
    setuser(user);
    if (owner) {
      return setIsModalOpen(true);
    } else {
      navigate("/login", {
        state: { redirectTo: `/donar/${user._id}` },
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1
        className="text-3xl md:text-5xl font-bold mb-6 text-center bg-red-300 py-6"
        data-aos="fade-down"
      >
        All Donors
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4" data-aos="fade-up">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:w-1/4">
          <select
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="flex justify-between">
        <div className="mb-4 text-gray-600" data-aos="fade-up">
          Showing {filteredUsers.length} donor
          {filteredUsers.length !== 1 ? "s" : ""}
        </div>
        <div className="mb-4 text-gray-600" data-aos="fade-up">
          Total {users.length} donor
          {users.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Donors Grid */}
      {filteredUsers.length === 0 ? (
        <div
          className="flex justify-center items-center h-64"
          data-aos="fade-in"
        >
          <h2 className="text-2xl font-semibold text-gray-500">
            No donors found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUsers.map((user, index) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              data-aos="zoom-in-up"
              data-aos-delay={100 * (index % 3)} // Reduced number of different delays
            >
              <div className="flex items-center mb-4">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Blood Group:</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    {user.bloodGroup}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Last Donation:</span>
                  <span>{user.lastDonation || "No record"}</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="font-medium">Location: </span>
                  <div className="flex ml-2">
                    <span>{user?.address?.union || "Not specified"}</span> ,
                    <span>{user?.address?.upozila || "Not specified"}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-end">
                  <span className="font-medium">Phone: </span>
                  <a
                    href={`tel:${user?.number}`}
                    className="text-blue-500 hover:underline text-xl"
                  >
                    {user?.number || "Not Provided"}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleDetails(user)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-300"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8" data-aos="fade-up">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-4 w-full min-h-screen">
          <div className="modal-content w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out mt-12">
            {/* Modal Header */}
            <img
              className="h-[200px] lg:h-[250px] w-full object-cover "
              src={user?.image}
              alt={user?.title}
            />

            {/* Modal Body */}
            <div className="text-gray-700 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)] px-4">
              <p>
                <strong>Name:</strong>{" "}
                <span className="text-xl">{user?.name}</span>
              </p>
              <p>
                <strong>Blood Group:</strong> {user?.bloodGroup}
              </p>
              <p>
                <strong>Last Donation:</strong>{" "}
                {user?.lastDonation || "No record"}
              </p>
              <p>
                <strong>Total Donation: </strong>
                {user?.totalDonation || "No record"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {user?.address?.union || "Not specified"} ,
                {user?.address?.upozila || "Not specified"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${user?.number}`}
                  className="text-blue-500 hover:underline text-xl"
                >
                  {user?.number || "Not Provided"}
                </a>
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between mt-6 px-4 bg-slate-100">
              <button className="btn btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none">
                Request for Donation
              </button>
              <button className="btn btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none">
                Like
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDonar;
