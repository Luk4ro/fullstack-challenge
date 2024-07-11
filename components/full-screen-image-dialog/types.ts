import React from "react";

export interface FullScreenImageDialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: (value: string) => void;
}
