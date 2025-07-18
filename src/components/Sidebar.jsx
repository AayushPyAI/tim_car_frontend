import React from 'react';
import { Car, Calendar, Settings, Users, BarChart3, MessageSquare } from 'lucide-react';
import { WEBSITES } from '../types';

const Sidebar = ({ selectedWebsite, onWebsiteSelect }) => {
  const websites = [
    { id: WEBSITES.EBAY, name: 'eBay Motors', icon: Car },
    { id: WEBSITES.AUTOTRADER, name: 'AutoTrader', icon: Car },
    { id: WEBSITES.CARS, name: 'Cars.com', icon: Car },
    { id: WEBSITES.CARGURUS, name: 'CarGurus', icon: Car },
    { id: WEBSITES.DUPONT, name: 'Dupont Registry', icon: Car },
    { id: WEBSITES.CRAIGSLIST, name: 'Craigslist', icon: Car },
  ];

  const otherMenuItems = [
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Calendar', icon: Calendar },
    { name: 'Users', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="px-2 border-b border-gray-200">
      
          <img src="/logo.jpg" alt="CarZoni Logo" className=" w-full rounded-lg object-contain mx-auto" />
        
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {/* Car Websites Section */}
        <div className="mb-8">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Car Websites
          </h3>
          <ul className="space-y-1">
            {websites.map((website) => {
              const Icon = website.icon;
              const isSelected = selectedWebsite === website.id;
              
              return (
                <li key={website.id}>
                  <button
                    onClick={() => onWebsiteSelect(website.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-teal-500' : 'text-gray-400'}`} />
                    <span className="font-medium">{website.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
