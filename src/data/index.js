export const CLAIMS = [
  { id:1,  name:'Kootenay Christian',     gnc:'4082', claim:'18305115',   consultant:'Rahul Sharma',   consultantId:'rahul',    consultantInitials:'RS', consultantColor:'#1e56d9', status:'In Progress',       progress:63,  lastUpdated:'2 hours ago',  address:'123 Mountain Rd, Nelson, BC',       dateOfLoss:'2025-11-12', description:'Water damage to sanctuary and main building. Emergency response completed. Reconstruction scope in progress.', flagged:false },
  { id:2,  name:'West Broadway Holdings', gnc:'7712', claim:'66247353',   consultant:'Priya Mehta',    consultantId:'priya',    consultantInitials:'PM', consultantColor:'#7c3aed', status:'Pending Approval',  progress:79,  lastUpdated:'1 day ago',    address:'1626 W Broadway, Vancouver, BC',    dateOfLoss:'2025-10-03', description:'Fire damage to commercial property. Reconstruction bid submitted and awaiting client approval.', flagged:false },
  { id:3,  name:'Burb Cannabis Corp',     gnc:'3606', claim:'90246301',   consultant:'Amir Khan',      consultantId:'amir',     consultantInitials:'AK', consultantColor:'#059669', status:'Completed',         progress:100, lastUpdated:'3 days ago',   address:'450 Burrard St, Vancouver, BC',     dateOfLoss:'2025-09-18', description:'Flood damage. All scope completed and signed off by adjuster.', flagged:false },
  { id:4,  name:'Carbon Curling Club',    gnc:'3200', claim:'43277141',   consultant:'Rahul Sharma',   consultantId:'rahul',    consultantInitials:'RS', consultantColor:'#1e56d9', status:'In Progress',       progress:37,  lastUpdated:'5 hours ago',  address:'88 Curling Ave, Calgary, AB',       dateOfLoss:'2025-12-01', description:'Roof collapse from snowload. Engineers engaged. Demolition scope being prepared.', flagged:false },
  { id:5,  name:'Intact Insurance File',  gnc:'5522', claim:'87792020',   consultant:'Sunita Verma',   consultantId:'sunita',   consultantInitials:'SV', consultantColor:'#f59e0b', status:'Not Started',       progress:0,   lastUpdated:'8 days ago',   address:'200 King St W, Toronto, ON',        dateOfLoss:'2025-12-10', description:'New assignment. Initial site visit to be scheduled.', flagged:true  },
  { id:6,  name:'Calgary Restoration',   gnc:'3880', claim:'53667182',   consultant:'Priya Mehta',    consultantId:'priya',    consultantInitials:'PM', consultantColor:'#7c3aed', status:'On Hold',           progress:28,  lastUpdated:'6 days ago',   address:'900 Centre St, Calgary, AB',        dateOfLoss:'2025-11-25', description:'On hold pending insurance adjuster review of scope.', flagged:true  },
  { id:7,  name:'DKI Clean-Scene',        gnc:'7619', claim:'52764266',   consultant:'Amir Khan',      consultantId:'amir',     consultantInitials:'AK', consultantColor:'#059669', status:'Completed',         progress:100, lastUpdated:'1 week ago',   address:'555 Industrial Blvd, Edmonton, AB', dateOfLoss:'2025-09-05', description:'Mould remediation completed and certified.', flagged:false },
  { id:8,  name:'1100289 BC Ltd',         gnc:'2153', claim:'VA24092731', consultant:'Sunita Verma',   consultantId:'sunita',   consultantInitials:'SV', consultantColor:'#f59e0b', status:'In Progress',       progress:51,  lastUpdated:'3 hours ago',  address:'1626 W Broadway, Vancouver, BC',    dateOfLoss:'2025-10-15', description:'Water damage. Reconstruction scope prepared. Tendering in progress.', flagged:false },
];

export const TEAM = [
  { id:'nitin',    name:'Nitin Luhadiya',  initials:'NL', color:'#7c3aed', email:'nitin@gncgroup.ca',    role:'admin', permissions:{viewAllTasks:true,  assignTasks:true,  manageUsers:true,  viewAllFiles:true } },
  { id:'rahul',    name:'Rahul Sharma',    initials:'RS', color:'#1e56d9', email:'rahul@gncgroup.ca',    role:'sr',    permissions:{viewAllTasks:true,  assignTasks:true,  manageUsers:false, viewAllFiles:true } },
  { id:'priya',    name:'Priya Mehta',     initials:'PM', color:'#7c3aed', email:'priya@gncgroup.ca',    role:'sr',    permissions:{viewAllTasks:true,  assignTasks:true,  manageUsers:false, viewAllFiles:true } },
  { id:'amir',     name:'Amir Khan',       initials:'AK', color:'#059669', email:'amir@gncgroup.ca',     role:'jr',    permissions:{viewAllTasks:false, assignTasks:false, manageUsers:false, viewAllFiles:false} },
  { id:'sunita',   name:'Sunita Verma',    initials:'SV', color:'#f59e0b', email:'sunita@gncgroup.ca',   role:'jr',    permissions:{viewAllTasks:false, assignTasks:false, manageUsers:false, viewAllFiles:false} },
  { id:'manpreet', name:'Manpreet Gill',   initials:'MG', color:'#ef4444', email:'manpreet@gncgroup.ca', role:'jr',    permissions:{viewAllTasks:false, assignTasks:false, manageUsers:false, viewAllFiles:false} },
];

export const INITIAL_DELIVERABLES = [
  { id:1,  claimId:1, name:'Site Visit',               assigneeId:'rahul',    status:'Completed',        priority:'High',   due:'2026-04-20', note:'Initial inspection done', createdAt:'2026-04-18T09:00:00Z' },
  { id:2,  claimId:1, name:'Demolition Scope of Work', assigneeId:'rahul',    status:'In Progress',      priority:'High',   due:'2026-05-08', note:'', createdAt:'2026-04-20T10:00:00Z' },
  { id:3,  claimId:1, name:'Building Finishes Report', assigneeId:'amir',     status:'Not Started',      priority:'Medium', due:'2026-05-15', note:'', createdAt:'2026-04-22T11:00:00Z' },
  { id:4,  claimId:2, name:'Site Visit',               assigneeId:'priya',    status:'Completed',        priority:'High',   due:'2026-04-15', note:'', createdAt:'2026-04-10T08:00:00Z' },
  { id:5,  claimId:2, name:'Reconstruction Scope',     assigneeId:'priya',    status:'Completed',        priority:'High',   due:'2026-04-25', note:'', createdAt:'2026-04-16T09:00:00Z' },
  { id:6,  claimId:2, name:'Bid Tendering',            assigneeId:'manpreet', status:'Pending Approval', priority:'High',   due:'2026-05-06', note:'Awaiting client sign-off', createdAt:'2026-04-26T10:00:00Z' },
  { id:7,  claimId:4, name:'Site Visit',               assigneeId:'rahul',    status:'Completed',        priority:'High',   due:'2026-04-22', note:'', createdAt:'2026-04-18T10:00:00Z' },
  { id:8,  claimId:4, name:'Engineer Engagement',      assigneeId:'rahul',    status:'In Progress',      priority:'High',   due:'2026-05-10', note:'Waiting on engineer report', createdAt:'2026-04-23T09:00:00Z' },
  { id:9,  claimId:4, name:'Demolition Scope of Work', assigneeId:'amir',     status:'Not Started',      priority:'Medium', due:'2026-05-18', note:'', createdAt:'2026-04-24T10:00:00Z' },
  { id:10, claimId:5, name:'Request Site Visit',       assigneeId:'sunita',   status:'Not Started',      priority:'High',   due:'2026-05-05', note:'Urgent — new assignment', createdAt:'2026-05-01T09:00:00Z' },
  { id:11, claimId:6, name:'Site Visit',               assigneeId:'sunita',   status:'Completed',        priority:'Medium', due:'2026-04-28', note:'', createdAt:'2026-04-24T10:00:00Z' },
  { id:12, claimId:8, name:'Site Visit',               assigneeId:'sunita',   status:'Completed',        priority:'High',   due:'2026-04-18', note:'', createdAt:'2026-04-15T09:00:00Z' },
  { id:13, claimId:8, name:'Demolition Scope',         assigneeId:'sunita',   status:'In Progress',      priority:'High',   due:'2026-05-09', note:'', createdAt:'2026-04-20T10:00:00Z' },
  { id:14, claimId:8, name:'Reconstruction Bid',       assigneeId:'manpreet', status:'Not Started',      priority:'Medium', due:'2026-05-20', note:'', createdAt:'2026-04-22T11:00:00Z' },
];

export const DELIVERABLE_TYPES = [
  'Site Visit','Demolition Scope of Work','Demolition Scope','Reconstruction Scope',
  'Building Finishes Report','Bid Tendering','Reconstruction Bid','Engineer Engagement',
  'Request Site Visit','Call to Insured','Call to Client','Submit Report','Insurance Review',
  'Moisture Mapping','Mould Assessment','Remediation Scope','Sign-off / Completion','Custom...'
];

export const DELIVERABLE_STATUSES = ['Not Started','In Progress','Pending Approval','Completed','On Hold'];

export const STATUS_CONFIG = {
  'Not Started':      { pillClass:'pill-gray',   kanbanColor:'#8fa0c0', progressColor:'#8fa0c0' },
  'In Progress':      { pillClass:'pill-blue',   kanbanColor:'#1e56d9', progressColor:'#1e56d9' },
  'Pending Approval': { pillClass:'pill-yellow', kanbanColor:'#f59e0b', progressColor:'#f59e0b' },
  'On Hold':          { pillClass:'pill-red',    kanbanColor:'#ef4444', progressColor:'#ef4444' },
  'Completed':        { pillClass:'pill-green',  kanbanColor:'#00c9a7', progressColor:'#00c9a7' },
};

export const KANBAN_COLS = ['Not Started','In Progress','Pending Approval','On Hold','Completed'];
