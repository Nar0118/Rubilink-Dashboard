import { FailedMessages } from '@/src/utils/constants';
import ApiBase from '../base/apiBase';
import { API_BASE_URL } from '@/src/utils/environments';
import { APIResponse, IResponse, IUserManagementData } from '../base/types';

class UserManagementService {
  private apiBase: ApiBase<any>;
  private authorizationToken?: string | undefined;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.authorizationToken = token;
  }

  async getAllUsers(
    userId: string,
  ): Promise<IUserManagementData[] | IResponse> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/invitation/${userId}`,
        this.authorizationToken,
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }

  async deleteInvitation(userId: string): Promise<APIResponse> {
    try {
      const response = await this.apiBase.deleteAsync(
        userId,
        `${API_BASE_URL}/invitation`,
        {
          authorization: `Bearer ${this.authorizationToken}`,
        },
      );

      return response;
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default UserManagementService;
