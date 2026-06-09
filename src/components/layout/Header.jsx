import { useState, useEffect, useRef } from 'react';

export default function Header({ currentRole, currentUserId, team, onRoleChange }) {
  const [time, setTime] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentUser = team?.find(m => m.id === currentUserId);
  const avatarInitials = currentUser
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'NL';

  const roleLabel = (role) =>
    role === 'admin' ? 'Admin' : role === 'sr' ? 'Sr. Consultant' : 'Jr. Consultant';

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
        <img 
  src="/image/gnc-logo.png" 
  alt="GNC Group" 
  style={{ 
    height: 36, 
    width: 'auto', 
    objectFit: 'contain',
    imageRendering: 'auto',
    filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 0 1px rgba(255,255,255,0.15))'
  }} 
/>
        </div>
        <div className="header-divider"></div>
        <span className="header-title">Management Dashboard</span>
      </div>
      <div className="header-right">
        <span className="header-time">{time}</span>
        <div className="role-switcher" ref={dropdownRef} style={{ position: 'relative' }}>
          <span className="role-label">View as</span>
          <div
            className="role-select-custom"
            onClick={() => setOpen(o => !o)}
          >
            <span>{currentUser?.name || 'Select'}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4, opacity: 0.6 }}>
              <path d="M2 3.5L5 6.5L8 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {open && (
            <div className="role-dropdown">
              {team?.map(member => (
                <div
                  key={member.id}
                  className={`role-dropdown-item ${member.id === currentUserId ? 'active' : ''}`}
                  onClick={() => { onRoleChange(member.id); setOpen(false); }}
                >
                  <span className="role-dropdown-name">{member.name}</span>
                  <span className="role-dropdown-role">{roleLabel(member.role)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-avatar">{avatarInitials}</div>
      </div>
    </div>
  );
}{}