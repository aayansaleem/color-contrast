import React, { useState } from 'react';

    function TextPreview({ backgroundColor, foregroundColor, selectedFont, textColor }) {
      const [largeText, setLargeText] = useState(
        'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn’t for him - Yes, yes, I’m George, George McFly, and I’m your density. I mean, I’m your destiny. Right. Alright, take it up, go. Doc. Something',
      );
      const [normalText, setNormalText] = useState(
        'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn’t for him - Yes, yes, I’m George, George McFly, and I’m your density. I mean, I’m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.',
      );

      return (
        <div className="text-preview">
          <div
            className="large-text"
            style={{
              backgroundColor: backgroundColor,
              color: foregroundColor,
              fontFamily: selectedFont,
              borderColor: textColor
            }}
            contentEditable="true"
            onBlur={(e) => setLargeText(e.target.innerText)}
          >
            {largeText}
          </div>
          <div
            className="normal-text"
            style={{
              backgroundColor: backgroundColor,
              color: foregroundColor,
              fontFamily: selectedFont,
              borderColor: textColor
            }}
            contentEditable="true"
            onBlur={(e) => setNormalText(e.target.innerText)}
          >
            {normalText}
          </div>
        </div>
      );
    }

    export default TextPreview;
