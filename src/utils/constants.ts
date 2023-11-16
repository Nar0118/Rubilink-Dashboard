import { ICategory } from '@/services/base/types';

const SuccessfulMessages = {
  register: 'Registered Successfully',
  login: 'Login Successful',
  getUser: 'User fetched successfully',
};

const FailedMessages = {
  issue: 'Something went wrong!',
  userNameOrEmailMissing: 'Username or email address is required.',
  passwordRequired: 'Password is required.',
  EmailRequired: 'Email address is required.',
  InvalidEmail: 'Please enter a valid email address.',
  PasswordRequired: 'Password is required.',
  InvalidPassword:
    'Password must be between 8 and 20 characters and must conatin at least one number, special character and capitalized letter.',
  PasswordMismatch: 'Password doesn`t match, Please enter correct password.',
  NameRequired: 'name is required',
  DescriptionRequired: 'Description is required',
  LogoRequired: 'logo is required',
  IndustryRequired: 'industry is required',
  SizeRequired: 'Size is required',
  ProjectsRequired: 'is required',
  PhoneRequired: 'Phone is required',
  NameLengthExceeded:
    'The length of your first name below should be 30 letters',
  DescriptionLengthExceeded:
    'Your project description should be less than 150 words ',
  NotesLimit: 'Your notes should be less than 50 words ',
  OrganizationRequired: 'Organization is required',
  OrganizationNameLength:
    'Please enter an organization name with at least 3 characters',
  ProjectNameLength: 'Please enter a project name with at least 3 characters',
  WrongPassword: 'Please enter a valid password',
};

const DashboardCategories: ICategory[] = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    path: '',
    iconLight: '/images/dashboard-icon.svg',
    iconDark: '/images/dashboard-icon-dark.svg',
    restricted: false,
  },
  {
    name: 'User Management System',
    route: '/dashboard',
    path: '/user-management-system',
    iconLight: '/images/user-management-system-light.svg',
    iconDark: '/images/user-management.svg',
    restricted: true,
  },
];

const UserRolesMap: any = [
  {
    value: 'projectAdmin',
    label: 'Project Admin',
  },
  {
    value: 'organizationAdmin',
    label: 'Organization Admin',
  },
];

const UserRolesData: any = {
  superUser: 'Superadmin',
  organizationAdmin: 'Organization admin',
  projectAdmin: 'Project admin',
};

const optionPaths = {
  organizationAdmin: '/organization/get-organizations',
  projectAdmin: '/project/get-projects',
};

const inviteOptionSeparate: any = {
  organizationAdmin: 'Organization',
  projectAdmin: 'Project',
};

export {
  SuccessfulMessages,
  FailedMessages,
  DashboardCategories,
  UserRolesMap,
  inviteOptionSeparate,
  optionPaths,
  UserRolesData,
};
