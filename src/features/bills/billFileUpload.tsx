import { FileUploader } from '@/components/ui/file-uploader';
import { Link } from "react-router-dom";
import { useFileContext } from "@/components/ui/file";
import {BillMenu} from "@/features/bills/billMenu";

export const BillFileUpload = () => {
  const fileContext = useFileContext();

  const contextFile = (): null | File => {
    if (fileContext.state?.isFileEmpty) {
      return null
    }

    return fileContext.state.file;
  }

  const path = "/bills/upload";

  return (
    <div>
      <BillMenu path={path}/>
      <FileUploader file={contextFile()} uploadURL="bills/upload"/>
    </div>
  );
};
