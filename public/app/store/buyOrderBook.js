/*
 * File: app/store/buyOrderBook.js
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

Ext.define('CoinEX.store.buyOrderBook', {
    extend: 'Ext.data.Store',

    requires: [
        'CoinEX.model.orderBook',
        'Ext.util.Filter',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'CoinEX.model.orderBook',
            storeId: 'buyOrderBook',
            filters: {
                filterFn: function(item) {
                    return item.get("bid") === true;
                }
            },
            sorters: {
                direction: 'DESC',
                property: 'price'
            }
        }, cfg)]);
    }
});