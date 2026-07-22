'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, User, Clock, Shield, Users as UsersIcon, Search } from 'lucide-react';

interface UserData {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-9 w-9 border-3 border-[#00A3A0] border-t-transparent mb-3"></div>
        <p className="text-sm font-semibold text-slate-500">Loading administrators...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center">
              <UsersIcon size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Registered Admins</h1>
          </div>
          <p className="text-sm font-medium text-slate-600 pl-0.5">
            View and manage authorized administrators for the CMS.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 bg-[#00A3A0]/10 border border-[#00A3A0]/20 rounded-full text-xs font-bold text-[#00A3A0] flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A3A0] animate-pulse" />
            {users.length} Total Administrators
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm font-bold border border-rose-200 flex items-center gap-2">
          <ShieldCheck size={18} />
          {error}
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <h3 className="font-extrabold text-slate-900 text-base">Database Users</h3>
            <span className="px-2.5 py-0.5 bg-slate-200 text-slate-800 rounded-md text-xs font-bold">
              {filteredUsers.length}
            </span>
          </div>

          {/* Search Input - Single 1px Border & Clear Placeholder */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search admin email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-full text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none focus:outline-none focus:ring-0 focus:border-[#00A3A0] transition-colors"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs uppercase tracking-wider text-slate-700 font-extrabold bg-slate-100/90 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 font-bold">Email Address</th>
                <th className="px-6 py-3.5 font-bold">Role</th>
                <th className="px-6 py-3.5 font-bold">Registered Date</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => {
                const initial = user.email.charAt(0).toUpperCase();
                return (
                  <tr key={user._id} className="hover:bg-slate-50/90 transition-colors group">
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3A0] to-[#087371] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          {initial}
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-[#00A3A0] transition-colors">
                            {user.email}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono font-medium">ID: {user._id.slice(-8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="inline-flex items-center gap-1.5 text-[#008f8c] bg-[#00A3A0]/10 px-3 py-1 rounded-full text-xs font-bold border border-[#00A3A0]/25">
                        <Shield size={13} className="text-[#008f8c]" />
                        {user.role ? user.role.toUpperCase() : 'ADMIN'}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
                        <Clock size={14} className="text-slate-400" />
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full text-xs font-extrabold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <User size={36} className="mb-2 opacity-50" />
                      <p className="font-bold text-slate-700 text-base">No administrators found</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">Try adjusting your search query</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
