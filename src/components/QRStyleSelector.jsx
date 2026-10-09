import React from 'react';
import { DOT_STYLES } from '../utils/qrPresets';
import { RefreshCw, Check, Sparkles } from 'lucide-react';

export default function QRStyleSelector({
  dotStyle,
  setDotStyle,
  dotColor,
  setDotColor,
  useGradient,
  setUseGradient,
  gradientColor2,
  setGradientColor2,
  bgColor,
  setBgColor,
  transparentBg,
  setTransparentBg,
  themeColor = '#7C4DFF',
  themePalette = [],
  onInvertColors,
}) {
  return (
    <div className="space-y-6 pt-2">
      {/* Dot Style Grid: 4 columns x 2 rows */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
          Module Dot Pattern
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {DOT_STYLES.map((style) => {
            const isSelected = dotStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setDotStyle(style.id)}
                style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
                className={`relative p-3.5 rounded-2xl border-2 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 aspect-square ${
                  isSelected
                    ? 'shadow-md ring-2 ring-opacity-20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                {isSelected && (
                  <div
                    style={{ backgroundColor: themeColor }}
                    className="absolute top-2 right-2 w-4 h-4 text-white rounded-full flex items-center justify-center"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                {/* Visual Dot Graphic */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl my-auto">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 bg-[#0D0D19] transition-transform ${
                        style.id === 'dots' ? 'rounded-full' :
                        style.id === 'rounded' ? 'rounded-sm' :
                        style.id === 'extra-rounded' ? 'rounded-md' :
                        style.id === 'classy' ? 'rounded-tl-lg rounded-br-lg' :
                        style.id === 'classy-rounded' ? 'rounded-tl-full rounded-br-full' :
                        style.id === 'diamond' ? 'rotate-45 scale-75' :
                        style.id === 'star' ? 'rounded-full scale-75' : ''
                      }`}
                    />
                  ))}
                </div>
                <span
                  style={isSelected ? { color: themeColor } : {}}
                  className={`text-xs font-semibold mt-2 text-center capitalize ${isSelected ? 'font-bold' : 'text-gray-800'}`}
                >
                  {style.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Colors Section */}
      <div className="p-5 bg-gray-50/70 rounded-2xl border border-gray-200 space-y-5">
        {/* Warning Badge */}
        <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
          <span>ℹ️</span>
          <span>For optimal reading, choose strong contrast between foreground and background colors.</span>
        </div>

        {/* 2-Column Balanced Color Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Column 1: Dots / Foreground Color */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Dots Color
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-600">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={useGradient}
                    onChange={(e) => setUseGradient(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
                <span>Gradient?</span>
              </label>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">
                {useGradient ? 'Primary Color' : 'Solid Color'}
              </span>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="w-11 h-11 p-1 rounded-xl border border-gray-300 cursor-pointer bg-white shadow-2xs"
                />
                <input
                  type="text"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none text-sm bg-white font-medium text-gray-800 uppercase shadow-2xs"
                />
              </div>

              {/* Website Global Color Swatches for Dots */}
              {themePalette.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Sparkles className="w-3 h-3" style={{ color: themeColor }} /> Website Theme Colors
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {themePalette.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDotColor(col)}
                        style={{ backgroundColor: col }}
                        className="w-6 h-6 rounded-lg border border-gray-200 transition-transform hover:scale-115 shadow-2xs cursor-pointer"
                        title={`Use website color ${col}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {useGradient && (
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">Gradient End Color</span>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="w-11 h-11 p-1 rounded-xl border border-gray-300 cursor-pointer bg-white shadow-2xs"
                  />
                  <input
                    type="text"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none text-sm bg-white font-medium text-gray-800 uppercase shadow-2xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Background Color */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Background Color
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transparentBg}
                  onChange={(e) => setTransparentBg(e.target.checked)}
                  style={{ accentColor: themeColor }}
                  className="rounded"
                />
                <span>Transparent</span>
              </label>
            </div>

            {!transparentBg ? (
              <div>
                <span className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">Card Fill</span>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-11 h-11 p-1 rounded-xl border border-gray-300 cursor-pointer bg-white shadow-2xs"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none text-sm bg-white font-medium text-gray-800 uppercase shadow-2xs"
                  />
                </div>

                {/* Website Global Color Swatches for Background */}
                {themePalette.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Sparkles className="w-3 h-3" style={{ color: themeColor }} /> Website Theme Colors
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setBgColor('#FFFFFF')}
                        style={{ backgroundColor: '#FFFFFF' }}
                        className="w-6 h-6 rounded-lg border border-gray-300 transition-transform hover:scale-115 shadow-2xs cursor-pointer"
                        title="White"
                      />
                      {themePalette.map((col, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBgColor(col)}
                          style={{ backgroundColor: col }}
                          className="w-6 h-6 rounded-lg border border-gray-200 transition-transform hover:scale-115 shadow-2xs cursor-pointer"
                          title={`Use website color ${col}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-xl text-center text-xs text-gray-500 italic">
                Background is transparent (canvas alpha)
              </div>
            )}
          </div>
        </div>

        {/* Invert Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onInvertColors}
            style={{ backgroundColor: '#ffffff', color: '#0D0D19', border: '1px solid #cbd5e1' }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" style={{ color: themeColor }} />
            Invert Foreground & Background
          </button>
        </div>
      </div>
    </div>
  );
}
