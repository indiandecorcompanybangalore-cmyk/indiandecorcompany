import React from 'react';

export const GoogleMapEmbed = ({
  height = '480px',
  className = '',
  style = {}
}) => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.1631468674286!2d77.6090095!3d13.0480035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1700744fdca5%3A0xc1d770f5dc495864!2sIndian%20Decor%20Company!5e1!3m2!1sen!2sin!4v1791906666552!5m2!1sen!2sin";

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#F3F4F6',
        ...style
      }}
    >
      <iframe
        src={mapSrc}
        title="Indian Decor Company Official Location Google Map"
        width="100%"
        height={height}
        style={{
          border: 0,
          display: 'block',
          width: '100%',
          filter: 'contrast(1.02) saturate(1.05)'
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};
