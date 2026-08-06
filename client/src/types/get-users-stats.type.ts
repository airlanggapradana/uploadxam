export interface GetUsersStatsResponse {
  totalUsers: number;
  totalUploads?: number;
  breakdown: Breakdown[];
}

export interface Breakdown {
  prodi: string;
  totalUsers: number;
  percentage: number;
}
