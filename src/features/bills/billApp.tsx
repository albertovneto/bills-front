import React from 'react'
import * as Components from '@/components'
import {FileProvider} from "@/components/ui/file";


export const BillApp = () => {
  return (
    <FileProvider>
      <Components.Layout/>
    </FileProvider>
  );
};
