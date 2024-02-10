import React from 'react'
import * as Components from '@/components'
import { BillProvider } from "@/features/bills/billContext";
import {FileProvider} from "@/components/ui/file";


export const BillApp = () => {
  return (
    <FileProvider>
      <Components.Layout />
    </FileProvider>
  );
};
