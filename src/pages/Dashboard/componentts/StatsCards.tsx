import {
  Calculator,
  DollarSign,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOperationContext } from "@/context/OperationContext";
const StatsCards = () => {
  const { operations, getTotalTaxOwed, getTotalProfit, getTotalLoss } =
    useOperationContext();

  const stats = [
    {
      title: "IR a Pagar",
      value: getTotalTaxOwed(),
      icon: DollarSign,
      variant: "default" as const,
      prefix: "R$",
      color: "text-primary",
    },
    {
      title: "Lucro Total",
      value: getTotalProfit(),
      icon: TrendingUp,
      variant: "success" as const,
      prefix: "R$",
      color: "text-profit",
    },
    {
      title: "Prejuízo Total",
      value: getTotalLoss(),
      icon: TrendingDown,
      variant: "destructive" as const,
      prefix: "R$",
      color: "text-loss",
    },
    {
      title: "Operações",
      value: operations.length,
      icon: Calculator,
      variant: "secondary" as const,
      prefix: "",
      color: "text-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="border-border/50 group shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className="from-background to-muted/30 border-border/50 rounded-lg border bg-gradient-to-br p-2 transition-transform duration-300 group-hover:scale-110">
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${stat.color} transition-colors duration-300`}
            >
              {stat.prefix}
              {stat.value.toLocaleString("pt-BR", {
                minimumFractionDigits: stat.prefix ? 2 : 0,
                maximumFractionDigits: stat.prefix ? 2 : 0,
              })}
            </div>
            {stat.prefix && (
              <div className="mt-1 flex items-center">
                {stat.title.includes("Lucro") && (
                  <Sparkles className="text-profit mr-1 h-3 w-3" />
                )}
                <p className="text-muted-foreground text-xs">
                  {stat.title.includes("IR") && "A ser pago mensalmente"}
                  {stat.title.includes("Lucro") && "Realizados nas vendas"}
                  {stat.title.includes("Prejuízo") && "Para compensação futura"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
