import React, { useEffect } from 'react';
import { PRESET_LOGOS } from '../utils/qrPresets';
import { MessageCircle, Link, MapPin, Wifi, UserCheck, Mail, QrCode, CreditCard, Coins, Upload, Ban } from 'lucide-react';

const logoIconMap = {
  MessageCircle,
  Link,
  MapPin,
  Wifi,
  UserCheck,
  Mail,
  QrCode,
  CreditCard,
  Coins,
};

export default function LogoSelector({
  selectedLogo,
  setSelectedLogo,
  logoUrl,
  setLogoUrl,
  themeColor = '#7C4DFF',
}) {
  // Sync generic logo preset (e.g. link) when site global themeColor loads
  useEffect(() => {
    if (selectedLogo === 'link' || selectedLogo === 'scanme') {
      const svgIconStr = getPresetSvgUri(selectedLogo, themeColor);
      setLogoUrl(svgIconStr);
    }
  }, [themeColor, selectedLogo]);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB maximum limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedLogo('custom');
        setLogoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedLogo(preset.id);
    if (preset.id === 'none') {
      setLogoUrl(null);
    } else {
      // Use site's dynamic themeColor for generic/link icons
      const iconColor = (preset.id === 'link' || preset.id === 'scanme') ? themeColor : preset.color;
      const svgIconStr = getPresetSvgUri(preset.id, iconColor);
      setLogoUrl(svgIconStr);
    }
  };

  return (
    <div className="space-y-6">
      {/* Select a Logo Header */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Select a logo</label>
        <div className="flex flex-wrap gap-3">
          {PRESET_LOGOS.map((preset) => {
            const isSelected = selectedLogo === preset.id;
            const IconComponent = logoIconMap[preset.icon];
            const badgeBg = (preset.id === 'link' || preset.id === 'scanme') ? themeColor : preset.color;

            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                style={isSelected ? { borderColor: themeColor, backgroundColor: `${themeColor}1A`, boxShadow: `0 0 0 2px ${themeColor}33` } : {}}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                  isSelected
                    ? 'scale-105 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                }`}
                title={preset.label}
              >
                {preset.id === 'none' ? (
                  <Ban className="w-5 h-5 text-gray-400" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: badgeBg }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* File Upload Box */}
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition-colors bg-gray-50/70">
        <input
          type="file"
          id="custom-logo-upload"
          accept="image/png, image/jpeg, image/svg+xml"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="custom-logo-upload" className="cursor-pointer flex flex-col items-center justify-center">
          <div
            style={{ color: themeColor }}
            className="p-3 bg-white rounded-full border border-gray-200 shadow-xs mb-2"
          >
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-gray-900">Add your logo</span>
          <span className="text-xs text-gray-500 mt-1 font-medium">(JPG, JPEG, PNG or SVG / 2MB max)</span>
        </label>
      </div>
    </div>
  );
}

function getPresetSvgUri(id, color) {
  // Simple inline SVGs for standard logo icons
  const svgs = {
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.85a10 10 0 0 1 14 0"/><path d="M8.5 16.88a5 5 0 0 1 7 0"/></svg>`,
    vcard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    scanme: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/></svg>`,
    paypal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    bitcoin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/></svg>`,
  };

  const raw = svgs[id] || svgs.whatsapp;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(raw)}`;
}
