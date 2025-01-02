import React, { useState, useEffect } from 'react';
    import ContrastScore from './ContrastScore';
    import FontSelector from './FontSelector';
    import TextPreview from './TextPreview';

    function App() {
      const [backgroundColor, setBackgroundColor] = useState('#0000ff');
      const [foregroundColor, setForegroundColor] = useState('#ffffff');
      const [contrastRatio, setContrastRatio] = useState(0);
      const [wcagResults, setWcagResults] = useState({
        aaLarge: false,
        aaaLarge: false,
        aaNormal: false,
        aaaNormal: false,
      });

      const [backgroundRgb, setBackgroundRgb] = useState({ r: 0, g: 0, b: 255 });
      const [foregroundRgb, setForegroundRgb] = useState({ r: 255, g: 255, b: 255 });
      const [selectedFont, setSelectedFont] = useState('Roboto');
      const [textColor, setTextColor] = useState('#fff');

      const hexToRgb = (hex) => {
        const sanitizedHex = hex.replace('#', '');
        const bigint = parseInt(sanitizedHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
      };

      const rgbToHex = (rgb) => {
        return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
          .toString(16)
          .slice(1)}`;
      };

      const rgbToLuminance = (rgb) => {
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
          let sRGB = c / 255;
          if (sRGB <= 0.03928) {
            return sRGB / 12.92;
          }
          return Math.pow((sRGB + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const calculateContrastRatio = (color1, color2) => {
        const luminance1 = rgbToLuminance(hexToRgb(color1));
        const luminance2 = rgbToLuminance(hexToRgb(color2));

        const brighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);

        return (brighter + 0.05) / (darker + 0.05);
      };

      const checkWcagCompliance = (ratio) => {
        setWcagResults({
          aaLarge: ratio >= 3,
          aaaLarge: ratio >= 4.5,
          aaNormal: ratio >= 4.5,
          aaaNormal: ratio >= 7,
        });
      };

      const calculateLuminance = (hexColor) => {
        const rgb = hexToRgb(hexColor);
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
          let sRGB = c / 255;
          if (sRGB <= 0.03928) {
            return sRGB / 12.92;
          }
          return Math.pow((sRGB + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      useEffect(() => {
        try {
          const ratio = calculateContrastRatio(backgroundColor, foregroundColor);
          setContrastRatio(ratio.toFixed(2));
          checkWcagCompliance(ratio);
          setBackgroundRgb(hexToRgb(backgroundColor));
          setForegroundRgb(hexToRgb(foregroundColor));

          const luminance = calculateLuminance(backgroundColor);
          setTextColor(luminance > 0.5 ? '#000' : '#fff');
        } catch (error) {
          console.error("Error in useEffect:", error);
        }
      }, [backgroundColor, foregroundColor]);

      const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
      };

      const handleForegroundColorChange = (e) => {
        setForegroundColor(e.target.value);
      };

      const handleReverseColors = () => {
        setBackgroundColor(foregroundColor);
        setForegroundColor(backgroundColor);
      };

      const handleSaveColors = () => {
        alert(
          `Colors saved: Background - ${backgroundColor}, Foreground - ${foregroundColor}`,
        );
      };

      const handleCopyHexCode = (color) => {
        navigator.clipboard.writeText(color);
        alert(`Copied ${color} to clipboard`);
      };

      const handleBackgroundRgbChange = (e, color) => {
        const newRgb = { ...backgroundRgb, [color]: parseInt(e.target.value, 10) };
        setBackgroundRgb(newRgb);
        setBackgroundColor(rgbToHex(newRgb));
      };

      const handleForegroundRgbChange = (e, color) => {
        const newRgb = { ...foregroundRgb, [color]: parseInt(e.target.value, 10) };
        setForegroundRgb(newRgb);
        setForegroundColor(rgbToHex(newRgb));
      };

      const handleFontChange = (font) => {
        setSelectedFont(font);
      };

      return (
        <div style={{ backgroundColor: backgroundColor, color: textColor, minHeight: '100vh' }}>
          <div className="container" style={{ color: textColor }}>
            <h1 style={{ color: textColor }}>Colour contrast checker</h1>
            <ContrastScore
              score={contrastRatio}
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
            />
            <div className="color-input-container">
              <div className="color-input">
                <label style={{ color: textColor }}>Background colour</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={handleBackgroundColorChange}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <button onClick={() => handleCopyHexCode(backgroundColor)} style={{ color: textColor, borderColor: textColor }}>
                    Copy
                  </button>
                </div>
                <div className="rgb-inputs">
                  <label style={{ color: textColor }}>Red</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={backgroundRgb.r}
                    onChange={(e) => handleBackgroundRgbChange(e, 'r')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={backgroundRgb.r}
                    onChange={(e) => handleBackgroundRgbChange(e, 'r')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <label style={{ color: textColor }}>Green</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={backgroundRgb.g}
                    onChange={(e) => handleBackgroundRgbChange(e, 'g')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={backgroundRgb.g}
                    onChange={(e) => handleBackgroundRgbChange(e, 'g')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <label style={{ color: textColor }}>Blue</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={backgroundRgb.b}
                    onChange={(e) => handleBackgroundRgbChange(e, 'b')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={backgroundRgb.b}
                    onChange={(e) => handleBackgroundRgbChange(e, 'b')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                </div>
              </div>
              <div className="color-input">
                <label style={{ color: textColor }}>Foreground colour</label>
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={handleForegroundColorChange}
                />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={handleForegroundColorChange}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <button onClick={() => handleCopyHexCode(foregroundColor)} style={{ color: textColor, borderColor: textColor }}>
                    Copy
                  </button>
                </div>
                <div className="rgb-inputs">
                  <label style={{ color: textColor }}>Red</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={foregroundRgb.r}
                    onChange={(e) => handleForegroundRgbChange(e, 'r')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={foregroundRgb.r}
                    onChange={(e) => handleForegroundRgbChange(e, 'r')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <label style={{ color: textColor }}>Green</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={foregroundRgb.g}
                    onChange={(e) => handleForegroundRgbChange(e, 'g')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={foregroundRgb.g}
                    onChange={(e) => handleForegroundRgbChange(e, 'g')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                  <label style={{ color: textColor }}>Blue</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={foregroundRgb.b}
                    onChange={(e) => handleForegroundRgbChange(e, 'b')}
                    style={{ backgroundColor: textColor }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={foregroundRgb.b}
                    onChange={(e) => handleForegroundRgbChange(e, 'b')}
                    style={{ color: textColor, borderColor: textColor }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handleReverseColors} style={{ color: textColor, borderColor: textColor }}>Reverse colours</button>
              <button onClick={handleSaveColors} style={{ color: textColor, borderColor: textColor }}>Save colours</button>
              <button style={{ color: textColor, borderColor: textColor }}>Aa</button>
            </div>
            <div className="wcag-results">
              <div className={wcagResults.aaLarge ? '' : 'fail'} style={{ color: textColor }}>
                AA Large
              </div>
              <div className={wcagResults.aaaLarge ? '' : 'fail'} style={{ color: textColor }}>
                AAA Large
              </div>
              <div className={wcagResults.aaNormal ? '' : 'fail'} style={{ color: textColor }}>
                AA Normal
              </div>
              <div className={wcagResults.aaaNormal ? '' : 'fail'} style={{ color: textColor }}>
                AAA Normal
              </div>
            </div>
            <FontSelector
              selectedFont={selectedFont}
              onFontChange={handleFontChange}
              textColor={textColor}
            />
            <TextPreview
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              selectedFont={selectedFont}
              textColor={textColor}
            />
          </div>
        </div>
      );
    }

    export default App;
