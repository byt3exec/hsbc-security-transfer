import React, { useState } from 'react';

const PhishingAwarenessGame = () => {
  const [foundItems, setFoundItems] = useState({
    merchantName: false,
    amount: false,
    fpsIdentifier: false
  });
  
  const [gameComplete, setGameComplete] = useState(false);
  const [message, setMessage] = useState("Find all suspicious elements before confirming!");
  
  const allItemsFound = Object.values(foundItems).every(value => value);
  
  const handleClick = (item) => {
    if (!foundItems[item]) {
      setFoundItems({ ...foundItems, [item]: true });
      setMessage(`Good job! You found a suspicious element: ${getItemDescription(item)}`);
      
      const updatedItems = { ...foundItems, [item]: true };
      if (Object.values(updatedItems).every(value => value)) {
        setGameComplete(true);
        setMessage("Congratulations! You found all suspicious elements. You're protected from this scam!");
      }
    }
  };
  
  const getItemDescription = (item) => {
    switch(item) {
      case 'merchantName':
        return "The merchant claims to be HSBC but this might not be an official HSBC payment page";
      case 'amount':
        return "The small amount (1.00 SGD) is suspicious, scammers often start with small charges";
      case 'fpsIdentifier':
        return "The FPS Identifier 0000000 looks suspicious and doesn't follow standard format";
      default:
        return "";
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mt-8">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="cursor-pointer">✕</div>
          <h2 className="text-lg font-semibold text-center">Confirmation</h2>
          <div className="w-4"></div>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full p-4 mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h3 className="text-xl mb-2">Instruction received</h3>
          
          <p className="text-gray-600 text-center mb-6">
            Quote the bill reference number to your merchant for queries.
          </p>
          
          <div className="bg-gray-50 w-full rounded-lg p-4 mb-6">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Bill reference number</span>
              <span className="font-medium">XXXXXXX</span>
            </div>
            
            <div 
              className={`flex justify-between py-2 border-b cursor-pointer relative ${foundItems.merchantName ? 'bg-yellow-100' : ''}`}
              onClick={() => handleClick('merchantName')}
            >
              <span className="text-gray-500">Merchant</span>
              <span className="font-medium">HSBC</span>
              {foundItems.merchantName && (
                <div className="absolute inset-0 border-2 border-red-500 rounded-md pointer-events-none"></div>
              )}
            </div>
            
            <div 
              className={`flex justify-between py-2 border-b cursor-pointer relative ${foundItems.fpsIdentifier ? 'bg-yellow-100' : ''}`}
              onClick={() => handleClick('fpsIdentifier')}
            >
              <span className="text-gray-500">FPS Identifier</span>
              <span className="font-medium">0000000</span>
              {foundItems.fpsIdentifier && (
                <div className="absolute inset-0 border-2 border-red-500 rounded-md pointer-events-none"></div>
              )}
            </div>
            
            <div 
              className={`flex justify-between py-2 cursor-pointer relative ${foundItems.amount ? 'bg-yellow-100' : ''}`}
              onClick={() => handleClick('amount')}
            >
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">1.00 SGD</span>
              {foundItems.amount && (
                <div className="absolute inset-0 border-2 border-red-500 rounded-md pointer-events-none"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center w-full mb-6">
            <div className="bg-blue-500 text-white rounded-full p-2">
              <span className="font-bold text-xs">FPS</span>
            </div>
            <span className="text-gray-700 font-medium">HSBC</span>
          </div>
          
          <div className={`w-full bg-gray-100 p-4 rounded-full text-center ${gameComplete ? 'bg-green-100' : ''}`}>
            {gameComplete ? (
              <div className="text-green-600 font-medium">
                Phishing attempt detected! Well done!
              </div>
            ) : (
              <div className="text-gray-500 font-medium">
                Swipe to confirm payment →
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mt-6 max-w-md w-full">
        <p className={`text-center ${gameComplete ? 'text-green-600' : 'text-yellow-600'} font-medium`}>
          {message}
        </p>
        <p className="text-gray-600 text-sm mt-2 text-center">
          Found: {Object.values(foundItems).filter(Boolean).length} / 3 suspicious elements
        </p>
        
        {gameComplete && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">Phishing Warning Signs:</h3>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>• Fake merchant name: Always verify the payment service is legitimate</li>
              <li>• Suspicious identifier: Look for unusual account numbers or IDs</li>
              <li>• Small test amount: Scammers often test with small charges before larger fraud</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingAwarenessGame;
