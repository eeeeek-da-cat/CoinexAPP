/*
 * File: app/view/MainView.js
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

Ext.define('CoinEX.view.MainView', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    itemId: 'mainView',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    region: 'north',
                    split: false,
                    height: 50,
                    html: '<div class="logo"><img src="/images/coinex_logo.png" alt="CoinEX Logo"><span>CoinEX</span></div>',
                    itemId: 'headerPanel'
                },
                {
                    xtype: 'panel',
                    flex: 2,
                    region: 'center',
                    split: true,
                    itemId: 'centerPanel',
                    title: 'CoinEx',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    }
                },
                {
                    xtype: 'panel',
                    region: 'west',
                    split: true,
                    id: 'balancesPanel',
                    itemId: 'balancesPanel',
                    maxWidth: 200,
                    minWidth: 200,
                    width: 200,
                    collapsed: true,
                    collapsible: true,
                    title: 'My Balances',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 3,
                            width: 250,
                            header: false,
                            title: 'My Balances',
                            disableSelection: true,
                            store: 'balances',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    maxWidth: 50,
                                    minWidth: 50,
                                    width: 50,
                                    defaultWidth: 50,
                                    dataIndex: 'currency_name',
                                    text: 'Coin'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'right',
                                    dataIndex: 'balance',
                                    text: 'Balance',
                                    flex: 1
                                }
                            ],
                            viewConfig: {
                                loadMask: false
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            height: 150,
                            header: {
                                tools: [
                                    {
                                        type: 'refresh',
                                        tooltip: 'Refresh Workers',
                                        handler: function(event, toolEl, panel){
                                                Ext.getStore('worker_stats').reload();
                                                Ext.getStore('workers').reload();
                                            }
                                    }
                                ]
                            },
                            title: 'My Workers',
                            store: 'worker_stats',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var id = record.get('worker_id'),
                                            worker = Ext.getStore('workers').findRecord('id', id);

                                        return worker.get('name');
                                    },
                                    text: 'Worker',
                                    flex: 1
                                },
                                {
                                    xtype: 'numbercolumn',
                                    maxWidth: 80,
                                    minWidth: 80,
                                    width: 80,
                                    defaultWidth: 80,
                                    align: 'right',
                                    dataIndex: 'hashrate',
                                    text: 'Khash/sec'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    split: true,
                    id: 'chatPanel',
                    itemId: 'chatPanel',
                    maxWidth: 500,
                    minWidth: 500,
                    width: 500,
                    collapsed: true,
                    collapsible: true,
                    title: 'Chat Box',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            collapsed: false,
                            header: false,
                            disableSelection: true,
                            store: 'messages',
                            columns: [
                                {
                                    xtype: 'datecolumn',
                                    maxWidth: 75,
                                    minWidth: 75,
                                    width: 75,
                                    defaultWidth: 75,
                                    dataIndex: 'created_at',
                                    text: 'Time',
                                    format: 'H:i:s'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: 'User'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'body',
                                    text: 'Message',
                                    flex: 1
                                }
                            ],
                            viewConfig: {
                                id: 'chatGrid',
                                loadMask: false,
                                preserveScrollOnRefresh: true
                            }
                        },
                        {
                            xtype: 'form',
                            height: 35,
                            maxHeight: 35,
                            minHeight: 35,
                            bodyPadding: 5,
                            header: false,
                            title: 'Message',
                            url: '/api/messages',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    id: 'message',
                                    itemId: 'message',
                                    margin: '0 5px 0 0',
                                    name: 'body',
                                    blankText: 'Type your message'
                                },
                                {
                                    xtype: 'button',
                                    id: 'chatSubmit',
                                    text: 'Send'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'south',
                    split: false,
                    height: 25,
                    html: '<div class="copyright">© 2014 by EeeeeK</div>',
                    itemId: 'footerPanel'
                }
            ]
        });

        me.callParent(arguments);
    }

});