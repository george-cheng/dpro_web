import { Message } from "element-ui";

export default function ({store, redirect, app: { $axios }}) {
    $axios.onRequest(config => {
        if (process.browser) {    //判断是否为客户端（必须）
        }
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code >= 400) {
            if (process.browser) {    //判断是否为客户端（必须）
                Message({
                    showClose: true,
                    message: '出现错误情况，错误代码：'+error.response.status,
                    type: "error.data.error.message"
                })
            }
        }
    })

    $axios.setHeader('Authorization', '456')
    // $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  }
  