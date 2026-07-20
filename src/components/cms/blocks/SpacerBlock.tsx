import React from 'react';

export function SpacerBlock({ content }: { content: any }) {
  const { height = '64px' } = content || {};
  
  return <div style={{ height, width: '100%' }} />;
}
