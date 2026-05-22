import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClaimDeliverables from './ClaimDeliverables.jsx';

describe('ClaimDeliverables', () => {
  it('renders empty state when there are no deliverables', () => {
    render(
      <ClaimDeliverables
        deliverables={[]}
        canManage={false}
        onUpdateDeliverable={() => {}}
        onDeleteDeliverable={() => {}}
      />
    );

    expect(screen.getByText(/no deliverables added yet/i)).toBeInTheDocument();
  });

  it('renders manager controls for assign and status updates', () => {
    const deliverables = [
      {
        id: 42,
        name: 'Site Visit',
        assigneeId: 'rahul',
        status: 'In Progress',
        priority: 'High',
        due: '2026-05-08',
        note: 'Inspect roof',
      },
    ];

    render(
      <ClaimDeliverables
        deliverables={deliverables}
        canManage={true}
        onUpdateDeliverable={() => {}}
        onDeleteDeliverable={() => {}}
      />
    );

    expect(screen.getAllByRole('combobox').length).toBe(2);
    expect(screen.getByText('Site Visit')).toBeInTheDocument();
    expect(screen.getByText(/CA/)).toBeInTheDocument();
    expect(screen.getByLabelText('Delete deliverable')).toBeInTheDocument();
  });

  it('renders read-only assignee badge when canManage is false', () => {
    const deliverables = [
      {
        id: 13,
        name: 'Demolition Scope',
        assigneeId: 'amir',
        status: 'Not Started',
        priority: 'Medium',
        due: '2026-05-09',
        note: '',
      },
    ];

    render(
      <ClaimDeliverables
        deliverables={deliverables}
        canManage={false}
        onUpdateDeliverable={() => {}}
        onDeleteDeliverable={() => {}}
      />
    );

    expect(screen.getByText('Amir Khan')).toBeInTheDocument();
    expect(screen.getByText('Not Started')).toBeInTheDocument();
  });
});
