import { RootState } from "@/utils/libs/store";

export const authtState = (state: RootState) => {
    return state?.auth;
};
