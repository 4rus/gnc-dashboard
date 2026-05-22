import { StatusPill } from "../shared/StatusPill.jsx";

export default function ClaimHeader({ claim, onClose }) {
  return (
    <div className="modal-header">
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="modal-title">{claim.name}</div>
        <div className="modal-subtitle">
          GNC #{claim.gnc} · Claim #{claim.claim} · {claim.address}
        </div>
      </div>
      <button className="modal-close" onClick={onClose} aria-label="Close modal">
        <svg>
          <use href="#icon-x" />
        </svg>
      </button>
    </div>
  );
}
