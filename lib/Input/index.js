const dayjs = require('dayjs');
const timezones = require('./timezones.json');

class Input {

    /**
     * Private Input block
     * @param {Object} element input element
     * @param {String} label label text
     * @param {String} [blockId] optional block id
     * @param {Boolean} [optional] optional user input
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    #input({element, label, blockId, optional = false}) {
        const input = {
            type: 'input',
            element,
            label: {
                type: 'plain_text',
                text: label,
                emoji: true
            },
            optional
        }
        if(blockId) {
            input.block_id = blockId
        }
        return input;
    }

    /**
     * Text input block
     * @param {String} label text input label
     * @param {String} placeholder placeholder text
     * @param {Number} [minLength] minimum length of input text
     * @param {Number} [maxLength] maximum length of input text
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @param {String} [initialValue] initial value to be set
     * @param {Boolean} [multiline] if input is multi-line. Defaults to false.
     * @param {Boolean} [dispatchAction] if action should be triggered on pressing enter. Defaults to false.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    text({ label, placeholder, minLength, maxLength , blockId, actionId, optional, initialValue, multiline=false, dispatchAction=false }) {
        const element = {
            type: 'plain_text_input',
            placeholder: {
                type: 'plain_text',
                text: placeholder,
            },
            multiline,
        }
        if(actionId) {
            element.action_id = actionId
        }
        if(initialValue) {
            element.initial_value = initialValue
        }
        if(minLength) {
            element.min_length = minLength
        }
        if(maxLength) {
            element.max_length = maxLength
        }
        if(dispatchAction) {
            element.dispatch_action_config ={
                trigger_actions_on: ['on_enter_pressed']
            }
        }

        return this.#input({element, label, blockId, optional})
    }

    /**
     * Conversation select block
     * @param {String} label conversation select label
     * @param {String} placeholder placeholder text
     * @param {Boolean} multi allow selection of multiple conversations. Defaults to false.
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @param {String|Array<String>} [initialConversations] initial conversations to be selected. conversation ids
     * @param {Array<('public'|'private'|'im'|'mpim')>} [filter] list of conversation types to show
     * @param {Boolean} [excludeBotUsers] exclude bot users from the list. Defaults to true.
     * @param {Boolean} [excludeExternalSharedChannels] exclude external shared channels from the list. Defaults to true.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    conversationSelect({label, placeholder, blockId, actionId, optional, initialConversations, filter =['public', 'private'], multi=false, excludeBotUsers= true, excludeExternalSharedChannels=true}) {
        const element = {
            type: multi ? 'multi_conversations_select' : 'conversations_select',
            placeholder: {
                type: 'plain_text',
                text: placeholder,
            },
            filter: {
                include: filter,
                exclude_bot_users: excludeBotUsers,
                exclude_external_shared_channels: excludeExternalSharedChannels
            },
        }
        if(actionId) {
            element.action_id = actionId
        }
        if(multi && initialConversations) {
            element.initial_conversations = initialConversations
        } else if(initialConversations) {
            element.initial_conversation = initialConversations
        }
        return this.#input({element, label, blockId, optional })
    }

    /**
     * Static select input
     * @param {String} label static select label
     * @param {String} placeholder placeholder text
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @param {Boolean} [useGroup] if option groups need to be used. Defaults to false.
     * @param {String|Array<String>} [initialOptions] initial options to be selected.
     * @param {{label: String, options: Array<{text:String, value:String}>}|Array<{text:String, value:String}>} options options to be shown
     * @param {Boolean} [multi] allow selection of multiple options. Defaults to false.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    staticSelect({label, placeholder, blockId, actionId, optional, useGroup=false, initialOptions, options, multi=false}) {
        let iniOpt;
        let _options;
        if(useGroup) {
            _options = options.map(og => ({
                label: { type: 'plain_text', text: og.label},
                options: og.options.map(o => ({
                    text: { type: 'plain_text', text: o.text},
                    value: o.value
                }))
            }))
            if(multi && initialOptions?.length) {
                iniOpt = _options
                    .reduce((list, og) => [...list, ...og.options], [])
                    .filter(o => initialOptions.map(v => v.toString()).includes(o.value.toString()))
            } else if(typeof initialOptions === 'string') {
                iniOpt = _options
                    .reduce((list, og) => [...list, ...og.options], [])
                    .filter(o => o.value.toString() === initialOptions.toString())
                    .map(o => ({ text: o.text, value: o.value}))[0]
            }
        } else {
            _options = options.map(o => ({
                label: { type: 'plain_text', text: o.text},
                value: o.value
            }))
            if(multi && initialOptions?.length) {
                iniOpt = _options.filter(o => initialOptions.map(v => v.toString()).includes(o.value.toString()))
            } else if(typeof initialOptions === 'string') {
                iniOpt = _options
                    .filter(o => o.value.toString() === initialOptions.toString())
                    .map(o => ({ text: o.text, value: o.value}))[0]
            }
        }

        const element = {
            type: multi ? 'multi_static_select' : 'static_select',
            placeholder: {
                type: 'plain_text',
                text: placeholder,
            },
        }
        if(multi && iniOpt) {
            element.initial_options = iniOpt
        } else if(iniOpt) {
            element.initial_option = iniOpt
        }
        if(actionId) {
            element.action_id = actionId
        }

        return this.#input({element, label, blockId, optional});
    }

    /**
     * Radio select input
     * @param {String} label radio select label
     * @param {Array<{text:String, value:String}>} options options to be shown
     * @param {String} initialOption initial option to be selected.
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    radioSelect({label, options, initialOption, blockId, actionId, optional}) {
        let initOpt;
        if(initialOption) {
            initOpt = options
                .filter(o => o.value === initialOption)
                .map(o => ({ text: { type: 'plain_text', text: o.text}, value: o.value}))[0]
        }
        const element = {
            type: 'radio_buttons',
            options: options.map(o => ({
                label: { type: 'plain_text', text: o.text},
                value: o.value
            }))
        }
        if(initOpt) {
            element.initial_option = initOpt
        }
        if(actionId) {
            element.action_id = actionId
        }
        return this.#input({element, label, blockId, optional})
    }

    /**
     * Checkboxes input
     * @param {Array<{text:String, value:String, [description]:String}>} options options to be shown
     * @param {String} [actionId] optional action id
     * @param {Array<String>} initialOptions initial options to be selected.
     * @return {{options: *, type: string}}
     */
    checkboxes({options, actionId, initialOptions}) {
        const initOpts = initialOptions
            ? options
                .filter(o => initialOptions.includes(o.value))
                .map(o => ({text: {type: 'mrkdwn', text: o.text}, value: o.value}))
            : undefined;
        const _options = options.map(o => {
            const obj = { text: { type: 'mrkdwn', text: o.text}, value: o.value}
            if(o.description) {
                obj.description = { type: 'mrkdwn', text: o.description}
            }
            return obj;
        })
        const element = {
            type: 'checkboxes',
            options: _options
        }
        if(actionId) {
            element.action_id = actionId
        }
        if(initOpts) {
            element.initial_options = initOpts
        }
        return element;
    }

    /**
     * Date picker input
     * @param {String} label date picker label
     * @param {String} placeholder date picker placeholder
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {String} [initialDate] initial date to be selected in YYYY-MM-DD format.
     * @param {String} [timezone] timezone to be used. Defaults to 'UTC'.
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    datepicker({ label, placeholder, blockId, actionId, initialDate, timezone, optional }) {
        let date = initialDate;
        if(!initialDate && timezone) {
            date = dayjs().tz(timezone).format('YYYY-MM-DD');
        } else if(!initialDate) {
            date = dayjs().format('YYYY-MM-DD')
        }
        const element = {
            type: 'datepicker',
            placeholder: { type: 'plain_text', text: placeholder, emoji: true },
        }
        if(actionId) {
            element.action_id = actionId
        }
        if(date) {
            element.initial_date = date
        }
        return this.#input({element, label, blockId, optional})
    }

    /**
     * Timepicker input
     * @param {String} label time picker label
     * @param {String} placeholder time picker placeholder
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {String} [initialTime] initial time in hh:mm a format
     * @param {String} [timezone] timezone to be used. Defaults to 'UTC'.
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    timepicker({ label, placeholder, blockId, actionId, initialTime, timezone, optional}) {
        let time;
        if(!initialTime && timezone) {
            const minsToAdd = 5 - (dayjs().tz(timezone).minute() % 5);
            time = dayjs().tz(timezone).add(minsToAdd, 'minute').format('HH:mm');
        } else if(!initialTime) {
            const minsToAdd = 5 - (dayjs().minute() % 5);
            time = dayjs().add(minsToAdd, 'minute').format('HH:mm')
        } else {
            time = dayjs(initialTime, 'hh:mm a').format('HH:mm');
        }
        const element = {
            type: 'timepicker',
            placeholder: { type: 'plain_text', text: placeholder, emoji: true },
        }
        if(actionId) {
            element.action_id = actionId
        }
        if(time) {
            element.initial_time = time
        }
        return this.#input({element, label, blockId, optional})
    }

    #getGroupedTimezones() {
        const tzGroups = {};
        timezones.forEach(({zoneName}) => {
            const prefix = zoneName.split('/')[0];
            if(!tzGroups[prefix]) {
                tzGroups[prefix] = [];
            }
            tzGroups[prefix].push(zoneName);
        });
        const tzOptions = [];
        Object.keys(tzGroups).forEach(prefix => {
            if(tzGroups[prefix].length > 100) {
                const zone1 = tzGroups[prefix].slice(0, 100);
                const zone2 = tzGroups[prefix].slice(100);
                tzOptions.push({ label: `${prefix}-1`, options: zone1 }, { label: `${prefix}-2`, options: zone2 });
            } else {
                tzOptions.push({ label: prefix, options: tzGroups[prefix] });
            }
        });
        return tzOptions;
    }

    /**
     * Static select input
     * @param {String} label static select label
     * @param {String} placeholder placeholder text
     * @param {String} [blockId] optional block id
     * @param {String} [actionId] optional action id
     * @param {Boolean} [optional] if the input is optional. Defaults to false.
     * @param {String} [initialTimezone] initial timezone to be selected.
     * @return {{optional: boolean, label: {emoji: boolean, text, type: string}, type: string, element}}
     */
    timezonePicker({ label, placeholder, blockId, actionId, initialTimezone, optional }) {
        const options = this.#getGroupedTimezones();
        return this.staticSelect({ label, placeholder, blockId, actionId, optional, useGroup: true, initialOptions: initialTimezone, options })
    }
}

module.exports = new Input();
