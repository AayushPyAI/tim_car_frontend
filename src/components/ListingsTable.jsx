import React from 'react';

const ListingsTable = ({ listings, loading, website, handleSort, sortConfig }) => {
  if (loading) return <div>Loading...</div>;

  // Helper to render sort indicator
  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('title')}>Title{renderSortIndicator('title')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('vin')}>VIN{renderSortIndicator('vin')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('make')}>Make{renderSortIndicator('make')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('model')}>Model{renderSortIndicator('model')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('year')}>Year{renderSortIndicator('year')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('mileage')}>Mileage{renderSortIndicator('mileage')}</th>
          <th className="border border-gray-300 p-2 cursor-pointer select-none" onClick={() => handleSort('price')}>Price{renderSortIndicator('price')}</th>
          <th className="border border-gray-300 p-2">Location</th>
          <th className="border border-gray-300 p-2">Contact Info</th>
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Link</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((listing) => (
          <tr key={listing.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">{listing.title}</td>
            <td className="border border-gray-300 p-2">{listing.vin}</td>
            <td className="border border-gray-300 p-2">{listing.make}</td>
            <td className="border border-gray-300 p-2">{listing.model}</td>
            <td className="border border-gray-300 p-2">{listing.year}</td>
            <td className="border border-gray-300 p-2">{listing.mileage}</td>
            <td className="border border-gray-300 p-2">{listing.price}</td>
            <td className="border border-gray-300 p-2">{listing.location}</td>
            <td className="border border-gray-300 p-2">{listing.contact_info}</td>
            <td className="border border-gray-300 p-2">
              <img src={listing.image_url} alt={listing.title} className="w-16 h-16 object-cover" />
            </td>
            <td className="border border-gray-300 p-2">
              <a href={listing.listing_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Listing</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListingsTable;
