class Accessory {
  /**
   * Accessory Button
   * @param {String} text Text to display on the button
   * @param {String|Object} value value to be stored in the button
   * @param {String} [actionId] optional action id
   * @param {('primary'|'danger')} [style] optional style for the accessory button
   * @param {String} [url] valid url to open when the button is pressed
   * @return {{accessory: {text: {emoji: boolean, text, type: string}, type: string, value: (string|string)}}}
   */
  button({ text, value, actionId, style, url }) {
    const element = {
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text,
          emoji: true,
        },
        value: typeof value === "string" ? value : JSON.stringify(value),
      },
    };
    if (actionId) {
      element.accessory.action_id = actionId;
    }
    if (style) {
      element.accessory.style = style;
    }
    if (url) {
      element.accessory.url = url;
    }
    return element;
  }

  /**
   * Accessory Static Select
   * @param {Array<{text: String, value: String}>} options array of options to be displayed. Cannot be more than 100.
   * @param {String} [initialOption] an initial option to be selected. Should match one of the values in the options array.
   * @param {String} [actionId] optional action id
   * @param {String} [placeholder] placeholder text to display when no option is selected. Defaults to "Pick an option"
   * @return {{accessory: {options: *, placeholder: {emoji: boolean, text: string, type: string}, type: string}}}
   */
  staticSelect({
    options,
    initialOption,
    actionId,
    placeholder = "Pick an option",
  }) {
    let initialOptionClone;
    const optionsClone = options.map((o) => ({
      text: { type: 'plain_text', text: o.text },
      value: o.value
    }));
    if(initialOption){
      initialOptionClone = optionsClone.find((o) => o.value === initialOption);
    }
    const element = {
      accessory: {
        type: "static_select",
        options: optionsClone,
        placeholder: {
          type: "plain_text",
          text: placeholder,
          emoji: true,
        },
      },
    };
    if (actionId) {
      element.accessory.action_id = actionId;
    }
    if (initialOptionClone) {
      element.accessory.initial_option = initialOptionClone
    }
    return element;
  }

  /**
   * Overflow accessory
   * @param {Array<{text:String, value:String}>} options list of items to show in the overflow menu
   * @param {String} [actionId] optional action id
   * @param {Object} [dialog] optional confirm object
   * @param {String} dialog.title title of the confirm dialog
   * @param {String} dialog.description description to show on the confirm dialog
   * @param {String} dialog.confirmText text of the confirm button
   * @param {String} dialog.cancelText text of the cancel button
   * @return {{accessory: {options: *, type: string}}}
   */
  overflow({ options, actionId, dialog = {} }) {
    const element = {
      accessory: {
        type: "overflow",
        options: options.map((o) => ({
          text: { type: "plain_text", text: o.text },
          value: o.value,
        })),
      },
    };
    if (actionId) {
      element.accessory.action_id = actionId;
    }
    if (Object.keys(dialog).length) {
      element.accessory.confirm = {
        title: { type: "plain_text", text: dialog.title },
        text: { type: "plain_text", text: dialog.description },
        confirm: { type: "plain_text", text: dialog.confirmText },
        deny: { type: "plain_text", text: dialog.cancelText },
      };
    }
    return element;
  }

  /**
   * Accessory image to show
   * @param {String} url valid image url
   * @param {String} [alt] alt text to show when the image is not available
   * @return {{accessory: {alt_text: string, image_url, type: string}}}
   */
  image({ url, alt = "image" }) {
    return {
      accessory: {
        type: "image",
        image_url: url,
        alt_text: alt,
      },
    };
  }

  /**
   * Accessory conversation select
   * @param {String} [initialConversation] slack channel id
   * @param {String} [actionId] optional action id
   * @param {Array<('public'|'private'|'im'|'mpim')>} filter list of conversation types to show
   * @param {String} [placeholder] placeholder text to display when no option is selected. Defaults to "Pick a channel"
   * @param {Boolean} [excludeBotUsers] exclude bot users from the list. Defaults to true
   * @param {Boolean} [excludeExternalSharedChannels] exclude external shared channels from the list. Defaults to true
   * @return {{accessory: {filter, placeholder: {emoji: boolean, text: string, type: string}, type: string}}}
   */
  conversationSelect({
    initialConversation,
    actionId,
    filter = ["public", "private"],
    placeholder = "Select channel",
    excludeBotUsers = true,
    excludeExternalSharedChannels = true,
  }) {
    const element = {
      accessory: {
        type: "conversations_select",
        filter: {
          include: filter,
          exclude_bot_users: excludeBotUsers,
          exclude_external_shared_channels: excludeExternalSharedChannels,
        },
        placeholder: {
          type: "plain_text",
          text: placeholder,
          emoji: true,
        },
      },
    };
    if (actionId) {
      element.accessory.action_id = actionId;
    }
    if (initialConversation) {
      element.accessory.initial_conversation = initialConversation;
    }
    return element;
  }
}

module.exports = new Accessory();
