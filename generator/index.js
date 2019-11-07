module.exports = (api, options, rootOptions) => {
    // 命令
    api.extendPackage({
        scripts: {
            "serve": "vue-cli-service serve",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint",
            "test:unit": "vue-cli-service test:unit"
        },
        "scripts-info": {
            'serve': '运行开发服务器',
            'build': '生产环境执行构建',
        }
    });

    // 安装一些基础公共库
    api.extendPackage({
        dependencies: {
            "axios": "~0.18.0",
            "element-ui": "~2.4.10",
            "socket.io-client": "~2.2.0",
            "vue": "^2.5.17",
            "vue-axios": "~2.1.4",
            "vue-router": "^3.0.1"
        },
        devDependencies: {
            "@vue/cli-service": "~3.0.5",
            "@vue/cli-plugin-babel": "~3.0.5",
            "@vue/cli-plugin-eslint": "~3.0.5",
            "@vue/cli-plugin-unit-mocha": "~3.0.5",
            "@vue/test-utils": "~1.0.0-beta.20",
            "babel-plugin-component": "~1.1.1",
            "terser-webpack-plugin": "~2.2.1",
            "compression-webpack-plugin": "~2.0.0",
            "chai": "^4.1.2",
            "happypack": "5.0.1",
            "imagemin": "^6.1.0",
            "imagemin-optipng": "^6.0.0",
            "imagemin-svgo": "^7.0.0",
            "img-loader": "^3.0.1",
            "json-templater": "^1.0.4",
            "minimist": "^1.2.0",
            "node-sass": "^4.10.0",
            "progress-bar-webpack-plugin": "^1.12.1",
            "sass-loader": "^7.1.0",
            "url-loader": "^1.1.2",
            "vue-template-compiler": "^2.5.17"
        }
    });

    // 浏览器兼容
    api.extendPackage({
        browserslist: [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
        ]
    });

    // 删除 vue-cli3 默认目录
    api.render(files => {
        Object.keys(files)
            .filter(path => path.startsWith('src/') || path.startsWith('public/'))
            .forEach(path => delete files[path]);
    });

    // 公共基础目录和文件
    api.render('./template');

    // 屏蔽 generator 之后的文件写入操作
    // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
    // api.onCreateComplete(() => {
    //     process.env.VUE_CLI_SKIP_WRITE = true;
    // });
};