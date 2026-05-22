import './styles/index.css';
import { useDashboardState } from './hooks/useDashboardState.js';

import Icons from './components/shared/Icons.jsx';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import ClaimModal from './components/modals/ClaimModal.jsx';

import DashboardPage from './pages/DashboardPage.jsx';
import ClaimsPage from './pages/ClaimsPage.jsx';
import MyTasksPage from './pages/MyTasksPage.jsx';
import AllTasksPage from './pages/AllTasksPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  const {
    currentRole,
    activePage,
    setActivePage,
    deliverables,
    team,
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
  } = useDashboardState();

  const pageProps = { deliverables, currentRole, currentUserId, onCycleStatus: handleCycleStatus };

  return (
    <>
      <Icons />
      <Header currentRole={currentRole} onRoleChange={handleRoleChange} />
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
              deliverables={deliverables}
              onClaimClick={setModalClaim}
              onNavigate={setActivePage}
            />
          )}
          {activePage === 'claims' && (
            <ClaimsPage deliverables={deliverables} onClaimClick={setModalClaim} />
          )}
          {activePage === 'mytasks' && (
            <MyTasksPage {...pageProps} />
          )}
          {activePage === 'tasks' && (
            <AllTasksPage {...pageProps} onDelete={handleDeleteDeliverable} />
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
          onClose={() => setModalClaim(null)}
          onAddDeliverable={handleAddDeliverable}
          onUpdateDeliverable={handleUpdateDeliverable}
          onDeleteDeliverable={handleDeleteDeliverable}
        />
      )}
    </>
  );
}
