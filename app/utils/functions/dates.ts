import moment from "moment";

export function getDateRange(
  referenceDate: Date,
  startOffset: number,
  unit: moment.unitOfTime.DurationConstructor
): [Date, Date] {
  const startDate = moment(referenceDate)
    .subtract(startOffset, unit)
    .startOf("day")
    .toDate();
  const endDate = moment(referenceDate).endOf("day").toDate();
  return [startDate, endDate];
}

export function getLastWeekDateRange() {
  return getDateRange(new Date(), 6, "days");
}
