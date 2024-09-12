import moment from "moment";

export function getDateRange(
  startOffset: number,
  unit: moment.unitOfTime.DurationConstructor = "days",
  referenceDate: Date = new Date()
): [Date, Date] {
  const referenceMoment = moment(referenceDate);
  const startDate = referenceMoment
    .subtract(startOffset, unit)
    .startOf("day")
    .toDate();
  const endDate = referenceMoment.endOf("day").toDate();
  return [startDate, endDate];
}

export function getLastWeekDateRange() {
  return getDateRange(7);
}
