import {
  now,
  startOfDay,
  yesterday as getYesterday
} from "@/utils/dateUtils";

export const dateRangeTypes = {
  Exact: "exact",
  Range: "range"
};

function today() {
  return function () {
    return {
      dateRangeType: dateRangeTypes.Exact,
      date: startOfDay(now()).toJSON()
    };
  };
}

function yesterday() {
  return function () {
    return {
      dateRangeType: dateRangeTypes.Exact,
      date: getYesterday().toJSON()
    };
  };
}

function exactDate(exactDate) {
  return function () {
    return {
      dateRangeType: dateRangeTypes.Exact,
      date: startOfDay(exactDate).toJSON()
    };
  };
}

function dateRange(startDate, endDate) {
  return function () {
    return {
      dateRangeType: dateRangeTypes.Range,
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON()
    };
  };
}

export default {
  today,
  yesterday,
  exactDate,
  dateRange
};