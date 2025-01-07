import React from 'react';

const MapComponent = () => {
  return (
    <div className="mapouter" style={{ position: 'relative', textAlign: 'right', height: '566px', width: '1200px' }}>
      <div className="gmap_canvas" style={{ overflow: 'hidden', background: 'none', height: '566px', width: '1200px' }}>
        <iframe
          title="Google Map"
          width="1200"
          height="566"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=36.737232%2C3.086472&t=&z=20&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
    </div>
  );
};

export default MapComponent;
