import {
  Activity,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOperationContext } from "@/context/OperationContext";

const COLORS = {
  profit: "#22c55e",
  loss: "#ef4444",
  primary: "#3b82f6",
  secondary: "#64748b",
  buy: "#10b981",
  sell: "#f59e0b",
};

export function OperationCharts() {
  const { operations, taxResults } = useOperationContext();

  // Dados para gráfico de operações por mês
  const monthlyData = operations
    .reduce((acc, operation) => {
      const month = new Date(operation.date).toLocaleDateString("pt-BR", {
        month: "short",
        year: "2-digit",
      });
      const existing = acc.find((item) => item.month === month);

      if (existing) {
        if (operation.type === "BUY") {
          existing.compras += 1;
        } else {
          existing.vendas += 1;
        }
      } else {
        acc.push({
          month,
          compras: operation.type === "BUY" ? 1 : 0,
          vendas: operation.type === "SELL" ? 1 : 0,
        });
      }

      return acc;
    }, [] as any[])
    .sort((a, b) => a.month.localeCompare(b.month));

  // Dados para gráfico de IR acumulado
  const taxData = taxResults.reduce((acc, result, index) => {
    const date = new Date(result.operation.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
    const previousTotal = index > 0 ? acc[index - 1]?.total || 0 : 0;

    acc.push({
      date,
      operacao: result.tax,
      total: previousTotal + result.tax,
      tipo: result.operation.type,
    });

    return acc;
  }, [] as any[]);

  // Dados para gráfico de pizza (distribuição por ação)
  const tickerDistribution = operations.reduce((acc, operation) => {
    const existing = acc.find((item) => item.name === operation.ticker);
    const value = operation.price * operation.quantity;

    if (existing) {
      existing.value += value;
      existing.operacoes += 1;
    } else {
      acc.push({
        name: operation.ticker,
        value: value,
        operacoes: 1,
      });
    }

    return acc;
  }, [] as any[]);

  // Dados de resultado por ação
  const tickerResults = Object.values(
    taxResults.reduce((acc, result) => {
      const ticker = result.operation.ticker;
      if (!acc[ticker]) {
        acc[ticker] = {
          ticker,
          lucro: 0,
          prejuizo: 0,
          ir: 0,
        };
      }

      if (result.result > 0) {
        acc[ticker].lucro += result.result;
      } else {
        acc[ticker].prejuizo += Math.abs(result.result);
      }
      acc[ticker].ir += result.tax;

      return acc;
    }, {} as any),
  );

  return (
    <div className="space-y-6">
      {/* Gráficos principais */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Operações por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Operações por Mês
            </CardTitle>
            <CardDescription>
              Distribuição temporal das suas operações
            </CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#b1b1b1" />
                  <XAxis dataKey="month" stroke="#727272" />
                  <YAxis stroke="#727272" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="compras"
                    fill={COLORS.buy}
                    name="Compras"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="vendas"
                    fill={COLORS.sell}
                    name="Vendas"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-300 items-center justify-center">
                <p>Nenhum dado disponível</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* IR Acumulado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              IR Acumulado
            </CardTitle>
            <CardDescription>
              Evolução do imposto de renda a pagar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {taxData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={taxData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#b1b1b1" />
                  <XAxis dataKey="date" stroke="#727272" />
                  <YAxis stroke="#727272" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #fff",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [
                      `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                      "IR Total",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-300 items-center justify-center">
                <p>Nenhum dado disponível</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribuição por Ação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieIcon className="h-5 w-5" />
              Distribuição por Ação
            </CardTitle>
            <CardDescription>Volume financeiro por ticker</CardDescription>
          </CardHeader>
          <CardContent>
            {tickerDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tickerDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {tickerDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          Object.values(COLORS)[
                            index % Object.values(COLORS).length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [
                      `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                      "Volume",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-300 items-center justify-center">
                <p>Nenhum dado disponível</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados por Ação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Lucro/Prejuízo por Ação
            </CardTitle>
            <CardDescription>Performance de cada ticker</CardDescription>
          </CardHeader>
          <CardContent>
            {tickerResults.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tickerResults} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#b1b1b1" />
                  <XAxis type="category" dataKey="ticker" stroke="#727272" />
                  <YAxis type="number" stroke="#727272" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #fff",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [
                      `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                    ]}
                  />
                  <Bar dataKey="lucro" fill="#22c55e" name="Lucro" />
                  <Bar dataKey="prejuizo" fill="#ef4444" name="Prejuízo" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-300 items-center justify-center">
                <p>Nenhum dado disponível</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
