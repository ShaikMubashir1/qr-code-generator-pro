import React from 'react';
import { CORNER_BORDER_STYLES, CORNER_CENTER_STYLES } from '../utils/qrPresets';

export default function CornerSelector({
  cornerBorderStyle,
  setCornerBorderStyle,
  cornerBorderColor,
  setCornerBorderColor,
  cornerCenterStyle,
  setCornerCenterStyle,
  cornerCenterColor,
  setCornerCenterColor,
  themeColor = '#7C4DFF',
  themePalette = [],
}) {
  return (
    <div className="space-y-6">
      {/* Corner Outer Border Style */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Border Style (Outer Finder Pattern)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CORNER_BORDER_STYLES.map((border) => {
            const isSelected = cornerBorderStyle === border.id;
            return (
              <div
                key={border.id}
                onClick={() => setCornerBorderStyle(border.id)}
                style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isSelected
                    ? 'shadow-md ring-2 ring-opacity-20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                <div className={`w-8 h-8 border-4 border-gray-900 flex items-center justify-center ${
                  border.id === 'dot' ? 'rounded-full' :
                  border.id === 'extra-rounded' ? 'rounded-lg' :
                  border.id === 'leaf' ? 'rounded-tl-2xl rounded-br-2xl' : 'rounded-none'
                }`}>
                  <div className="w-2 h-2 bg-gray-900" />
                </div>
                <span
                  style={isSelected ? { color: themeColor } : {}}
                  className={`text-[11px] font-semibold mt-2 text-center capitalize ${isSelected ? 'font-bold' : 'text-gray-700'}`}
                >
                  {border.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corner Center Style */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Center Style (Inner Eye)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {CORNER_CENTER_STYLES.map((center) => {
            const isSelected = cornerCenterStyle === center.id;
            return (
              <div
                key={center.id}
                onClick={() => setCornerCenterStyle(center.id)}
                style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all aspect-square ${
                  isSelected
                    ? 'shadow-md ring-2 ring-opacity-20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  {center.id === 'dot' && <div className="w-4 h-4 bg-gray-900 rounded-full" />}
                  {center.id === 'square' && <div className="w-4 h-4 bg-gray-900" />}
                  {center.id === 'rounded' && <div className="w-4 h-4 bg-gray-900 rounded-sm" />}
                  {center.id === 'star' && <span className="text-sm font-bold text-gray-900">★</span>}
                  {center.id === 'heart' && <span className="text-sm font-bold text-gray-900">♥</span>}
                  {center.id === 'diamond' && <div className="w-3.5 h-3.5 bg-gray-900 rotate-45" />}
                  {center.id === 'plus' && <span className="text-base font-bold text-gray-900 leading-none">+</span>}
                </div>
                <span
                  style={isSelected ? { color: themeColor } : {}}
                  className="text-[11px] font-medium text-gray-700 mt-2 text-center capitalize"
                >
                  {center.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Controls */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Border Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cornerBorderColor}
              onChange={(e) => setCornerBorderColor(e.target.value)}
              className="w-9 h-9 p-0.5 rounded border border-gray-300 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={cornerBorderColor}
              onChange={(e) => setCornerBorderColor(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm bg-white uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Center Eye Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cornerCenterColor}
              onChange={(e) => setCornerCenterColor(e.target.value)}
              className="w-9 h-9 p-0.5 rounded border border-gray-300 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={cornerCenterColor}
              onChange={(e) => setCornerCenterColor(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm bg-white uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
