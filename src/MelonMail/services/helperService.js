import { generateKeys, encrypt } from './cryptoService';

export const executeWhenReady = (f) => {
  if (document.readyState === 'complete') {
    f();
  } else {
    window.addEventListener('load', () => { f(); });
  }
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}. 
    ${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
};

export const welcomeEmail = (to, username, signedString) => {
  const keys = generateKeys(signedString);
  const encryptedData = encrypt(keys, JSON.stringify({
    from: 'noreply@melonmail.eth',
    to: username,
    subject: 'Welcome to Melon Mail',
    body: '<h1>Welcome</h1><p>To get started try sending an email!</p>',
    time: new Date().toString(),
    attachments: [],
  }));

  return {
    toAddress: to,
    senderData: encryptedData,
    receiverData: encryptedData,
  };
};
