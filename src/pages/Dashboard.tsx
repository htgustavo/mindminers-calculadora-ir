import { Plus } from "lucide-react";
import { useState } from "react";

import { OperationDialog } from "@/components/Operation/OperationDialog";
import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acompanhe suas operações e impostos em tempo real
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button
            variant="default"
            size="lg"
            className="transition-all duration-300 hover:scale-105"
            type="button"
            onClick={handleToggleModal}
            aria-label="Nova transação"
          >
            <Plus className="me-2" />
            Nova transação
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>Conteudo</PageContent>
      <OperationDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
    </PageContainer>
  );
};

export default Dashboard;
