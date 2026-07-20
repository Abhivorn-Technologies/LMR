'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Upload, ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');
    setUrl('');
    setCopied(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setUrl(data.url);
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <SectionHeading 
        title="Media Management" 
        description="Upload images to use them in your CMS content." 
      />

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Upload New Image</h3>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                {file ? file.name : 'Click to select an image'}
              </span>
              <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WebP</span>
            </label>
          </div>

          <Button type="submit" disabled={!file || uploading} className="w-full">
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </form>

        {url && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" /> Upload Successful!
            </h4>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-white p-2 rounded text-sm text-gray-800 border overflow-x-auto">
                {url}
              </code>
              <Button size="sm" variant="outline" onClick={copyUrl}>
                {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-green-700 mt-2">
              Copy this URL and paste it into the JSON editor where an image path is required.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
