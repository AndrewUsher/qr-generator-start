import React from 'react';
import { DestinationSidebar } from './DestinationSidebar';
import { QRInputPreview } from './QRInputPreview';
import { CustomizationPanel } from './CustomizationPanel';

export function MainCard() {
  return (
    <section className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-[-4rem] flex flex-col md:flex-row gap-8 relative z-10">
      {/* Destination Sidebar */}
      <div className="w-full md:w-1/4">
        <DestinationSidebar />
      </div>
      {/* QR Input & Preview */}
      <div className="w-full md:w-2/4">
        <QRInputPreview />
      </div>
      {/* Customization Panel */}
      <div className="w-full md:w-1/4">
        <CustomizationPanel />
      </div>
    </section>
  );
} 