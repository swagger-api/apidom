(element) => {
  if (element && (0, _apidom.isObjectElement)(element) && element.element === 'info') {
    if (!element.get('description')) {
      return false;
    }
  }

  return true;
}

