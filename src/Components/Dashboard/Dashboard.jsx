import React, { useContext } from "react";
import useUsers from "../../Hooks/useUsers";
import { AuthContext } from "../../Provider/AuthProvider";

function Dashboard() {
  const { users } = useUsers();
  const { user } = useContext(AuthContext);
  const owner = users.find((u) => u.email === user?.email);
  const { logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        alert("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  const handleEditProfile = () => {
    alert("Edit Profile feature coming soon!");
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Welcome to the Blood Donation Dashboard
      </h2>

      {owner ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Info */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              User Information
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Name: </strong>
                <span className="text-2xl capitalize">{owner.name}</span>
              </li>
              <li>
                <strong>Blood Group:</strong>{" "}
                <span className="text-2xl border-b-4 border-red-500">
                  {owner?.bloodGroup}
                </span>
              </li>
              <li>
                <strong>Phone Number: </strong>
                <a
                  href={`tel:${owner.number}`}
                  className="text-blue-500 hover:underline text-xl"
                >
                  {owner.number}
                </a>
              </li>
              <li>
                <strong>Email:</strong> {owner.email}
              </li>

              <li className=" capitalize">
                <strong>Role:</strong> {owner.role}
              </li>
              <li>
                <strong>Member Since:</strong>{" "}
                {new Date(owner.createdAt).toLocaleDateString()}
              </li>
            </ul>
            <div className="flex justify-between items-center mt-4">
              <button className="btn btn-sm bg-blue-600 text-white mt-4 hover:bg-blue-700 transition">
                Edit Profile
              </button>
              <button
                onClick={() => handleLogout()}
                className="btn btn-sm bg-red-600 text-white mt-4 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Donation History */}
          <DonationHistory owner={owner} />
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Loading your information...
        </p>
      )}

      {/* Donation Form */}
      <div className="mt-10">
        <DonationForm />
      </div>
    </div>
  );
}

// Donation History Card
function DonationHistory({ owner }) {
  const donationHistory = [
    { date: "2023-05-15", location: "Red Cross, Dhaka", bloodGroup: "A+" },
    {
      date: "2024-01-20",
      location: "Community Center, Rajshahi",
      bloodGroup: "A+",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-red-500">
        Donation History
      </h3>
      {donationHistory.length > 0 ? (
        <ul className="space-y-4">
          {donationHistory.map((donation, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Date:</strong> {donation.date}
              </p>
              <p>
                <strong>Location:</strong> {donation.location}
              </p>
              <p>
                <strong>Blood Group:</strong> {donation.bloodGroup}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No donation history found.</p>
      )}
    </div>
  );
}

// Donation Form
function DonationForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newDonation = {
      date: formData.get("date"),
      location: formData.get("location"),
      bloodGroup: formData.get("bloodGroup"),
    };
    alert("Donation added successfully!");
    event.target.reset();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-red-500 text-center">
        Add a New Donation
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
