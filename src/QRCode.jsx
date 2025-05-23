import React from 'react';

const QRCode = ({ url }) => {
  // Generate a QR code URL using a free QR code API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`;
  
  return (
    <div className="qr-code">
      <img src={qrCodeUrl} alt={`QR Code for ${url}`} width="100" height="100" />
    </div>
  );
};

export default QRCode;
