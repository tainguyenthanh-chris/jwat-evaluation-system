import {
  Button,
  Dialog,
  Portal,
  CloseButton,
  type ButtonProps,
} from "@chakra-ui/react";

const defaultButtonProps: ButtonProps = {
  colorPalette: "blue",
  size: "sm",
  variant: "solid",
  bgColor: "blue.700",
};

const defaultCancelButtonProps: ButtonProps = {
  variant: "outline",
  colorPalette: "gray",
  size: "sm",
};

type Props = {
  triggerButtonTitle?: string;
  submitButtonTitle?: string;
  title?: string;
  secondaryTitle?: string;
  onConfirm?: () => void;

  triggerButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
};

const ConfirmDialog: React.FC<Props> = ({
  triggerButtonTitle,
  submitButtonTitle,
  title,
  secondaryTitle,
  onConfirm,
  triggerButtonProps,
  cancelButtonProps,
  confirmButtonProps,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button {...defaultButtonProps} {...triggerButtonProps}>
          {triggerButtonTitle}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{secondaryTitle}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Dialog.ActionTrigger asChild>
                  <Button {...defaultCancelButtonProps} {...cancelButtonProps}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.ActionTrigger>
              <Button
                {...defaultButtonProps}
                {...confirmButtonProps}
                onClick={onConfirm}
              >
                {submitButtonTitle ?? "Confirm"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
