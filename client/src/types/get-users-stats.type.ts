export interface GetUsersStatsResponse {
  totalUsers: number;
  breakdown: Breakdown[];
}

export interface Breakdown {
  prodi: string;
  totalUsers: number;
  percentage: number;
}
