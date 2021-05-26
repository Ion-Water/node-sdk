interface SendMessageRequest {
  type: 'send';
  target: string;
  content_id: string;
  content: {
    // TODO: This can actually be anything, it's up to the client to understand it.
    // This is just a hardcoding of a hypothetical "message" type of content
    type: 'message';
    message: {
      subject: string;
      body: string;
    };
  };
  authorization: {
    basic: {
      username: string;
      password: string;
    };
  };
}
