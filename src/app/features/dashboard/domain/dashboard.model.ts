export interface DashboardStats {
  totalUsers: number;
  totalSales: number;
  activeProjects: number;
  revenue: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};
