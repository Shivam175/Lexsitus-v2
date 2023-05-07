import { createStore, createTypedHooks, persist, type State } from "easy-peasy";
import { isEqual } from "lodash";
import { AppStore } from "./App";
import UserStore from "./User";

const RootStore = {
    UserStore,
    AppStore,
};
export type TRootStore = typeof RootStore;
export const store = createStore(persist(RootStore), {
    middleware: [], // Add your middle wares here.
});

const typedHooks = createTypedHooks<TRootStore>();

export const { useStore, useStoreActions, useStoreDispatch } = typedHooks;

export const useStoreState = <Result>(
    a: (state: State<TRootStore>) => Result,
    b?: any
) => typedHooks.useStoreState(a, b || isEqual);
