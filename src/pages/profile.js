import React from 'react';
import Navbar from '../components/navbar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Profile page content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;