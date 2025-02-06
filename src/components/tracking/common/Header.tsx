import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onClose,
  showDelete,
  onDelete
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-pink-100">
      <button onClick={onClose} className="text-gray-600 text-xl">×</button>
      <div className="text-center">
        <h1 className="text-lg font-medium">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {showDelete ? (
        <button onClick={onDelete} className="text-gray-600">
          <TrashIcon className="h-5 w-5" />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </div>
  );
};

export default Header;