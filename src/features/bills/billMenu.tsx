import React from 'react';
import { Link } from "react-router-dom";

export const BillMenu = ({path}: string) => {
  return (
    <div className="flex flex-col mb-10">
        <ul className="list-none gap-12 flex">
          <li className="mb-2">
            <Link to="/bills/list" className={`text-emerald-800 ${path === "/bills/list" ? 'font-bold' : ''}`}>
              Bills Uploaded
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/bills/upload" className={`text-emerald-800 ${path === "/bills/upload" ? 'font-bold' : ''}`}>
              Upload
            </Link>
          </li>
        </ul>
    </div>
  )
}
