class DashboardService {
  static async fetchDashboardData() {
    // Dummy dashboard data
    return {
      totalUsers: 1000,
      verifiedUsers: 800,
      newUsers: 50,
      loginActivity: 200,
    };
  }
}

export default DashboardService;
