import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import * as Components from './components'

import { BillList } from "@/features/bills/BillList";
import { BillFileUpload } from "@/features/bills/BillFileUpload";
import {BillApp} from "@/features/bills/billApp";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/bills/*" element={<BillApp />}>
            <Route path="list" element={<BillList />}/>
            <Route path="upload" element={<BillFileUpload />}/>
          </Route>
          <Route path="*" element={<Components.NoMatch />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
