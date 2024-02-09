import { useContext, useEffect } from "react";
import * as Components from '@/components';
import BillContext from "@/features/bills/billContext";
import { Link } from "react-router-dom";

export const BillUpload = () => {
  /*const { bills, setBills } = useContext(BillContext);

  useEffect(() => {
    setBills(() => [...bills, {name: "ovo", governmentId: "djas989384"}])
  }, []);
*/
  return (
    <>
      <Link to="/bills/list">
        List
      </Link>
      <Components.FileUploader />
    </>
  );
};
