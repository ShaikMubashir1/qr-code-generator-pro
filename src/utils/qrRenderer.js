import QRCode from 'qrcode';

/**
 * Generate full SVG string for the QR code including frame, shapes, and logo
 */
export function generateQrSvgString(config) {
  const {
    text = 'https://standardtouch.com',
    correctionLevel = 'H',
    dotStyle = 'dots',
    dotColor = '#000000',
    useGradient = false,
    gradientColor2 = '#7C4DFF',
    bgColor = '#ffffff',
    transparentBg = false,
    cornerBorderStyle = 'square',
    cornerBorderColor = '#000000',
    cornerCenterStyle = 'square',
    cornerCenterColor = '#000000',
    selectedLogo = 'none',
    logoUrl = null,
    frame = 'scan-top',
    frameText = 'SCAN ME',
    frameColor = '#7C4DFF',
  } = config;

  // 1. Create QR matrix using qrcode
  let qr;
  try {
    qr = QRCode.create(text || 'https://standardtouch.com', {
      errorCorrectionLevel: correctionLevel || 'H',
    });
  } catch (e) {
    qr = QRCode.create('https://standardtouch.com', { errorCorrectionLevel: 'H' });
  }

  const matrixSize = qr.modules.size;
  const modSize = 10;
  const qrPixelSize = matrixSize * modSize;

  // Frame layout dimensions
  const padding = 24;
  const bannerHeight = 44;
  let cardWidth = qrPixelSize + padding * 2;
  let cardHeight = qrPixelSize + padding * 2;
  let qrX = padding;
  let qrY = padding;

  if (frame === 'scan-top') {
    cardHeight += bannerHeight + 12;
    qrY += bannerHeight + 12;
  } else if (frame === 'scan-bottom') {
    cardHeight += bannerHeight + 12;
  } else if (frame === 'badge') {
    cardHeight += bannerHeight + 16;
    qrY += bannerHeight + 16;
  } else if (frame === 'speech-bubble') {
    cardHeight += bannerHeight + 16;
  } else if (frame === 'envelope') {
    cardHeight += bannerHeight + 36;
    qrY += 30;
  } else if (frame === 'waiter') {
    cardHeight += bannerHeight + 46;
    qrY += 14;
  } else if (frame === 'beer') {
    cardWidth += 28;
    cardHeight += bannerHeight + 28;
    qrY += 28;
  } else if (frame === 'coffee') {
    cardHeight += bannerHeight + 36;
    qrY += 24;
  } else if (frame === 'chef') {
    cardHeight += bannerHeight + 48;
    qrY += 46;
  } else if (frame === 'food-cover') {
    cardHeight += bannerHeight + 44;
    qrY += 36;
  } else if (frame === 'delivery') {
    cardHeight += bannerHeight + 20;
  } else if (frame === 'drink') {
    cardHeight += bannerHeight + 36;
    qrY += 28;
  } else if (frame === 'gift') {
    cardHeight += bannerHeight + 36;
    qrY += 30;
  } else if (frame === 'shopping-bag') {
    cardHeight += bannerHeight + 36;
    qrY += 30;
  } else if (frame === 'receipt') {
    cardHeight += bannerHeight + 28;
    qrY += 16;
  } else if (frame === 'phone-frame') {
    cardHeight += 70;
    cardWidth += 20;
    qrX += 10;
    qrY += 45;
  } else if (frame === 'notepad' || frame === 'clipboard') {
    cardHeight += bannerHeight + 20;
    qrY += bannerHeight + 20;
  } else if (frame === 'ribbon') {
    cardHeight += bannerHeight + 20;
  } else if (frame === 'polaroid') {
    cardHeight += 64;
  } else if (frame === 'burst') {
    cardHeight += bannerHeight + 20;
    qrY += 12;
  } else if (frame === 'arrow-scan') {
    cardHeight += 44;
  }

  // Logo box calculation (clears center modules)
  let logoModules = 0;
  let logoStart = -1;
  let logoEnd = -1;
  if (selectedLogo !== 'none' && logoUrl) {
    logoModules = Math.max(5, Math.floor(matrixSize * 0.24));
    if (logoModules % 2 === 0) logoModules += 1;
    logoStart = Math.floor((matrixSize - logoModules) / 2);
    logoEnd = logoStart + logoModules;
  }

  // Unique Gradient ID
  const gradId = 'qr_grad_' + Math.random().toString(36).substring(2, 9);

  // SVG Header & Defs with responsive, non-overflowing style
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${cardWidth} ${cardHeight}" width="100%" height="100%" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">\n`;
  svg += `<defs>\n`;
  if (useGradient) {
    svg += `  <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">\n`;
    svg += `    <stop offset="0%" stop-color="${dotColor}" />\n`;
    svg += `    <stop offset="100%" stop-color="${gradientColor2}" />\n`;
    svg += `  </linearGradient>\n`;
  }
  svg += `  <filter id="card_shadow" x="-5%" y="-5%" width="110%" height="110%">\n`;
  svg += `    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.08" />\n`;
  svg += `  </filter>\n`;
  svg += `</defs>\n`;

  // Background Card
  const actualBg = transparentBg ? 'transparent' : bgColor;
  if (!transparentBg) {
    svg += `<rect x="0" y="0" width="${cardWidth}" height="${cardHeight}" rx="18" fill="${actualBg}" filter="url(#card_shadow)" stroke="#e2e8f0" stroke-width="1.5" />\n`;
  }

  // Frame Elements
  if (frame === 'scan-top') {
    const bannerW = cardWidth - padding * 2;
    svg += `<rect x="${padding}" y="${padding}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${padding + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'SCAN ME')}</text>\n`;
  } else if (frame === 'scan-bottom') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'SCAN ME')}</text>\n`;
  } else if (frame === 'badge') {
    const bannerW = cardWidth - padding * 2;
    svg += `<rect x="${padding}" y="${padding}" width="${bannerW}" height="${bannerHeight}" rx="${bannerHeight / 2}" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${padding + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1.5">${escapeXml(frameText || 'SCAN ME')}</text>\n`;
  } else if (frame === 'phone-frame') {
    svg += `<rect x="6" y="6" width="${cardWidth - 12}" height="${cardHeight - 12}" rx="28" fill="none" stroke="${frameColor}" stroke-width="5" />\n`;
    svg += `<rect x="${cardWidth / 2 - 25}" y="14" width="50" height="5" rx="2.5" fill="${frameColor}" />\n`;
    svg += `<rect x="${cardWidth / 2 - 30}" y="${cardHeight - 20}" width="60" height="4" rx="2" fill="${frameColor}" />\n`;
  } else if (frame === 'notepad' || frame === 'clipboard') {
    const bannerW = cardWidth - padding * 2;
    svg += `<rect x="${cardWidth / 2 - 35}" y="8" width="70" height="14" rx="4" fill="${frameColor}" />\n`;
    svg += `<rect x="${padding}" y="${padding + 6}" width="${bannerW}" height="${bannerHeight - 6}" rx="8" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${padding + (bannerHeight + 6) / 2 + 4}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'SCAN ME')}</text>\n`;
  } else if (frame === 'ribbon') {
    // Beautiful folded ribbon at bottom
    const bannerW = cardWidth - padding * 2 - 16;
    const bannerY = cardHeight - padding - bannerHeight;
    const bannerX = padding + 8;
    // Left folded ribbon wing
    svg += `<polygon points="${bannerX - 10},${bannerY + 8} ${bannerX},${bannerY} ${bannerX},${bannerY + bannerHeight} ${bannerX - 10},${bannerY + bannerHeight + 8} ${bannerX - 4},${bannerY + bannerHeight / 2}" fill="${frameColor}" fill-opacity="0.75" />\n`;
    // Right folded ribbon wing
    svg += `<polygon points="${bannerX + bannerW + 10},${bannerY + 8} ${bannerX + bannerW},${bannerY} ${bannerX + bannerW},${bannerY + bannerHeight} ${bannerX + bannerW + 10},${bannerY + bannerHeight + 8} ${bannerX + bannerW + 4},${bannerY + bannerHeight / 2}" fill="${frameColor}" fill-opacity="0.75" />\n`;
    // Main ribbon banner
    svg += `<rect x="${bannerX}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="6" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1.5">${escapeXml(frameText || 'WELCOME!')}</text>\n`;
  } else if (frame === 'coffee') {
    // Coffee cup mockup with steam and banner sleeve
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;

    // Steam icons at top
    svg += `<path d="M ${cardWidth / 2 - 16} 16 Q ${cardWidth / 2 - 20} 10 ${cardWidth / 2 - 16} 4" fill="none" stroke="${frameColor}" stroke-width="2" stroke-linecap="round" />\n`;
    svg += `<path d="M ${cardWidth / 2} 16 Q ${cardWidth / 2 - 4} 10 ${cardWidth / 2} 4" fill="none" stroke="${frameColor}" stroke-width="2" stroke-linecap="round" />\n`;
    svg += `<path d="M ${cardWidth / 2 + 16} 16 Q ${cardWidth / 2 + 12} 10 ${cardWidth / 2 + 16} 4" fill="none" stroke="${frameColor}" stroke-width="2" stroke-linecap="round" />\n`;

    // Coffee cup bottom sleeve banner
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<circle cx="${padding + 22}" cy="${bannerY + bannerHeight / 2}" r="11" fill="#ffffff" opacity="0.2" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1.5">☕ ${escapeXml(frameText || 'ORDER HERE')}</text>\n`;
  } else if (frame === 'speech-bubble') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<polygon points="${cardWidth / 2 - 10},${bannerY} ${cardWidth / 2},${bannerY - 8} ${cardWidth / 2 + 10},${bannerY}" fill="${frameColor}" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'SCAN ME')}</text>\n`;
  } else if (frame === 'envelope') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<polygon points="${padding},${qrY} ${cardWidth / 2},${padding + 4} ${cardWidth - padding},${qrY}" fill="none" stroke="${frameColor}" stroke-width="3" stroke-linejoin="round" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">✉️ ${escapeXml(frameText || 'OPEN ME')}</text>\n`;
  } else if (frame === 'waiter') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight - 16;
    const trayY = bannerY + bannerHeight + 6;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="8" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'VIEW MENU')}</text>\n`;
    svg += `<ellipse cx="${cardWidth / 2}" cy="${trayY}" rx="${cardWidth * 0.44}" ry="5" fill="${frameColor}" fill-opacity="0.25" stroke="${frameColor}" stroke-width="2" />\n`;
    svg += `<path d="M ${cardWidth / 2 - 24} ${trayY + 12} Q ${cardWidth / 2 - 12} ${trayY + 3} ${cardWidth / 2} ${trayY + 3} Q ${cardWidth / 2 + 16} ${trayY + 3} ${cardWidth / 2 + 24} ${trayY + 10} L ${cardWidth / 2 + 14} ${trayY + 18} L ${cardWidth / 2 - 20} ${trayY + 18} Z" fill="#ffffff" stroke="${frameColor}" stroke-width="2" />\n`;
  } else if (frame === 'beer') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<path d="M ${cardWidth - padding} ${qrY + 20} C ${cardWidth + 18} ${qrY + 20} ${cardWidth + 18} ${qrY + 120} ${cardWidth - padding} ${qrY + 120}" fill="none" stroke="${frameColor}" stroke-width="7" stroke-linecap="round" />\n`;
    svg += `<path d="M ${padding} ${qrY + 12} Q ${padding - 6} ${qrY + 2} ${padding + 10} ${qrY + 2} Q ${padding + 26} ${qrY - 10} ${padding + 48} ${qrY + 2} Q ${padding + 70} ${qrY - 6} ${padding + 92} ${qrY + 8} Q ${padding + 110} ${qrY - 2} ${padding + 130} ${qrY + 14} L ${padding + 130} ${qrY + 20} Q ${padding + 100} ${qrY + 24} ${padding + 70} ${qrY + 16} Q ${padding + 36} ${qrY + 26} ${padding} ${qrY + 20} Z" fill="#ffffff" stroke="${frameColor}" stroke-width="2.5" />\n`;
    svg += `<path d="M ${padding + 20} ${qrY + 18} Q ${padding + 18} ${qrY + 36} ${padding + 22} ${qrY + 36} Q ${padding + 26} ${qrY + 36} ${padding + 24} ${qrY + 18}" fill="#ffffff" stroke="${frameColor}" stroke-width="2" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">🍺 ${escapeXml(frameText || 'CHEERS!')}</text>\n`;
  } else if (frame === 'chef') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    const cx = cardWidth / 2;
    svg += `<path d="M ${cx - 36} ${qrY - 10} C ${cx - 50} ${qrY - 36} ${cx - 22} ${qrY - 44} ${cx - 12} ${qrY - 32} C ${cx - 6} ${qrY - 48} ${cx + 10} ${qrY - 48} ${cx + 16} ${qrY - 32} C ${cx + 26} ${qrY - 44} ${cx + 52} ${qrY - 34} ${cx + 38} ${qrY - 10} Z" fill="#ffffff" stroke="${frameColor}" stroke-width="2.5" stroke-linejoin="round" />\n`;
    svg += `<rect x="${cx - 32}" y="${qrY - 14}" width="64" height="10" rx="3" fill="${frameColor}" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">👨‍🍳 ${escapeXml(frameText || 'CHEF MENU')}</text>\n`;
  } else if (frame === 'food-cover') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    const cx = cardWidth / 2;
    svg += `<circle cx="${cx}" cy="${qrY - 24}" r="5" fill="${frameColor}" />\n`;
    svg += `<path d="M ${cx - 55} ${qrY - 4} C ${cx - 55} ${qrY - 28} ${cx + 55} ${qrY - 28} ${cx + 55} ${qrY - 4} Z" fill="${frameColor}" fill-opacity="0.12" stroke="${frameColor}" stroke-width="2.5" />\n`;
    svg += `<line x1="${cx - 62}" y1="${qrY - 4}" x2="${cx + 62}" y2="${qrY - 4}" stroke="${frameColor}" stroke-width="3" stroke-linecap="round" />\n`;
    svg += `<ellipse cx="${cx}" cy="${cardHeight - padding + 4}" rx="${cardWidth * 0.42}" ry="4" fill="${frameColor}" fill-opacity="0.25" stroke="${frameColor}" stroke-width="2" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="8" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">${escapeXml(frameText || 'MENU')}</text>\n`;
  } else if (frame === 'delivery') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">🛵 ${escapeXml(frameText || 'ORDER NOW')}</text>\n`;
  } else if (frame === 'drink') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<path d="M ${padding + 44} ${qrY + 10} L ${padding + 26} ${qrY - 22} L ${padding + 14} ${qrY - 18}" fill="none" stroke="${frameColor}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />\n`;
    svg += `<circle cx="${padding + 58}" cy="${qrY - 4}" r="11" fill="#ffffff" stroke="${frameColor}" stroke-width="2.5" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">🍹 ${escapeXml(frameText || 'DRINKS')}</text>\n`;
  } else if (frame === 'gift') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    const cx = cardWidth / 2;
    svg += `<ellipse cx="${cx - 15}" cy="${qrY - 12}" rx="13" ry="8" transform="rotate(-20 ${cx - 15} ${qrY - 12})" fill="${frameColor}" fill-opacity="0.25" stroke="${frameColor}" stroke-width="2.2" />\n`;
    svg += `<ellipse cx="${cx + 15}" cy="${qrY - 12}" rx="13" ry="8" transform="rotate(20 ${cx + 15} ${qrY - 12})" fill="${frameColor}" fill-opacity="0.25" stroke="${frameColor}" stroke-width="2.2" />\n`;
    svg += `<circle cx="${cx}" cy="${qrY - 12}" r="6" fill="${frameColor}" />\n`;
    svg += `<path d="M ${cx - 4} ${qrY - 6} Q ${cx - 12} ${qrY + 4} ${cx - 20} ${qrY + 2}" fill="none" stroke="${frameColor}" stroke-width="2" stroke-linecap="round" />\n`;
    svg += `<path d="M ${cx + 4} ${qrY - 6} Q ${cx + 12} ${qrY + 4} ${cx + 20} ${qrY + 2}" fill="none" stroke="${frameColor}" stroke-width="2" stroke-linecap="round" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="10" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">🎁 ${escapeXml(frameText || 'FOR YOU')}</text>\n`;
  } else if (frame === 'shopping-bag') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    const cx = cardWidth / 2;
    svg += `<path d="M ${cx - 26} ${qrY} C ${cx - 26} ${qrY - 24} ${cx + 26} ${qrY - 24} ${cx + 26} ${qrY}" fill="none" stroke="${frameColor}" stroke-width="4" stroke-linecap="round" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="8" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">🛍️ ${escapeXml(frameText || 'SHOP NOW')}</text>\n`;
  } else if (frame === 'receipt') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight - 6;
    svg += `<line x1="${padding}" y1="${qrY - 6}" x2="${cardWidth - padding}" y2="${qrY - 6}" stroke="${frameColor}" stroke-width="2" stroke-dasharray="6,4,2,4,8,3" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="4" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1.5">🧾 ${escapeXml(frameText || 'RECEIPT')}</text>\n`;
    // Zigzag serrated teeth bottom
    const tW = cardWidth / 12;
    let teeth = `M 0 ${cardHeight} `;
    for (let i = 0; i < 12; i++) {
      teeth += `L ${(i + 0.5) * tW} ${cardHeight - 6} L ${(i + 1) * tW} ${cardHeight} `;
    }
    svg += `<path d="${teeth}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />\n`;
  } else if (frame === 'polaroid') {
    svg += `<text x="${cardWidth / 2}" y="${cardHeight - 24}" fill="${frameColor}" font-family="Brush Script MT, cursive, -apple-system, sans-serif" font-style="italic" font-weight="700" font-size="22" text-anchor="middle">${escapeXml(frameText || 'Scan Me!')}</text>\n`;
  } else if (frame === 'burst') {
    const bannerW = cardWidth - padding * 2;
    const bannerY = cardHeight - padding - bannerHeight;
    svg += `<line x1="8" y1="16" x2="1" y2="9" stroke="${frameColor}" stroke-width="2.5" stroke-linecap="round" />\n`;
    svg += `<line x1="${cardWidth - 8}" y1="16" x2="${cardWidth - 1}" y2="9" stroke="${frameColor}" stroke-width="2.5" stroke-linecap="round" />\n`;
    svg += `<line x1="4" y1="${cardHeight / 2}" x2="-5" y2="${cardHeight / 2}" stroke="${frameColor}" stroke-width="2.5" stroke-linecap="round" />\n`;
    svg += `<line x1="${cardWidth - 4}" y1="${cardHeight / 2}" x2="${cardWidth + 5}" y2="${cardHeight / 2}" stroke="${frameColor}" stroke-width="2.5" stroke-linecap="round" />\n`;
    svg += `<rect x="${padding}" y="${bannerY}" width="${bannerW}" height="${bannerHeight}" rx="8" fill="${frameColor}" />\n`;
    svg += `<text x="${cardWidth / 2}" y="${bannerY + bannerHeight / 2 + 5}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">⚡ ${escapeXml(frameText || 'SCAN NOW')}</text>\n`;
  } else if (frame === 'arrow-scan') {
    svg += `<path d="M 28 ${cardHeight - 14} Q 18 ${cardHeight - 28} 34 ${cardHeight - 36}" fill="none" stroke="${frameColor}" stroke-width="2.5" stroke-linecap="round" />\n`;
    svg += `<polygon points="34,${cardHeight - 40} 38,${cardHeight - 32} 30,${cardHeight - 34}" fill="${frameColor}" />\n`;
    svg += `<text x="56" y="${cardHeight - 16}" fill="${frameColor}" font-family="Brush Script MT, cursive, -apple-system, sans-serif" font-style="italic" font-weight="700" font-size="19" text-anchor="start">Scan Me!</text>\n`;
  }

  // QR Code Group
  svg += `<g transform="translate(${qrX}, ${qrY})">\n`;

  // Draw Data Modules
  const fillStyle = useGradient ? `url(#${gradId})` : dotColor;

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip 3 finder patterns
      const isFinderTL = r < 7 && c < 7;
      const isFinderTR = r < 7 && c >= matrixSize - 7;
      const isFinderBL = r >= matrixSize - 7 && c < 7;
      if (isFinderTL || isFinderTR || isFinderBL) continue;

      // Skip logo area
      if (logoStart !== -1 && r >= logoStart && r < logoEnd && c >= logoStart && c < logoEnd) {
        continue;
      }

      const isDark = qr.modules.get(r, c);
      if (isDark) {
        const x = c * modSize;
        const y = r * modSize;
        svg += renderModuleDot(dotStyle, x, y, modSize, fillStyle);
      }
    }
  }

  // Draw 3 Finder Patterns
  // 1. Top-Left
  svg += renderFinderPattern(0, 0, modSize, cornerBorderStyle, cornerBorderColor, cornerCenterStyle, cornerCenterColor, 'TL');
  // 2. Top-Right
  svg += renderFinderPattern((matrixSize - 7) * modSize, 0, modSize, cornerBorderStyle, cornerBorderColor, cornerCenterStyle, cornerCenterColor, 'TR');
  // 3. Bottom-Left
  svg += renderFinderPattern(0, (matrixSize - 7) * modSize, modSize, cornerBorderStyle, cornerBorderColor, cornerCenterStyle, cornerCenterColor, 'BL');

  // Draw Logo (if selected)
  if (selectedLogo !== 'none' && logoUrl && logoStart !== -1) {
    const lx = logoStart * modSize;
    const ly = logoStart * modSize;
    const lw = logoModules * modSize;
    const lh = lw;
    const pad = 4;

    // Clean white backing badge for logo
    svg += `  <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="${lw * 0.22}" fill="#ffffff" filter="url(#card_shadow)" />\n`;
    svg += `  <image href="${logoUrl}" x="${lx + pad}" y="${ly + pad}" width="${lw - pad * 2}" height="${lh - pad * 2}" preserveAspectRatio="xMidYMid meet" />\n`;
  }

  svg += `</g>\n`;
  svg += `</svg>`;

  return svg;
}

/**
 * Render individual data module dot
 */
function renderModuleDot(style, x, y, size, fill) {
  const pad = 0.5;
  const s = size - pad * 2;
  const cx = x + size / 2;
  const cy = y + size / 2;

  switch (style) {
    case 'dots':
      return `  <circle cx="${cx}" cy="${cy}" r="${s / 2 - 0.2}" fill="${fill}" />\n`;

    case 'rounded':
      return `  <rect x="${x + pad}" y="${y + pad}" width="${s}" height="${s}" rx="${s * 0.28}" fill="${fill}" />\n`;

    case 'extra-rounded':
      return `  <rect x="${x + pad}" y="${y + pad}" width="${s}" height="${s}" rx="${s * 0.45}" fill="${fill}" />\n`;

    case 'classy':
      // Rounded top-left and bottom-right corners
      const r = s * 0.45;
      return `  <path d="M ${x + pad + r} ${y + pad} H ${x + pad + s} V ${y + pad + s - r} A ${r} ${r} 0 0 1 ${x + pad + s - r} ${y + pad + s} H ${x + pad} V ${y + pad + r} A ${r} ${r} 0 0 1 ${x + pad + r} ${y + pad} Z" fill="${fill}" />\n`;

    case 'classy-rounded':
      // Round top-left and bottom-right completely
      const cr = s * 0.5;
      return `  <path d="M ${x + pad + cr} ${y + pad} H ${x + pad + s} V ${y + pad + s - cr} A ${cr} ${cr} 0 0 1 ${x + pad + s - cr} ${y + pad + s} H ${x + pad} V ${y + pad + cr} A ${cr} ${cr} 0 0 1 ${x + pad + cr} ${y + pad} Z" fill="${fill}" />\n`;

    case 'diamond':
      return `  <polygon points="${cx},${y + pad} ${x + pad + s},${cy} ${cx},${y + pad + s} ${x + pad},${cy}" fill="${fill}" />\n`;

    case 'star':
      // 4-point star
      const rOuter = s * 0.5;
      return `  <path d="M ${cx} ${cy - rOuter} Q ${cx} ${cy} ${cx + rOuter} ${cy} Q ${cx} ${cy} ${cx} ${cy + rOuter} Q ${cx} ${cy} ${cx - rOuter} ${cy} Q ${cx} ${cy} ${cx} ${cy - rOuter} Z" fill="${fill}" />\n`;

    case 'square':
    default:
      return `  <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" />\n`;
  }
}

/**
 * Render 7x7 Finder Pattern Corner (Outer Border + Inner Eye)
 */
function renderFinderPattern(x, y, modSize, borderStyle, borderColor, centerStyle, centerColor, cornerPos) {
  const total = 7 * modSize; // 70px
  const cx = x + total / 2;
  const cy = y + total / 2;
  let out = `  <!-- Finder Pattern at (${x}, ${y}) -->\n`;

  // 1. OUTER BORDER
  switch (borderStyle) {
    case 'circle':
    case 'dot':
      out += `  <circle cx="${cx}" cy="${cy}" r="${total / 2 - modSize / 2}" fill="none" stroke="${borderColor}" stroke-width="${modSize}" />\n`;
      break;

    case 'extra-rounded':
    case 'rounded':
      out += `  <rect x="${x + modSize / 2}" y="${y + modSize / 2}" width="${total - modSize}" height="${total - modSize}" rx="14" fill="none" stroke="${borderColor}" stroke-width="${modSize}" />\n`;
      break;

    case 'leaf':
      // Leaf: diagonal corners rounded, opposite corners sharp!
      const rad = 22;
      if (cornerPos === 'TR') {
        out += `  <path d="M ${x + modSize / 2} ${y + modSize / 2} H ${x + total - modSize / 2 - rad} A ${rad} ${rad} 0 0 1 ${x + total - modSize / 2} ${y + modSize / 2 + rad} V ${y + total - modSize / 2} H ${x + modSize / 2 + rad} A ${rad} ${rad} 0 0 1 ${x + modSize / 2} ${y + total - modSize / 2 - rad} Z" fill="none" stroke="${borderColor}" stroke-width="${modSize}" stroke-linejoin="round" />\n`;
      } else {
        out += `  <path d="M ${x + modSize / 2 + rad} ${y + modSize / 2} H ${x + total - modSize / 2} V ${y + total - modSize / 2 - rad} A ${rad} ${rad} 0 0 1 ${x + total - modSize / 2 - rad} ${y + total - modSize / 2} H ${x + modSize / 2} V ${y + modSize / 2 + rad} A ${rad} ${rad} 0 0 1 ${x + modSize / 2 + rad} ${y + modSize / 2} Z" fill="none" stroke="${borderColor}" stroke-width="${modSize}" stroke-linejoin="round" />\n`;
      }
      break;

    case 'square':
    default:
      out += `  <rect x="${x + modSize / 2}" y="${y + modSize / 2}" width="${total - modSize}" height="${total - modSize}" fill="none" stroke="${borderColor}" stroke-width="${modSize}" />\n`;
      break;
  }

  // 2. INNER CENTER EYE (3x3 modules = 30x30px)
  const eyeSize = 3 * modSize; // 30px
  const eyeX = x + 2 * modSize;
  const eyeY = y + 2 * modSize;

  switch (centerStyle) {
    case 'dot':
      out += `  <circle cx="${cx}" cy="${cy}" r="${eyeSize / 2}" fill="${centerColor}" />\n`;
      break;

    case 'rounded':
      out += `  <rect x="${eyeX}" y="${eyeY}" width="${eyeSize}" height="${eyeSize}" rx="8" fill="${centerColor}" />\n`;
      break;

    case 'star':
      const rStar = eyeSize * 0.52;
      out += `  <path d="M ${cx} ${cy - rStar} Q ${cx} ${cy} ${cx + rStar} ${cy} Q ${cx} ${cy} ${cx} ${cy + rStar} Q ${cx} ${cy} ${cx - rStar} ${cy} Q ${cx} ${cy} ${cx} ${cy - rStar} Z" fill="${centerColor}" />\n`;
      break;

    case 'heart':
      out += `  <path d="M ${cx} ${cy + 10} C ${cx - 15} ${cy - 2} ${cx - 15} ${cy - 12} ${cx} ${cy - 5} C ${cx + 15} ${cy - 12} ${cx + 15} ${cy - 2} ${cx} ${cy + 10} Z" fill="${centerColor}" />\n`;
      break;

    case 'diamond':
      out += `  <polygon points="${cx},${eyeY} ${eyeX + eyeSize},${cy} ${cx},${eyeY + eyeSize} ${eyeX},${cy}" fill="${centerColor}" />\n`;
      break;

    case 'plus':
      const pThick = 9;
      out += `  <rect x="${cx - pThick / 2}" y="${eyeY}" width="${pThick}" height="${eyeSize}" rx="2" fill="${centerColor}" />\n`;
      out += `  <rect x="${eyeX}" y="${cy - pThick / 2}" width="${eyeSize}" height="${pThick}" rx="2" fill="${centerColor}" />\n`;
      break;

    case 'square':
    default:
      out += `  <rect x="${eyeX}" y="${eyeY}" width="${eyeSize}" height="${eyeSize}" fill="${centerColor}" />\n`;
      break;
  }

  return out;
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
