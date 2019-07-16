import React, { Component, forwardRef } from 'react'
import { DatePicker } from 'antd'
import { disabledDate } from '@utils'
import moment from 'moment'

const config = {
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'YYYY-MM-DD hh:mm:ss',
  _moment: moment(),
}

// 默认2017-12-31 23:59:59到'9999-12-31 00:00:00
function DatePickerLimit(props, ref) {
  const { showTime, start, end, now, ...restProps } = props
  const _format = showTime ? config.timeFormat : config.dateFormat
  let _start = start
  if (now) {
    _start = config._moment.format(_format)
  }
  const _end = end
  return (
    <div ref={ref}>
      <DatePicker
        disabledDate={
          current => disabledDate(current, _start, _end)
        }
        {...props}
      />
    </div>
  )
}

export default {
  DatePickerLimit: forwardRef(DatePickerLimit),
}
