import React, { useMemo, useState } from 'react';
import { generateQrSvgString } from '../utils/qrRenderer';
import { Globe, Smartphone, QrCode, Download, Edit2, AlertCircle } from 'lucide-react';

export default function PreviewPanel({
  type,
  payloadData,
  frame,
  frameText,
  frameColor,
  dotStyle,
  dotColor,
  useGradient,
  gradientColor2,
  bgColor,
  transparentBg,
  cornerBorderStyle,
  cornerBorderColor,
  cornerCenterStyle,
  cornerCenterColor,
  correctionLevel,
  selectedLogo,
  logoUrl,
  themeColor = '#7C4DFF',
  setStep,
}) {
  const [viewMode, setViewMode] = useState('qr'); // 'qr' | 'device'
  const [isExporting, setIsExporting] = useState(false);

  // Generate full SVG markup
  const svgMarkup = useMemo(() => {
    return generateQrSvgString({
      text: payloadData,
      correctionLevel,
      dotStyle,
      dotColor,
      useGradient,
      gradientColor2,
      bgColor,
      transparentBg,
      cornerBorderStyle,
      cornerBorderColor,
      cornerCenterStyle,
      cornerCenterColor,
      selectedLogo,
      logoUrl,
      frame,
      frameText,
      frameColor,
    });
  }, [
    payloadData,
    correctionLevel,
    dotStyle,
    dotColor,
    useGradient,
    gradientColor2,
    bgColor,
    transparentBg,
    cornerBorderStyle,
    cornerBorderColor,
    cornerCenterStyle,
    cornerCenterColor,
    selectedLogo,
    logoUrl,
    frame,
    frameText,
    frameColor,
  ]);

  // Handle Download SVG (vector)
  const handleDownloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-code-${type || 'card'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Download PNG (High-Res 3x Canvas conversion of the entire framed card)
  const handleDownloadPng = () => {
    setIsExporting(true);
    const img = new Image();
    const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const scale = 3; // 3x ultra high-resolution
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw SVG at high scale
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `qr-code-${type || 'card'}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        }
        URL.revokeObjectURL(url);
        setIsExporting(false);
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setIsExporting(false);
      alert('Could not generate PNG export. Try SVG download instead.');
    };

    img.src = url;
  };

  return (
    <div className="w-full lg:w-[420px] flex-shrink-0 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 sticky top-24">
      {/* Panel Top Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: themeColor }}>
            <Globe className="w-4 h-4" />
            <span className="capitalize">{type} QR Code</span>
          </div>

          <button
            onClick={() => setStep(1)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Edit type"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Example Preview</span>
          <div className="flex items-center bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('qr')}
              style={viewMode === 'qr' ? { color: themeColor } : {}}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'qr' ? 'bg-white shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
              title="QR Code View"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('device')}
              style={viewMode === 'device' ? { color: themeColor } : {}}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'device' ? 'bg-white shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
              title="Mobile Device Mockup View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Preview Display */}
        <div className="mt-4 flex flex-col items-center justify-center min-h-[380px] w-full overflow-hidden">
          {viewMode === 'qr' ? (
            <div className="flex flex-col items-center justify-center p-2 w-full max-w-[320px] overflow-hidden">
              <div
                className="w-full flex items-center justify-center transition-transform hover:scale-[1.01]"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            </div>
          ) : (
            /* Smartphone View Mockup */
            <div className="w-68 max-w-full bg-gray-900 rounded-[38px] p-4 shadow-xl border-4 border-gray-800 relative flex flex-col items-center">
              <div className="w-20 h-3.5 bg-gray-800 rounded-full mx-auto mb-3" />
              <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center w-full min-h-[280px] overflow-hidden">
                <div
                  className="w-full flex items-center justify-center scale-90"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
                <p className="text-[11px] text-gray-500 font-medium mt-1 text-center">Scan with Camera</p>
              </div>
            </div>
          )}
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleDownloadPng}
            disabled={isExporting}
            style={{ backgroundColor: themeColor, color: '#ffffff' }}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold hover:opacity-90 shadow-sm transition-opacity active:scale-95 disabled:opacity-75 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating...' : 'Download PNG'}
          </button>
          <button
            onClick={handleDownloadSvg}
            style={{ backgroundColor: '#ffffff', color: '#0D0D19', border: '1px solid #cbd5e1' }}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold hover:bg-gray-100 shadow-sm transition-colors active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download SVG
          </button>
        </div>
      </div>

      {/* Footer Alert Notice */}
      <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-start gap-2 text-xs text-gray-600 shadow-xs">
        <AlertCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
        <span><strong>IMPORTANT:</strong> Don't forget to test your QR code with a phone scanner before publishing!</span>
      </div>
    </div>
  );
}
