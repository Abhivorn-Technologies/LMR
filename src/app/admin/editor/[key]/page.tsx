'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditorPage({ params }: { params: Promise<{ key: string }> }) {
  const router = useRouter();
  const { key } = use(params);
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, [key]);

  const fetchData = async () => {
    try {
      const decodedKey = decodeURIComponent(key);
      const res = await fetch(`/api/admin/content?key=${decodedKey}`);
      const json = await res.json();
      
      if (json.success && json.data) {
        setData(json.data);
      } else {
        // If not found, initialize empty
        setData({});
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const decodedKey = decodeURIComponent(key);
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: decodedKey, data }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setData(parsed);
    } catch (err) {
      // Don't update state if invalid JSON while typing
    }
  };

  if (loading) return <div>Loading editor...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
        <SectionHeading 
          title={`Edit: ${decodeURIComponent(key)}`} 
          description="Update the content below and save your changes." 
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg">
          Changes saved successfully! The live website is instantly updated.
        </div>
      )}

      <Card className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Data (JSON Format)
          </label>
          <textarea
            className="w-full h-96 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={JSON.stringify(data, null, 2)}
            onChange={handleChange}
            spellCheck={false}
          />
          <p className="text-sm text-gray-500 mt-2">
            Note: For this initial version, content is edited via JSON to support complex nested structures (like arrays of services or rich text blocks) without altering the UI schema.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
