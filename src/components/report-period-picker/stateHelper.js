import {pickModes} from "@/components/report-period-picker/constants";
import {now, yesterday, startOfDay, endOfDay} from "@/utils/dateUtils";

function initialState() {
  return {
    pickMode: pickModes.TODAY,
    exactDate: startOfDay(now()),
    startDate: startOfDay(yesterday()),
    endDate: endOfDay(now())
  };
}


function setPickMode(pickedMode) {
  return (prevState) => {
    return {
      ...prevState,
      pickMode: pickedMode
    };
  };
}

function setExactDate(exactDate) {
  return (prevState) => {
    return {
      ...prevState,
      exactDate: exactDate
    };
  };
}

function setStartDate(startDate) {
  return (prevState) => {
    return {
      ...prevState,
      startDate: startDate
    };
  };
}

function setEndDate(endDate) {
  return (prevState) => {
    return {
      ...prevState,
      endDate: endDate
    };
  };
}

export default {
  initialState,
  setPickMode,
  setExactDate,
  setStartDate,
  setEndDate
};