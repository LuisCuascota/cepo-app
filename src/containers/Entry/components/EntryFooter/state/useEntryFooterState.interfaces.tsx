export interface UseEntryFooterState {
  onSave: () => void;
  saveIsLoad: boolean;
  totalValue: number;
  onChangeDate: (date: string) => void;
  disableSave: boolean;
  onCancelSave: () => void;
  dialog: {
    open: boolean;
    handleClose: () => void;
    handlePrint: () => void;
  };
}
