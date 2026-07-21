import React from 'react';
import { ProductHero } from '@/components/services/product/ProductHero';
import { PremiumProductLayout } from '@/components/services/product/PremiumProductLayout';
import { getProductImages } from '@/lib/utils/imageMapper';
import { CarInsuranceContent } from '@/components/services/content/CarInsuranceContent';

export function PremiumProductLayoutBlock({ content }: { content: any }) {
  // Use the title to grab the right category images just like the frontend page does
  const categoryImages = getProductImages(content.title || '');

  const isCarInsurance = content.title?.toLowerCase().includes('car insurance');

  return (
    <div className="w-full relative z-0">
      <ProductHero 
        title={content.title || ''}
        subtitle={content.subtitle || ''}
        description={content.description || ''}
        image={content.image || '/assets/image3.jpeg'}
        badges={content.badges || []}
      />
      
      {/* Specifically for car insurance layout which is hardcoded in frontend right now */}
      {isCarInsurance ? (
        <CarInsuranceContent />
      ) : (
        <PremiumProductLayout data={content} images={categoryImages} />
      )}
    </div>
  );
}
