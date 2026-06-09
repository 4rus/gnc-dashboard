import './styles/index.css';
import { useDashboardState } from './hooks/useDashboardState.js';

import Icons from './components/shared/Icons.jsx';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import ClaimModal from './components/modals/ClaimModal.jsx';
import NewClaimModal from './components/modals/NewClaimModal.jsx';

import DashboardPage from './pages/DashboardPage.jsx';
import ClaimsPage from './pages/ClaimsPage.jsx';
import MyTasksPage from './pages/MyTasksPage.jsx';
import AllTasksPage from './pages/AllTasksPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  const {
    currentRole,
    currentUserId,
    activePage,
    setActivePage,
    claims,
    deliverables,
    team,
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
  } = useDashboardState();

  const isJr = currentRole === 'jr';
  const pageProps = { deliverables, currentRole, currentUserId, onCycleStatus: handleCycleStatus };

  function getClaimProgress(claimId) {
    const dels = deliverables.filter(d => d.claimId === claimId);
    if (dels.length === 0) return 0;
    const done = dels.filter(d => d.status === 'Completed').length;
    return Math.round((done / dels.length) * 100);
  }

  return (
    <>
      <Icons />
      <Header
        currentRole={currentRole}
        currentUserId={currentUserId}
        team={team}
        onRoleChange={handleRoleChange}
      />
      <div className="layout">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          currentRole={currentRole}
          taskBadgeCount={taskBadgeCount}
        />
        <div className="main">
          {activePage === 'dashboard' && (
            <DashboardPage
              claims={claims}
              deliverables={deliverables}
              currentRole={currentRole}
              currentUserId={currentUserId}
              team={team}
              getClaimProgress={getClaimProgress}
              onClaimClick={setModalClaim}
              onNavigate={setActivePage}
              onOpenNewClaim={() => setShowNewClaimModal(true)}
            />
          )}
          {activePage === 'claims' && (
            <ClaimsPage
              claims={claims}
              deliverables={deliverables}
              currentRole={currentRole}
              currentUserId={currentUserId}
              getClaimProgress={getClaimProgress}
              onClaimClick={setModalClaim}
              onOpenNewClaim={() => setShowNewClaimModal(true)}
            />
          )}
          {activePage === 'mytasks' && (
            <MyTasksPage {...pageProps} />
          )}
          {activePage === 'tasks' && (
            <AllTasksPage {...pageProps} claims={claims} onDelete={handleDeleteDeliverable} />
          )}
          {activePage === 'admin' && (
            <AdminPage team={team} onRoleChange={handleRoleChangeAdmin} onPermChange={handlePermChange} />
          )}
          {activePage === 'reports' && <ReportsPage />}
        </div>
      </div>

      {modalClaim && (
        <ClaimModal
          claim={modalClaim}
          deliverables={deliverables}
          currentRole={currentRole}
          getClaimProgress={getClaimProgress}
          onClose={() => setModalClaim(null)}
          onAddDeliverable={handleAddDeliverable}
          onUpdateDeliverable={handleUpdateDeliverable}
          onDeleteDeliverable={handleDeleteDeliverable}
          onDeleteClaim={handleDeleteClaim}
          onToggleFlag={handleToggleFlag}
          onUpdateClaimStatus={handleUpdateClaimStatus}
        />
      )}

      {showNewClaimModal && !isJr && (
        <NewClaimModal
          team={team}
          onClose={() => setShowNewClaimModal(false)}
          onSave={handleAddClaim}
        />
      )}
    </>
  );
}