import { useState, useEffect } from 'react';

export default function Header({ currentRole, onRoleChange }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const avatarMap = { admin: 'NL', sr: 'RS', jr: 'AK' };

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo"><span className="logo-pill">GNC</span> Group</div>
        <div className="header-divider"></div>
        <span className="header-title">Management Dashboard</span>
      </div>
      <div className="header-right">
        <span className="header-time">{time}</span>
        <div className="role-switcher">
          <span className="role-label">View as</span>
          <select className="role-select" value={currentRole} onChange={e => onRoleChange(e.target.value)}>
            <option value="admin">Admin / Manager</option>
            <option value="sr">Sr. Consultant</option>
            <option value="jr">Jr. Consultant</option>
          </select>
        </div>
        <div className="header-avatar">{avatarMap[currentRole]}</div>
      </div>
    </div>
  );
}
