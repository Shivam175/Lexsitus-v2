import { action, type Action, thunk, type Thunk } from "easy-peasy";
import { type TRootStore } from "..";
import { AppModel } from "Models/App";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TAppConstants {}

export interface TAppState {
    appConstants?: TAppConstants;
    setAppConstants: Action<TAppState, TAppConstants>;
    getAppConstants: Thunk<TAppState, void, undefined, TRootStore>;
}

export const AppStore: TAppState = {
    appConstants: undefined,
    setAppConstants: action((state, payload) => {
        state.appConstants = payload;
    }),
    getAppConstants: thunk(async (actions) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const appConstants = await AppModel.getAppConstants();
        actions.setAppConstants(appConstants);
    }),
};

export default AppStore;
