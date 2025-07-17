import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOperationContext } from "@/context/OperationContext";
import type { Operation } from "@/types/operations";

const TableOperations = ({ operations }: { operations: Operation[] }) => {
  const { taxResults } = useOperationContext();

  const getOperationResult = (operationId: string) => {
    return taxResults.find((result) => result.operation.id === operationId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Quantidade</TableHead>
          <TableHead className="text-right">Corretagem</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Resultado</TableHead>
          <TableHead className="text-right">IR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {operations.map((operation) => {
          const result = getOperationResult(operation.id);
          const total =
            operation.price * operation.quantity + operation.brokerage;

          return (
            <TableRow key={operation.id}>
              <TableCell className="font-medium">
                {new Date(operation.date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{operation.ticker}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    operation.type === "BUY"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }
                >
                  {operation.type === "BUY" ? "Compra" : "Venda"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                R${" "}
                {operation.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right">{operation.quantity}</TableCell>
              <TableCell className="text-right">
                R${" "}
                {operation.brokerage.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right font-medium">
                R${" "}
                {total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right">
                {result ? (
                  <span
                    className={
                      result.result >= 0
                        ? "text-profit font-medium"
                        : "text-loss font-medium"
                    }
                  >
                    R${" "}
                    {result.result.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                {result && result.tax > 0 ? (
                  <span className="text-foreground font-medium">
                    R${" "}
                    {result.tax.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableOperations;
