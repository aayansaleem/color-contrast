import React from 'react';

    function ContrastScore({ score, foregroundColor, backgroundColor }) {
      return (
        <div
          className="contrast-display"
          style={{
            backgroundColor: backgroundColor,
            color: foregroundColor,
          }}
        >
          Aa {score}
        </div>
      );
    }

    export default ContrastScore;
