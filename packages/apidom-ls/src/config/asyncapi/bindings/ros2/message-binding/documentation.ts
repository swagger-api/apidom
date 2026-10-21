const documentation = [
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#message-binding-object)\n\nWhile this object DOES NOT contain any ROS 2 specific properties, it is important to understand how to express the different [ROS 2 data types](https://design.ros2.org/articles/legacy_interface_definition.html) in AsyncAPI message types and formats.\n\nROS 2 Type | AsyncAPI Type | AsyncAPI Format\n---|:---:|---\nbool | boolean | boolean\nbyte | string | octet\nchar | integer | uint8\nfloat32 | number | float\nfloat64 | number | double\nint8 | integer | int8\nuint8 | integer | uint8\nint16 | integer | int16\nuint16 | integer | uint16\nint32 | integer | int32\nuint32 | integer | uint32\nint64 | integer | int64\nuint64 | integer | uint64\nstring | string | string\narray | array | --\n\nThe message header of the AsyncAPI specification does not map with the message header in ROS 2, so the AsyncAPI message header will be ignored. To define the header of a ROS 2 message, put it in the payload of the message.',
  },
];

export default documentation;
