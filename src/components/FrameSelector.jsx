import React from 'react';
import { FRAME_PRESETS } from '../utils/qrPresets';
import { QrCode, Check, Sparkles } from 'lucide-react';

export default function FrameSelector({
  selectedFrame,
  setFrame,
  frameText,
  setFrameText,
  frameColor,
  setFrameColor,
  themeColor = '#7C4DFF',
  themePalette = [],
}) {
  return (
    <div className="space-y-6 pt-2">
      {/* Frame Preset Spacious Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {FRAME_PRESETS.map((preset) => {
          const isSelected = selectedFrame === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => setFrame(preset.id)}
              style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}0D` } : {}}
              className={`relative p-4 rounded-2xl border-2 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 min-h-[140px] ${
                isSelected
                  ? 'shadow-md ring-2 ring-opacity-20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div
                  style={{ backgroundColor: themeColor }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 text-white rounded-full flex items-center justify-center shadow-xs"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* High-Fidelity Frame Thumbnail */}
              <div className="w-20 h-20 border border-gray-300/80 rounded-xl flex flex-col items-center justify-center bg-gray-50/80 p-2 shadow-2xs overflow-hidden relative mt-1">
                {preset.id === 'none' && (
                  <span className="text-gray-400 font-bold text-xs">NO FRAME</span>
                )}

                {preset.id === 'scan-top' && (
                  <div
                    className="w-full h-3.5 rounded-sm text-[7px] text-white flex items-center justify-center font-bold tracking-wider mb-auto"
                    style={{ backgroundColor: frameColor }}
                  >
                    SCAN ME
                  </div>
                )}

                {preset.id === 'badge' && (
                  <div
                    className="px-2 py-0.5 rounded-full text-[6px] text-white flex items-center justify-center font-bold tracking-wider mb-auto"
                    style={{ backgroundColor: frameColor }}
                  >
                    SCAN ME
                  </div>
                )}

                {preset.id === 'envelope' && (
                  <div className="absolute top-0.5 w-10 h-2 border-b-2 border-gray-400" style={{ borderColor: frameColor }} />
                )}

                {preset.id === 'chef' && (
                  <div className="text-[11px] mb-auto -mt-1">👨‍🍳</div>
                )}

                {preset.id === 'food-cover' && (
                  <div className="text-[11px] mb-auto -mt-1">🍽️</div>
                )}

                {preset.id === 'gift' && (
                  <div className="text-[11px] mb-auto -mt-1">🎀</div>
                )}

                {preset.id === 'shopping-bag' && (
                  <div className="w-6 h-2 border-t-2 border-x-2 rounded-t-sm mb-auto" style={{ borderColor: frameColor }} />
                )}

                {preset.id === 'drink' && (
                  <div className="text-[11px] mb-auto self-start ml-2 -mt-1">🍹</div>
                )}

                {preset.id === 'beer' && (
                  <div className="absolute right-1 top-6 w-2 h-7 border-2 rounded-r-md" style={{ borderColor: frameColor }} />
                )}

                {preset.id === 'phone-frame' && (
                  <div className="absolute inset-1 rounded-lg border-2 border-gray-800 pointer-events-none">
                    <div className="w-5 h-1 bg-gray-800 rounded-full mx-auto mt-0.5" />
                  </div>
                )}

                {preset.id === 'notepad' && (
                  <div className="absolute top-1 w-8 h-1.5 bg-gray-400 rounded-xs" />
                )}

                {preset.id === 'clipboard' && (
                  <div className="absolute top-1 w-6 h-2 bg-gray-700 rounded-xs" />
                )}

                {preset.id === 'burst' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-0.5">
                    <span className="text-[9px] font-bold" style={{ color: frameColor }}>⚡</span>
                    <span className="text-[9px] font-bold" style={{ color: frameColor }}>⚡</span>
                  </div>
                )}

                {preset.id !== 'none' && <QrCode className="w-7 h-7 text-gray-800 my-auto" />}

                {preset.id === 'scan-bottom' && (
                  <div
                    className="w-full h-3.5 rounded-sm text-[7px] text-white flex items-center justify-center font-bold tracking-wider mt-auto"
                    style={{ backgroundColor: frameColor }}
                  >
                    SCAN ME
                  </div>
                )}

                {preset.id === 'speech-bubble' && (
                  <div className="w-full flex flex-col items-center mt-auto">
                    <div className="w-0 h-0 border-x-3 border-x-transparent border-b-3" style={{ borderBottomColor: frameColor }} />
                    <div
                      className="w-full h-3 rounded-xs text-[6px] text-white flex items-center justify-center font-bold tracking-wider"
                      style={{ backgroundColor: frameColor }}
                    >
                      SCAN ME
                    </div>
                  </div>
                )}

                {preset.id === 'waiter' && (
                  <div className="w-full flex flex-col items-center mt-auto">
                    <div
                      className="w-full h-2.5 rounded-xs text-[5.5px] text-white flex items-center justify-center font-bold"
                      style={{ backgroundColor: frameColor }}
                    >
                      MENU
                    </div>
                    <div className="w-12 h-1 rounded-full bg-gray-400 mt-0.5" />
                  </div>
                )}

                {preset.id === 'delivery' && (
                  <div
                    style={{ backgroundColor: frameColor }}
                    className="w-full h-3 rounded-xs text-[6px] text-white flex items-center justify-center font-bold tracking-wider mt-auto"
                  >
                    🛵 ORDER
                  </div>
                )}

                {preset.id === 'ribbon' && (
                  <div
                    style={{ backgroundColor: frameColor }}
                    className="w-full h-3 rounded-xs text-[6px] text-white flex items-center justify-center font-bold tracking-wider mt-auto shadow-2xs"
                  >
                    WELCOME!
                  </div>
                )}

                {preset.id === 'coffee' && (
                  <div
                    style={{ backgroundColor: frameColor }}
                    className="w-full h-3 rounded-xs text-[6px] text-white flex items-center justify-center font-bold tracking-wider mt-auto"
                  >
                    ☕ ORDER
                  </div>
                )}

                {preset.id === 'receipt' && (
                  <div
                    style={{ backgroundColor: frameColor }}
                    className="w-full h-3 text-[6px] text-white flex items-center justify-center font-bold tracking-wider mt-auto border-b border-dashed border-gray-400"
                  >
                    🧾 RECEIPT
                  </div>
                )}

                {preset.id === 'polaroid' && (
                  <div className="w-full text-[7px] text-center italic font-bold mt-auto" style={{ color: frameColor }}>
                    Scan Me!
                  </div>
                )}

                {preset.id === 'arrow-scan' && (
                  <div className="w-full text-[6.5px] flex items-center justify-center gap-1 font-bold mt-auto" style={{ color: frameColor }}>
                    <span>↗ Scan</span>
                  </div>
                )}
              </div>

              {/* Full Text Label */}
              <div className="mt-3 text-center w-full">
                <span
                  style={isSelected ? { color: themeColor } : {}}
                  className={`text-xs font-semibold block truncate ${isSelected ? 'font-bold' : 'text-gray-800'}`}
                >
                  {preset.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frame Customization Controls */}
      {selectedFrame !== 'none' && (
        <div className="p-5 bg-gray-50/80 rounded-2xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Frame Label Text
            </label>
            <input
              type="text"
              value={frameText}
              onChange={(e) => setFrameText(e.target.value)}
              placeholder="e.g. SCAN ME"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none text-sm bg-white font-medium text-gray-800 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Frame Color
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="color"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
                className="w-11 h-11 p-1 rounded-xl border border-gray-300 cursor-pointer bg-white shadow-2xs"
              />
              <input
                type="text"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none text-sm bg-white uppercase font-medium text-gray-800 shadow-2xs"
              />
            </div>

            {/* Website Global Color Swatches for Frame */}
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
                      onClick={() => setFrameColor(col)}
                      style={{ backgroundColor: col }}
                      className="w-6 h-6 rounded-lg border border-gray-200 transition-transform hover:scale-115 shadow-2xs cursor-pointer"
                      title={`Use website color ${col}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
