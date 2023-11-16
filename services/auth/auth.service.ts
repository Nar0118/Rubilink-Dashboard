import { FailedMessages, SuccessfulMessages } from '@/src/utils/constants';
import ApiBase from '../base/apiBase';
import {
  SignupData,
  LoginData,
  IForgotData,
  IRecovery,
  APIResponse,
} from '../base/types';
import { API_BASE_URL } from '@/src/utils/environments';

class AuthService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async signup(signupData: SignupData): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/signup`,
        signupData,
      );

      if (!response.success) {
        return {
          message: response.error || response.errorMessage,
          success: false,
        };
      }

      return { message: SuccessfulMessages.register, success: true };
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async login(loginData: LoginData): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/signin`,
        loginData,
      );

      if (!response.token) {
        return {
          message: response.error || response.errorMessage,
          success: false,
        };
      }

      return { message: SuccessfulMessages.login, success: true };
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async submitForgot(forgotData: IForgotData): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/forget-password`,
        forgotData,
      );
      if (!response.message) {
        return {
          message: response.error || response.errorMessage,
          success: false,
        };
      }
      return { message: response.message, success: true };
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }

  async submitRecover(recoveryData: IRecovery): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/reset-password`,
        recoveryData,
      );

      if (!response.message) {
        return { message: response.error, success: false };
      }
      return { message: response.message, success: true };
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }

  async signout(): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/signout`,
        {},
        { authorization: `Bearer ${this.token}` },
      );

      if (!response.message) {
        return { message: response.error, success: false };
      }
      return { message: response.message, success: true };
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default AuthService;
