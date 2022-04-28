export const pickModes = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  EXACT_DATE: "date",
  DATE_RANGE: "range"
};

export function getPickModeName(pickMode) {
  switch (pickMode) {
    case pickModes.TODAY:
      return "На сегодня";
    case pickModes.YESTERDAY:
      return "За вчера";
    case pickModes.EXACT_DATE:
      return "На дату";
    case pickModes.DATE_RANGE:
      return "За период";
    default:
      console.error(`Unexpected report period pick mode "${pickMode}"`);
  }
}