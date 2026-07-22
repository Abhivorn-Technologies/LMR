'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, ArrowLeft, Settings2, GripVertical } from 'lucide-react';
import { ComponentPicker } from './ComponentPicker';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <div className="p-4 text-center text-gray-500">Loading editor...</div> });

type JsonEditorProps = {
  data: any;
  onChange: (newData: any) => void;
  focusedBlockIndex?: number | null;
};

export default function JsonEditor({ data, onChange, focusedBlockIndex }: JsonEditorProps) {
  useEffect(() => {
    if (focusedBlockIndex !== null && focusedBlockIndex !== undefined) {
      const el = document.getElementById(`block-editor-${focusedBlockIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-[#00A3A0]', 'transition-all', 'duration-500');
        setTimeout(() => el.classList.remove('ring-4', 'ring-[#00A3A0]'), 2000);
      }
    }
  }, [focusedBlockIndex]);

  if (data === null || data === undefined) return null;

  return (
    <div className="space-y-4 w-full">
      {Object.entries(data).map(([key, value]) => (
        <FieldEditor 
          key={key} 
          label={key} 
          value={value} 
          onChange={(newValue) => {
            const newData = { ...data, [key]: newValue };
            onChange(newData);
          }} 
          focusedBlockIndex={focusedBlockIndex}
        />
      ))}
    </div>
  );
}

function FieldEditor({ label, value, onChange, focusedBlockIndex }: { label: string, value: any, onChange: (v: any) => void, focusedBlockIndex?: number | null }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const type = Array.isArray(value) ? 'array' : typeof value;

  // Format label: camelCase to Title Case
  const formattedLabel = label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
  const isMainBlocksArray = label.toLowerCase().endsWith('blocks');

  useEffect(() => {
    if (isMainBlocksArray && focusedBlockIndex !== null && focusedBlockIndex !== undefined) {
      setActiveBlockIndex(focusedBlockIndex);
    }
  }, [focusedBlockIndex, isMainBlocksArray]);

  if (type === 'string') {
    const isSystemField = label.toLowerCase() === 'type' || label.toLowerCase() === 'id';
    
    // If we are inside an array item, text inputs are often too narrow, so prefer textarea
    const isInsideArray = label.includes('Item');
    const isLongText = !isSystemField && (isInsideArray || value.length > 60 || value.includes('\n') || value.includes('<p>'));
    
    // Check if it looks like Rich Text
    const isRichText = !isSystemField && value.includes('<') && value.includes('>');
    const [forceRichText, setForceRichText] = useState(false);
    
    const showRichText = !isSystemField && (isRichText || forceRichText);

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'clean']
      ],
    };

    // Check if it's a color field
    const isColor = label.toLowerCase().includes('color');
    
    // Media Field Classification
    const isVideo = label.toLowerCase().includes('video');
    const isImageSpecific = label.toLowerCase().includes('image') || label.toLowerCase().includes('src') || label.toLowerCase().includes('logo') || label.toLowerCase().includes('avatar') || label.toLowerCase().includes('icon');
    const isGenericUrl = label.toLowerCase().includes('url');
    const isMedia = isVideo || isImageSpecific || isGenericUrl;

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Strict Validation with Extension Fallback for OS inconsistencies
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'mkv', 'avi', 'wmv', 'm4v'];
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
      
      const isActualVideo = file.type.startsWith('video/') || videoExts.includes(ext);
      const isActualImage = file.type.startsWith('image/') || imageExts.includes(ext);

      if (isVideo && !isActualVideo) {
        alert('Invalid file format. Please upload a valid video file (mp4, webm, mov, etc).');
        e.target.value = ''; // clear input
        return;
      }
      if (isImageSpecific && !isActualImage) {
        alert('Invalid file format. Please upload a valid image file (jpg, png, webp, etc).');
        e.target.value = '';
        return;
      }

      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        const json = await res.json();
        if (json.success) {
          onChange(json.url);
        } else {
          alert('Upload failed: ' + json.error);
        }
      } catch (err) {
        console.error(err);
        alert('Upload failed. Ensure the file is not too large.');
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700">{formattedLabel}</label>
          {!isColor && !isMedia && (
            <button 
              onClick={() => setForceRichText(!forceRichText)}
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-colors ${showRichText ? 'bg-[#00A3A0] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              title="Toggle Advanced Styling"
            >
              {showRichText ? 'Rich Text On' : 'Rich Text Off'}
            </button>
          )}
        </div>
        
        {showRichText ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white react-quill-container">
            <ReactQuill 
              theme="snow"
              value={value} 
              onChange={onChange}
              modules={modules}
              className="h-[250px] pb-10" // Padding bottom because quill toolbar/content height issues
            />
          </div>
        ) : isLongText ? (
          <textarea 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] min-h-[100px] text-sm text-gray-800"
          />
        ) : isColor ? (
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={value || '#000000'} 
              onChange={(e) => onChange(e.target.value)} 
              className="w-10 h-10 rounded cursor-pointer border-0 p-0"
            />
            <input 
              type="text" 
              value={value} 
              onChange={(e) => onChange(e.target.value)} 
              className="flex-1 p-2.5 rounded-lg border border-gray-200 focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] text-sm text-gray-800 font-mono"
            />
          </div>
        ) : isMedia ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className={`cursor-pointer ${isUploading ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-[#00A3A0]/10 hover:bg-[#00A3A0]/20 text-[#00A3A0] border-[#00A3A0]/30'} font-semibold py-2 px-4 rounded-lg border transition-colors text-sm text-center flex-none`}>
                {isUploading ? 'Uploading...' : 'Choose File'}
                <input 
                  type="file" 
                  accept={isVideo ? "video/*" : isImageSpecific ? "image/*" : "image/*,video/*"} 
                  onChange={handleUpload} 
                  className="hidden" 
                  disabled={isUploading} 
                />
              </label>
              <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="flex-1 p-2.5 rounded-lg border border-gray-200 focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] text-sm text-gray-800"
                placeholder="Or type URL manually..."
              />
            </div>
            {value && (value.startsWith('/') || value.startsWith('http')) && (
              isVideo || value.match(/\.(mp4|webm|ogg)$/i) ? (
                <video 
                  src={value} 
                  controls 
                  className="w-full max-h-32 object-contain rounded border border-gray-200 mt-2 bg-gray-900" 
                />
              ) : (
                <img 
                  src={value} 
                  alt="Preview" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).insertAdjacentHTML('afterend', '<div class="w-full p-4 border border-dashed border-red-300 bg-red-50 text-red-500 rounded text-sm text-center">Media preview failed to load.</div>');
                  }}
                  className="w-full max-h-32 object-contain rounded border border-gray-200 mt-2 bg-gray-50" 
                />
              )
            )}
          </div>
        ) : (
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full p-2.5 rounded-lg border border-gray-200 focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] text-sm text-gray-800"
          />
        )}
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm font-bold text-gray-700">{formattedLabel}</label>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))} 
          className="w-full p-2.5 rounded-lg border border-gray-200 focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] text-sm text-gray-800"
        />
      </div>
    );
  }

  if (type === 'boolean') {
    return (
      <div className="flex items-center gap-3 mb-4">
        <input 
          type="checkbox" 
          checked={value} 
          onChange={(e) => onChange(e.target.checked)} 
          className="w-5 h-5 rounded border-gray-300 text-[#00A3A0] focus:ring-[#00A3A0]"
        />
        <label className="text-sm font-bold text-gray-700">{formattedLabel}</label>
      </div>
    );
  }

  if (type === 'array') {
    const isMainBlocksArray = label.toLowerCase().endsWith('blocks');

    const handleDragStart = (e: React.DragEvent, index: number) => {
      e.dataTransfer.setData('text/plain', index.toString());
      e.currentTarget.classList.add('opacity-50');
    };

    const handleDragEnd = (e: React.DragEvent) => {
      e.currentTarget.classList.remove('opacity-50');
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.currentTarget.classList.add('border-t-4', 'border-t-[#00A3A0]');
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.currentTarget.classList.remove('border-t-4', 'border-t-[#00A3A0]');
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      e.currentTarget.classList.remove('border-t-4', 'border-t-[#00A3A0]');
      
      const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
      if (dragIndex === dropIndex) return;

      const newArr = [...value];
      const [draggedItem] = newArr.splice(dragIndex, 1);
      newArr.splice(dropIndex, 0, draggedItem);
      onChange(newArr);
    };

    if (isMainBlocksArray && activeBlockIndex !== null) {
      const item = value[activeBlockIndex];
      if (!item) {
        setActiveBlockIndex(null);
        return null;
      }
      return (
        <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveBlockIndex(null)}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-600"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Editing Block</span>
                <span className="font-bold text-gray-800">{item.type || 'Settings'}</span>
              </div>
            </div>
          </div>
          <div className="p-5">
             <JsonEditor 
               data={item} 
               onChange={(newItem) => {
                 const newArr = [...value];
                 newArr[activeBlockIndex] = newItem;
                 onChange(newArr);
               }} 
             />
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden bg-white">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 bg-gray-50 flex items-center justify-between border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-gray-800">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            {formattedLabel} <span className="text-gray-400 text-xs font-normal">({value.length} items)</span>
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 space-y-3 bg-gray-50/50">
            {value.map((item: any, index: number) => {
              const is2DStringArray = Array.isArray(value) && value.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string'));
              
              if (is2DStringArray) {
                // If it's a 2D array, don't map here, render the grid below
                return null;
              }

              return (
              <div 
                id={isMainBlocksArray ? `block-editor-${index}` : undefined}
                key={index} 
                draggable={isMainBlocksArray}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`relative bg-white border border-gray-200 rounded-lg shadow-sm group ${isMainBlocksArray ? 'cursor-pointer hover:border-[#00A3A0]/50 transition-colors' : ''}`}
                onClick={() => {
                  if (isMainBlocksArray) {
                    setActiveBlockIndex(index);
                    // Also dispatch an event to focus the block in the iframe preview
                    window.postMessage({ type: 'FOCUS_BLOCK', blockIndex: index }, '*');
                  }
                }}
              >
                {isMainBlocksArray ? (
                  <div className="flex items-center p-3 gap-3">
                    <div className="text-gray-300 cursor-move hover:text-gray-500 transition-colors p-1" title="Drag to reorder">
                      <GripVertical size={18} />
                    </div>
                    <div className="flex-1 font-semibold text-gray-800">
                      {item?.type ? item.type : `Block ${index + 1}`}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveBlockIndex(index);
                        window.postMessage({ type: 'FOCUS_BLOCK', blockIndex: index }, '*');
                      }}
                      className="p-1.5 text-[#00A3A0] bg-[#00A3A0]/5 hover:bg-[#00A3A0]/10 rounded-md transition-colors"
                      title="Edit Settings"
                    >
                      <Settings2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm('Are you sure you want to delete this section?')) {
                          const newArr = [...value];
                          newArr.splice(index, 1);
                          onChange(newArr);
                        }
                      }}
                      className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      title="Remove section"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 relative">
                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 z-10">
                      <button 
                        onClick={() => {
                          const newArr = [...value];
                          newArr.splice(index, 1);
                          onChange(newArr);
                        }}
                        className="p-1.5 text-red-500 bg-white shadow hover:bg-red-50 rounded-md border border-gray-100"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                      Item {index + 1}
                    </div>
                    
                    {typeof item === 'object' && item !== null ? (
                      <div className="cursor-auto" onDragStart={e => e.preventDefault()} draggable>
                        <JsonEditor data={item} onChange={(newItem) => {
                          const newArr = [...value];
                          newArr[index] = newItem;
                          onChange(newArr);
                        }} />
                      </div>
                    ) : (
                      <FieldEditor 
                        label={`${label} Item`}
                        value={item} 
                        onChange={(newItem) => {
                          const newArr = [...value];
                          newArr[index] = newItem;
                          onChange(newArr);
                        }} 
                      />
                    )}
                  </div>
                )}
              </div>
            )})}
            
            {/* 2D Array Table Editor UI */}
            {Array.isArray(value) && value.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string')) && (
              <div className="overflow-x-auto w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <table className="w-full text-sm divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200">
                    {value.map((row: string[], rIndex: number) => (
                      <tr key={rIndex} className="divide-x divide-gray-200">
                        {row.map((cell: string, cIndex: number) => (
                          <td key={cIndex} className="p-0">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => {
                                const newArr = [...value];
                                const newRow = [...newArr[rIndex]];
                                newRow[cIndex] = e.target.value;
                                newArr[rIndex] = newRow;
                                onChange(newArr);
                              }}
                              className={`w-full border-0 p-2.5 focus:ring-2 focus:ring-inset focus:ring-[#00A3A0] focus:outline-none transition-shadow ${rIndex === 0 ? 'bg-gray-50 font-semibold' : 'bg-white'}`}
                              placeholder={`Cell`}
                            />
                          </td>
                        ))}
                        <td className="w-10 p-0 text-center bg-gray-50">
                          <button
                            onClick={() => {
                              if(value.length <= 1) return; // don't delete last row
                              const newArr = [...value];
                              newArr.splice(rIndex, 1);
                              onChange(newArr);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Delete Row"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-2 p-3 bg-gray-50 border-t border-gray-300">
                  <button
                    onClick={() => {
                      const newArr = [...value];
                      // copy cols count of first row
                      const cols = newArr[0].length;
                      newArr.push(new Array(cols).fill(''));
                      onChange(newArr);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00A3A0] bg-[#00A3A0]/10 rounded-md hover:bg-[#00A3A0]/20 transition-colors"
                  >
                    <Plus size={14} /> Add Row
                  </button>
                  <button
                    onClick={() => {
                      const newArr = value.map(row => [...row, '']);
                      onChange(newArr);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={14} /> Add Column
                  </button>
                  <button
                    onClick={() => {
                      if(value[0].length <= 1) return; // don't delete last col
                      const newArr = value.map(row => {
                        const newRow = [...row];
                        newRow.pop();
                        return newRow;
                      });
                      onChange(newArr);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors ml-auto"
                  >
                    <Trash2 size={14} /> Delete Last Col
                  </button>
                </div>
              </div>
            )}

            {!isMainBlocksArray && !(Array.isArray(value) && value.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string'))) && (
              <button 
              onClick={() => {
                if (isMainBlocksArray) {
                  setPickerOpen(true);
                } else {
                  // Determine template for new item based on first item
                  const createTemplate = (base: any): any => {
                    if (Array.isArray(base)) return base.map(item => createTemplate(item));
                    if (typeof base === 'object' && base !== null) {
                      return Object.keys(base).reduce((acc: any, k) => {
                        const val = base[k];
                        return {
                          ...acc,
                          [k]: createTemplate(val)
                        };
                      }, {});
                    }
                    return typeof base === 'boolean' ? false : typeof base === 'number' ? 0 : '';
                  };
                  const template = value.length > 0 ? createTemplate(value[0]) : '';
                  onChange([...value, template]);
                }
              }}
              className="flex items-center gap-2 text-sm font-semibold text-[#00A3A0] hover:text-[#008f8c] p-3 bg-[#00A3A0]/5 rounded-lg border-2 border-dashed border-[#00A3A0]/30 hover:bg-[#00A3A0]/10 transition-colors w-full justify-center"
            >
              <Plus size={18} /> {isMainBlocksArray ? 'Add New Block' : `Add New ${formattedLabel.replace(/s$/, '')}`}
            </button>
            )}
            
            {isMainBlocksArray && (
              <ComponentPicker 
                open={pickerOpen} 
                onClose={() => setPickerOpen(false)} 
                onSelect={(template) => {
                  onChange([...value, template]);
                  setPickerOpen(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  if (type === 'object' && value !== null) {
    return (
      <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden bg-white">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 bg-gray-50 flex items-center justify-between border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-gray-800">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            {formattedLabel}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-5">
            <JsonEditor data={value} onChange={onChange} />
          </div>
        )}
      </div>
    );
  }

  return null;
}
