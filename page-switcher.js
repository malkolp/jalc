// noinspection JSUnresolvedFunction

(()=>{
    window.page_switcher    = {
        focused             : undefined,
        memory              : undefined,
        init                : (ins_=page_switcher)=>{
            ins_.memory     = {};
        },
        set                 : (pageId, ins_=page_switcher)=>{
            if (typeof pageId === 'string' && pageId !== '') {
                const x             = $('[data-page="'+pageId+'"]');

                ins_.memory[pageId] = x;
                x.addClass('d-none');

                return x;
            }

            return $();
        },
        refresh             : (pageId, ins_=page_switcher)=>{
            const onFocus   = ins_.focused !== undefined && ins_.memory[pageId] === ins_.focused;
            const x         = ins_.set(pageId);

            if (onFocus)
                x.removeClass('d-none');
        },
        focus               : (pageId, memory=page_switcher.memory, y=page_switcher.focused)=>{
            const x         = memory[pageId];
            if (x !== undefined) {
                if (y !== undefined)
                    y.addClass('d-none');
                x.removeClass('d-none');
                page_switcher.focused = x;
            }
        },
    };
    page_switcher.init();
})();