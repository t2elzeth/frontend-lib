import Swal from "sweetalert2";

async function success(message) {
  await Swal.fire({
    icon: "success",
    title: message
  });
}

async function error(message) {
  await Swal.fire({
    icon: "error",
    title: "Что-то пошло не так",
    text: message
  });
}

async function warning(message) {
  await Swal.fire({
    html: message,
    icon: "warning",
    title: "Обратите внимание!",
  });
}

export default {
  success: success,
  error: error,
  warning: warning
};