export type LaunchesPerYear = {
  failure: number;
  success: number;
  total: number;
  upcoming: number;
  year: number;
};

export type LaunchSuccessRate = {
  failure: number;
  success: number;
  successRatePct: number;
  total: number;
};

export type LaunchAnalytics = {
  perYear: LaunchesPerYear[];
  successRate: LaunchSuccessRate;
  totalLaunches: number;
};
