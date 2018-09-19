(function() {
    var parent = window.parent;
    //dialog对象
    dialog = parent.$EDITORUI[window.frameElement.id.replace(/_iframe$/, '')];
    //当前打开dialog的编辑器实例
    editor = dialog.editor;

    UE = parent.UE;

    domUtils = UE.dom.domUtils;

    utils = UE.utils;

    browser = UE.browser;

    ajax = UE.ajax;

    $G = function(id) {
        return document.getElementById(id)
    };

    oss = function() {
        var os = JSON.parse(localStorage.getItem('os')) || {
            host: ''
        }
        return {
            option: { os: os },
            vaildOssSign: function() {
                if (!os.expire || parseInt(os.expire, 10) < Date.parse(new Date()) / 1000) {
                    this.getOssSignHolder()
                } else {
                    editor.options.videoActionName = os.host
                }
            },
            getOssSignHolder: function() {
                var _this = this
                $.ajax({
                    url: apiRoot + 'pre-upload-video',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    // xhrFields: {
                    //     withCredentials: true
                    // },
                    headers: {
                        'token': $.cookie('token')
                    },
                    // data: '{"domain": "10.0.51.103:9550"}',
                    success: function(res) {
                        console.log(res);
                        if (res.errcode === 200) {
                            _this.option.os = res.data
                            localStorage.setItem('os', JSON.stringify(res.data))
                            editor.options.imageActionName = res.data.host
                        } else {
                            console.log()
                        }
                    },
                    error: function(res) {
                        console.log(res);
                    }
                })
            }
        }
    }
    oss = new oss()
    oss.vaildOssSign()
})();
