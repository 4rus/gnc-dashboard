import { useState, useEffect } from "react";
import { STATUS_CONFIG } from "../../data/index.js";
import ClaimHeader from "./ClaimHeader.jsx";
import ClaimDeliverables from "./ClaimDeliverables.jsx";
import AddDeliverableForm from "./AddDeliverableForm.jsx";
import { StatusPill } from "../shared/StatusPill.jsx";

export default function ClaimModal({
  claim,
  deliverables,
  currentRole,
  onClose,
  onAddDeliverable,
  onUpdateDeliverable,
  onDeleteDeliverable,
}) {
  const [newDelType, setNewDelType] = useState("Site Visit");
  const [newDelCustom, setNewDelCustom] = useState("");
  const [newDelAssignee, setNewDelAssignee] = useState("");
  const [newDelStatus, setNewDelStatus] = useState("Not Started");
  const [newDelDue, setNewDelDue] = useState("");

  useEffect(() => {
    if (claim) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setNewDelDue(tomorrow.toISOString().slice(0, 10));
      setNewDelAssignee("");
    }
  }, [claim]);

  if (!claim) return null;

  const canManage = currentRole === "admin" || currentRole === "sr";
  const cfg = STATUS_CONFIG[claim.status];
  const dels = deliverables.filter((d) => d.claimId === claim.id);

  const handleAdd = () => {
    const name =
      newDelType === "Custom..."
        ? newDelCustom.trim() || "Custom Task"
        : newDelType;
    onAddDeliverable(claim.id, {
      name,
      assigneeId: newDelAssignee,
      status: newDelStatus,
      priority: "Medium",
      due: newDelDue,
      note: "",
    });
    setNewDelCustom("");
  };

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal">
        <ClaimHeader claim={claim} onClose={onClose} />
        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-field">
              <div className="modal-field-label">Status</div>
              <div className="modal-field-value">
                <StatusPill status={claim.status} />
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Progress</div>
              <div className="modal-field-value">{claim.progress}%</div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Lead Consultant</div>
              <div className="modal-field-value">
                <div className="consultant-cell">
                  <div
                    className="avatar-xs"
                    style={{ background: claim.consultantColor }}
                  >
                    {claim.consultantInitials}
                  </div>
                  <span>{claim.consultant}</span>
                </div>
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Date of Loss</div>
              <div className="modal-field-value mono">{claim.dateOfLoss}</div>
            </div>
            <div className="modal-field" style={{ gridColumn: "1/-1" }}>
              <div className="modal-field-label">Last Updated</div>
              <div className="modal-field-value">{claim.lastUpdated}</div>
            </div>
          </div>

          <p
            style={{
              fontSize: 12,
              color: "var(--text2)",
              lineHeight: 1.7,
              marginBottom: 18,
            }}
          >
            {claim.description}
          </p>

          <div className="modal-section-title">
            <span>Deliverables & Task Assignments</span>
            <span className="canada-time-badge">
              <span className="canada-flag">🇨🇦</span>
              Due dates in Canada (MDT)
            </span>
          </div>

          <ClaimDeliverables
            deliverables={dels}
            canManage={canManage}
            onUpdateDeliverable={onUpdateDeliverable}
            onDeleteDeliverable={onDeleteDeliverable}
          />

          {canManage && (
            <AddDeliverableForm
              newDelType={newDelType}
              setNewDelType={setNewDelType}
              newDelCustom={newDelCustom}
              setNewDelCustom={setNewDelCustom}
              newDelAssignee={newDelAssignee}
              setNewDelAssignee={setNewDelAssignee}
              newDelStatus={newDelStatus}
              setNewDelStatus={setNewDelStatus}
              newDelDue={newDelDue}
              setNewDelDue={setNewDelDue}
              onAdd={handleAdd}
            />
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-primary btn-sm">
              <svg width="11" height="11">
                <use href="#icon-external-link" />
              </svg>
              Open Full File
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
