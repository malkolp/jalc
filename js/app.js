// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

(()=>{
    //main page
    $('#use-default').click(()=>{
        page_switcher.focus('launch-default');
    });
    $('#use-stylish').click(()=>{
        page_switcher.focus('launch-stylish');
    });
    $('#use-timeline').click(()=>{
        page_switcher.focus('launch-timeline');
    });
})();