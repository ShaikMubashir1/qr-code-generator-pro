import React, { useState } from 'react';
import FrameSelector from './FrameSelector';
import QRStyleSelector from './QRStyleSelector';
import CornerSelector from './CornerSelector';
import CorrectionLevelSelector from './CorrectionLevelSelector';
import LogoSelector from './LogoSelector';
import { ChevronDown, ChevronUp, Layout, Grid, Square, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function Step3DesignCustomizer({
  frame,
  setFrame,
  frameText,
  setFrameText,
  frameColor,
  setFrameColor,
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
  cornerBorderStyle,
  setCornerBorderStyle,
  cornerBorderColor,
  setCornerBorderColor,
  cornerCenterStyle,
  setCornerCenterStyle,
  cornerCenterColor,
  setCornerCenterColor,
  correctionLevel,
  setCorrectionLevel,
  selectedLogo,
  setSelectedLogo,
  logoUrl,
  setLogoUrl,
  themeColor = '#7C4DFF',
  themePalette = [],
  onInvertColors,
}) {
  const [openSections, setOpenSections] = useState({
    frame: true,
    style: false,
    corners: false,
    correction: false,
    logo: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 'frame',
      title: 'Frame & Borders',
      description: 'Choose from preset frames and customize banner text & colors',
      icon: Layout,
      iconColor: 'bg-blue-600 text-white',
      content: (
        <FrameSelector
          selectedFrame={frame}
          setFrame={setFrame}
          frameText={frameText}
          setFrameText={setFrameText}
          frameColor={frameColor}
          setFrameColor={setFrameColor}
          themeColor={themeColor}
          themePalette={themePalette}
        />
      ),
    },
    {
      id: 'style',
      title: 'QR Code Style & Patterns',
      description: 'Customize dot patterns, modules, solid & gradient colors',
      icon: Grid,
      iconColor: 'bg-indigo-600 text-white',
      content: (
        <QRStyleSelector
          dotStyle={dotStyle}
          setDotStyle={setDotStyle}
          dotColor={dotColor}
          setDotColor={setDotColor}
          useGradient={useGradient}
          setUseGradient={setUseGradient}
          gradientColor2={gradientColor2}
          setGradientColor2={setGradientColor2}
          bgColor={bgColor}
          setBgColor={setBgColor}
          transparentBg={transparentBg}
          setTransparentBg={setTransparentBg}
          themeColor={themeColor}
          themePalette={themePalette}
          onInvertColors={onInvertColors}
        />
      ),
    },
    {
      id: 'corners',
      title: 'Corner Finder Patterns',
      description: 'Shape and color the 3 outer finder borders and inner eye markers',
      icon: Square,
      iconColor: 'bg-slate-700 text-white',
      content: (
        <CornerSelector
          cornerBorderStyle={cornerBorderStyle}
          setCornerBorderStyle={setCornerBorderStyle}
          cornerBorderColor={cornerBorderColor}
          setCornerBorderColor={setCornerBorderColor}
          cornerCenterStyle={cornerCenterStyle}
          setCornerCenterStyle={setCornerCenterStyle}
          cornerCenterColor={cornerCenterColor}
          setCornerCenterColor={setCornerCenterColor}
          themeColor={themeColor}
          themePalette={themePalette}
        />
      ),
    },
    {
      id: 'correction',
      title: 'Error Correction Level',
      description: 'Compensate for damage, distortion, or logo coverage',
      icon: ShieldCheck,
      iconColor: 'bg-emerald-600 text-white',
      content: (
        <CorrectionLevelSelector
          correctionLevel={correctionLevel}
          setCorrectionLevel={setCorrectionLevel}
          themeColor={themeColor}
        />
      ),
    },
    {
      id: 'logo',
      title: 'Logo & Brand Icon',
      description: 'Overlay standard brand logos or upload your custom logo image',
      icon: ImageIcon,
      iconColor: 'bg-rose-600 text-white',
      content: (
        <LogoSelector
          selectedLogo={selectedLogo}
          setSelectedLogo={setSelectedLogo}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          themeColor={themeColor}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Accordion Sections with Wow Design */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = openSections[section.id];
          const IconComp = section.icon;

          return (
            <div
              key={section.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                isOpen
                  ? 'shadow-md ring-1 ring-opacity-20'
                  : 'border-gray-200 shadow-2xs hover:border-gray-300 hover:shadow-xs'
              }`}
              style={{
                backgroundColor: '#ffffff',
                ...(isOpen ? { borderColor: `${themeColor}B3`, boxShadow: `0 4px 14px ${themeColor}1A` } : {}),
              }}
            >
              {/* Accordion Header Button */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="qr-accordion-btn w-full px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    style={isOpen ? { backgroundColor: themeColor } : {}}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0 transition-colors ${section.iconColor}`}
                  >
                    <IconComp className="w-5 h-5 text-white stroke-[2.2]" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold tracking-tight"
                      style={{ color: '#0f172a', margin: 0, fontSize: '16px', lineHeight: '1.3' }}
                    >
                      {section.title}
                    </h3>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: '#64748b', margin: 0, fontSize: '12px' }}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>

                <div
                  style={isOpen ? { backgroundColor: `${themeColor}1A`, color: themeColor } : {}}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? '' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div
                  className="px-6 pb-6 pt-3 border-t border-gray-100/90"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
