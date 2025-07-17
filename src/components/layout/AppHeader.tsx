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
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
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
      </div>
      <OperationDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
}
