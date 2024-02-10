import { createContext, useContext, useReducer } from 'react';

export type Bill = {
  name: string,
  governmentId: string
}

type DispatchBill = <A>(value: A) => void;

type ActionType = {
  type: string,
  bills: Bill[]
};

const BillContext = createContext<Bill[]>([]);
const BillDispatchContext = createContext<DispatchBill>(() => {return;});

export function BillProvider({ children }) {
  const [bills, dispatch] = useReducer(billReducer, []);

  return (
    <BillContext.Provider value={bills}>
      <BillDispatchContext.Provider value={dispatch}>
        {children}
      </BillDispatchContext.Provider>
    </BillContext.Provider>
  );
}

export function useBill() {
  return useContext(BillContext);
}

export function useBillDispatch() {
  return useContext(BillDispatchContext);
}

function billReducer(bills: Bill[], action: ActionType): Bill[] {
  switch (action.type) {
    case 'upload': {
      return [
        ...bills,
        {name: "ovo", governmentId: "djas989384"}
      ];
    }
  }
}
export default BillContext;
