export const painterJson = {
    width: '750rpx',
    height: '1320rpx',
    background: '#fff',
    views: [
        {
            type: 'view',
            css: {
                left: '35rpx',
                top: '144rpx',
                background: '#fff',
                // radius: '16rpx',
                width: '690rpx',
                height: '930rpx',
                // shadow: '0 20rpx 48rpx rgba(0,0,0,.05)'
            }
        },
        {
            modules:'goodsTitle',
            type: 'text',
            text: '',
            css: {
                maxLines: 1,
                width: '680rpx',
                color: '#333',
                left: '15rpx',
                top: '10rpx',
                fontSize: '32rpx',
                lineHeight: '40rpx',
            }
        },
        {
            modules:'goodsColor',
            type: 'text',
            text: '分类：--',
            css: {
                maxLines: 1,
                width: '680rpx',
                color: '#999',
                left: '35rpx',
                top: '60rpx',
                fontSize: '26rpx',
            }
        },
        {
            modules:'goodsSize',
            type: 'text',
            text: '规格：--',
            css: {
                maxLines: 1,
                width: '680rpx',
                color: '#999',
                left: '35rpx',
                top: '108rpx',
                fontSize: '26rpx',
            }
        },
        {
            type: 'text',
            text: '¥',
            css: {
                maxLines: 1,
                width: '606rpx',
                color: '#D80C18',
                left: '35rpx',
                top: '160rpx',
                fontSize: '30rpx',
                lineHeight: '40rpx',
                fontWeight: 'bold'
            }
        },
        {
            modules:'goodsPrice',
            type: 'text',
            text: '',
            css: {
                maxLines: 1,
                width: '606rpx',
                color: '#D80C18',
                left: '56rpx',
                top: '156rpx',
                fontSize: '44rpx',
                lineHeight: '40rpx',
                fontWeight: 'bold'
            }
        },
        {
            
            modules:'goodsNormal',
            type: 'text',
            text: '',
            css: {
                maxLines: 1,
                width: '606rpx',
                color: '#999',
                left: '250rpx',
                top: '160rpx',
                fontSize: '28rpx',
                lineHeight: '40rpx',
                textDecoration: "line-through",
            }
        },
        {
            modules:'goodsPic1',
            type: 'image',
            src: '',
            mode: 'aspectFill',
            css: {
                left: '35rpx',
                top: '210rpx',
                width: '680rpx',
                height: '680rpx'
            }
        },
        {
            modules:'goodsPic2',
            type: 'image',
            src: '',
            mode: 'aspectFill',
            css: {
                left: '35rpx',
                top: '900rpx',
                width: '220rpx',
                height: '206rpx',
            }
        },
        {
            modules:'goodsPic3',
            type: 'image',
            src: '',
            mode: 'aspectFill',
            css: {
                left: '265rpx',
                top: '900rpx',
                width: '220rpx',
                height: '206rpx',
            }
        },
        {
            modules:'goodsPic4',
            type: 'image',
            src: '',
            mode: 'aspectFill',
            css: {
                left: '495rpx',
                top: '900rpx',
                width: '220rpx',
                height: '206rpx',
            }
        },
        {
            modules:'goodsQrcode',
            type: 'image',
            src: '',
            mode: 'widthFix',
            css: {
                left: '35rpx',
                top: '1130rpx',
                width: '178rpx',
                height: '178rpx'
            }
        },
        {
            modules:'authImg',
            type: 'image',
            src: '',
            mode: 'widthFix',
            css: {
                left: '300rpx',
                top: '1216rpx',
                width: '84rpx',
                height: '84rpx',
                radius: '50%',
                color: '#999'
            }
        },
        {
            type: 'text',
            text: '长按识别小程序码',
            css: {
                color: '#666',
                left: '300rpx',
                top: '1130rpx',
                fontSize: '24rpx'
            }
        },
        {
            type: 'text',
            text: '购买品牌好货',
            css: {
                color: '#666',
                left: '300rpx',
                top: '1170rpx',
                fontSize: '24rpx'
            }
        },
        {
            modules:'authName',
            type: 'text',
            text: '--',
            css: {
                color: '#333',
                left: '400rpx',
                top: '1240rpx',
                fontSize: '24rpx'
            }
        },
    ]
}