/* eslint-disable react/no-array-index-key */
/* note for above disable of react/no-array-index-key,
 * using something lilke server.id then causes a React error
 * Warning: Each child in a list should have a unique "key" prop.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/logo_small.svg';
// import FileMenuDropdown from './topbar-file-menu'; // this works to, but then not available as getComponent
// import DropdownMenu from './topbar-dropdown/DropdownMenu'; // this works to, but then not available as getComponent
// import DropdownMenuItem from './topbar-dropdown/DropdownMenuItem'; // this works to, but then not available as getComponent

export default class Topbar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clients: [],
      servers: [],
    };
    this.onDownloadGeneratedFileClick = this.onDownloadGeneratedFileClick.bind(this);
  }

  componentDidMount() {
    this.instantiateGeneratorClient();
  }

  componentDidUpdate() {
    this.shouldReInstantiateGeneratorClient();
  }

  instantiateGeneratorClient = async () => {
    // call to topbarActions.instantiateGeneratorClient
    // which will set a redux state
    const { topbarActions } = this.props;

    const instantiate = await topbarActions.instantiateGeneratorClient();
    // console.log('result.instantiate', instantiate);
    if (instantiate.error) {
      // probably should not display error
      return;
    }
    // intended as temporary setState
    this.setState({
      clients: instantiate.clients,
      servers: instantiate.servers,
    });
  };

  shouldReInstantiateGeneratorClient = () => {
    // call to topbarActions.shouldReInstantiateGeneratorClient
    // which will return boolean to this.instantiateGeneratorClient or not
    const { topbarActions } = this.props;
    const shouldReinstantiate = topbarActions.shouldReInstantiateGeneratorClient();
    if (shouldReinstantiate) {
      this.instantiateGeneratorClient();
    }
  };

  onDownloadGeneratedFileClick = async ({ type, name }) => {
    // console.log('we clicked on name:', name, ' of type:', type);
    // old methods to refactor:
    // downloadGeneratedFile
    // handleResponse
    // downloadFile -> reactFileDownload (lib)
    const { topbarActions, getConfigs } = this.props;
    // non-optimal. we need these params again to instantiate swagger-client,
    // just to retreive swagger-client.apis methods
    // clients:
    //   clientOptions: ƒ(parameters)
    //   downloadFile: ƒ(parameters)
    //   generateClient: ƒ(parameters)
    //   getClientOptions: ƒ(parameters)
    // servers:
    //   downloadFile: ƒ(parameters)
    //   generateServerForLanguage: ƒ(parameters)
    //   getServerOptions: ƒ(parameters)
    //   serverOptions: ƒ(parameters)
    // It would be better if we can access these methods directly from swagger-client
    const { swagger2GeneratorUrl, oas3GeneratorUrl } = getConfigs();

    const downloadData = await topbarActions.downloadGeneratedFile({
      type,
      name,
      swagger2GeneratorUrl,
      oas3GeneratorUrl,
    });
    if (downloadData.error) {
      // display the error message
    }
  };

  render() {
    const { servers, clients } = this.state;
    const { getComponent, topbarActions } = this.props;
    // Link (to swagger) | each top-level DropdownMenu
    const Link = getComponent('Link'); // via swagger-ui
    const DropdownMenu = getComponent('DropdownMenu');
    const DropdownItem = getComponent('DropdownItem');
    const FileMenuDropdown = getComponent('FileMenuDropdown');
    const EditMenuDropdown = getComponent('EditMenuDropdown');

    return (
      <div className="swagger-editor-standalone">
        <div className="topbar">
          <div className="topbar-wrapper">
            <Link href="/">
              <img height="35" className="topbar-logo__img" src={Logo} alt="" />
            </Link>
            <FileMenuDropdown getComponent={getComponent} topbarActions={topbarActions} />
            <EditMenuDropdown getComponent={getComponent} topbarActions={topbarActions} />
            <DropdownMenu displayName="Generate Server">
              {servers.map((server, i) => (
                <DropdownItem
                  key={i}
                  onClick={() =>
                    this.onDownloadGeneratedFileClick({ type: 'server', name: `${server}` })
                  }
                  name={server}
                />
              ))}
            </DropdownMenu>
            <DropdownMenu displayName="Generate Client">
              {clients.map((client, i) => (
                <DropdownItem
                  key={i}
                  onClick={() =>
                    this.onDownloadGeneratedFileClick({ type: 'client', name: `${client}` })
                  }
                  name={client}
                />
              ))}
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  // specSelectors: PropTypes.object.isRequired,
  // errSelectors: PropTypes.object.isRequired,
  // specActions: PropTypes.object.isRequired,
  topbarActions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired,
  // servers: PropTypes.array,
  // clients: PropTypes.array,
};
