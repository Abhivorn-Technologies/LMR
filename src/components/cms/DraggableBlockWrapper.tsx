'use client';

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

export function DraggableBlockWrapper({ 
  children, 
  blockIndex, 
  layout 
}: { 
  children: React.ReactNode, 
  blockIndex: number,
  layout?: { x: number, y: number, width: string | number, height: string | number }
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localLayout, setLocalLayout] = useState(layout || { x: 0, y: blockIndex * 200, width: '100%', height: 'auto' });
  const [isActive, setIsActive] = useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we are inside the CMS editor iframe
    if (typeof window !== 'undefined' && window.parent !== window) {
      setIsEditMode(true);
      
      const handleMessage = (e: MessageEvent) => {
        if (e.data?.type === 'SET_ACTIVE_BLOCK') {
          const isNowActive = e.data.blockIndex === blockIndex;
          setIsActive(isNowActive);
          
          if (isNowActive && divRef.current) {
             divRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      };
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [blockIndex]);

  // Keep local state in sync if parent JSON editor changes it manually
  useEffect(() => {
    if (layout) setLocalLayout(layout);
  }, [layout]);

  const handleUpdate = (newLayout: any) => {
    setLocalLayout(newLayout);
    if (isEditMode) {
      window.parent.postMessage({
        type: 'UPDATE_BLOCK_LAYOUT',
        blockIndex,
        layout: newLayout
      }, '*');
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditMode) {
      setIsActive(true);
      window.parent.postMessage({
        type: 'FOCUS_BLOCK',
        blockIndex
      }, '*');
    }
  };

  if (!isEditMode) {
    // PUBLIC LIVE SITE: Render statically based on layout
    return (
      <div 
        style={{ 
          position: layout ? 'absolute' : 'relative',
          top: layout?.y || 'auto',
          left: layout?.x || 'auto',
          width: layout?.width || '100%',
          height: layout?.height || 'auto'
        }}
        className={layout ? '' : 'w-full'}
      >
        {children}
      </div>
    );
  }

  if (!layout) {
    // Standard Document Flow Block
    return (
      <div 
        ref={divRef}
        onClick={handleSelect}
        className={`w-full relative transition-colors cursor-pointer group-hover:shadow-xl group z-10 hover:z-40 ${isActive ? 'shadow-2xl z-50 ring-2 ring-[#00A3A0]' : 'ring-1 ring-transparent hover:ring-[#00A3A0]/30'}`}
      >
        {isActive && (
          <div className="absolute top-0 right-0 bg-[#00A3A0] text-white px-3 py-1 text-[10px] font-bold shadow-md z-50 rounded-bl-lg">
            EDITING IN SIDEBAR
          </div>
        )}
        <div className={`w-full ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {React.isValidElement(children) 
            ? React.cloneElement(children as React.ReactElement<any>, {
                isEditMode,
                isActive,
                onContentChange: (newContent: any) => {
                  if (isEditMode) {
                    window.parent.postMessage({
                      type: 'UPDATE_BLOCK_CONTENT',
                      blockIndex,
                      content: newContent
                    }, '*');
                  }
                }
              }) 
            : children}
        </div>
      </div>
    );
  }

  // EDIT MODE: Return interactive RND Canvas Element for absolutely positioned blocks
  return (
    <Rnd
      size={{ width: localLayout.width, height: localLayout.height }}
      position={{ x: localLayout.x, y: localLayout.y }}
      onDragStop={(e, d) => {
        handleUpdate({ ...localLayout, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleUpdate({
          x: position.x,
          y: position.y,
          width: ref.style.width,
          height: ref.style.height
        });
      }}
      bounds="parent"
      className={`group z-10 ${isActive ? 'z-50' : 'hover:z-40'}`}
      disableDragging={!isActive} // Only allow dragging when selected to prevent accidental drags when scrolling
      enableResizing={isActive} // Only show resize handles when active
    >
      <div 
        ref={divRef}
        onClick={handleSelect}
        className={`w-full h-full relative border-2 transition-colors cursor-pointer group-hover:shadow-xl rounded-lg overflow-hidden bg-white/30 backdrop-blur-[2px] ${isActive ? 'border-[#00A3A0] shadow-2xl ring-4 ring-[#00A3A0]/20' : 'border-transparent hover:border-[#00A3A0]/50'}`}
      >
        {/* Visual Selected Badge */}
        {isActive && (
          <div className="absolute top-0 left-0 bg-[#00A3A0] text-white px-4 py-1.5 text-xs font-bold rounded-br-lg flex gap-3 z-50 shadow-md">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9h14M5 15h14"/></svg>
              DRAG & RESIZE
            </span>
            <span className="opacity-75">|</span>
            <span>EDITING IN SIDEBAR</span>
          </div>
        )}
        
        {/* The actual block component */}
        <div className={`w-full h-full ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {React.isValidElement(children) 
            ? React.cloneElement(children as React.ReactElement<any>, {
                isEditMode,
                isActive,
                onContentChange: (newContent: any) => {
                  if (isEditMode) {
                    window.parent.postMessage({
                      type: 'UPDATE_BLOCK_CONTENT',
                      blockIndex,
                      content: newContent
                    }, '*');
                  }
                }
              }) 
            : children}
        </div>
      </div>
    </Rnd>
  );
}
