import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GeneratorMenuDropdown extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clients: [],
      servers: [],
      specVersion: '',
    };
  }

  componentDidMount() {
    this.instantiateGeneratorClient();
  }

  componentDidUpdate() {
    this.shouldReInstantiateGeneratorClient();
  }

  instantiateGeneratorClient = async () => {
    const { topbarActions } = this.props;

    const instantiate = await topbarActions.instantiateGeneratorClient();
    if (instantiate && instantiate.error) {
      // probably should not display error
      return;
    }
    if (instantiate) {
      this.setState({
        clients: instantiate.clients,
        servers: instantiate.servers,
        specVersion: instantiate.specVersion,
      });
    }
  };

  shouldReInstantiateGeneratorClient = () => {
    // for live e2e test: oas3 will NOT include 'ada-server' as a list item
    const { topbarActions } = this.props;
    const { specVersion } = this.state;
    const shouldReinstantiate = topbarActions.shouldReInstantiateGeneratorClient({ specVersion });
    // expect shouldReinstantiate to be boolean
    if (shouldReinstantiate) {
      this.instantiateGeneratorClient();
    }
  };

  handleDownloadGeneratedFileClick = async ({ type, name }) => {
    const { topbarActions } = this.props;
    const downloadData = await topbarActions.downloadGeneratedFile({
      type,
      name,
    });
    if (downloadData.error) {
      // may display the error message
    }
  };

  render() {
    const { servers, clients } = this.state;
    const { getComponent } = this.props;

    const DropdownMenu = getComponent('DropdownMenu');
    const DropdownItem = getComponent('DropdownItem');
    const shouldDisplayGeneratorLists = servers.length > 0 && clients.length > 0;

    return !shouldDisplayGeneratorLists ? null : (
      <div className="topbar-sub-group">
        <DropdownMenu displayName="Generate Server">
          {servers.map((server, i) => (
            <DropdownItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={() =>
                this.handleDownloadGeneratedFileClick({ type: 'server', name: `${server}` })
              }
              name={server}
            />
          ))}
        </DropdownMenu>
        <DropdownMenu displayName="Generate Client">
          {clients.map((client, i) => (
            <DropdownItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={() =>
                this.handleDownloadGeneratedFileClick({ type: 'client', name: `${client}` })
              }
              name={client}
            />
          ))}
        </DropdownMenu>
      </div>
    );
  }
}

GeneratorMenuDropdown.propTypes = {
  topbarActions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getComponent: PropTypes.func.isRequired,
};
