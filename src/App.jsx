import React, { useState, useEffect } from 'react';
import HeaderStepper from './components/HeaderStepper';
import Step1TypeSelection from './components/Step1TypeSelection';
import Step2ContentForm from './components/Step2ContentForm';
import Step3DesignCustomizer from './components/Step3DesignCustomizer';
import PreviewPanel from './components/PreviewPanel';
import { buildQrPayload } from './utils/qrGenerator';
import { detectWebsiteColors } from './utils/themeColors';

export default function App() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('url');
  const [contentData, setContentData] = useState({
    url: 'https://standardtouch.com',
  });

  // Dynamic Website Theme State
  const [themeColor, setThemeColor] = useState('#7C4DFF');
  const [themePalette, setThemePalette] = useState([]);

  // Design States
  const [frame, setFrame] = useState('scan-top');
  const [frameText, setFrameText] = useState('SCAN ME');
  const [frameColor, setFrameColor] = useState('#7C4DFF');

  const [dotStyle, setDotStyle] = useState('dots');
  const [dotColor, setDotColor] = useState('#0D0D19');
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor2, setGradientColor2] = useState('#7C4DFF');

  const [bgColor, setBgColor] = useState('#ffffff');
  const [transparentBg, setTransparentBg] = useState(false);

  const [cornerBorderStyle, setCornerBorderStyle] = useState('square');
  const [cornerBorderColor, setCornerBorderColor] = useState('#000000');

  const [cornerCenterStyle, setCornerCenterStyle] = useState('square');
  const [cornerCenterColor, setCornerCenterColor] = useState('#000000');

  const [correctionLevel, setCorrectionLevel] = useState('H');
  const [selectedLogo, setSelectedLogo] = useState('none');
  const [logoUrl, setLogoUrl] = useState(null);

  // Dynamically detect website global colors upon load
  useEffect(() => {
    const detected = detectWebsiteColors();
    if (detected && detected.primary) {
      setThemeColor(detected.primary);
      setThemePalette(detected.palette || []);
      setFrameColor(detected.primary);
      setGradientColor2(detected.primary);
      if (detected.dark && detected.dark !== '#ffffff') {
        setDotColor(detected.dark);
      }
    }
  }, []);

  // Compute QR payload string dynamically
  const payloadData = buildQrPayload(type, contentData);

  const handleInvertColors = () => {
    const tempDot = dotColor;
    setDotColor(bgColor === 'transparent' ? '#ffffff' : bgColor);
    setBgColor(tempDot);
    setCornerBorderColor(bgColor === 'transparent' ? '#ffffff' : bgColor);
    setCornerCenterColor(bgColor === 'transparent' ? '#ffffff' : bgColor);
  };

  const handleComplete = () => {
    alert('🎉 QR Code Design Complete! Use the download buttons on the right preview panel to save your QR Code.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Stepper Header */}
      <HeaderStepper
        currentStep={step}
        setStep={setStep}
        themeColor={themeColor}
        onComplete={handleComplete}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Form Area */}
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {step === 1 && (
              <Step1TypeSelection
                selectedType={type}
                setType={setType}
                themeColor={themeColor}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <Step2ContentForm
                type={type}
                contentData={contentData}
                setContentData={setContentData}
                themeColor={themeColor}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <Step3DesignCustomizer
                frame={frame}
                setFrame={setFrame}
                frameText={frameText}
                setFrameText={setFrameText}
                frameColor={frameColor}
                setFrameColor={setFrameColor}
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
                cornerBorderStyle={cornerBorderStyle}
                setCornerBorderStyle={setCornerBorderStyle}
                cornerBorderColor={cornerBorderColor}
                setCornerBorderColor={setCornerBorderColor}
                cornerCenterStyle={cornerCenterStyle}
                setCornerCenterStyle={setCornerCenterStyle}
                cornerCenterColor={cornerCenterColor}
                setCornerCenterColor={setCornerCenterColor}
                correctionLevel={correctionLevel}
                setCorrectionLevel={setCorrectionLevel}
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
                themeColor={themeColor}
                themePalette={themePalette}
                onInvertColors={handleInvertColors}
              />
            )}
          </div>

          {/* Right Live Preview Panel */}
          <PreviewPanel
            type={type}
            payloadData={payloadData}
            frame={frame}
            frameText={frameText}
            frameColor={frameColor}
            dotStyle={dotStyle}
            dotColor={dotColor}
            useGradient={useGradient}
            gradientColor2={gradientColor2}
            bgColor={bgColor}
            transparentBg={transparentBg}
            cornerBorderStyle={cornerBorderStyle}
            cornerBorderColor={cornerBorderColor}
            cornerCenterStyle={cornerCenterStyle}
            cornerCenterColor={cornerCenterColor}
            correctionLevel={correctionLevel}
            selectedLogo={selectedLogo}
            logoUrl={logoUrl}
            themeColor={themeColor}
            setStep={setStep}
          />
        </div>
      </div>
    </div>
  );
}
