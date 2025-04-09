import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.profiles.loading;
const selectProfileDetail = (state) => state.profiles.profileDetail;


const selectProfileData = createSelector(
    [
        selectLoading, selectProfileDetail],
    (loading, profileDetail) => ({loading, profileDetail})
);

export default selectProfileData;