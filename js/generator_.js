// noinspection JSUnresolvedVariable

(()=>{
    window.switches_        = {
        switches            : {},
        set                 : x=>{
            switches_.switches[x.id]    = x.fun;
        },
    };

    window.generator_       = {
        templates           : undefined,
        frame               : undefined,
        init                : (ins_=window.generator_)=>{
            ins_.templates  = {};
            ins_.frame      = $('#print')[0];
        },
        setTemplate         : (t, ins_=window.generator_)=>{
            const tps_      = ins_.templates;
            const x         = {content:undefined};

            x.generate      = d=>{
                const inp   = {...d.outputs};
                const grp   = {...d.groups};
                const out_g = {};
                let gen     = '';

                //replace inputs value
                t.tpl.replacements.forEach(r=>{
                    inp[r.input]    = r.replace(inp[r.input]);
                });

                //create new input by joining multiple inputs
                t.tpl.joins.forEach(j=>{
                    let p       = j.pattern;
                    const i     = j.inputs;
                    const l     = j.label;

                    i.forEach((e, idx)=>{
                        const ex = inp[e];
                        if (ex !== undefined)
                            p    = p.replace('##'+ idx + '##', ex);
                    });

                    inp[l]      = p;
                });

                //parse group of inputs
                t.tpl.grouping.forEach(g=>{
                    const gr_   = g.group;
                    const trans = g.trans;
                    const arr   = grp[gr_];
                    let output  = '';

                    if (arr !== undefined)
                        arr.forEach(i=>{output += trans(inp[i], i);});

                    out_g[gr_] = output;
                });

                //set into templates
                t.tpl.template.forEach(f=>{
                    gen    += f(inp, out_g);
                });

                x.content   = '<div class="content flex flex-col font-12">' + gen + '</div>';
            };
            x.print         = ()=>{
                const frame = window.generator_.frame;
                const head  = frame.contentDocument.head;
                const body  = frame.contentDocument.body;

                head.innerHTML = '<meta charset="UTF-8">';
                head.appendChild((()=>{
                    const s = document.createElement('style');
                    s.innerHTML = 'body {margin: 0;padding: 0;width: 100%;height: 100vh;}.content {height: 100%;line-height: 1.5rem;}/*FONT-SIZE*/.font-8 {font-size: 8pt;}.font-9 {font-size: 9pt;}.font-10 {font-size: 10pt;}.font-12 {font-size: 12pt;}.font-14 {font-size: 14pt;}.font-16 {font-size: 16pt;}.font-18 {font-size: 18pt;}.font-20 {font-size: 20pt;}.font-22 {font-size: 22pt;}.font-24 {font-size: 24pt;}.font-32 {font-size: 32pt;}/*POSITION*/.p-relative {position: relative;}.p-absolute {position: absolute;}/*FLEX*/.flex {display: flex;}.flex-row {flex-direction: row;}.flex-col {flex-direction: column;}.flex-col-reverse {flex-direction: column-reverse;}.flex-grow-0 {flex-grow: 0;}.flex-grow-1 {flex-grow: 1;}/*TEXT ALIGN*/.text-left {text-align: left;}.text-center {text-align: center;}.text-right {text-align: right;}.text-justify {text-align: justify;}/*OPACITY*/.opacity-0 {opacity: 0;}/*WIDTH*/.w-100 {width: 100%;}.w-75 {width: 75%;}.w-50 {width: 50%;}.w-25 {width: 25%;}.w-10 {width: 10%;}/*height*/.h-100 {height: 100px;}.h-75 {height: 75px;}.h-50 {height: 50px;}.h-25 {height: 25px;}.h-10 {height: 10px;}/*MARGIN*/.m-0 {margin: 0;}.m-1 {margin: 1rem;}.m-2 {margin: 2rem;}.m-3 {margin: 3rem;}.m-4 {margin: 4rem;}.m-5 {margin: 5rem;}.mt-0 {margin-top: 0;}.mt-1 {margin-top: 1rem;}.mt-2 {margin-top: 2rem;}.mt-3 {margin-top: 3rem;}.mt-4 {margin-top: 4rem;}.mt-5 {margin-top: 5rem;}.ml-0 {margin-left: 0;}.ml-1 {margin-left: 1rem;}.ml-2 {margin-left: 2rem;}.ml-3 {margin-left: 3rem;}.ml-4 {margin-left: 4rem;}.ml-5 {margin-left: 5rem;}.mb-0 {margin-bottom: 0;}.mb-1 {margin-bottom: 1rem;}.mb-2 {margin-bottom: 2rem;}.mb-3 {margin-bottom: 3rem;}.mb-4 {margin-bottom: 4rem;}.mb-5 {margin-bottom: 5rem;}.mr-0 {margin-right: 0;}.mr-1 {margin-right: 1rem;}.mr-2 {margin-right: 2rem;}.mr-3 {margin-right: 3rem;}.mr-4 {margin-right: 4rem;}.mr-5 {margin-right: 5rem;}/*PADDING*/.p-0 {padding: 0;}.p-1 {padding: 1rem;}.p-2 {padding: 2rem;}.p-3 {padding: 3rem;}.p-4 {padding: 4rem;}.p-5 {padding: 5rem;}.pt-0 {padding-top: 0;}.pt-1 {padding-top: 1rem;}.pt-2 {padding-top: 2rem;}.pt-3 {padding-top: 3rem;}.pt-4 {padding-top: 4rem;}.pt-5 {padding-top: 5rem;}.pl-0 {padding-left: 0;}.pl-1 {padding-left: 1rem;}.pl-2 {padding-left: 2rem;}.pl-3 {padding-left: 3rem;}.pl-4 {padding-left: 4rem;}.pl-5 {padding-left: 5rem;}.pb-0 {padding-bottom: 0;}.pb-1 {padding-bottom: 1rem;}.pb-2 {padding-bottom: 2rem;}.pb-3 {padding-bottom: 3rem;}.pb-4 {padding-bottom: 4rem;}.pb-5 {padding-bottom: 5rem;}.pr-0 {padding-right: 0;}.pr-1 {padding-right: 1rem;}.pr-2 {padding-right: 2rem;}.pr-3 {padding-right: 3rem;}.pr-4 {padding-right: 4rem;}.pr-5 {padding-right: 5rem;}@media print {@page {size: A4;margin: 2cm;}}';
                    return s;
                })());
                body.innerHTML = x.content;
                head.appendChild((()=>{
                    const s = document.createElement('script');

                    s.setAttribute('src', 'paged.js');

                    return s;
                })());
                frame.contentWindow.print();
            }

            tps_[t.id]  = x;

            return x;
        },
    };
    window.generator_.init();
})();