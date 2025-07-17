import { useState } from "react";

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

import FilterOperations from "./components/FilterOperations";
import TableOperations from "./components/TableOperations";

export default function TransactionsPage() {
  const { operations, taxResults } = useOperationContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterTicker, setFilterTicker] = useState("ALL");

  // Obter tickers únicos
  const uniqueTickers = Array.from(new Set(operations.map((op) => op.ticker)));

  // Filtrar operações
  const filteredOperations = operations.filter((operation) => {
    const matchesSearch = operation.ticker
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || operation.type === filterType;
    const matchesTicker =
      filterTicker === "ALL" || operation.ticker === filterTicker;

    return matchesSearch && matchesType && matchesTicker;
  });

  // Obter resultado de uma operação específica
  const getOperationResult = (operationId: string) => {
    return taxResults.find((result) => result.operation.id === operationId);
  };

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
        <div className="space-y-4">
          {/* Filtros */}
          <FilterOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filterTicker={filterTicker}
            setFilterTicker={setFilterTicker}
            uniqueTickers={uniqueTickers}
          />

          {/* Tabela de Operações */}
          <Card>
            <CardHeader>
              <CardTitle>Operações Registradas</CardTitle>
              <CardDescription>
                {filteredOperations.length} operação(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredOperations.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma operação encontrada
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <TableOperations operations={filteredOperations} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumo */}
          {filteredOperations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Período</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">
                      {
                        filteredOperations.filter((op) => op.type === "BUY")
                          .length
                      }
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Operações de Compra
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">
                      {
                        filteredOperations.filter((op) => op.type === "SELL")
                          .length
                      }
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Operações de Venda
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary text-2xl font-bold">
                      R${" "}
                      {filteredOperations
                        .map((op) => getOperationResult(op.id)?.tax || 0)
                        .reduce((sum, tax) => sum + tax, 0)
                        .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-muted-foreground text-sm">Total de IR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </PageContent>
    </PageContainer>
  );
}
