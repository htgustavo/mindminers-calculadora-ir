import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOperationContext } from "@/context/OperationContext";
import type { Operation } from "@/types/operations";

import { operationSchema } from "./schema";

type OperationFormInput = z.input<typeof operationSchema>;
type OperationFormData = z.infer<typeof operationSchema>;

const FormOperation = ({
  onFinish,
}: {
  onFinish: (status: boolean) => void;
}) => {
  const { addOperation } = useOperationContext();

  const form = useForm<OperationFormInput, any, OperationFormData>({
    resolver: zodResolver(operationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      ticker: "",
      type: "BUY",
      price: 0,
      quantity: 0,
      brokerage: 0,
    },
  });

  const onSubmit = async (data: OperationFormData) => {
    // Simular um pequeno delay para mostrar a animação
    await new Promise((resolve) => setTimeout(resolve, 800));

    const operation: Operation = {
      id: Date.now().toString(),
      date: data.date,
      ticker: data.ticker,
      type: data.type,
      price: data.price,
      quantity: data.quantity,
      brokerage: data.brokerage,
      createdAt: new Date().toISOString(),
    };

    const result = addOperation(operation);

    console.log(result);

    // Toast personalizado baseado no resultado
    if (operation.type === "SELL" && result.result > 0) {
      toast("🎉 Lucro realizado!", {
        description: `Vendeu ${operation.quantity} ações ${operation.ticker} com lucro de R$ ${result.result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      });
    } else if (operation.type === "SELL" && result.result < 0) {
      toast("📊 Prejuízo registrado", {
        description: `Prejuízo de R$ ${Math.abs(result.result).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} será compensado em lucros futuros`,
      });
    } else {
      toast("✅ Compra registrada!", {
        description: `${operation.quantity} ações ${operation.ticker} adicionadas à carteira`,
      });
    }

    // Reset form após delay
    setTimeout(() => {
      form.reset({
        date: new Date().toISOString().split("T")[0],
        ticker: "",
        type: "BUY",
        price: 0,
        quantity: 0,
        brokerage: 0,
      });
      onFinish(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da Operação</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Operação</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value as "BUY" | "SELL")
                  }
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BUY">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-profit h-4 w-4" />
                        Compra
                      </div>
                    </SelectItem>
                    <SelectItem value="SELL">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="text-loss h-4 w-4" />
                        Venda
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ticker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código da Ação</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: PETR4"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    className="font-mono tracking-wider"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    value={field.value as number | undefined}
                    className="text-right font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço por Ação (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    value={field.value as number | undefined}
                    className="text-right font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brokerage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de Corretagem (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    value={field.value as number | undefined}
                    className="text-right font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Registrar Operação
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormOperation;
