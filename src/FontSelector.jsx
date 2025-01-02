import React from 'react';

    const fontOptions = [
      'Roboto',
      'Open Sans',
      'Lato',
      'Montserrat',
      'Slabo 27px',
      'Raleway',
      'Poppins',
      'Oswald',
      'Merriweather',
      'PT Sans',
    ];

    function FontSelector({ selectedFont, onFontChange, textColor }) {
      return (
        <div className="font-selector">
          <label style={{ color: textColor }}>Typeface</label>
          <select
            value={selectedFont}
            onChange={(e) => onFontChange(e.target.value)}
            style={{ color: textColor, borderColor: textColor }}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <div
            className="font-preview"
            style={{ fontFamily: selectedFont, color: textColor, borderColor: textColor }}
          >
            Example copy
          </div>
        </div>
      );
    }

    export default FontSelector;
