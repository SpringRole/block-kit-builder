class Button {
    /**
     * Primary button
     * @param {String} text Button text
     * @param {String|Object} value Button value
     * @param {String} [actionId] optional action id
     * @param {Object} [dialog] optional confirm dialog
     * @param {String} dialog.title title of the confirm dialog
     * @param {String} dialog.description description to show on the confirm dialog
     * @param {String} dialog.confirmText text of the confirm button
     * @param {String} dialog.cancelText text of the cancel button
     * @return {{style: string, text: {emoji: boolean, text, type: string}, type: string, value: (string|string)}}
     */
    primary({text, value, actionId, dialog ={}}) {
        const button = {
            type: 'button',
            text: {
                type: 'plain_text',
                emoji: true,
                text,
            },
            value: typeof value === 'string' ? value : JSON.stringify(value),
            style: 'primary',
        }
        if(actionId) {
            button.action_id = actionId
        }
        if(Object.keys(dialog).length) {
            button.confirm = {
                title: {type: 'plain_text', text: dialog.title},
                text: {type: 'plain_text', text: dialog.description},
                confirm: {type: 'plain_text', text: dialog.confirmText},
                deny: {type: 'plain_text', text: dialog.cancelText}
            }
        }
        return button;
    }

    /**
     * Default button
     * @param {String} text Button text
     * @param {String|Object} value Button value
     * @param {String} [actionId] optional action id
     * @param {Object} [dialog] optional confirm dialog
     * @param {String} dialog.title title of the confirm dialog
     * @param {String} dialog.description description to show on the confirm dialog
     * @param {String} dialog.confirmText text of the confirm button
     * @param {String} dialog.cancelText text of the cancel button
     * @return {{style: string, text: {emoji: boolean, text, type: string}, type: string, value: (string|string)}}
     */
    default({text, value, actionId, dialog ={}}) {
        const button = {
            type: 'button',
            text: {
                type: 'plain_text',
                emoji: true,
                text,
            },
            value: typeof value === 'string' ? value : JSON.stringify(value),
        }
        if(actionId) {
            button.action_id = actionId
        }
        if(Object.keys(dialog).length) {
            button.confirm = {
                title: {type: 'plain_text', text: dialog.title},
                text: {type: 'plain_text', text: dialog.description},
                confirm: {type: 'plain_text', text: dialog.confirmText},
                deny: {type: 'plain_text', text: dialog.cancelText}
            }
        }
        return button;
    }

    /**
     * Danger button
     * @param {String} text Button text
     * @param {String|Object} value Button value
     * @param {String} [actionId] optional action id
     * @param {Object} [dialog] optional confirm dialog
     * @param {String} dialog.title title of the confirm dialog
     * @param {String} dialog.description description to show on the confirm dialog
     * @param {String} dialog.confirmText text of the confirm button
     * @param {String} dialog.cancelText text of the cancel button
     * @return {{style: string, text: {emoji: boolean, text, type: string}, type: string, value: (string|string)}}
     */
    danger({text, value, actionId, dialog ={}}) {
        const button = {
            type: 'button',
            text: {
                type: 'plain_text',
                emoji: true,
                text,
            },
            value: typeof value === 'string' ? value : JSON.stringify(value),
            style: 'danger',
        }
        if(actionId) {
            button.action_id = actionId
        }
        if(Object.keys(dialog).length) {
            button.confirm = {
                title: {type: 'plain_text', text: dialog.title},
                text: {type: 'plain_text', text: dialog.description},
                confirm: {type: 'plain_text', text: dialog.confirmText},
                deny: {type: 'plain_text', text: dialog.cancelText}
            }
        }
        return button;
    }
}

module.exports = new Button()
