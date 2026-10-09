export const QR_TYPES = [
  { id: 'url', name: 'Website URL', icon: 'Globe', description: 'Link to any website or webpage' },
  { id: 'text', name: 'Plain Text', icon: 'FileText', description: 'Display message or plain text' },
  { id: 'wifi', name: 'WiFi Network', icon: 'Wifi', description: 'Connect to WiFi automatically' },
  { id: 'vcard', name: 'vCard / Contact', icon: 'UserCheck', description: 'Share contact information' },
  { id: 'email', name: 'Email', icon: 'Mail', description: 'Send pre-written email' },
  { id: 'phone', name: 'Phone Call', icon: 'Phone', description: 'Dial phone number' },
  { id: 'sms', name: 'SMS / Text', icon: 'MessageSquare', description: 'Send text message' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', description: 'Start WhatsApp chat' },
  { id: 'location', name: 'Location', icon: 'MapPin', description: 'Open GPS map coordinates' },
  { id: 'event', name: 'Calendar Event', icon: 'Calendar', description: 'Add event to calendar' },
];

export const FRAME_PRESETS = [
  { id: 'none', label: 'No Frame', text: '' },
  { id: 'scan-top', label: 'Top Banner', text: 'SCAN ME' },
  { id: 'scan-bottom', label: 'Bottom Banner', text: 'SCAN ME' },
  { id: 'badge', label: 'Badge Frame', text: 'SCAN ME' },
  { id: 'speech-bubble', label: 'Speech Bubble', text: 'SCAN ME' },
  { id: 'envelope', label: 'Envelope', text: 'OPEN ME' },
  { id: 'waiter', label: 'Waiter Platter', text: 'VIEW MENU' },
  { id: 'beer', label: 'Beer Mug', text: 'CHEERS!' },
  { id: 'coffee', label: 'Coffee Cup', text: 'ORDER HERE' },
  { id: 'chef', label: 'Chef Hat', text: 'CHEF MENU' },
  { id: 'food-cover', label: 'Food Cloche', text: 'MENU' },
  { id: 'delivery', label: 'Delivery Scooter', text: 'ORDER NOW' },
  { id: 'drink', label: 'Summer Drink', text: 'DRINKS' },
  { id: 'gift', label: 'Gift Bow', text: 'FOR YOU' },
  { id: 'shopping-bag', label: 'Shopping Bag', text: 'SHOP NOW' },
  { id: 'receipt', label: 'Store Receipt', text: 'RECEIPT' },
  { id: 'phone-frame', label: 'Smartphone', text: 'SCAN ME' },
  { id: 'notepad', label: 'Notepad', text: 'SCAN ME' },
  { id: 'clipboard', label: 'Clipboard', text: 'SCAN ME' },
  { id: 'ribbon', label: 'Ribbon', text: 'WELCOME!' },
  { id: 'polaroid', label: 'Polaroid', text: 'Scan Me!' },
  { id: 'burst', label: 'Action Burst', text: 'SCAN NOW' },
  { id: 'arrow-scan', label: 'Handwritten Arrow', text: 'Scan Me!' },
];

export const DOT_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dots', label: 'Dots' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'star', label: 'Star' },
];

export const CORNER_BORDER_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Circle' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'leaf', label: 'Leaf' },
];

export const CORNER_CENTER_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'star', label: 'Star' },
  { id: 'heart', label: 'Heart' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'plus', label: 'Plus' },
];

export const PRESET_LOGOS = [
  { id: 'none', label: 'None', svg: null },
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: 'MessageCircle' },
  { id: 'link', label: 'Link', color: '#6366F1', icon: 'Link' },
  { id: 'location', label: 'Map Pin', color: '#EF4444', icon: 'MapPin' },
  { id: 'wifi', label: 'WiFi', color: '#06B6D4', icon: 'Wifi' },
  { id: 'vcard', label: 'Contact', color: '#3B82F6', icon: 'UserCheck' },
  { id: 'email', label: 'Email', color: '#F59E0B', icon: 'Mail' },
  { id: 'scanme', label: 'Scan Me', color: '#EC4899', icon: 'QrCode' },
  { id: 'paypal', label: 'PayPal', color: '#003087', icon: 'CreditCard' },
  { id: 'bitcoin', label: 'Bitcoin', color: '#F7931A', icon: 'Coins' },
];

export const CORRECTION_LEVELS = [
  { level: 'L', percent: '7%', label: 'Level L' },
  { level: 'M', percent: '15%', label: 'Level M' },
  { level: 'Q', percent: '25%', label: 'Level Q' },
  { level: 'H', percent: '30%', label: 'Level H' },
];
