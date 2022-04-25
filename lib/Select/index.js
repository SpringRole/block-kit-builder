const { getInitialOption, getOptions } = require("../Input");

class Select {
  /**
   * User Select
   * @param {String} [placeholder='Select an user'] - Placeholder text
   * @param {String} [actionId] - Action ID
   * @param {String} [initialUser] - Initial user id
   * @param {Boolean} [focusOnLoad=false] - Focus on load
   * @param {Object} [dialog] - Confirm object. Show confirm dialog on select.
   */
  userSelect({
    placeholder = "Select an user",
    actionId,
    initialUser,
    focusOnLoad = false,
    dialog,
  }) {
    const element = {
      type: "users_select",
      placeholder: {
        type: "plain_text",
        text: placeholder,
      },
    };
    if (actionId) {
      element.action_id = actionId;
    }
    if (initialUser) {
      element.initial_user = initialUser;
    }
    if (focusOnLoad) {
      element.focus_on_load = focusOnLoad;
    }
    if (Object.keys(dialog).length) {
      element.confirm = {
        title: { type: "plain_text", text: dialog.title },
        text: { type: "plain_text", text: dialog.description },
        confirm: { type: "plain_text", text: dialog.confirmText },
        deny: { type: "plain_text", text: dialog.cancelText },
      };
    }
    return element;
  }

  /**
   * Static Select
   * @param {String} [placeholder='Select an user'] - Placeholder text
   * @param {String} [actionId] - Action ID
   * @param {{label: String, options: Array<{text:String, value:String}>}|Array<{text:String, value:String}>} options options to be shown
   * @param {String} [initialOption] - Value of the initial selected option
   * @param {Boolean} [useGroup=false] - Use option groups instead of options
   * @param {Boolean} [focusOnLoad=false] - Focus on load
   * @param {Object} [dialog] - Confirm object. Show confirm dialog on select.
   */
  staticSelect({
    placeholder = "Select an user",
    actionId,
    options,
    useGroup = false,
    initialOption,
    focusOnLoad = false,
    dialog,
  }) {
    const _options = getOptions(options, useGroup);
    const element = {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: placeholder,
      },
      [useGroup ? "option_groups" : "options"]: _options,
    };
    if (actionId) {
      element.action_id = actionId;
    }
    if (initialOption) {
      element.initial_option = getInitialOption(
        _options,
        initialOption,
        useGroup,
        false
      );
    }
    if (focusOnLoad) {
      element.focus_on_load = focusOnLoad;
    }
    if (Object.keys(dialog).length) {
      element.confirm = {
        title: { type: "plain_text", text: dialog.title },
        text: { type: "plain_text", text: dialog.description },
        confirm: { type: "plain_text", text: dialog.confirmText },
        deny: { type: "plain_text", text: dialog.cancelText },
      };
    }
    return element;
  }
}

module.exports = new Select();
