class View {
    /**
     * Modal view
     * @param {String} title title of the modal
     * @param {String} [submitText] submit button text
     * @param {String} [closeText] close button text
     * @param {Array<Object>} blocks blocks to be rendered
     * @param {String} callbackId callback id
     * @param {String|Object} [metadata] metadata to be passed to the callback
     * @param {Boolean} [clearOnClose] clear the view on close
     * @param {Boolean} [notifyOnClose] notify with view closed event on close
     * @return {{callback_id, blocks, type: string, title: {emoji: boolean, text, type: string}}}
     */
    modal({ title, submitText, closeText, blocks, callbackId, metadata, clearOnClose, notifyOnClose  }) {
        const modal = {
            type: 'modal',
            title: { type: 'plain_text', text: title, emoji: true },
            blocks: blocks,
            callback_id: callbackId,
        }
        if(metadata) {
            modal.private_metadata = typeof metadata === 'object' ? JSON.stringify(metadata) : metadata
        }
        if(submitText) {
            modal.submit = { type: 'plain_text', text: submitText, emoji: true }
        }
        if(closeText){
            modal.close = { type: 'plain_text', text: closeText, emoji: true }
        }
        if(clearOnClose) {
            modal.clear_on_close = clearOnClose
        }
        if(notifyOnClose) {
            modal.notify_on_close = notifyOnClose
        }
        return modal;
    }

    /**
     * App Home view
     * @param {Array<Object>} blocks blocks to be rendered on app home
     * @return {{blocks, type: string}}
     */
    home({blocks}) {
        return {
            type: 'home',
            blocks: blocks
        }
    }
}

module.exports = new View()
