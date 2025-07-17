import { Calculator } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormOperation from "./OperationForm";

interface OperationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OperationDialog({ open, onOpenChange }: OperationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
              <Calculator className="text-primary h-5 w-5" />
            </div>
            Nova Operação
          </DialogTitle>
          <DialogDescription>
            Registre uma nova operação de compra ou venda na bolsa de valores
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="space-y-4">
            <FormOperation onFinish={onOpenChange} />
          </div>

          {/* Resultado */}
          {/* <div className="space-y-4">
            {calculationResult ? (
              <div className="animate-fade-in space-y-4">
                <div className="from-background to-muted/30 border-border/50 rounded-xl border bg-gradient-to-br p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    {calculationResult.result >= 0 ? (
                      <TrendingUp className="text-profit h-5 w-5" />
                    ) : (
                      <TrendingDown className="text-loss h-5 w-5" />
                    )}
                    <h3 className="text-lg font-semibold">
                      Resultado Calculado
                    </h3>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg border p-4 text-center">
                      <p className="text-muted-foreground mb-1 text-sm">
                        Resultado Auferido
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          calculationResult.result >= 0
                            ? "text-profit"
                            : "text-loss"
                        }`}
                      >
                        R${" "}
                        {calculationResult.result.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg border p-4 text-center">
                      <p className="text-muted-foreground mb-1 text-sm">
                        IR a Pagar
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        R${" "}
                        {calculationResult.tax.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-muted-foreground mb-3 text-sm">
                      Posição Atualizada - {calculationResult.operation.ticker}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Quantidade
                        </p>
                        <p className="font-semibold">
                          {calculationResult.position.quantity} ações
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Preço Médio
                        </p>
                        <p className="font-semibold">
                          R${" "}
                          {calculationResult.position.averagePrice.toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 },
                          )}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground text-xs">
                          Prejuízo Acumulado
                        </p>
                        <p className="text-loss font-semibold">
                          R${" "}
                          {calculationResult.position.accumulatedLoss.toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-pulse">
                  {calculationResult.operation.type === "SELL" &&
                    calculationResult.result >= 0 && (
                      <div className="bg-profit/10 border-profit/20 rounded-lg border p-4">
                        <Badge
                          variant="outline"
                          className="border-profit text-profit mb-2"
                        >
                          ✅ Lucro Realizado
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          Esta operação gerou lucro. O IR foi calculado
                          descontando o prejuízo acumulado.
                        </p>
                      </div>
                    )}

                  {calculationResult.operation.type === "SELL" &&
                    calculationResult.result < 0 && (
                      <div className="bg-loss/10 border-loss/20 rounded-lg border p-4">
                        <Badge
                          variant="outline"
                          className="border-loss text-loss mb-2"
                        >
                          📉 Prejuízo Realizado
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          Esta operação gerou prejuízo. O valor será acumulado
                          para compensar lucros futuros.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground flex h-64 items-center justify-center">
                <div className="text-center">
                  <Calculator className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  <p>Preencha o formulário para ver o resultado</p>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
