import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { useOperationContext } from "@/context/OperationContext";

import TableTransactions from "./components/TableTransactions";

export default function TransactionsPage() {
  const { operations } = useOperationContext();
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Histórico de Operações</PageTitle>
          <PageDescription>
            Visualize todas as suas operações registradas
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Operações Registradas</CardTitle>
              <CardDescription>
                {operations.length} operação(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {operations.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma operação encontrada
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <TableTransactions operations={operations} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageContainer>
  );
}
