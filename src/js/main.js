var APP = (function ($, window) {
    var APP = function () {
    }

    //导航固定插件初始化
    function _initHeader() {
        var headroom = document.querySelector(".wrapper-header");
        new Headroom(headroom, {
            tolerance: 5,
            offset: 205,
            classes: {
                initial: "animated",
                pinned: "slideDown",
                unpinned: "slideUp"
            }
        }).init();
    }

    function _ajax(url, params, callback, options) {
        var defaultOptions = {
            url: url,
            data: params,
            dataType: 'json',
            type: 'get',
            beforeSend: function (XHR) {
                NProgress.inc()
            },
            success: function (res) {
              if (callback) {
                  callback(res)
              }
            },
            complete: function (XHR, TS) {
                NProgress.done()
            }
        }
        $.ajax($.extend(defaultOptions, (options || {})))
    }

    //get 请求
    function _get(url, data, callback, dataType) {
        _ajax(url, data, callback, {dataType: dataType})
    }

    //post 请求
    function _post(url, data, callback, dataType) {
        _ajax(url, data, callback, {dataType: dataType, type: 'post'})
    }

    // 路由回调，这里可以处理用户点击页面路径后的动作
    function _routerCallBack(ctx, next) {
        //请求参数，将参数缓存。这样可以在当前页面中获取到对应的参数。
        window.params = ctx.params;
        //请求页面文件，将内容填充到容器中
        _loadPage(ctx.pathname, params)
    }

    //加载html页面
    function _loadPage(url, data) {
        _get(url + window.config.pageSuffix, data, function (html) {
            $(window.config.container).html(html)
        }, 'html')
    }

    //初始化路由
    function _initRouter() {
        var router = window.config.router;
        //初始化首页页面内容
        page("/", _loadPage('/page/home'));
        for (var i in router) {
            page(router[i], function (ctx, next) {
                _routerCallBack(ctx, next)
            });
        }
        //404回调
        page("*", function (ctx) {
            //这里初始化一下页面请求参数，避免BUG
            window.params = {}
            //排除首页内容
            if (ctx.path !== '/') {
                alert(404)
            }
        });
        page({hashbang: true});
    }

    APP = APP.prototype = {
        constructor: APP,
        init: function () {
            _initHeader()
            _initRouter()
        },
        get: _get,
        post: _post,
        loadPage: _loadPage
    }
    APP.init.prototype = APP;
    return APP;
})(jQuery, window);