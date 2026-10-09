import React from 'react';
import { CORRECTION_LEVELS } from '../utils/qrPresets';
import { QrCode } from 'lucide-react';

export default function CorrectionLevelSelector({
  correctionLevel,
  setCorrectionLevel,
  themeColor = '#7C4DFF',
}) {
  return (
    <div className="space-y-4 pt-2">
      <div
        style={{
          backgroundColor: `${themeColor}0D`,
          borderColor: `${themeColor}26`,
          color: '#1e293b',
        }}
        className="p-3 border rounded-xl text-xs flex items-center gap-2"
      >
        <span>ℹ️</span>
        <span>Choosing a higher error correction level improves scanner readability if distorted or covered by a logo.</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CORRECTION_LEVELS.map((item) => {
          const isSelected = correctionLevel === item.level;
          return (
            <div
              key={item.level}
              onClick={() => setCorrectionLevel(item.level)}
              style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center ${
                isSelected
                  ? 'shadow-md ring-2 ring-opacity-20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2 mb-3">
                <QrCode
                  style={{ color: isSelected ? themeColor : '#64748b' }}
                  className="w-10 h-10"
                />
              </div>

              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <span
                  style={isSelected ? { color: themeColor } : {}}
                  className={`text-xs font-bold ${isSelected ? '' : 'text-gray-900'}`}
                >
                  {item.label}
                </span>
                <span
                  style={isSelected ? { backgroundColor: themeColor, color: '#ffffff', borderColor: themeColor } : {}}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200 rounded-md"
                >
                  {item.percent}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
