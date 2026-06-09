export const ROLES = {
  ADMIN: 'admin',
  SR: 'sr',
  JR: 'jr',
};

export const STATUSES = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  PENDING_APPROVAL: 'Pending Approval',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
};

export const STATUS_CYCLE = [
  'Not Started',
  'In Progress',
  'Pending Approval',
  'Completed',
];

export const PERMISSIONS = {
  VIEW_ALL_TASKS: 'viewAllTasks',
  ASSIGN_TASKS: 'assignTasks',
  MANAGE_USERS: 'manageUsers',
  VIEW_ALL_FILES: 'viewAllFiles',
};

export const PERMISSION_MAP = {
  admin: {
    viewAllTasks: true,
    assignTasks: true,
    manageUsers: true,
    viewAllFiles: true,
  },
  sr: {
    viewAllTasks: true,
    assignTasks: true,
    manageUsers: false,
    viewAllFiles: true,
  },
  jr: {
    viewAllTasks: false,
    assignTasks: false,
    manageUsers: false,
    viewAllFiles: false,
  },
};
