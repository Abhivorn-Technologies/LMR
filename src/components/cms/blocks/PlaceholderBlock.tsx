import React from 'react';
import { Hammer } from 'lucide-react';

export function PlaceholderBlock({ type, content }: { type: string, content: any }) {
  // Format the type for display (e.g. 'PricingBlock' -> 'Pricing Block')
  const formattedType = type.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6">
      <div className="w-full border-2 border-dashed border-[#00A3A0]/30 bg-[#00A3A0]/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-[#00A3A0]/20">
          <Hammer size={32} className="text-[#00A3A0]" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {formattedType} [Development Placeholder]
        </h3>
        
        <p className="text-gray-500 max-w-lg mb-6">
          This component has been added to your page schema and can be configured in the editor. 
          The final front-end design is currently under development and will appear here soon.
        </p>

        {/* Display JSON payload so admin knows it works */}
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg p-4 text-left overflow-x-auto shadow-sm">
          <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Current Schema Data</div>
          <pre className="text-sm text-gray-700 font-mono">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
