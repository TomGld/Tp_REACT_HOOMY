import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.vibes.loading;
const selectVibes = (state) => state.vibes.vibes;


const selectVibeData = createSelector(

    [selectLoading, selectVibes],
    (loading, vibes) => ({ loading, vibes })

);
export default selectVibeData;