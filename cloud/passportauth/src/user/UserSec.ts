import BaseUser from './BaseUser';

export interface UserSec {
  comparePassword(password: string): Promise<boolean>;
  hasResourceRole(role: string): Promise<boolean>;
}

export class UserSecService implements UserSec {
  protected userApi: BaseUser;

  constructor(protected readonly UserApi: BaseUser) {
    this.userApi = UserApi;
  }

  /**
   * Compares the user's password with the user's password in the data source.
   *
   * @param password {string} - Password given by the user upon login
   * @returns {Promise<boolean>} - Returns true/false if the password given matches with the password
   * from the data source
   */
  public comparePassword(password: string) {
    return this.userApi.getPasswordHash().then((passwordHash: string) => {
      return (password === passwordHash); // TODO: replace with bcrypt [RAINCATCH-872]
    });
  }

  /**
   * Checks if the user has the role specified
   *
   * @param role {string} - Role to be checked if assigned to the given user
   * @returns {Promise<boolean>} - Returns true/false if the user has the role specified
   */
  public hasResourceRole(role: string) {
    return this.userApi.getRoles().then((roles: string[]) => {
      return (roles.indexOf(role) > -1);
    });
  }
}

export default UserSecService;
