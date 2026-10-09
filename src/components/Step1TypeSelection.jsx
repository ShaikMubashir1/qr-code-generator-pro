import React from 'react';
import { QR_TYPES } from '../utils/qrPresets';
import { Globe, FileText, Wifi, UserCheck, Mail, Phone, MessageSquare, MessageCircle, MapPin, Calendar } from 'lucide-react';

const iconMap = {
  Globe,
  FileText,
  Wifi,
  UserCheck,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  MapPin,
  Calendar,
};

export default function Step1TypeSelection({ selectedType, setType, themeColor = '#7C4DFF', onNext }) {
  const handleSelect = (typeId) => {
    setType(typeId);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Select QR Code Type</h2>
        <p className="text-gray-500 mt-1 text-sm">Choose the type of content you want your QR code to contain.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QR_TYPES.map((type) => {
          const IconComponent = iconMap[type.icon] || Globe;
          const isSelected = selectedType === type.id;

          return (
            <div
              key={type.id}
              onClick={() => handleSelect(type.id)}
              style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
              className={`group p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'shadow-md ring-2 ring-opacity-20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  style={isSelected ? { backgroundColor: themeColor, color: '#ffffff' } : {}}
                  className={`p-3 rounded-xl ${isSelected ? '' : 'bg-gray-100 text-gray-700'}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <div
                  style={isSelected ? { borderColor: themeColor, backgroundColor: themeColor } : {}}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? '' : 'border-gray-300'}`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>

              <div className="mt-4">
                <h3
                  style={isSelected ? { color: themeColor } : {}}
                  className="font-semibold text-gray-900 transition-colors"
                >
                  {type.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{type.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
