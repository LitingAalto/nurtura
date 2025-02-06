import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FoodItem {
  name: string;
  description: string;
  category: 'recommended' | 'avoid';
  tags: string[];
}

const DietTipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recommended' | 'avoid'>('recommended');

  const foodItems: FoodItem[] = [
    {
      name: 'Leafy Greens',
      description: 'Rich in iron and folic acid',
      category: 'recommended',
      tags: ['Pregnancy', 'Breastfeeding', '12+ months baby']
    },
    {
      name: 'Fish',
      description: 'High in omega-3 and protein',
      category: 'recommended',
      tags: ['Breastfeeding', '6+ months baby']
    },
    {
      name: 'Nuts',
      description: 'Good source of healthy fats',
      category: 'recommended',
      tags: ['Pregnancy', 'Breastfeeding']
    },
    {
      name: 'Raw Fish',
      description: 'Risk of harmful bacteria',
      category: 'avoid',
      tags: ['Pregnancy', 'Baby']
    },
    {
      name: 'Caffeine',
      description: 'Limit intake during pregnancy and breastfeeding',
      category: 'avoid',
      tags: ['Pregnancy', 'Breastfeeding']
    },
    {
      name: 'Unpasteurized Dairy',
      description: 'Risk of listeria',
      category: 'avoid',
      tags: ['Pregnancy', 'Baby']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Diet Tips</h1>
          <div className="w-8" />
        </div>

        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'recommended' ? 'bg-green-500 text-white' : 'bg-gray-100'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setActiveTab('avoid')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'avoid' ? 'bg-red-500 text-white' : 'bg-gray-100'
            }`}
          >
            Avoid
          </button>
        </div>
      </div>

      <div className="p-4">
        {foodItems
          .filter(item => item.category === activeTab)
          .map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  item.category === 'recommended' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DietTipsPage;