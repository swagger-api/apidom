(element) => {
  if (element && (0, _apidom.isStringElement)(element)) {
    const re = /"/gi;

    if (String(element.toValue()).replace(re, '').match(/^[A-Z]*$/)) {
      return false;
    }
  }

  return true;
}

