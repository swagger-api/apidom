import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function EditMenuDropdownHooks(props) {
  const { getComponent, topbarActions } = props;
  const [languageFormat, setLanguageFormat] = useState('json');

  useEffect(() => {
    // let isMounted = true;
    const getDefinitionLanguageFormat = async () => {
      const result = await topbarActions.getDefinitionLanguageFormat();
      if (result.languageFormat) {
        setLanguageFormat(result.languageFormat);
      }
    };
    // call the async/await function
    getDefinitionLanguageFormat();
    // cleanup on unmount
    // return () => {
    //   isMounted = false;
    // };
  }, [languageFormat, topbarActions]);

  useEffect(() => {
    const shouldUpdateDefinitionLanguageFormat = async () => {
      const result = await topbarActions.shouldUpdateDefinitionLanguageFormat({
        languageFormat,
      });
      if (result.shouldUpdate && result.languageFormat !== languageFormat) {
        setLanguageFormat(result.languageFormat);
      }
    };
    // call the async/await function
    shouldUpdateDefinitionLanguageFormat();
  });

  const [allowConvertDefinitionToOas3, setAllowConvertDefinitionToOas3] = useState(false);
  useEffect(() => {
    const checkAllowConvertDefinitionToOas3 = async () => {
      const bool = await topbarActions.allowConvertDefinitionToOas3();
      if (bool !== allowConvertDefinitionToOas3) {
        setAllowConvertDefinitionToOas3(bool);
      }
    };
    checkAllowConvertDefinitionToOas3();
  });

  const onConvertToYamlClick = () => {
    async function convertToYaml() {
      const convertedResult = await topbarActions.convertToYaml();
      if (convertedResult && convertedResult.error) {
        // display the error message
      }
    }
    // call the async/await function
    convertToYaml();
  };

  const onConvertToOas3Click = () => {
    async function convertDefinitionToOas3() {
      const convertedResult = await topbarActions.convertDefinitionToOas3();
      if (convertedResult && convertedResult.error) {
        // display the error message
      }
    }
    // call the async/await function
    convertDefinitionToOas3();
  };

  const onClearEditorClick = () => {
    // ref legacy method: clearEditor
    async function clearEditor() {
      // note: in actions, we detect the spec language in order to "clear" with a minimal supported spec
      const clearResult = await topbarActions.clearEditor();
      if (clearResult && clearResult.error) {
        // should not occur
        // display the error message
      }
    }
    clearEditor();
  };

  const onLoadDefaultDefinition = (language) => {
    async function loadDefaultDefinition() {
      const loadResult = await topbarActions.loadDefaultDefinition(language);
      if (loadResult && loadResult.error) {
        // display the error message
      }
    }
    // call the async/await function
    loadDefaultDefinition(language);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.code) {
        case 'F8':
          onLoadDefaultDefinition('oas3');
          break;
        case 'F7':
          onLoadDefaultDefinition('asyncapi2');
          break;
        case 'F6':
          onLoadDefaultDefinition('oas3_1');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown, true);
    // cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
    };
  });

  const DropdownMenu = getComponent('DropdownMenu');
  const DropdownItem = getComponent('DropdownItem');

  return (
    <DropdownMenu displayName="hook">
      <DropdownItem onClick={() => onClearEditorClick()} name="Clear Editor" />
      <li role="separator" />
      {languageFormat !== 'yaml' ? (
        <DropdownItem onClick={() => onConvertToYamlClick()} name="Convert To YAML" />
      ) : null}
      {allowConvertDefinitionToOas3 ? (
        <DropdownItem onClick={() => onConvertToOas3Click()} name="Convert To OpenAPI 3" />
      ) : null}
      {languageFormat !== 'yaml' || allowConvertDefinitionToOas3 ? <li role="separator" /> : null}
      <DropdownItem onClick={() => onLoadDefaultDefinition('oas3')} name="Load Default OAS3.0" />
      <DropdownItem onClick={() => onLoadDefaultDefinition('oas3_1')} name="Load Default OAS3.1" />
      <DropdownItem onClick={() => onLoadDefaultDefinition('oas2')} name="Load Default OAS2.0" />
      <DropdownItem
        onClick={() => onLoadDefaultDefinition('asyncapi2')}
        name="Load Default AsyncAPI 2.0"
      />
    </DropdownMenu>
  );
}

EditMenuDropdownHooks.propTypes = {
  getComponent: PropTypes.func.isRequired,
  topbarActions: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
