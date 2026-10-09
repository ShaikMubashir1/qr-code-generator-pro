/**
 * Dynamically detects website global theme colors from CSS variables and stylesheets
 */
export function detectWebsiteColors() {
  const result = {
    primary: '#7C4DFF',
    dark: '#0D0D19',
    palette: [],
  };

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return result;
  }

  const foundColors = [];

  const isValidColor = (val) => {
    if (!val) return false;
    val = val.trim();
    return (
      /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(val) ||
      /^rgb/i.test(val) ||
      /^hsl/i.test(val)
    );
  };

  const toHex = (val) => {
    if (!val) return '';
    val = val.trim();
    if (val.startsWith('#')) {
      // Clean 8-char hex with alpha if full opacity or 6-char
      return val.length > 7 ? val.substring(0, 7).toUpperCase() : val.toUpperCase();
    }
    const rgb = val.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const r = parseInt(rgb[0]);
      const g = parseInt(rgb[1]);
      const b = parseInt(rgb[2]);
      const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return `#${hex.toUpperCase()}`;
    }
    return val;
  };

  // 0. Check server-injected WordPress theme colors
  if (window.wpGlobalThemeColors && Array.isArray(window.wpGlobalThemeColors)) {
    window.wpGlobalThemeColors.forEach((col) => {
      if (isValidColor(col)) {
        const hex = toHex(col);
        if (hex && !foundColors.includes(hex)) {
          foundColors.push(hex);
        }
      }
    });
  }

  // 1. Scan Elementor Kit and root DOM elements
  const targets = [
    document.querySelector('[class*="elementor-kit-"]'),
    document.body,
    document.documentElement,
  ].filter(Boolean);

  const priorityKeys = [
    '--e-global-color-accent',
    '--e-global-color-primary',
    '--e-global-color-secondary',
    '--wp--preset--color--primary',
    '--wp--preset--color--accent',
    '--ast-global-color-0',
    '--ast-global-color-1',
    '--global-palette1',
    '--global-palette2',
    '--primary-color',
    '--accent-color',
  ];

  targets.forEach((target) => {
    try {
      const computed = window.getComputedStyle(target);
      priorityKeys.forEach((key) => {
        const val = computed.getPropertyValue(key);
        if (isValidColor(val)) {
          const hex = toHex(val);
          if (hex && !foundColors.includes(hex)) {
            foundColors.push(hex);
          }
        }
      });
    } catch (e) {}
  });

  // 2. Scan document stylesheets for any global color variables
  try {
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (rule.style) {
            for (let k = 0; k < rule.style.length; k++) {
              const prop = rule.style[k];
              if (
                prop.startsWith('--e-global-color-') ||
                prop.startsWith('--wp--preset--color--') ||
                prop.startsWith('--ast-global-color-') ||
                prop.startsWith('--global-palette')
              ) {
                const val = rule.style.getPropertyValue(prop);
                if (isValidColor(val)) {
                  const hex = toHex(val);
                  if (hex && !foundColors.includes(hex)) {
                    foundColors.push(hex);
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        // Cross-domain security restriction, continue
      }
    }
  } catch (e) {}

  // 3. Fallback: check main site link/button color
  if (foundColors.length === 0) {
    const link = document.querySelector('a:not(#custom-qr-generator-root a)');
    if (link) {
      try {
        const c = toHex(window.getComputedStyle(link).color);
        if (isValidColor(c) && c !== '#000000' && c !== '#FFFFFF') {
          foundColors.push(c);
        }
      } catch (e) {}
    }
  }

  // Filter out pure white, pure transparent or invalid colors
  const cleanColors = foundColors.filter(
    (c) => c && c.startsWith('#') && c !== '#FFFFFF' && c !== '#00000000'
  );

  if (cleanColors.length > 0) {
    // Pick the most vibrant non-black as primary accent
    const vibrant = cleanColors.find((c) => c !== '#000000' && c !== '#0D0D19' && c !== '#111111') || cleanColors[0];
    result.primary = vibrant;
    result.palette = Array.from(new Set(cleanColors)).slice(0, 8);
  } else {
    result.palette = ['#7C4DFF', '#2563EB', '#0D0D19', '#10B981', '#F59E0B', '#EF4444'];
  }

  return result;
}
