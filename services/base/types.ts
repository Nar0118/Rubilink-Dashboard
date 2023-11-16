import { Dispatch, SetStateAction } from 'react';
import { ModalProps as AntdModalProps } from 'antd';

type ID = number | string;

interface ApiError {
  statusCode: number;
  errorMessage?: string;
  token?: string;
  error?: string;
}

interface IResponse {
  token?: string;
  error?: string;
  message: string;
  success: boolean;
}

interface ApiHeaders {
  [key: string]: string;
}

interface IApiBase<T> {
  getAllAsync: (url: string) => Promise<T[] | T | ApiError>;
  getAsync: (url: string) => Promise<T | ApiError>;
  postAsync: (url: string, values: T) => Promise<T | ApiError>;
  putAsync: (
    id: ID,
    url: string,
    values: T,
    headers: any,
  ) => Promise<T | ApiError>;
  putAllAsync(values: T, url: string): Promise<T | ApiError>;
  deleteAsync: (id: ID, url: string) => Promise<T | ApiError>;
  deleteAllAsync(values: T, url: string): Promise<T | ApiError>;
}

interface IAuthService {
  signup(signupData: SignupData): Promise<APIResponse>;
  signout(): Promise<APIResponse>;
  login(loginData: LoginData): Promise<APIResponse>;
  submitForgot(forgotData: IForgotData): Promise<APIResponse>;
  submitRecover(recoveryData: IRecovery): Promise<APIResponse>;
}

interface IOrganizationService {
  getOrganizations(
    page: number,
    perPage: number,
  ): Promise<IOrganizationData['data']>;
  getOrganizationByRole(): Promise<IOrganizationEditData>;
  createOrganizations(data: FormData): Promise<APIResponse>;
  updateOrganizations(id: string, data: FormData): Promise<APIResponse>;
  deleteOrganizations(id: string): Promise<APIResponse>;
  searchOrganizationsOptions(name: string): Promise<APIResponse>;
}

interface IProjectService {
  getProjects(page: number, perPage: number): Promise<IProjectData['data']>;
  createProject(data: FormData): Promise<APIResponse>;
  updateProject(id: string, data: FormData): Promise<APIResponse>;
  deleteProject(id: string): Promise<APIResponse>;
  searchProjectsOptions(name: string): Promise<APIResponse>;
}
interface IUserManagementService {
  getAllUsers(userId: string): Promise<IUserManagementData>;
}

interface IUserContext {
  user: User | undefined;
}

interface IUserService {
  getUser(): Promise<IUserApiResponse>;
  getInvitationOptions(
    option: 'projectAdmin' | 'organizationAdmin',
    page: number,
    perPage: number,
  ): Promise<any | IOrganizationData>;
  sendInvitationLink(data: ISendInvite): Promise<any>;
}

interface SignupData {
  token: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface IForgotData {
  email: string;
}

interface IRecovery {
  password: string;
  token: string;
}

interface APIResponse {
  message: string;
  success?: boolean;
  data?: any;
}

interface User {
  name: string;
  email: string;
  surname?: string;
  phoneNumber: string;
  role: UserRoles;
  _id: string;
  organization?: OrganizationData;
  project?: IProjectResponseData;
}

interface IUserManagementData {
  Organization: IOrganizationData;
  createdAt: string;
  email: string;
  message: string;
  role: string;
  status: string;
  updatedAt: string;
  user_id: string;
  __v: number;
  _id: string;
}

interface IUserManagementResponse {
  data: IUserManagementData;
  message: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSent?: boolean;
  onClick?: () => void;
  className?: string;
}

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

interface OrganizationInputProps {
  handleOrganization: (value: string) => void;
  organizationName?: string;
  error?: string;
  dropDownOpened: boolean;
  setDropDownOpened: (value: boolean) => void;
  isOrganization: boolean;
  label: string;
  placeholder: string;
}

interface InputProps {
  type: string;
  required?: boolean;
  label: string;
  fromInvite?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

interface TextAreaProps {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

interface ImageInputProps {
  label: string;
  value?: File | string;
  setValue: (e: File | string) => void;
  error: string;
}

interface OrganizationFormProps {
  cancelHandler: () => void;
  createHandler: (organizationData: FormData) => Promise<void>;
  title: OrganizationFormTitle;
  headerTitle: string;
  buttonTitle: string;
  data: OrganizationData;
  organizationName?: string;
}

enum OrganizationFormTitle {
  ORGANIZATION = 'Organization',
  PROJECT = 'Project',
}

interface OrganizationData {
  [key: string]: string | string[] | File | undefined;
  name?: string;
  industry?: string;
  size?: string;
  logo?: File | string;
  email?: string;
  phone?: string;
  description?: string;
  subscriptionPlans?: string;
  type?: string;
}

interface IOrganizationEditData {
  admin?: User;
  createdAt: string;
  industry: string;
  logo: string;
  name: string;
  size: string;
  subscriptionPlans: string[];
  updatedAt: string;
  _id: string;
  email?: string;
  phone?: string;
  subscription?: string;
}

interface IProjectEditData {
  key: number;
  '#': number;
  admin?: User;
  createdAt: string;
  description: string;
  industry: string;
  logo: string;
  name: string;
  notes?: string;
  type?: string;
  email?: string;
  phone?: string;
  size: string;
  subscriptionPlans: string[];
  updatedAt: string;
  organization: IOrganizationEditData;
  _id: string;
}

interface IOrganizationEditProps {
  children: React.ReactNode;
  data: IOrganizationEditData;
  fetchData?: () => void;
}

interface IProjectEditProps {
  children: React.ReactNode;
  data: IProjectEditData;
  updateData?: () => void;
}

interface ICategory {
  name: string;
  route: string;
  path: string;
  iconLight: string;
  iconDark: string;
  restricted: boolean;
}
interface ISideBar {
  categories: ICategory[];
  canShow: boolean;
}

interface INavbar {
  isModalOpened: boolean;
  setSideBarToggler: () => void;
}

interface IButtonAction {
  type: 'edit' | 'remove' | 'plus';
  onClick?: () => void;
  data?: DataType;
  deleteType?: DeleteType;
}

interface DataType {
  key: number;
  '#': number;
  admin?: User;
  createdAt: string;
  description: string;
  industry: string;
  logo: string;
  name: string;
  notes?: string;
  size: string;
  subscriptionPlans: string[];
  updatedAt: string;
  _id: string;
  email?: string;
}

type Status = 'pending' | 'accepted';

type DeleteType = 'Organization' | 'Project' | 'Invitation' | 'admin';

type UserRoles = 'superUser' | 'organizationAdmin' | 'projectAdmin';

interface IOrganizationResponseData {
  admin: User;
  createdAt: string;
  description: string;
  industry: string;
  logo: string;
  name: string;
  notes: string;
  size: string;
  subscriptionPlans: string[];
  updatedAt: string;
  _id: string;
}

interface IProjectResponseData {
  key: number;
  '#': number;
  admin: User;
  createdAt: string;
  description: string;
  industry: string;
  logo: string;
  name: string;
  notes?: string;
  size: string;
  type?: string;
  subscriptionPlans: string[];
  updatedAt: string;
  _id: string;
  email?: string;
  phone?: string;
  organization: IOrganizationEditData;
}

interface IMyTable {
  changePage: Dispatch<SetStateAction<number>>;
  changePageSize: Dispatch<SetStateAction<number>>;
  columns: any;
  total?: number;
  //delete any after user managment finalise
  data?:
    | IOrganizationResponseData[]
    | IProjectResponseData[]
    | IUserManagementData[]
    | any;
  onRow?: (
    value: IProjectResponseData | IOrganizationResponseData | any,
  ) => void;
  type?: string;
}

interface IOrganizationData extends APIResponse {
  data?: {
    data: IOrganizationResponseData[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface ISendInvite {
  email: string;
  role: string;
  user_id?: string;
  Organization?: string;
  Project?: string;
}

interface IProjectData extends APIResponse {
  data?: {
    data: IProjectResponseData[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface IProjectCreateData extends APIResponse {
  data?: {
    message: boolean;
    data: IProjectResponseData;
  };
}

interface Organizations {}

interface IUserApiResponse extends APIResponse {
  data?: User;
}

interface ModalProps extends AntdModalProps {
  children: JSX.Element;
}

interface InvitationSuccessModalProps {
  open: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ProjectDetailsModalProps {
  children: React.ReactNode;
  data: ProjectDetailsFormProps;
}
interface ProjectDetailsFormProps {
  logo: string;
  name: string;
  email?: string;
  phone?: string;
  description: string;
  industry: string;
  size: string;
  admin?: User;
  notes?: string;
  organization: any;
}

interface ProjectDetailsSuperUserModalProps {
  data?: ProjectDetailsFormProps;
  isModalOpen: boolean;
  handleCancel: () => void;
}

interface ProjectDetailsType {
  [key: string]: string | undefined;
  industry: string;
  size: string;
  admin?: string;
  notes?: string;
}

interface IRedirectTitle {
  id: number;
  title: string;
  active: boolean;
}

export type {
  ID,
  ApiError,
  IResponse,
  ApiHeaders,
  IApiBase,
  SignupData,
  LoginData,
  IForgotData,
  IRecovery,
  APIResponse,
  User,
  ButtonProps,
  PasswordInputProps,
  InputProps,
  TextAreaProps,
  OrganizationFormProps,
  OrganizationData,
  ImageInputProps,
  IAuthService,
  ICategory,
  ISideBar,
  INavbar,
  DataType,
  Organizations,
  IMyTable,
  IOrganizationService,
  IOrganizationEditProps,
  IOrganizationEditData,
  IProjectEditData,
  IProjectEditProps,
  IOrganizationData,
  IProjectData,
  Status,
  IButtonAction,
  IUserService,
  IUserApiResponse,
  UserRoles,
  DeleteType,
  ModalProps,
  InvitationSuccessModalProps,
  ProjectDetailsModalProps,
  ProjectDetailsFormProps,
  ProjectDetailsType,
  IProjectCreateData,
  IProjectResponseData,
  IProjectService,
  IOrganizationResponseData,
  IRedirectTitle,
  IUserManagementService,
  IUserManagementResponse,
  IUserManagementData,
  ISendInvite,
  ProjectDetailsSuperUserModalProps,
  OrganizationInputProps,
  IUserContext,
};

export { OrganizationFormTitle };
