import { useState } from 'react';
import { TEAM } from '../data/index.js';

export default function AdminPage({ team, onRoleChange, onPermChange }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  let members = [...team];
  if (search) members = members.filter(m => m.name.toLowerCase().includes(search) || m.email.toLowerCase().includes(search));
  if (roleFilter !== 'all') members = members.filter(m => m.role === roleFilter);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Access Control</div>
          <div className="page-subtitle">Manage team roles and permissions</div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="search-wrap" style={{ maxWidth: 300 }}>
          <span className="search-icon"><svg><use href="#icon-search" /></svg></span>
          <input type="text" className="search-input" placeholder="Search name or email..." onChange={e => setSearch(e.target.value.toLowerCase())} />
        </div>
        <select className="filter-select" onChange={e => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="sr">Sr. Consultant</option>
          <option value="jr">Jr. Consultant</option>
        </select>
        <span style={{ fontSize: 11, color: 'var(--text3)' }}>{members.length} of {team.length} members</span>
      </div>

      <div className="admin-list">
        <div className="admin-list-header">
          <span>Member</span><span>Role</span><span>View All Tasks</span>
          <span>Assign Tasks</span><span>Manage Users</span><span>View All Files</span><span></span>
        </div>
        <div>
          {members.length === 0 ? (
            <div style={{ padding: 28, textAlign: 'center', color: 'var(--text3)', fontSize: 12 }}>No team members match your search.</div>
          ) : members.map(m => {
            const rolePill = m.role === 'admin' ? 'pill-purple' : m.role === 'sr' ? 'pill-blue' : 'pill-green';
            const roleLabel = m.role === 'admin' ? 'Admin / Manager' : m.role === 'sr' ? 'Sr. Consultant' : 'Jr. Consultant';
            return (
              <div className="admin-list-row" key={m.id}>
                <div className="admin-member-cell">
                  <div className="avatar-md" style={{ background: m.color }}>{m.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="admin-name">{m.name}</div>
                    <div className="admin-email">{m.email}</div>
                  </div>
                </div>
                <div>
                  <select className="admin-role-sel" value={m.role} onChange={e => onRoleChange(m.id, e.target.value)}>
                    <option value="admin">Admin / Manager</option>
                    <option value="sr">Sr. Consultant</option>
                    <option value="jr">Jr. Consultant</option>
                  </select>
                </div>
                {['viewAllTasks', 'assignTasks', 'manageUsers', 'viewAllFiles'].map(perm => (
                  <div key={perm}>
                    <label className="toggle-wrap">
                      <input type="checkbox" checked={m.permissions[perm]} onChange={e => onPermChange(m.id, perm, e.target.checked)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
                <div>
                  <span className={`status-pill ${rolePill}`} style={{ fontSize: 10 }}>{roleLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
