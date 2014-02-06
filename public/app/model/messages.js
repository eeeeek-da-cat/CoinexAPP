/*
 * File: app/model/messages.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CoinEX.model.messages', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'body',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'date'
        },
        {
            name: 'updated_at',
            type: 'date'
        },
        {
            name: 'system',
            type: 'boolean'
        },
        {
            name: 'name',
            type: 'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: '/api/messages',
        reader: {
            type: 'json',
            root: 'messages'
        }
    }
});