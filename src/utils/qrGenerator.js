import QRCodeStyling from 'qr-code-styling';

/**
 * Format raw content object into valid QR payload string
 */
export function buildQrPayload(type, data) {
  if (!data) return 'https://example.com';

  switch (type) {
    case 'url':
      let url = data.url || 'https://example.com';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;

    case 'text':
      return data.text || 'Hello World!';

    case 'wifi':
      const ssid = data.ssid || 'MyWiFiNetwork';
      const encryption = data.encryption || 'WPA';
      const password = data.password || '';
      const hidden = data.hidden ? 'H:true;' : '';
      return `WIFI:S:${ssid};T:${encryption};P:${password};${hidden};`;

    case 'vcard':
      const fn = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'John Doe';
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${data.lastName || ''};${data.firstName || ''}`,
        `FN:${fn}`,
        `ORG:${data.organization || ''}`,
        `TITLE:${data.title || ''}`,
        `TEL;TYPE=CELL:${data.phone || ''}`,
        `EMAIL:${data.email || ''}`,
        `URL:${data.website || ''}`,
        'END:VCARD'
      ].join('\n');

    case 'email':
      const email = data.email || 'info@example.com';
      const subject = encodeURIComponent(data.subject || '');
      const body = encodeURIComponent(data.body || '');
      return `mailto:${email}?subject=${subject}&body=${body}`;

    case 'phone':
      return `tel:${data.phone || '+1234567890'}`;

    case 'sms':
      return `smsto:${data.phone || '+1234567890'}:${data.message || ''}`;

    case 'whatsapp':
      const waPhone = (data.phone || '').replace(/[^0-9]/g, '');
      const waText = encodeURIComponent(data.message || '');
      return `https://wa.me/${waPhone}?text=${waText}`;

    case 'location':
      const lat = data.lat || '37.7749';
      const lng = data.lng || '-122.4194';
      return `geo:${lat},${lng}`;

    case 'event':
      const title = data.title || 'Special Event';
      const loc = data.location || '';
      const start = (data.startDate || '').replace(/[-:]/g, '');
      const end = (data.endDate || '').replace(/[-:]/g, '');
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `LOCATION:${loc}`,
        start ? `DTSTART:${start}` : '',
        end ? `DTEND:${end}` : '',
        'END:VEVENT'
      ].filter(Boolean).join('\n');

    default:
      return data.url || 'https://example.com';
  }
}

/**
 * Configure QRCodeStyling options object
 */
export function getQrCodeStylingOptions(config) {
  const {
    dataString,
    dotStyle = 'square',
    dotColor = '#000000',
    useGradient = false,
    gradientColor2 = '#2563eb',
    bgColor = '#ffffff',
    transparentBg = false,
    cornerBorderStyle = 'square',
    cornerBorderColor = '#000000',
    cornerCenterStyle = 'square',
    cornerCenterColor = '#000000',
    correctionLevel = 'H',
    logoUrl = null,
  } = config;

  let dotsOptions = {
    type: dotStyle,
    color: dotColor,
  };

  if (useGradient) {
    dotsOptions.gradient = {
      type: 'linear',
      rotation: 0.78, // 45deg
      colorStops: [
        { offset: 0, color: dotColor },
        { offset: 1, color: gradientColor2 },
      ],
    };
  }

  // Map corner border styles to valid qr-code-styling options
  let mappedCornerBorder = 'square';
  if (cornerBorderStyle === 'dot' || cornerBorderStyle === 'circle') mappedCornerBorder = 'dot';
  if (cornerBorderStyle === 'extra-rounded' || cornerBorderStyle === 'leaf') mappedCornerBorder = 'extra-rounded';

  // Map corner center styles
  let mappedCornerCenter = 'square';
  if (cornerCenterStyle === 'dot' || cornerCenterStyle === 'heart' || cornerCenterStyle === 'star') mappedCornerCenter = 'dot';

  return {
    width: 280,
    height: 280,
    data: dataString,
    image: logoUrl || undefined,
    margin: 4,
    qrOptions: {
      errorCorrectionLevel: correctionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.22,
      margin: 4,
    },
    dotsOptions: dotsOptions,
    backgroundOptions: {
      color: transparentBg ? 'transparent' : bgColor,
    },
    cornersSquareOptions: {
      type: mappedCornerBorder,
      color: cornerBorderColor,
    },
    cornersDotOptions: {
      type: mappedCornerCenter,
      color: cornerCenterColor,
    },
  };
}
