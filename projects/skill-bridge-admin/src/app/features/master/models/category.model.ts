import { MasterCatModalMode } from "./modal-mode.type";

export interface CategoryType {
  id: number;
  categoryName: string;
  description: string;
}


export interface CatDialogInput {
  mode: MasterCatModalMode;
  data?: CategoryType;
  skills?: any[];
  categories?: any[];
}