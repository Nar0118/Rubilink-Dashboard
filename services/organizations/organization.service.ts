import { FailedMessages } from '@/src/utils/constants';
import ApiBase from '../base/apiBase';
import {
  APIResponse,
  IOrganizationData,
  IOrganizationResponseData,
} from '../base/types';
import { API_BASE_URL } from '@/src/utils/environments';

class OrganizationService {
  private apiBase: ApiBase<any>;
  private token?: string;
  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getOrganizations(
    page: number,
    perPage: number,
  ): Promise<any | IOrganizationData> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/organization/get-organizations?page=${page}&perPage=${perPage}`,
        this.token,
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async getOrganizationByRole(): Promise<any | IOrganizationResponseData> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/organization/get-organization-by-role`,
        this.token,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async createOrganizations(data: FormData): Promise<IOrganizationData> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/organization/create-organization`,
        data,
        {
          authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async updateOrganizations(
    id: string,
    data: FormData,
  ): Promise<IOrganizationData> {
    try {
      const response = await this.apiBase.putAsync(
        id,
        `${API_BASE_URL}/organization/update-organization`,
        data,
        {
          authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      );

      return response;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async deleteOrganizations(id: string): Promise<IOrganizationData> {
    try {
      const response = await this.apiBase.deleteAsync(
        id,
        `${API_BASE_URL}/organization/delete-organization`,
        {
          authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async searchOrganizationsOptions(name: string): Promise<APIResponse> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/organization/search-organizations?name=${name}`,
        this.token,
      );

      return response;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default OrganizationService;
