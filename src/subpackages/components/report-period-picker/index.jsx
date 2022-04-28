import React, {useState, useEffect} from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

import DatePicker from "@/subpackages/components/date-picker";
import {pickModes, getPickModeName} from "@/subpackages/components/report-period-picker/constants";
import dateRangeFilter from "@/subpackages/constants/dateRangeFilter";
import stateHelper from "@/subpackages/components/report-period-picker/stateHelper";

export default function ReportPeriodPicker({id, onChange}) {
  const [state, setState] = useState(stateHelper.initialState());

  const {
    pickMode,
    exactDate,
    startDate,
    endDate
  } = state;

  useEffect(() => {
    switch (pickMode) {
      case pickModes.TODAY:
        onChange(dateRangeFilter.today());
        break;

      case pickModes.YESTERDAY:
        onChange(dateRangeFilter.yesterday());
        break;

      case pickModes.EXACT_DATE:
        onChange(dateRangeFilter.exactDate(exactDate));
        break;

      case pickModes.DATE_RANGE:
        onChange(dateRangeFilter.dateRange(startDate, endDate));
        break;
    }
  }, [pickMode, exactDate, startDate, endDate]);

  function handlePickModeChange(pickedMode) {
    return () => {
      setState(stateHelper.setPickMode(pickedMode));
    };
  }

  function handleExactDateChange(pickedExactDate) {
    pickedExactDate = new Date(pickedExactDate);
    setState(stateHelper.setExactDate(pickedExactDate));
  }

  function handleStartDateChange(pickedStartDate) {
    pickedStartDate = new Date(pickedStartDate);
    setState(stateHelper.setStartDate(pickedStartDate));
  }

  function handleEndDateChange(pickedEndDate) {
    pickedEndDate = new Date(pickedEndDate);
    setState(stateHelper.setEndDate(pickedEndDate));
  }

  return (
    <Row>
      <Col lg={3}>
        <DropdownButton style={{width: 100 + "%"}} id={id} title={getPickModeName(pickMode)}>
          <Dropdown.Item active={pickMode === pickModes.TODAY}
                         onClick={handlePickModeChange(pickModes.TODAY)}>На сегодня</Dropdown.Item>
          <Dropdown.Item active={pickMode === pickModes.YESTERDAY}
                         onClick={handlePickModeChange(pickModes.YESTERDAY)}>За
            вчера</Dropdown.Item>
          <Dropdown.Item active={pickMode === pickModes.EXACT_DATE}
                         onClick={handlePickModeChange(pickModes.EXACT_DATE)}>На дату</Dropdown.Item>
          <Dropdown.Item active={pickMode === pickModes.DATE_RANGE}
                         onClick={handlePickModeChange(pickModes.DATE_RANGE)}>За период</Dropdown.Item>
        </DropdownButton>
      </Col>
      {
        pickMode === pickModes.EXACT_DATE &&
        <Col lg={3}>
          <DatePicker value={exactDate}
                      timeFormat={false}
                      onChange={handleExactDateChange}/>
        </Col>
      }

      {
        pickMode === pickModes.DATE_RANGE &&
        <Col lg={8}>
          <Row>
            <Col>
              <DatePicker value={startDate} onChange={handleStartDateChange}/>
            </Col>
            <Col>
              <DatePicker value={endDate} onChange={handleEndDateChange}/>
            </Col>
          </Row>
        </Col>
      }
    </Row>
  );
}