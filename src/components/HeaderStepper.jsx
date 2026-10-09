import React from 'react';
import { Check, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function HeaderStepper({ currentStep, setStep, themeColor = '#7C4DFF', onComplete }) {
  const steps = [
    { id: 1, label: 'Type of QR code' },
    { id: 2, label: 'Content' },
    { id: 3, label: 'QR design' },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
      {/* Step Indicators */}
      <div className="flex items-center gap-3">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              onClick={() => isCompleted && setStep(step.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                isCompleted ? 'cursor-pointer hover:bg-gray-100' : ''
              }`}
            >
              {isCompleted ? (
                <span className="flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full text-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              ) : isActive ? (
                <span
                  style={{ backgroundColor: themeColor }}
                  className="flex items-center justify-center w-5 h-5 text-white rounded-md text-xs font-bold shadow-sm"
                >
                  {step.id}
                </span>
              ) : (
                <span className="flex items-center justify-center w-5 h-5 bg-gray-200 text-gray-600 rounded-md text-xs">
                  {step.id}
                </span>
              )}

              <span
                style={{ color: isActive ? themeColor : isCompleted ? '#0D0D19' : '#64748b' }}
                className={`font-semibold ${isActive ? 'font-bold' : ''}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {currentStep > 1 && (
          <button
            onClick={() => setStep(currentStep - 1)}
            style={{ backgroundColor: '#ffffff', color: '#334155', border: '1px solid #cbd5e1' }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={() => setStep(currentStep + 1)}
            style={{ backgroundColor: themeColor, color: '#ffffff' }}
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg hover:opacity-90 shadow-sm transition-opacity cursor-pointer"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={onComplete}
            style={{ backgroundColor: themeColor, color: '#ffffff' }}
            className="flex items-center gap-1.5 px-6 py-2 text-sm font-medium rounded-lg hover:opacity-90 shadow-sm transition-opacity cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
