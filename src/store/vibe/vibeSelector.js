import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.vibe.loading;
const selectVibes = (state) => state.vibe.vibes;
const selectVibeDetail = (state) => state.vibe.vibeDetail;

const selectVibeData = createSelector(

    [selectLoading, selectVibes, selectVibeDetail],
    (loading, vibes, vibeDetail) => ({ loading, vibes, vibeDetail })

);
export default selectVibeData;