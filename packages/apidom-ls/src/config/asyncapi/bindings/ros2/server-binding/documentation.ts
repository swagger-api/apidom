const documentation = [
  {
    target: 'rmwImplementation',
    docs: 'Specifies the ROS 2 middleware implementation to be used. Valid values include the different [ROS 2 middleware vendors (RMW)](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Different-Middleware-Vendors.html) like `rmw_fastrtps_cpp` (Fast DDS) or `rmw_zenoh_cpp` (Zenoh). This determines the underlying middleware implementation that handles communication.',
  },
  {
    target: 'domainId',
    docs: 'All ROS 2 nodes use domain ID 0 by default. To prevent interference between different groups of computers running ROS 2 on the same network, a group can be set with a unique domain ID. [Must be a non-negative integer less than 232](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Domain-ID.html).',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: '### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#server-binding-object)\n\nThis object contains information about the server representation in ROS 2.\nROS 2 can use a vast variety of [middleware implementations](https://docs.ros.org/en/jazzy/Installation/RMW-Implementations.html). This document focuses on DDS and Zenoh middleware implementations.\nDDS-based ROS 2 implementations are per default decentralized with no central server, so the field `host` can be set to `none`.\nFor more information on DDS tuning, you can visit the [DDS Tuning Guide](https://docs.ros.org/en/jazzy/How-To-Guides/DDS-tuning.html).\nWhen using Zenoh, the `host` field specifies the Zenoh Router IP address.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`rmwImplementation` | string | Specifies the ROS 2 middleware implementation to be used. Valid values include the different [ROS 2 middleware vendors (RMW)](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Different-Middleware-Vendors.html) like `rmw_fastrtps_cpp` (Fast DDS) or `rmw_zenoh_cpp` (Zenoh). This determines the underlying middleware implementation that handles communication.\n`domainId` | integer | All ROS 2 nodes use domain ID 0 by default. To prevent interference between different groups of computers running ROS 2 on the same network, a group can be set with a unique domain ID. [Must be a non-negative integer less than 232](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Domain-ID.html).\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\n##### Example\n\n\\\nYAML\n```yaml\nservers:\n  ros2:\n    host: none\n    protocol: ros2\n    protocolVersion: humble\n    bindings:\n      ros2:\n        rmwImplementation: rmw_fastrtps_cpp\n        domainId: 0\n```',
  },
];

export default documentation;
