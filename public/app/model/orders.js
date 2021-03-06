/*
 * File: app/model/orders.js
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

Ext.define('CoinEX.model.orders', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'trade_pair_id',
            type: 'int'
        },
        {
            name: 'amount',
            type: 'int'
        },
        {
            name: 'bid',
            type: 'boolean'
        },
        {
            name: 'rate',
            type: 'int'
        }
    ],

    proxy: {
        type: 'ajax',
        directionParam: '',
        filterParam: '',
        groupDirectionParam: '',
        groupParam: '',
        idParam: '',
        limitParam: '',
        pageParam: '',
        sortParam: '',
        startParam: '',
        url: '/api/orders',
        reader: {
            type: 'json',
            root: 'order'
        }
    }
});