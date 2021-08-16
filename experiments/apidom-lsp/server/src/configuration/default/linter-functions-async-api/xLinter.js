(element) => {
  if (element && _apidom.isObjectElement(element) && element.element === 'contact') {
    if (!element.get('x-smartbear-team')) {
      return false;
    }
  }
  return true;
}
