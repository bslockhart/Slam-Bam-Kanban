function showToast({ message }) {
  var toastBody = document.querySelector('.toast-body');
  toastBody.textContent = message;
  var toast = document.querySelector('#liveToast');
  var myToast = new bootstrap.Toast(toast, { autohide: true });
  myToast.show();
}