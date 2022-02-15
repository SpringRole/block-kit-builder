const capitalize = require('lodash/capitalize');

class Attachment {

    #getFields(data, title) {
        const value = Object.keys(data).map(k => (![null, undefined].includes(data[k]) ? `*${capitalize(k)}*: ${data[k]}\n` : '')).join('')
        return [{title, short: false, value}]
    }

    /**
     * Get attachments to send in Slack message instead of blocks.
     * @param {Array<{fallback:String, color: String, pretext: String, data: Object, title: String}>} attachments array of attachments.
     * @return {Array<Object>} attachment objects
     */
    get(attachments) {
        return attachments.map(attachment => ({
            fallback: attachment.fallback,
            color: attachment.color,
            pretext: attachment.pretext,
            fields: this.#getFields(attachment.data, attachment.title)
        }))
    }
}

module.exports = new Attachment();
