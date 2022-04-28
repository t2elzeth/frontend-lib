export function formatFullName({name, surname, middleName}) {
  let userName = surname;

  if (name != null) {
    userName += " " + name;
  }

  if (middleName !== null) {
    userName += " " + middleName;
  }

  return userName;
}

export function formatDate(value) {
  if (typeof (value) === "undefined" || value == null)
    return "";

  return new Date(value).toLocaleDateString("ru-RU");
}

export function formatDateTime(value) {
  if (typeof (value) === "undefined" || value == null)
    return "";

  return new Date(value).toLocaleString("ru-RU").replace(",", "");
}