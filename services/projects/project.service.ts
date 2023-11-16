import { FailedMessages } from '@/src/utils/constants';
import ApiBase from '../base/apiBase';
import { IProjectCreateData, IProjectData, APIResponse } from '../base/types';
import { API_BASE_URL } from '@/src/utils/environments';

class ProjectService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getProjects(
    page: number,
    perPage: number,
  ): Promise<any | IProjectData> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/project/get-projects?page=${page}&perPage=${perPage}`,
        this.token,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async createProject(data: FormData): Promise<IProjectCreateData> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/project/create-project`,
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

  async updateProject(id: string, data: FormData): Promise<APIResponse> {
    try {
      const response = await this.apiBase.putAsync(
        id,
        `${API_BASE_URL}/project/update-project`,
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
  async deleteProject(id: string): Promise<APIResponse> {
    try {
      const response = await this.apiBase.deleteAsync(
        id,
        `${API_BASE_URL}/project/delete-project`,
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

  async searchProjectsOptions(name: string): Promise<APIResponse> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/project/search-projects?name=${name}`,
        this.token,
      );

      return response;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default ProjectService;
