/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/11
 * ======================================== */
const util = require('./build/utils')
const fs = require('fs');
const render = require('json-templater/string');
const path = require('path');
const endOfLine = require('os').EOL;
const application =  require('./src/application')

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)

const CONF_FILE = args.config || '../backend/src/app/config/app_config.conf'
const conf = getBackendConfig(CONF_FILE)

const FRONTEND_PORT = args.port || 8000
const BACKEND_PORT = args.httpport || conf.flask_port || 9000
const OUTPUT_PATH = args.dest || path.join(__dirname, './nginx.conf');
const ROOT_PATH = args.root || path.join(__dirname, './dist');
const RAW_DATA_PATH = args.rawdata || '/opt/raw_data/';
const DOWNLOAD_DATA_PATH = args.download_data || conf.download_file_path || '/opt/download_data/';

const LOCALTION_TEMPLATE =
    '        location {{page_paths}} {' + endOfLine +
    '            try_files $uri $uri/ {{page_paths}}index.html;' + endOfLine +
    '        }'
const NGINX_TEMPLATE = `
server {

        listen   ${FRONTEND_PORT};
        root ${pathOfPlatform(ROOT_PATH)};
        index index.html;

        # nginx文件下载url定位文件路径
        location /download_data/ {
            # 防止url直接访问资源
            internal;
            alias ${pathOfPlatform(DOWNLOAD_DATA_PATH)}/;
        }
        
        # nginx log文件下载url定位文件路径
        location /log/ {
            # 防止url直接访问资源
            internal;
            alias /var/info_portal/log/;
        }
        
        # 静态文件代理
        location /raw_data/ {
            alias ${pathOfPlatform(RAW_DATA_PATH)}/;
        }
        
        # 页面请求接口反向代理
        location /${application.http_request_prefix}/ {
            proxy_pass http://127.0.0.1:${BACKEND_PORT}/${application.http_request_prefix}/;
        }

        # 解决vue-router history模式 404问题
{{location_history_url}}

        # 开启gzip压缩
        # gzip on;
        # gzip_min_length 4k;
        # gzip_types  text/plain application/javascript text/css text/javascript image/jpeg image/gif image/svg+xml;
        # gzip_vary on;

        # 采取静态gzip（查找是否有xxx.gz文件有就返回xxx.gz无就返回xxx）
        gzip_static on;
}
`

const locationTemplate = []
util.getPagePaths().forEach(function (item) {
    locationTemplate.push(render(LOCALTION_TEMPLATE,{
        page_paths: item
    }))
})

fs.writeFileSync(OUTPUT_PATH,render(NGINX_TEMPLATE,{
    location_history_url: locationTemplate.join(endOfLine)
}))

function pathOfPlatform(p) {
    return path.resolve(__dirname,p).replace(/\\/g,'/')
}
// 获取后端配置
function getBackendConfig(file) {
    const regex = {
        section: /^\s*\[\s*([^\]]*)\s*]\s*$/,
        param: /^\s*(.*?)\s*=\s*(.*?)\s*$/,
        comment: /^#(.*?)$/
    };

    const conf = {}
    file = path.resolve(file)
    if(!fs.existsSync(file)) return {}

    const lines = fs.readFileSync(file,"utf-8").split(/\r\n|\r|\n/)
    lines.forEach(function (line) {
        if(regex.comment.test(line)) return
        if(regex.section.test(line)) return
        if(regex.param.test(line)){
            const match = line.match(regex.param)
            conf[match[1]] = match[2]
        }
    })
    return conf
}



