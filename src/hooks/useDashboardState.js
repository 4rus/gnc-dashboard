import { useState } from "react";
import { INITIAL_DELIVERABLES, TEAM } from "../data/index.js";
import { ROLE_USER_MAP, STATUS_CYCLE, PERMISSION_MAP, ROLES } from "../constants/index.js";

export function useDashboardState() {
  const [currentRole, setCurrentRole] = useState(ROLES.ADMIN);
  const [activePage, setActivePage] = useState("dashboard");
  const [deliverables, setDeliverables] = useState(INITIAL_DELIVERABLES);
  const [team, setTeam] = useState(TEAM);
  const [modalClaim, setModalClaim] = useState(null);
  const [deliverableIdCounter, setDeliverableIdCounter] = useState(15);

  const currentUserId = ROLE_USER_MAP[currentRole];

  const taskBadgeCount = deliverables.filter(
    (d) => d.assigneeId === currentUserId && d.status !== "Completed"
  ).length;

  function handleRoleChange(role) {
    setCurrentRole(role);
    if (
      role === ROLES.JR &&
      (activePage === "admin" || activePage === "tasks")
    ) {
      setActivePage("dashboard");
    }
    if (role !== ROLES.ADMIN && activePage === "admin") {
      setActivePage("dashboard");
    }
  }

  function handleAddDeliverable(claimId, data) {
    const newDel = {
      id: deliverableIdCounter,
      claimId,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setDeliverables((prev) => [...prev, newDel]);
    setDeliverableIdCounter((prev) => prev + 1);
    setModalClaim((c) => c);
  }

  function handleUpdateDeliverable(id, field, value) {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  }

  function handleDeleteDeliverable(id) {
    setDeliverables((prev) => prev.filter((d) => d.id !== id));
  }

  function handleCycleStatus(id) {
    setDeliverables((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const idx = STATUS_CYCLE.indexOf(d.status);
        return { ...d, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
      })
    );
  }

  function handleRoleChangeAdmin(memberId, newRole) {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              role: newRole,
              permissions: PERMISSION_MAP[newRole],
            }
          : m
      )
    );
  }

  function handlePermChange(memberId, perm, value) {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              permissions: { ...m.permissions, [perm]: value },
            }
          : m
      )
    );
  }

  return {
    currentRole,
    setCurrentRole,
    activePage,
    setActivePage,
    deliverables,
    setDeliverables,
    team,
    setTeam,
    modalClaim,
    setModalClaim,
    currentUserId,
    taskBadgeCount,
    handleRoleChange,
    handleAddDeliverable,
    handleUpdateDeliverable,
    handleDeleteDeliverable,
    handleCycleStatus,
    handleRoleChangeAdmin,
    handlePermChange,
  };
}
