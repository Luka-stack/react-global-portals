import { portal } from '../../../../src';
import { Modal } from '../components/modal';

function sendText(text: string, autoClose: boolean = false) {
  if (autoClose) {
    portal.show(<Modal text={text} hasAction={false} />, { timeout: 3000 });
  } else {
    portal.show(<Modal text={text} hasAction />);
  }
}

function important(text: string) {
  portal.forceShow(<Modal text={text} hasAction />, {
    timeout: 3000,
    pauseOnFocusLoss: true,
  });
}

// @ts-ignore
window.externalEvent = {
  sendText,
  important,
};
