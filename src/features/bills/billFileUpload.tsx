import {useContext, useEffect, useState} from "react";
import * as Components from '@/components';
import { Link } from "react-router-dom";
import { useFileContext } from "@/components/ui/file";

export const BillFileUpload = () => {
  const fileContext = useFileContext();

  const contextFile = (): null | File => {
    if (fileContext.state.isFileEmpty) {
      return null
    }

    return fileContext.state.file;
  }

  return (
    <>
      <Link to="/bills/list">
        List
      </Link>
      <Components.FileUploader file={contextFile()}/>
    </>
  );
};
