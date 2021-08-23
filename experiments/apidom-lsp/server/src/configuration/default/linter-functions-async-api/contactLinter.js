(element) => {
  if (element && _apidom.isObjectElement(element) && element.element === 'contact') {
    if (!element.get('name')) {
      return false;
    }
  }
  return true;
}
