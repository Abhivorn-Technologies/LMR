'use client';

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

export function FreeformCanvasBlock({ content, blockIndex }: { content: any, blockIndex?: number }) {
  const { height = '600px', backgroundColor = '#f8fafc', items = [] } = content || {};
  
  // Local state for smooth dragging before syncing to DB
  const [localItems, setLocalItems] = useState<any[]>(items);

  // Sync when prop changes (e.g. user edits via JSON sidebar)
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleDragStop = (itemIndex: number, d: { x: number, y: number }) => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      // Send message to parent JSON Editor to save permanently
      window.parent.postMessage({
        type: 'UPDATE_BLOCK_ITEM',
        blockIndex,
        itemIndex,
        props: { x: d.x, y: d.y }
      }, '*');
    }
  };

  const handleResizeStop = (itemIndex: number, e: any, direction: any, ref: any, delta: any, position: { x: number, y: number }) => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage({
        type: 'UPDATE_BLOCK_ITEM',
        blockIndex,
        itemIndex,
        props: {
          width: ref.style.width,
          height: ref.style.height,
          x: position.x,
          y: position.y
        }
      }, '*');
    }
  };

  return (
    <div 
      style={{ height, backgroundColor }} 
      className="w-full relative overflow-hidden"
    >
      <div className="absolute top-2 left-2 text-xs font-bold text-gray-400 uppercase tracking-widest z-0 pointer-events-none">
        Live Freeform Canvas
      </div>
      
      {localItems.map((item: any, i: number) => (
        <Rnd
          key={i}
          size={{ width: item.width || 200, height: item.height || 200 }}
          position={{ x: item.x || 0, y: item.y || 0 }}
          onDragStop={(e, d) => {
            // Update local state instantly for smooth UI
            const newItems = [...localItems];
            newItems[i] = { ...newItems[i], x: d.x, y: d.y };
            setLocalItems(newItems);
            // Sync to parent
            handleDragStop(i, d);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
             const newItems = [...localItems];
             newItems[i] = { 
               ...newItems[i], 
               width: ref.style.width, 
               height: ref.style.height,
               x: position.x,
               y: position.y
             };
             setLocalItems(newItems);
             handleResizeStop(i, e, direction, ref, delta, position);
          }}
          bounds="parent"
          className="group"
        >
          {item.type === 'image' ? (
            <img 
              src={item.src || 'https://via.placeholder.com/200'} 
              alt="canvas object" 
              className="w-full h-full object-cover rounded-lg shadow-md pointer-events-none group-hover:ring-4 ring-[#00A3A0]/50 transition-all"
            />
          ) : (
            <div className="w-full h-full bg-white p-4 rounded-lg shadow-md border-2 border-transparent group-hover:border-[#00A3A0]/50 overflow-hidden flex items-center justify-center text-center font-semibold text-gray-700">
              {item.text || 'Text Box'}
            </div>
          )}
        </Rnd>
      ))}
      
      {localItems.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
          Empty Canvas. Add items in the Left Sidebar.
        </div>
      )}
    </div>
  );
}
