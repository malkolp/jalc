// noinspection JSUnresolvedFunction

(()=>{
    window.notify_  = {
        n           : new Notice(),
        success     : msg=>{
            notify_.n.showToast({
                text    : msg,
                type    : 'success',
            });
        },
        warning     : msg=>{
            notify_.n.showToast({
                text    : msg,
                type    : 'error',
            });
        },
        danger      : msg=>{
            notify_.n.showToast({
                text    : msg,
                type    : 'warning',
            });
        },
    };
})();