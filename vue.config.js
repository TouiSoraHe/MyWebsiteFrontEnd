const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
// 作为配置文件，直接导出配置对象即可
module.exports = {
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 80,
        //设置代理
        proxy: {
            '^/api': {
                // 目标 API 地址
                target: 'http://localhost:3000/',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '/api': '' // 需要rewrite的,
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
    }
}