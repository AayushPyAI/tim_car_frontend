import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ListingsTable from '../components/ListingsTable';
import { ApiService } from '../services/api';
import { WEBSITES } from '../types';

const scrapeEndpoints = {
  [WEBSITES.EBAY]: '/ebay/scrape/',
  [WEBSITES.AUTOTRADER]: '/autotrader/scrape/',
  [WEBSITES.CARS]: '/cars/scrape/',
  [WEBSITES.CARGURUS]: '/cargurus/scrape/',
  [WEBSITES.DUPONT]: '/dupont/scrape/',
  [WEBSITES.CRAIGSLIST]: '/craigslist/scrape/',
};

const Dashboard = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(WEBSITES.EBAY);
  const [filters, setFilters] = useState({ make: '', model: '', year: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to show per page
  const [scraping, setScraping] = useState(false);

  // API service methods mapping
  const apiMethods = {
    [WEBSITES.EBAY]: ApiService.getEbayListings,
    [WEBSITES.AUTOTRADER]: ApiService.getAutotraderListings,
    [WEBSITES.CARS]: ApiService.getCarsListings,
    [WEBSITES.CARGURUS]: ApiService.getCargurusListings,
    [WEBSITES.DUPONT]: ApiService.getDupontListings,
    [WEBSITES.CRAIGSLIST]: ApiService.getCraigslistListings,
  };


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['listings', selectedWebsite],
    queryFn: () => apiMethods[selectedWebsite](),
    enabled: !!selectedWebsite,
  });

  // Refetch when website changes
  useEffect(() => {
    refetch();
  }, [selectedWebsite, refetch]);

  const handleWebsiteSelect = (website) => {
    console.log('Selected website:', website);
    setSelectedWebsite(website);
    setCurrentPage(1); // Reset to first page when changing website
  };

  // Handle error state
  if (error) {
    console.error('Error fetching listings:', error);
  }

  // Extract listings from API response
  const listings = data || [];
  const totalListings = data?.total || listings.length;

  // Normalize year values
  const normalizeYear = (year) => {
    return year ? year.toString().slice(-4) : ''; // Get the last 4 characters or return an empty string if year is null
  };

  // Filter listings based on selected filters
  const filteredListings = listings.filter(listing => {
    const listingYear = normalizeYear(listing.year);
    return (
      (filters.make ? listing.make === filters.make : true) &&
      (filters.model ? listing.model === filters.model : true) &&
      (filters.year ? listingYear === filters.year : true)
    );
  });

  // Calculate paginated listings
  const indexOfLastListing = currentPage * itemsPerPage;
  const indexOfFirstListing = indexOfLastListing - itemsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

  // Calculate total pages
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Pagination controls
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`mx-1 px-3 py-1 rounded border ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  console.log([...new Set(listings.map(listing => listing.year))]);

  const handleScrape = async () => {
    setScraping(true);
    try {
      const endpoint = scrapeEndpoints[selectedWebsite];
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
      });
      const data = await res.json();
      alert(`Scraped ${data.added} listings!`);
      refetch(); // Refresh listings after scraping
    } catch (err) {
      alert('Scraping failed!');
    }
    setScraping(false);
  };

  const handleDownload = () => {
    if (!filteredListings.length) {
      alert('No data to download!');
      return;
    }

    const keys = Object.keys(filteredListings[0]);
    const csvRows = [
      keys.join(','),
      ...filteredListings.map(row =>
        keys.map(key => {
          const value = row[key] === null || row[key] === undefined ? '' : row[key];
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedWebsite}_listings.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        selectedWebsite={selectedWebsite} 
        onWebsiteSelect={handleWebsiteSelect} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          selectedWebsite={selectedWebsite} 
          totalListings={totalListings}
        />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filter Section */}
          <div className="mb-4 flex items-end justify-between">
            <div className="flex space-x-4">
              <select onChange={(e) => setFilters({ ...filters, make: e.target.value })}>
                <option value="">Select Make</option>
                {[...new Set(listings.map(listing => listing.make).filter(make => make))].map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <select onChange={(e) => setFilters({ ...filters, model: e.target.value })}>
                <option value="">Select Model</option>
                {[...new Set(listings.map(listing => listing.model).filter(model => model))].map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              <select onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                <option value="">Select Year</option>
                {[...new Set(listings.map(listing => normalizeYear(listing.year)).filter(year => year))].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex">
              <button
                onClick={handleScrape}
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                disabled={scraping}
              >
                {scraping ? 'Scraping...' : 'Call Scraper'}
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
              >
                Download Excel
              </button>
            </div>
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Failed to load listings. Please check your API connection.</span>
            </div>
          ) : (
            <>
              <ListingsTable 
                listings={currentListings}
                loading={isLoading}
                website={selectedWebsite}
              />
              {/* Pagination Controls */}
              {filteredListings.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="mx-1 px-3 py-1 rounded border bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  {renderPagination()}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="mx-1 px-3 py-1 rounded border bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
