// noinspection JSUnresolvedVariable

(()=>{
    const factory           = {
        createDoc           : t=>{
            const doc       = document.implementation.createHTMLDocument();

            doc.title       = 'generated';

            return doc;
        },
        setDoc              : (d, f=window.generator_.frame)=>{
            let dest        = f.contentDocument;
            let src         = d.documentElement;
            let newNode     = dest.importNode(src, true);

            dest.replaceChild(newNode, dest.documentElement);
        },
    };

    window.switches_        = {
        switches            : {},
        set                 : x=>{
            switches_.switches[x.id]    = x.fun;
        },
    };

    window.generator_       = {
        pathPrint           : undefined,
        defStyle            : undefined,
        templates           : undefined,
        frame               : undefined,
        init                : (ins_=window.generator_)=>{
            ins_.templates  = {};
            ins_.pathPrint  = window.location.href.replace('/index.html', '') + '/printed';
            ins_.frame      = (()=>{
                const frame = document.createElement('iframe');

                frame.setAttribute('style', 'overflow:hidden;display:none;');
                frame.setAttribute('frameborder', '0');
                document.body.appendChild(frame);

                return frame;
            })();
            $.get(ins_.pathPrint + '/application.css', c=>{
                ins_.defStyle = c;
            });
        },
        setTemplate         : (t, ins_=window.generator_)=>{
            const tps_      = ins_.templates;

            tps_[t.id]      = {
                generate        : d=>{
                    const inp   = {...d.outputs};
                    const grp   = {...d.groups};
                    const out_g = {};

                    //replace inputs value
                    t.replacements.forEach(r=>{
                        inp[r.input]    = r.replace(inp[r.input]);
                    });

                    //create new input by joining multiple inputs
                    t.joins.forEach(j=>{
                        let p       = j.pattern;
                        const i     = j.inputs;
                        const l     = j.label;

                        i.forEach((e, idx)=>{
                            p       = p.replace('##'+ idx + '##', inp[e]);
                        });

                        inp[l]      = p;
                    });

                    //parse group of inputs
                    t.grouping.forEach(g=>{
                        const gr_   = g.group;
                        const trans = g.trans;
                        const arr   = grp[gr_];
                        let output  = '';

                        arr.forEach(i=>{
                            output += trans(inp[i], i);
                        });

                        out_g[gr_] = output;
                    });

                    //set into templates
                },
            };
        },
    };
    window.generator_.init();
})();