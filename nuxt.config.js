export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        script: [{
            src: 'https://dpro-main.oss-cn-hongkong.aliyuncs.com/js/qrcode/qrcode.min.js'
        }],
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },
    /*
     ** Customize the progress-bar color
     */
    // loading: { color: '#fff' },
    loading: false,
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css', // 引入全局样式
        'swiper/dist/css/swiper.css',
        'ant-design-vue/dist/antd.less',
        './assets/css/reset.css',
        './assets/css/iconfont.css',
      './assets/css/common.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios',
        '~plugins/echarts',
        {
            src: '~/plugins/antd.js',
            ssr: true
        },
        {
            src: '~/plugins/ElementUI',
            ssr: true
        }, // ssr:true代表在服务端渲染,客户端不渲染
        {
            src: '~/plugins/Swiper',
            ssr: false
        },
        {
          src: '@/assets/js/index.js',
          ssr: false
        },
      {
        src: '@/assets/js/common.js',
        ssr: false
      },
        {
            src: '~/plugins/tool.js',
            ssr: false
        }, // 自定义工具类
        {
            src: '@/assets/js/iconfont.js',
            ssr: false
        }, // 自定义icon
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    // 本地测试注释baseURL  取消注释其余三项
    baseURL: 'https://www.dpro.ltd'
    // proxy: true, // 表示开启代理
    // prefix: '/api', // 表示给请求url加个前缀 /api
    // credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api/': {
      target: 'https://www.dpro.ltd',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  router: {
    linkActiveClass: 'active-link'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#BD3A3B',
          'layout-body-background': '#fff',
          'primary-3': '#BD3A3B',
          'background-color-base': '#7A7777',
          'select-border-color': '#555555',
          'font-size-base': '12px',
        }
      }
    },
    vendor: ['element-ui', 'vue-awesome-swiper'], // 防止重复重复打包
    extend(config, ctx) {}
  }
}
