import { Dialog, Portal, Button } from "@chakra-ui/react";
import type { ReactNode } from "react";

type BaseDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxW?: string;
};

const BaseDialog = ({
  open,
  onClose,
  title,
  children,
  footer,
  maxW = "lg",
}: BaseDialogProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW={maxW}>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}

            <Dialog.Body>{children}</Dialog.Body>

            {footer && <Dialog.Footer>{footer}</Dialog.Footer>}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BaseDialog;
