// 日期限制，
export function disabledDate (current, start, end) {
	if (!current) return
	const e = new Date(end || '9999-12-31 00:00:00')
	const s = new Date(start || '2017-12-31 23:59:59')
	const value = current.valueOf()
	return value > e.valueOf() || value < s.valueOf()
}
