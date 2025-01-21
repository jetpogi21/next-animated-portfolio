import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/Textarea";

type EditableListItemProps = {
  item: string;
  index: number;
  testIdPrefix: string;
  dialogTitle: string;
  onEdit: (newValue: string, index: number) => void;
  onRemove: (index: number) => void;
};

export const EditableListItem = ({
  item,
  index,
  testIdPrefix,
  dialogTitle,
  onEdit,
  onRemove,
}: EditableListItemProps) => {
  return (
    <Card className="relative group hover:bg-accent transition-colors">
      <div className="absolute top-0 right-0 left-0 h-10 opacity-0 transition-opacity bg-muted/50 group-hover:opacity-100">
        <div className="flex absolute right-2 top-1/2 gap-2 -translate-y-1/2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                data-testid={`edit-${testIdPrefix}-${index}`}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="pt-4 space-y-4">
                <Textarea
                  value={item}
                  onChange={(e) => onEdit(e.target.value, index)}
                  data-testid={`${testIdPrefix}-input-${index}`}
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => onRemove(index)}
            data-testid={`remove-${testIdPrefix}-${index}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <CardContent
            className="p-4 pt-10 cursor-pointer"
            data-testid={`card-content-${testIdPrefix}-${index}`}
          >
            <p className="text-sm">{item}</p>
          </CardContent>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <Textarea
              value={item}
              onChange={(e) => onEdit(e.target.value, index)}
              data-testid={`${testIdPrefix}-input-${index}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
