import { createSelector } from "@reduxjs/toolkit";


const selectLoading = (state) => state.settingdata.loading;
const selectSettingDatas = (state) => state.settingdata.settingDatas;
const selectSettingDataDetail = (state) => state.settingdata.settingDataDetail;

const selectSettingDataData = createSelector(

    [selectLoading, selectSettingDatas, selectSettingDataDetail],
    (loading, settingDatas, settingDataDetail) => ({ loading, settingDatas, settingDataDetail })

);
export default selectSettingDataData;    