const formatPhoneNumber = (phoneNumber: string, countryCode: string) => {
  let number = phoneNumber.slice(countryCode.length - 1);

  number = number.split('').map((el, i) => {
    switch (i) {
      case 0:
        return `(${el}`;
      case number.length < 10 ? 1 : 2 :
        return `${el}${number[i + 1] ? ') ' : ''}`;
      case number.length < 10 ? 4 : 5:
        return `${el}${number[i + 1] ? '-' : ''}`;
      default:
        return el;
    }
  }).join('');

  return `${countryCode} ${number}`;
};

export default formatPhoneNumber;
