import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

import { OperationCharts } from "./components/OperationCharts";
import StatsCards from "./components/StatsCards";

const Dashboard = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acompanhe suas operações e impostos em tempo real
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <StatsCards />

        {/* Gráficos */}
        <OperationCharts />
      </PageContent>
    </PageContainer>
  );
};

export default Dashboard;
