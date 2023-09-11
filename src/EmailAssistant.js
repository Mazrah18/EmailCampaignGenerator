



// import React, { useState } from 'react';
// import axios from 'axios';
// import EmailPreview from './EmailPreview'; // Import the EmailPreview component

// function EmailAssistant() {
//   const [campaignGoal, setCampaignGoal] = useState('');
//   const [brandTone, setBrandTone] = useState('');
//   const [industry, setIndustry] = useState('');
//   const [highlights, setHighlights] = useState('');
//   const [emailTemplates, setEmailTemplates] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // For showing loading state

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Set loading state

//     const requestData = {
//       campaign_goal: campaignGoal,
//       brand_tone: brandTone,
//       industry: industry,
//       highlights: highlights,
//     };

//     try {
//       const response = await axios.post('https://flask-production-399d.up.railway.app/generate_emails', requestData);
//       setEmailTemplates(response.data.email_templates);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   const handlePreviewClick = (index) => {
//     setSelectedEmail(emailTemplates[index]);
//   };

//   const handleBackClick = () => {
//     setSelectedEmail(null);
//   };

//   return (
//     <div className='container'>
//       <h1>Email Marketing Content Assistant</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Campaign Goal:</label>
//           <select value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)}>
//             <option value="Convince to buy a product">Convince to buy a product</option>
//             <option value="Recover Charmed customers">Recover Charmed customers</option>
//             <option value="Teach A new concept">Teach A new concept</option>
//             <option value="Onboard users">Onboard users</option>
//             <option value="Share product updates">Share product updates</option>
//           </select>
//         </div>
//         <div>
//           <label>Brand Tone:</label>
//           <select value={brandTone} onChange={(e) => setBrandTone(e.target.value)}>
//             <option value="Formal">Formal</option>
//             <option value="Informal">Informal</option>
//           </select>
//         </div>
//         <div>
//           <label>Industry:</label>
//           <input type="text" placeholder='Industry Type' value={industry} onChange={(e) => setIndustry(e.target.value)} />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input type="text" placeholder = 'Provide a summary of the points you want to cover'value={highlights} onChange={(e) => setHighlights(e.target.value)} />
//         </div>
//         <button type="submit">Generate Emails</button>
//       </form>
//       <div className="output">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : selectedEmail ? (
//           <div>
//             <button onClick={handleBackClick}>Back to Previews</button>
//             <div className="full-email">
//               <p>{selectedEmail}</p>
//             </div>
//           </div>
//         ) : (
//           emailTemplates.map((template, index) => (
//             <EmailPreview key={index} content={template} onClick={() => handlePreviewClick(index)} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default EmailAssistant;


import React, { useState } from 'react';
import axios from 'axios';
import EmailPreview from './EmailPreview'; // Import the EmailPreview component

function EmailAssistant() {
  const [campaignGoal, setCampaignGoal] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [industry, setIndustry] = useState('');
  const [highlights, setHighlights] = useState('');
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      campaign_goal: campaignGoal,
      brand_tone: brandTone,
      industry: industry,
      highlights: highlights,
    };

    try {
      const response = await axios.post('https://flask-production-399d.up.railway.app/generate_emails', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEmailTemplates(response.data.email_templates);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewClick = (index) => {
    setSelectedEmail(emailTemplates[index]);
  };

  const handleBackClick = () => {
    setSelectedEmail(null);
  };

  return (
    <div className='container'>
      <h1>Email Marketing Content Assistant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Campaign Goal:</label>
          <select value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)}>
            <option value="Convince to buy a product">Convince to buy a product</option>
            <option value="Recover Charmed customers">Recover Charmed customers</option>
            <option value="Teach A new concept">Teach A new concept</option>
            <option value="Onboard users">Onboard users</option>
            <option value="Share product updates">Share product updates</option>
          </select>
        </div>
        <div>
          <label>Brand Tone:</label>
          <select value={brandTone} onChange={(e) => setBrandTone(e.target.value)}>
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
          </select>
        </div>
        <div>
          <label>Industry:</label>
          <input type="text" placeholder='Industry Type' value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" placeholder='Provide a summary of the points you want to cover' value={highlights} onChange={(e) => setHighlights(e.target.value)} />
        </div>
        <button type="submit">Generate Emails</button>
      </form>
      <div className="output">
        {isLoading ? (
          <p>Loading...</p>
        ) : selectedEmail ? (
          <div>
            <button onClick={handleBackClick}>Back to Previews</button>
            <div className="full-email">
              <p>{selectedEmail}</p>
            </div>
          </div>
        ) : (
          emailTemplates.map((template, index) => (
            <EmailPreview key={index} content={template} onClick={() => handlePreviewClick(index)} />
          ))
        )}
      </div>
    </div>
  );
}

export default EmailAssistant;
