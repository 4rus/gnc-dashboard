import { TEAM, DELIVERABLE_TYPES, DELIVERABLE_STATUSES } from "../../data/index.js";

export default function AddDeliverableForm({
  newDelType,
  setNewDelType,
  newDelCustom,
  setNewDelCustom,
  newDelAssignee,
  setNewDelAssignee,
  newDelStatus,
  setNewDelStatus,
  newDelDue,
  setNewDelDue,
  onAdd,
}) {
  return (
    <div className="add-del-row">
      <select
        className="add-del-select"
        style={{ flex: "1.2" }}
        value={newDelType}
        onChange={(e) => setNewDelType(e.target.value)}
      >
        {DELIVERABLE_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {newDelType === "Custom..." && (
        <input
          type="text"
          className="add-del-input"
          placeholder="Custom name..."
          value={newDelCustom}
          onChange={(e) => setNewDelCustom(e.target.value)}
          style={{ flex: "1.2" }}
        />
      )}
      <select
        className="add-del-select"
        value={newDelAssignee}
        onChange={(e) => setNewDelAssignee(e.target.value)}
      >
        {TEAM.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <select
        className="add-del-select"
        value={newDelStatus}
        onChange={(e) => setNewDelStatus(e.target.value)}
      >
        {DELIVERABLE_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="add-del-input"
        value={newDelDue}
        onChange={(e) => setNewDelDue(e.target.value)}
        style={{ flex: "0.7", minWidth: 110 }}
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={onAdd}
        aria-label="Add deliverable"
      >
        <svg width="10" height="10">
          <use href="#icon-plus" />
        </svg>
        Add
      </button>
    </div>
  );
}
