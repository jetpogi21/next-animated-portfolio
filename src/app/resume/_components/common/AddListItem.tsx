import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/Textarea";

type AddListItemProps = {
  testIdPrefix: string;
  dialogTitle: string;
  buttonText: string;
  placeholder: string;
  onAdd: (value: string) => void;
};

export const AddListItem = ({
  testIdPrefix,
  dialogTitle,
  buttonText,
  placeholder,
  onAdd,
}: AddListItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          data-testid={`add-${testIdPrefix}-button`}
        >
          <Plus className="mr-2 w-4 h-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="pt-4 space-y-4">
          <Textarea
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                if (textarea.value.trim()) {
                  onAdd(textarea.value);
                  textarea.value = "";
                  const closeButton = textarea
                    .closest("div[role='dialog']")
                    ?.querySelector(
                      "[data-testid='dialog-close']"
                    ) as HTMLButtonElement;
                  closeButton?.click();
                }
              }
            }}
            data-testid={`new-${testIdPrefix}-input`}
          />
        </div>
        <DialogClose
          data-testid="dialog-close"
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
};
