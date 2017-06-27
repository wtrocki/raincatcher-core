export interface User {
  /**
   * Retrieves the user's login id
   *
   * @returns {string>} - A unique id used by the user for login
   */
  getLoginId(): string;

  /**
   * Retrieves the user's hashed password
   *
   * @returns {string>} - User's hashed password
   */
  getPasswordHash(): string;

  /**
   * Retrieves the user's roles
   *
   * @returns {string[]>} - An array containing roles assigned to the user
   */
  getRoles(): string[];
}

export default User;
