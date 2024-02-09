import React from 'react'
import * as Components from '@/components'
import { BillProvider } from "@/features/bills/billContext";


export const BillApp = () => {
  return (
    <BillProvider>
      <Components.Layout />
    </BillProvider>
  );
};
