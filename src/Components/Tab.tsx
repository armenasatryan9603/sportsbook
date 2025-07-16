import React from "react";

interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors duration-200
              ${activeTab === tab.id ? "tab-active" : "tab-inactive"}
            `}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tab;
