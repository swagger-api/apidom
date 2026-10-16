const documentation = [
  {
    target: 'role',
    docs: 'Specifies the ROS 2 type of the node for this operation. If the action is `send`, valid values for the role are: `publisher`, `action_client`, `service_client`. If the action is `receive`, valid values for the role are: `subscriber`, `action_server`, `service_server`. This defines how the node will interact with the associated topic, service or action.',
  },
  {
    target: 'node',
    docs: 'The name of the ROS 2 node that implements this operation.',
  },
  {
    target: 'qosPolicies',
    docs: '[Quality of Service Policy Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#quality-of-service-object)\n\\\n\\\nQuality of Service (QoS) for the topic.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: '### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#operation-binding-object)\n\nThis object contains information about the ROS 2 node.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`role` | string | Specifies the ROS 2 type of the node for this operation. If the action is `send`, valid values for the role are: `publisher`, `action_client`, `service_client`. If the action is `receive`, valid values for the role are: `subscriber`, `action_server`, `service_server`. This defines how the node will interact with the associated topic, service or action.\n`node` | string | The name of the ROS 2 node that implements this operation.\n`qosPolicies` | [Quality of Service Policy Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#quality-of-service-object) | Quality of Service (QoS) for the topic.\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\n### [Quality of Service Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#quality-of-service-object)\nThis object contains ROS 2 specific information about the Quality of Service policies.\nMore information here: https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies\n\nField Name | Type | Description\n---|:---:|---\n`reliability` | string | One of `best_effort` or `reliable`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)\n`history` | string | One of `keep_last`, `keep_all` or `unknown`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)\n`durability` | string | One of `transient_local` or `volatile`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)\n`lifespan` | integer | The maximum amount of time between the publishing and the reception of a message without the message being considered stale or expired. `-1` means infinite.\n`deadline` | integer | The expected maximum amount of time between subsequent messages being published to a topic. `-1` means infinite.\n`liveliness` | string | One of `automatic` or `manual`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)\n`leaseDuration` | integer | The maximum period of time a publisher has to indicate that it is alive before the system considers it to have lost liveliness. `-1` means infinite.\n\n##### Example\n\n\\\nYAML\n```yaml\nreceiveCmdVel:\n  action: receive\n  channel:\n    $ref: "#/channels/CmdVel"\n  bindings:\n    ros2:\n      role: subscriber\n      node: /turtlesim\n      qosPolicies:\n        history: unknown\n        reliability: reliable\n        durability: volatile\n        lifespan: -1\n        deadline: -1\n        liveliness: automatic\n        leaseDuration: -1\n```',
  },
];

export default documentation;
