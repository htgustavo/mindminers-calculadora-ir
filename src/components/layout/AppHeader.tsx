import { Plus } from "lucide-react";
import { useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { OperationDialog } from "../Operation/OperationDialog";
import { Button } from "../ui/button";

export function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex h-19 w-full items-center gap-2 bg-white px-4 shadow transition-all">
      <div className="flex w-full items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Button
          variant="default"
          size="lg"
          className="z-30 transition-all duration-300 hover:scale-105"
          type="button"
          onClick={handleToggleModal}
          aria-label="Nova Operação"
        >
          <Plus className="me-2" />
          Nova Operação
        </Button>
      </div>
      <OperationDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
}
