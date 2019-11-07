module.exports = (api, options, rootOptions) => {
    // 命令
    api.extendPackage({
        scripts: {
        },
        'scripts-info': {
            'serve': '运行开发服务器',
            'build': '生产环境执行构建',
        }
    });

    // 安装一些基础公共库
    api.extendPackage({
        dependencies: {
        },
        devDependencies: {
        }
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
    api.onCreateComplete(() => {
        process.env.VUE_CLI_SKIP_WRITE = true;
    });
};