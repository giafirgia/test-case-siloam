interface ResponseProps {
  status: string;
  message?: string;
}

const RESPONSE_STATUS = {
  'ERROR': 'Failed to process request. Please <b>Call Support Administrator</b>.',
}

export const INIT_POPUP_STATE = () => {
  let popup = (localStorage.getItem('popupState') === null) ? false : localStorage.getItem('popupState') === 'true';
  localStorage.setItem('popupState', popup.toString());
}

export const SET_POPUP_STATE = (state: boolean) => {
  localStorage.setItem('popupState', state.toString());
}

export const GET_POPUP_STATE = () => {
  INIT_POPUP_STATE();
  const popup = localStorage.getItem('popupState');
  return popup === 'true';
}

const validateErrorMsg = ({status, message}: ResponseProps) => {
  let msgHtml = ""
  if (status === 'ERROR') {
    msgHtml = message ? message : RESPONSE_STATUS[status]
  } else {
    msgHtml = 'Something went wrong...'
  }
  return msgHtml
}

export const SET_SWAL_OPTION = ({status, message}: ResponseProps) => {
    return {
      imageHeight: 200,
      html: validateErrorMsg({status, message}),
      confirmButtonColor: 'bg-indigo-500 text-indigo-500-foreground hover:bg-indigo-500/90',
      confirmButtonText: 'Close',
      allowOutsideClick: false,
      allowEscapeKey: false,
      // customClass: {
      //   confirmButton: "btn btn-block",
      // },
    }
  }