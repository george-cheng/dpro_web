import Vue from 'vue'


var tool= {
    install(Vue){
        Vue.prototype.tool = {
            /**
             * 获取cookie值
             * @param {cookie名字} cookie_name 
             */
        	getCookie: function(cookie_name){
        		var allcookies = document.cookie;
                //索引长度，开始索引的位置
                var cookie_pos = allcookies.indexOf(cookie_name);

                // 如果找到了索引，就代表cookie存在,否则不存在
                if (cookie_pos != -1) {
                    // 把cookie_pos放在值的开始，只要给值加1即可
                    //计算取cookie值得开始索引，加的1为“=”
                    cookie_pos = cookie_pos + cookie_name.length + 1; 
                    //计算取cookie值得结束索引
                    var cookie_end = allcookies.indexOf(";", cookie_pos);
                    
                    if (cookie_end == -1) {
                        cookie_end = allcookies.length;

                    }
                    //得到想要的cookie的值
                    var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
                }
                return value;
            },
            /**
             * 时间戳转换
             * @param {需要转换的时间戳} time 
             */
            timestampToTime: function(time = +new Date()) {
                var date = new Date(time + 8 * 3600 * 1000);
                return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
            },
            /**
             * 节流
             * @param {方法} fn 
             * @param {时间} interval 
             */
            throttle(fn, interval) {
                var last
                var timer
                var interval = interval || 200
                return function () {
                    var th = this
                    var args = arguments
                    var now = +new Date()
                    if (last && now - last < interval) {
                        clearTimeout(timer)
                        timer = setTimeout(function () {
                            last = now
                            fn.apply(th, args)
                        }, interval)
                    } else {
                        last = now
                        fn.apply(th, args)
                    }
                }
            },
            /**
             * 保留小数点后decimal位，不四舍五入
             * @param {数字值} num 
             * @param {保留位数} decimal 
             */
            formatDecimal: function (num, decimal) {
                num = num.toString()
                let index = num.indexOf('.')
                if (index !== -1) {
                  num = num.substring(0, decimal + index + 1)
                } else {
                  num = num.substring(0)
                }
                return parseFloat(num).toFixed(decimal)
            },
            accMul(arg1, arg2) {
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                try { m += s1.split(".")[1].length } catch (e) { }
                try { m += s2.split(".")[1].length } catch (e) { }
                return Number(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m));
            },
            accDiv(arg1,arg2){
                var t1=0,t2=0,r1,r2;
                try{t1=arg1.toString().split(".")[1].length}catch(e){}
                try{t2=arg2.toString().split(".")[1].length}catch(e){}
                r1=Number(arg1.toString().replace(".",""))
                r2=Number(arg2.toString().replace(".",""))
                return Number((r1/r2)*Math.pow(10,t2-t1));
            },
        };
        
    }
}

Vue.use(tool)