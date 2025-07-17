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
        </div>
      </DialogContent>
    </Dialog>
  );
}
