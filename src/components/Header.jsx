import React from 'react';

const Header = ({ selectedWebsite, totalListings }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {selectedWebsite} Listings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalListings} {totalListings === 1 ? 'listing' : 'listings'} found
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
