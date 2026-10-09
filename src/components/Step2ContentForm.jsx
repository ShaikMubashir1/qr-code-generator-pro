import React from 'react';

export default function Step2ContentForm({
  type,
  contentData,
  setContentData,
  themeColor = '#7C4DFF',
  onNext,
}) {
  const handleChange = (field, value) => {
    setContentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderFormFields = () => {
    switch (type) {
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
              <input
                type="url"
                value={contentData.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plain Text *</label>
              <textarea
                rows={4}
                value={contentData.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="Enter your message or text content here..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Network Name (SSID) *</label>
              <input
                type="text"
                value={contentData.ssid || ''}
                onChange={(e) => handleChange('ssid', e.target.value)}
                placeholder="e.g. Home_WiFi_5G"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={contentData.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="WiFi password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Encryption Type</label>
              <select
                value={contentData.encryption || 'WPA'}
                onChange={(e) => handleChange('encryption', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Open (No password)</option>
              </select>
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={contentData.firstName || ''}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={contentData.lastName || ''}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={contentData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 234 567 890"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={contentData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                value={contentData.organization || ''}
                onChange={(e) => handleChange('organization', e.target.value)}
                placeholder="Acme Corp"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={contentData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Software Engineer"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email *</label>
              <input
                type="email"
                value={contentData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={contentData.subject || ''}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Inquiry regarding..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
              <textarea
                rows={3}
                value={contentData.body || ''}
                onChange={(e) => handleChange('body', e.target.value)}
                placeholder="Pre-filled email body message..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={contentData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 800 555 0199"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'sms':
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (with Country Code) *</label>
              <input
                type="tel"
                value={contentData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pre-filled Message</label>
              <textarea
                rows={3}
                value={contentData.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Hi, I would like to learn more..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude *</label>
              <input
                type="text"
                value={contentData.lat || ''}
                onChange={(e) => handleChange('lat', e.target.value)}
                placeholder="37.7749"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude *</label>
              <input
                type="text"
                value={contentData.lng || ''}
                onChange={(e) => handleChange('lng', e.target.value)}
                placeholder="-122.4194"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
              <input
                type="text"
                value={contentData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Annual Tech Conference"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={contentData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Grand Hall, City Center"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={contentData.startDate || ''}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={contentData.endDate || ''}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 capitalize">Enter {type} Details</h2>
        <p className="text-gray-500 text-xs mt-1">Provide the content details to generate your customized QR code payload.</p>
      </div>

      {renderFormFields()}

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          style={{ backgroundColor: themeColor, color: '#ffffff' }}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 shadow-sm transition-opacity cursor-pointer"
        >
          Proceed to Design
        </button>
      </div>
    </div>
  );
}
