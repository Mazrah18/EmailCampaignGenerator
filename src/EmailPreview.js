import React from 'react';

function EmailPreview({ content, onClick }) {
  return (
    <div className="whole">
 <div className="email-preview" onClick={onClick}>
      <p>{content.substring(0, 100)}...</p>
    </div>
    </div>
   
  );
}

export default EmailPreview;
