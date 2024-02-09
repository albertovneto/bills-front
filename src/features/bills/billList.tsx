import { useContext, useEffect } from "react";
import * as Components from '../../components';
import BillContext, {Bill} from "@/features/bills/billContext";
import {Link} from "react-router-dom";

export const BillList = () => {
  const [ bills, setBills ] = useContext(BillContext);
  console.log(bills);

  return (
    <>
      <Link to="/bills/upload">
        Upload
      </Link>
      <Components.Table>
        <Components.TableHeader>
          <Components.TableRow>
            <Components.TableCell>Name</Components.TableCell>
            <Components.TableCell>Government Id</Components.TableCell>
            <Components.TableCell>Email</Components.TableCell>
            <Components.TableCell>Debt Amount</Components.TableCell>
            <Components.TableCell>Debt Due Date</Components.TableCell>
            <Components.TableCell>Debt Id</Components.TableCell>
          </Components.TableRow>
        </Components.TableHeader>
        <Components.TableBody>
          { bills.map((bill:Bill, index) => (
            <Components.TableRow key={index}>
              <Components.TableCell>{bill.name}</Components.TableCell>
              <Components.TableCell>{bill.governmentId}</Components.TableCell>
            </Components.TableRow>
          ))}

        </Components.TableBody>
        <Components.TableFooter />
      </Components.Table>
    </>
  );
};
