import { useState, useEffect } from "react";
import { CLAIMS, INITIAL_DELIVERABLES, TEAM } from "../data/index.js";
import { STATUS_CYCLE, PERMISSION_MAP, ROLES } from "../constants/index.js";

export function useDashboardState() {
  const [currentUserId, setCurrentUserId] = useState('nitin');
  const [activePage, setActivePage] = useState("dashboard");
  const [team, setTeam] = useState(TEAM);
  const [modalClaim, setModalClaim] = useState(null);
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);

  const [claims, setClaims] = useState(() => {
    try {
      const stored = localStorage.getItem("gnc_claims_v2");
      return stored ? JSON.parse(stored) : CLAIMS;
    } catch { return CLAIMS; }
  });

  const [deliverables, setDeliverables] = useState(() => {
    try {
      const stored = localStorage.getItem("gnc_deliverables_v2");
      return stored ? JSON.parse(stored) : INITIAL_DELIVERABLES;
    } catch { return INITIAL_DELIVERABLES; }
  });

  const [deliverableIdCounter, setDeliverableIdCounter] = useState(() => {
    try {
      const stored = localStorage.getItem("gnc_deliverables_v2");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) return Math.max(...parsed.map((d) => d.id)) + 1;
      }
    } catch {}
    return 1;
  });

  const [claimIdCounter, setClaimIdCounter] = useState(() => {
    try {
      const stored = localStorage.getItem("gnc_claims_v2");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) return Math.max(...parsed.map((c) => c.id)) + 1;
      }
    } catch {}
    return 1;
  });

  useEffect(() => {
    localStorage.setItem("gnc_claims_v2", JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem("gnc_deliverables_v2", JSON.stringify(deliverables));
  }, [deliverables]);

  const currentUser = team.find(m => m.id === currentUserId) || team[0];
  const currentRole = currentUser?.role || ROLES.ADMIN;

  const taskBadgeCount = deliverables.filter(
    (d) => d.assigneeId === currentUserId && d.status !== "Completed"
  ).length;

  function getTimestamp() {
    return new Date().toLocaleString('en-CA', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  function handleRoleChange(userId) {
    setCurrentUserId(userId);
    const user = team.find(m => m.id === userId);
    const role = user?.role || ROLES.ADMIN;
    if (role === ROLES.JR && (activePage === 'admin' || activePage === 'tasks')) {
      setActivePage('dashboard');
    }
    if (role !== ROLES.ADMIN && activePage === 'admin') {
      setActivePage('dashboard');
    }
  }

  function handleAddClaim(formData) {
    const newClaim = {
      id: claimIdCounter,
      ...formData,
      lastUpdated: getTimestamp(),
      flagged: false,
      createdAt: new Date().toISOString(),
    };
    setClaims((prev) => [newClaim, ...prev]);
    setClaimIdCounter((prev) => prev + 1);
    setShowNewClaimModal(false);
  }

  function handleDeleteClaim(claimId) {
    setClaims((prev) => prev.filter((c) => c.id !== claimId));
    setDeliverables((prev) => prev.filter((d) => d.claimId !== claimId));
    setModalClaim(null);
  }

  function handleToggleFlag(claimId) {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? { ...c, flagged: !c.flagged, lastUpdated: getTimestamp() }
          : c
      )
    );
    setModalClaim((prev) =>
      prev && prev.id === claimId
        ? { ...prev, flagged: !prev.flagged, lastUpdated: getTimestamp() }
        : prev
    );
  }

  function handleUpdateClaimStatus(claimId, newStatus) {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? { ...c, status: newStatus, lastUpdated: getTimestamp() }
          : c
      )
    );
    setModalClaim((prev) =>
      prev && prev.id === claimId
        ? { ...prev, status: newStatus, lastUpdated: getTimestamp() }
        : prev
    );
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
 
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, lastUpdated: getTimestamp() } : c
      )
    );
    setModalClaim((prev) =>
      prev && prev.id === claimId
        ? { ...prev, lastUpdated: getTimestamp() }
        : prev
    );
  }

  function handleUpdateDeliverable(id, field, value) {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
    
    const del = deliverables.find(d => d.id === id);
    if (del) {
      setClaims((prev) =>
        prev.map((c) =>
          c.id === del.claimId ? { ...c, lastUpdated: getTimestamp() } : c
        )
      );
      setModalClaim((prev) =>
        prev && prev.id === del.claimId
          ? { ...prev, lastUpdated: getTimestamp() }
          : prev
      );
    }
  }

  function handleDeleteDeliverable(id) {
    const del = deliverables.find(d => d.id === id);
    setDeliverables((prev) => prev.filter((d) => d.id !== id));
    if (del) {
      setClaims((prev) =>
        prev.map((c) =>
          c.id === del.claimId ? { ...c, lastUpdated: getTimestamp() } : c
        )
      );
      setModalClaim((prev) =>
        prev && prev.id === del.claimId
          ? { ...prev, lastUpdated: getTimestamp() }
          : prev
      );
    }
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
          ? { ...m, role: newRole, permissions: PERMISSION_MAP[newRole] }
          : m
      )
    );
  }

  function handlePermChange(memberId, perm, value) {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, permissions: { ...m.permissions, [perm]: value } }
          : m
      )
    );
  }

  return {
    currentRole,
    currentUserId,
    activePage,
    setActivePage,
    claims,
    setClaims,
    deliverables,
    setDeliverables,
    team,
    setTeam,
    modalClaim,
    setModalClaim,
    showNewClaimModal,
    setShowNewClaimModal,
    taskBadgeCount,
    handleRoleChange,
    handleAddClaim,
    handleDeleteClaim,
    handleToggleFlag,
    handleUpdateClaimStatus,
    handleAddDeliverable,
    handleUpdateDeliverable,
    handleDeleteDeliverable,
    handleCycleStatus,
    handleRoleChangeAdmin,
    handlePermChange,
  };
}