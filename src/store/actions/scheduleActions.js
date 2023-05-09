import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import ScheduleService from "../../services/scheduleService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const currentMonthPending = createAsyncThunk(
  "currentMonth/pending",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    const { page, currentMonth } = data;
    try {
      const res = await ScheduleService.getPendingSchedule(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyPendingSchedules = createAsyncThunk(
  "currentMonth/pending",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ScheduleService.getCompanyPendingSchedules();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const currentMonthAccepted = createAsyncThunk(
  "currentMonth/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getAcceptedSchedule(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyAcceptedSchedule = createAsyncThunk(
  "currentMonth/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getCompanyAcceptedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const currentMonthCompleted = createAsyncThunk(
  "currentMonth/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getCompletedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const getCompanyCompletedSchedule = createAsyncThunk(
  "currentMonth/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, scheduleApproval } = data;
      const res = await ScheduleService.getCompanyCompletedSchedule(
        page,
        currentMonth,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const currentMonthCancelled = createAsyncThunk(
  "currentMonth/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getCancelledSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyCancelledSchedule = createAsyncThunk(
  "currentMonth/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getCompanyCancelledSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const currentMonthMissed = createAsyncThunk(
  "currentMonth/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getMissedSchedule(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyMissedSchedule = createAsyncThunk(
  "currentMonth/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.getCompanyMissedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

/****************************
 *
 * filter Actions
 *
 ****************************/
export const filterPending = createAsyncThunk(
  "filter/pending",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterPendingSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterAccepted = createAsyncThunk(
  "filter/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterAcceptedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyAccepted = createAsyncThunk(
  "company filter/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCompanyAcceptedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCompleted = createAsyncThunk(
  "filter/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCompletedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyCompleted = createAsyncThunk(
  "company filter/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCompanyCompletedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCancelled = createAsyncThunk(
  "filter/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCancelledSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyCancelled = createAsyncThunk(
  "company filter/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCompanyCancelledSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterMissed = createAsyncThunk(
  "filter/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterMissedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyMissed = createAsyncThunk(
  "company filter/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await ScheduleService.filterCompanyMissedSchedule(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

/****************************
 *
 * search Actions
 *
 ****************************/
export const searchPending = createAsyncThunk(
  "search/pending",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await ScheduleService.searchPendingSchedule(
        searchQuery,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchAccepted = createAsyncThunk(
  "search/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await ScheduleService.searchAcceptedSchedule(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyAccepted = createAsyncThunk(
  "search company/accepted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await ScheduleService.searchCompanyAcceptedSchedule(
        page,
        key
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

// export const searchCompleted = createAsyncThunk(
//   "search/completed",
//   async (data, { dispatch }) => {
//     dispatch(startLoad());
//     try {
//       const { searchQuery, page } = data;
//       const res = await ScheduleService.searchCompletedSchedule(
//         searchQuery,
//         page
//       );
//       return res;
//     } catch (err) {
//       handleError(err, dispatch);
//     } finally {
//       // stop loading eventually
//       dispatch(stopLoad());
//     }
//   }
// );

export const searchCompleted = createAsyncThunk(
  "search/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await ScheduleService.searchCompletedSchedule(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyCompleted = createAsyncThunk(
  "search/companycompleted",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await ScheduleService.searchCompanyCompletedSchedule(
        page,
        key
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

// export const searchCancelled = createAsyncThunk(
//   "search/cancelled",
//   async (data, { dispatch }) => {
//     dispatch(startLoad());
//     try {
//       // const res = await ScheduleService.searchCancelledSchedule(data);

//       const { searchQuery, page } = data;
//       const res = await ScheduleService.searchCancelledSchedule(
//         searchQuery,
//         page
//       );
//       return res;
//     } catch (err) {
//       handleError(err, dispatch);
//     } finally {
//       // stop loading eventually
//       dispatch(stopLoad());
//     }
//   }
// );

export const searchCancelled = createAsyncThunk(
  "search/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      // const res = await ScheduleService.searchCancelledSchedule(data);

      const { key, page } = data;
      const res = await ScheduleService.searchCancelledSchedule(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyCancelled = createAsyncThunk(
  "search/cancelled",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await ScheduleService.searchCompanyCancelledSchedule(
        page,
        key
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchMissed = createAsyncThunk(
  "search/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await ScheduleService.searchMissedSchedule(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyMissed = createAsyncThunk(
  "search/missed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await ScheduleService.searchCompanyMissedSchedule(page, key);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const approvedCompletedSchedues = createAsyncThunk(
  "approve/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ScheduleService.approveCompletedSchedules(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const rejectCompletedSchedules = createAsyncThunk(
  "approve/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ScheduleService.rejectCompletedSchedules(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyApprovedCompletedSchedule = createAsyncThunk(
  "get-approved/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, scheduleApproval } = data;
      const res = await ScheduleService.getCompanyApproveCompletedSchedule(
        page,
        currentMonth,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyApprovedCompletedSchedule = createAsyncThunk(
  "search-approved/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, scheduleApproval } = data;
      const res = await ScheduleService.searchCompanyApproveCompletedSchedule(
        key,
        page,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyApprovedCompletedSchedule = createAsyncThunk(
  "get-approved/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, scheduleApproval } = data;
      const res = await ScheduleService.filterCompanyApproveCompletedSchedule(
        page,
        currentMonth,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyRejectedCompletedSchedule = createAsyncThunk(
  "get-rejected/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, scheduleApproval } = data;
      const res = await ScheduleService.getCompanyRejectCompletedSchedule(
        page,
        currentMonth,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyRejectedCompletedSchedule = createAsyncThunk(
  "filter-rejected/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, scheduleApproval } = data;
      const res = await ScheduleService.filterCompanyRejectCompletedSchedule(
        page,
        currentMonth,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyRejectedCompletedSchedule = createAsyncThunk(
  "search-rejected/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, scheduleApproval } = data;
      const res = await ScheduleService.searchCompanyRejectCompletedSchedule(
        key,
        page,
        scheduleApproval
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
