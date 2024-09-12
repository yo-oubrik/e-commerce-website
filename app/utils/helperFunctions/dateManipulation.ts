import moment from "moment";

export function getDateRange(
  startOffset: number,
  unit: moment.unitOfTime.DurationConstructor = "days",
  referenceDate: moment.Moment = moment()
) {
  const startDate = moment(referenceDate)
    .subtract(startOffset, unit)
    .startOf("day");
  const endDate = moment(referenceDate).endOf("day");
  return [startDate, endDate];
}

export function getLastWeekDateRange() {
  return getDateRange(7);
}
