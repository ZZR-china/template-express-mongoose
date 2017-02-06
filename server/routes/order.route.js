/*
 * Author: Kain·Altion <kain@foowala.com>
 * Module description: 订单路由
 */
import orderCtrl from '../controllers/order.controller';
import joi from 'joi';

export default [{
    method: 'get',
    path: '/order/{order_id}',
    config: {
        handler: orderCtrl.getOrderById,
        description: '<p>get order by id</p>',
        validate: {
            params: {
                order_id: joi.string().required()
            }
        }
    }
}, {
    method: 'put',
    path: '/order',
    config: {
        handler: orderCtrl.updateOrder,
        description: '<p>修改订单信息</p>'
    }
},{
    method: 'get',
    path: '/order/processing/{desk_id}',
    config: {
        handler: orderCtrl.getOrderInProcessing,
        description: '<p>根据桌子_id获取正在进行的订单信息, 分桌情况等都是这一接口</p>',
        validate: {
            params: {
                desk_id: joi.string().required()
            }
        }
    }
}, {
    method: 'get',
    path: '/orders/processing/{desk_id}',
    config: {
        handler: orderCtrl.getOrdersProcessing,
        description: '<p>根据桌子_id获取正在进行的订单信息[多个]</p>',
        validate: {
            params: {
                desk_id: joi.string().required()
            }
        }
    }
}, {
    method: 'put',
    path: '/order/place',
    config: {
        handler: orderCtrl.placeOrder,
        description: '<p>下单</p>'
    }
}, {
    method: 'put',
    path: '/order/complete',
    config: {
        handler: orderCtrl.completeOrder,
        description: '<p>完成订单, 结账</p>'
    }
}, {
    method: 'get',
    path: '/order/item/{order_id}',
    config: {
        handler: orderCtrl.getOrderItem,
        description: '<p>获取订单详细商品</p>'
    }
}, {
    method: 'post',
    path: '/order/item',
    config: {
        handler: orderCtrl.insertOrderItem,
        description: '<p>新增订单商品</p>'
    }
}, {
    method: 'put',
    path: '/order/item',
    config: {
        handler: orderCtrl.updateOrderItem,
        description: '<p>修改订单商品信息</p>'
    }
}, {
    method: 'delete',
    path: '/order/item',
    config: {
        handler: orderCtrl.deleteOrderItem,
        description: '<p>删除订单商品信息--下单前</p>'
    }
},{
    method: 'put',
    path: '/order/item/cancel',
    config: {
        handler: orderCtrl.cancelOrderItem,
        description: '<p>删除订单商品信息--下单后,有记录</p>'
    }
}];
