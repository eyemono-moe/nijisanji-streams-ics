import { makePersisted } from "@solid-primitives/storage";
import {
  type ParentComponent,
  createContext,
  createResource,
  useContext,
} from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { getLivers } from "~/lib/getLivers";

export type LiversContextState = {
  // 選択済みのライバー (未選択ライバーは含まれない)
  selected: {
    [name: string]: boolean | undefined;
  };
};

type LiversContextAction = {
  setSelect: (id: string, selected: boolean) => void;
  selectAll: () => void;
  reset: () => void;
};

type LiversContextValue = {
  state: LiversContextState;
  actions: LiversContextAction;
};

const LiversContext = createContext<LiversContextValue>({
  state: {
    selected: {},
  },
  actions: {
    setSelect: () => {},
    selectAll: () => {},
    reset: () => {},
  },
});

export const LiversProvider: ParentComponent = (props) => {
  const [state, setState] = makePersisted(
    createStore<LiversContextState>({
      selected: {},
    }),
    {
      name: "livers",
    },
  );

  const setSelect = (id: string, selected: boolean) => {
    setState("selected", id, selected);
  };

  const reset = () => {
    setState("selected", reconcile({}));
  };

  const [livers] = createResource(() => getLivers());
  const selectAll = () => {
    if (livers.state === "ready") {
      const test = Object.fromEntries(livers().map((l) => [l.id, true]));
      setState("selected", reconcile(test));
      return;
    }
    throw new Error("livers still loading");
  };

  return (
    <LiversContext.Provider
      value={{
        state,
        actions: {
          setSelect,
          reset,
          selectAll,
        },
      }}
    >
      {props.children}
    </LiversContext.Provider>
  );
};

export const useLivers = () => useContext(LiversContext);
