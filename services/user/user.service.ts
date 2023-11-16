import {
  FailedMessages,
  SuccessfulMessages,
  optionPaths,
} from '@/src/utils/constants';
import { API_BASE_URL } from '@/src/utils/environments';
import ApiBase from '../base/apiBase';
import { IOrganizationData, IUserApiResponse } from '../base/types';

class UserService {
  private apiBase: ApiBase<any>;
  private token?: string;
  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getUser(): Promise<IUserApiResponse> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/user?token=${this.token}`,
      );

      if (!response.success) {
        return { message: response.error, success: false };
      }

      return {
        message: SuccessfulMessages.getUser,
        data: response.data,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
  async getInvitationOptions(
    option: 'projectAdmin' | 'organizationAdmin',
    page: number,
    perPage: number,
  ): Promise<any | IOrganizationData> {
    const authorizationKey = this.token;
    const url = optionPaths[option];
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}${url}?page=${page}&perPage=${perPage}`,
        authorizationKey,
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async sendInvitationLink(data: any): Promise<any> {
    const authorizationKey = this.token;
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/invitation/send`,
        data,
        { authorization: `Bearer ${authorizationKey}` },
      );

      return response;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default UserService;
