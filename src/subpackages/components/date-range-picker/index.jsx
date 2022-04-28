import React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "@/subpackages/components/date-picker";
import {Form} from "react-bootstrap";

export default function DateRangePicker({dateRange, setDateRange}) {
  const onPickStartDate = (pickedStartDate) => {
    setDateRange(oldState => ({
      ...oldState,
      startDate: new Date(pickedStartDate)
    }));
  };

  const onPickEndDate = (pickedEndDate) => {
    setDateRange(oldState => ({
      ...oldState,
      endDate: new Date(pickedEndDate)
    }));
  };

  return (
    <Row>
      <Form.Label column sm={1}>
        с:
      </Form.Label>
      <Col sm={5}>
        <DatePicker value={dateRange.startDate}
                    timeFormat={true}
                    onChange={onPickStartDate}/>
      </Col>
      <Form.Label column sm={1}>
        по:
      </Form.Label>
      <Col sm={5}>
        <DatePicker value={dateRange.endDate}
                    timeFormat={true}
                    onChange={onPickEndDate}/>
      </Col>
    </Row>
  );
}

DateRangePicker.propTypes = {
  dateRange: PropTypes.object,
  setDateRange: PropTypes.func.isRequired,
};