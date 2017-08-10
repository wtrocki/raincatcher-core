/**
 * Wrapper interface to return ordered and pagged list of items.
 */
export interface PageResponse {
  /**
   *  Number of pages
   */
  totalPages: number;

  /**
   * Total number of elements
   */
  totalCount: number;

  /**
   * Represents returned data
   */
  data: any[];
}