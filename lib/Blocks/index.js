class Blocks {
  /**
   * Actions block
   * @param {Array<Object>} elements array of actions
   * @param {String} [blockId] optional block id
   * @return {{elements, type: string}}
   */
  actions({ elements, blockId }) {
    const element = {
      type: "actions",
      elements,
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Context block
   * @param {String|Array<String>} text text to display
   * @param {String} [blockId] optional block id
   * @return {{type: string}}
   */
  context({ text, blockId }) {
    const element = { type: "context" };
    if (blockId) {
      element.block_id = blockId;
    }
    if (typeof text === "string") {
      element.elements = [{ type: "mrkdwn", text }];
    } else if (Array.isArray(text)) {
      element.elements = text.map((t) => ({ type: "mrkdwn", text: t }));
    }
    return element;
  }

  /**
   * Divider block
   * @param {String} [blockId] optional block id
   * @return {{type: string}}
   */
  divider({ blockId } = {}) {
    const element = { type: "divider" };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Fields block
   * @param {Array<String>} fields field texts
   * @param {String} [blockId] optional block id
   * @return {{type: string, fields: *}}
   */
  fields({ fields, blockId }) {
    const element = {
      type: "section",
      fields: fields.map((f) => ({ type: "mrkdwn", text: f })),
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Header block
   * @param {String} [blockId] optional block id
   * @param {String} text header text to display
   * @return {{text: {text, type: string}, type: string}}
   */
  header({ blockId, text }) {
    const element = {
      type: "header",
      text: { type: "plain_text", text },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Image block
   * @param {String} url valid image url
   * @param {String} [alt] optional alt text to display if image is unavailable
   * @param {String} [blockId] optional block id
   * @return {{alt_text: string, image_url, type: string}}
   */
  image({ url, alt = "image", blockId }) {
    const element = {
      type: "image",
      image_url: url,
      alt_text: alt,
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Markdown text section block
   * @param {String} text markdown text
   * @param {String} [blockId] optional block id
   * @param {Array} [rest] optional extra fields to add to the markdown, like accessories.
   * @return {{text: {text, type: string}, type: string}}
   */
  markdown({ text, blockId, ...rest }) {
    let element = {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    if (rest) {
      element = { ...element, ...rest };
    }
    return element;
  }

  /**
   * Plain text section block
   * @param {String} text plain text
   * @param {String} [blockId] optional block id
   * @return {{text: {emoji: boolean, text, type: string}, type: string}}
   */
  plainText({ text, blockId }) {
    const element = {
      type: "section",
      text: {
        type: "plain_text",
        text,
        emoji: true,
      },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }
}

module.exports = new Blocks();
