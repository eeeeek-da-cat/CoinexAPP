/*
 * File: app/model/currencies.js
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

Ext.define('CoinEX.model.currencies', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'desc',
            type: 'string'
        },
        {
            name: 'tx_fee',
            type: 'float'
        },
        {
            name: 'tx_conf',
            type: 'int'
        },
        {
            name: 'blk_conf',
            type: 'int'
        },
        {
            name: 'hashrate',
            type: 'int'
        },
        {
            name: 'net_hashrate',
            type: 'int'
        },
        {
            name: 'last_block_at',
            type: 'date'
        },
        {
            name: 'mining_enabled',
            type: 'boolean'
        },
        {
            name: 'mining_url',
            type: 'string'
        },
        {
            name: 'mining_fee',
            type: 'int'
        },
        {
            name: 'donations',
            type: 'string'
        },
        {
            name: 'algo',
            type: 'string'
        },
        {
            name: 'diff',
            type: 'float'
        },
        {
            name: 'updated_at',
            type: 'date'
        },
        {
            name: 'mining_score',
            type: 'float'
        },
        {
            name: 'mining_score_market',
            type: 'string'
        },
        {
            name: 'mining_skip_switch',
            type: 'boolean'
        },
        {
            name: 'virtual',
            type: 'boolean'
        },
        {
            name: 'switched_at',
            type: 'date'
        }
    ],

    proxy: {
        type: 'ajax',
        url: '/api/currencies',
        reader: {
            type: 'json',
            root: 'currencies'
        }
    }
});