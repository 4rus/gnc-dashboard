import { useState, useEffect } from 'react';
import { CLAIMS, STATUS_CONFIG, KANBAN_COLS } from '../data/index.js';

function StatCard({ color, iconId, trend, trendClass, target, label, onClick }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c = Math.min(c + 1, target); setCount(c); if (c >= target) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, [target]);
  return (
    <div className={`stat-card ${color}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="stat-card-top">
        <div className={`stat-icon ${color}`}><svg><use href={`#${iconId}`} /></svg></div>
        <span className={`stat-trend ${trendClass}`}>{trend}</span>
      </div>
      <div className="stat-number">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function KanbanCard({ claim, deliverables, onClick }) {
  const cfg = STATUS_CONFIG[claim.status];
  const openDels = deliverables.filter(d => d.claimId === claim.id && d.status !== 'Completed').length;
  const [barWidth, setBarWidth] = useState('0%');
  useEffect(() => { const t = setTimeout(() => setBarWidth(claim.progress + '%'), 300); return () => clearTimeout(t); }, [claim.progress]);
  return (
    <div className="kanban-card" onClick={onClick}>
      <div className="kanban-card-title">{claim.name}</div>
      <div className="kanban-card-meta">
        <span className="kanban-card-gnc">GNC #{claim.gnc}</span>
        <div className="kanban-consultant">
          <div className="avatar-xs" style={{ background: claim.consultantColor }}>{claim.consultantInitials}</div>
          <span>{claim.consultant.split(' ')[0]}</span>
        </div>
      </div>
      {openDels > 0 && (
        <div style={{ marginTop: 5 }}>
          <span className="status-pill pill-yellow" style={{ fontSize: 9, padding: '2px 6px' }}>
            <span className="dot"></span>{openDels} open deliverable{openDels > 1 ? 's' : ''}
          </span>
        </div>
      )}
      <div className="kanban-progress-wrap">
        <div className="kanban-progress-track">
          <div className="kanban-progress-fill" style={{ width: barWidth, background: cfg.progressColor }}></div>
        </div>
        <div className="kanban-progress-label">{claim.progress}% complete</div>
      </div>
    </div>
  );
}

export default function DashboardPage({ deliverables, onClaimClick, onNavigate }) {
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Claims Overview</div>
          <div className="page-subtitle">{dateStr}</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost btn-sm">
            <svg width="12" height="12"><use href="#icon-download" /></svg> Export
          </button>
          <button className="btn btn-primary btn-sm">
            <svg width="12" height="12"><use href="#icon-plus" /></svg> New Claim File
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard color="blue" iconId="icon-folder" trend="Total" trendClass="neutral" target={24} label="Active Claim Files" onClick={() => onNavigate('claims')} />
        <StatCard color="green" iconId="icon-check-circle" trend="↑ 3 this month" trendClass="up" target={8} label="Completed Files" />
        <StatCard color="yellow" iconId="icon-clock" trend="Needs review" trendClass="neutral" target={6} label="Pending Approval" />
        <StatCard color="red" iconId="icon-check-list" trend="Needs attention" trendClass="down" target={7} label="Open Tasks" onClick={() => onNavigate('tasks')} />
      </div>

      <div className="section-title">Live Status Board</div>
      <div className="kanban-grid">
        {KANBAN_COLS.map(status => {
          const cfg = STATUS_CONFIG[status];
          const claims = CLAIMS.filter(c => c.status === status);
          return (
            <div className="kanban-col" key={status}>
              <div className="kanban-col-header">
                <div className="kanban-col-title">
                  <div className="kanban-dot" style={{ background: cfg.kanbanColor }}></div>
                  {status}
                </div>
                <span className="kanban-count">{claims.length}</span>
              </div>
              <div className="kanban-cards">
                {claims.map(c => (
                  <KanbanCard key={c.id} claim={c} deliverables={deliverables} onClick={() => onClaimClick(c)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
