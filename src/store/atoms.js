import { atom } from 'recoil';

// Contact form state
export const contactFormState = atom({
  key: 'contactFormState',
  default: {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  }
});

// Selected service state
export const selectedServiceState = atom({
  key: 'selectedServiceState',
  default: null
});
