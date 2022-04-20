// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures,SpellCheckingInspection

(()=>{
    const factory           = {
        validation          : {
            text            : i=>{
                const e     = i.ui;

                $(e).on('input', ()=>{
                    const pass  = /^ *$/m.exec(e.value) == null;

                    if (pass)
                        i.val   = e.value;
                    i.pass      = pass;
                });
            },
            phone           : i=>{
                const e     = i.ui;

                $(e).on('input', ()=>{
                    const tmp       = e.value.replaceAll(/[ \-]+/g, '');
                    const pass      = /^[\d]+$/m.exec(tmp) != null && (tmp.length > 8 && tmp.length < 15);

                    if (pass)
                        i.val       = e.value;
                    i.pass          = pass;
                });
            },
            image           : i=>{
                const   e           = i.ui,
                        e_ui_ctr    = i.ctr,
                        e_prv_ctr   = i.prv.ctr,
                        e_prv_img   = i.prv.img,
                        e_prv_del   = i.prv.del,
                        reader      = new FileReader();

                e_prv_ctr.addClass('d-none');
                e_prv_del.click(()=>{
                    i.val           = undefined;
                    i.pass          = false;
                    e_prv_img[0].setAttribute('src', '');
                    e_prv_ctr.addClass('d-none');
                    e_ui_ctr.removeClass('d-none');
                });
                $(e).change(()=>{
                    const file      = e.files[0];

                    if (file !== undefined)
                        reader.readAsDataURL(file);
                });
                reader.addEventListener('load', ()=>{
                    i.val           = reader.result;
                    i.pass          = true;
                    e_prv_img[0].setAttribute('src', reader.result);
                    e_prv_ctr.removeClass('d-none');
                    e_ui_ctr.addClass('d-none');
                });
            },
            none            : i=>{
                i.pass      = true;
                $(i.ui).change(()=>{
                    i.val   = i.ui.value;
                });
            },
        },
        createForm          : (id, name, type='text')=>{
            const x         = document.createElement('div');

            x.setAttribute('class', 'mt-3');
            x.innerHTML     = '<span class="d-block small text-muted"><span class="app-form-label-option"><span class="mr-2 text-danger"><i class="fa fa-trash app-btn-icon"></i></span><span class="mr-2"><i class="fa fa-pencil app-btn-icon"></i></span></span><span class="d-inline-block"><label for="">'+name+'</label></span><span class="app-form-label-option"><span class="ml-2"><i class="fa fa-check app-btn-icon"></i></span></span></span><input id="'+id+'" type="'+type+'" class="form-control form-control-sm" placeholder="'+name+'">';

            return x.lastElementChild;
        },
        animateForm         : (i, x)=>{
            const label     = i.ui.previousElementSibling;
            const labOpt    = label.firstElementChild;
            const labLab    = label.children[1].firstElementChild;
            const labSub    = label.lastElementChild;
            const subWidth  = labSub.offsetWidth;
            const width     = labOpt.offsetWidth;
            let focused     = false;

            labOpt.setAttribute('style', 'width: 0');
            labSub.setAttribute('style', 'width: 0');

            $(label).
            mouseenter(()=>{
                if (!focused) {
                    $(labOpt).animate({width:width+'px'}, 300, ()=>{
                    });
                }
            }).
            mouseleave(()=>{
                if (!focused) {
                    $(labOpt).animate({width:0}, 300, ()=>{
                    });
                }
            });
            $(labOpt.firstElementChild).click(()=>{
                x.remInput(x.id + '-' + i.id);
            });
            $(labOpt.lastElementChild).click(()=>{
                labLab.setAttribute('contentEditable', 'true');
                $(labLab).addClass('pl-2 pr-2');
                $(labOpt).animate({width:0}, 300, ()=>{
                    i.ui.disabled = true;
                });
                $(labSub).animate({width:subWidth + 'px'}, 300);
                focused = true;
                $(labLab).focus();
            });
            $(labLab).keypress(e=>{return e.which !== 13;});
            $(labSub.firstElementChild).click(()=>{
                const val           = labLab.innerText;
                if (/^ *$/m.exec(val) == null && val !== i.label) {
                    const lab       = factory.normalizeLabel(val, x);

                    delete x.labels[i.label];
                    x.labels[lab]   = i
                    i.label         = lab;
                    i.ui.setAttribute('placeholder', lab);
                }
                else
                    labLab.innerText = i.label;
                labLab.setAttribute('contentEditable', 'false');
                $(labLab).removeClass('pl-2 pr-2');
                i.ui.disabled = false;
                labSub.setAttribute('style', 'width: 0;');
                focused = false;
            });
        },
        normalizeLabel      : (l, x)=>{
            let tmp     = l;
            let iter    = 2;

            while (x.labels[tmp] !== undefined)
                tmp     = l + ' ' + iter++;

            return tmp;
        },
        randomId            : (length=6)=>{
            let result      = '';
            let chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charLen     = chars.length;
            for (let i = 0; i < length; i++ )
                result += chars.charAt(Math.floor(Math.random() * charLen));

            return result;
        },
    };

    window.form             = {
        forms               : undefined,
        init                : ()=>{
            form.forms      = {};
        },
        set                 : (id, o)=>{
            if (typeof id === "string" && id !== '') {
                const inputs    = o.inputs;
                const depends   = o.dependency;
                const panes     = o.panes;
                const x         = {
                    id          : id,
                    head        : undefined,
                    tail        : undefined,
                    inputs      : {},
                    labels      : {},
                };

                x.setInput      = (key, input)=>{
                    if (x.head === undefined) {
                        x.head      = input;
                        x.tail      = input;
                    }
                    else {
                        x.tail.next = input;
                        input.prev  = x.tail;
                        x.tail      = input;
                    }

                    x.inputs[key]           = input;
                    x.labels[input.label]   = input;
                };
                x.addInput      = (key, input, anchor)=>{
                    x.setInput(key, input);
                    anchor.parentNode.insertBefore(input.ui.parentNode, anchor);
                };
                x.remInput      = key=>{
                    const i     = x.inputs[key];

                    if (i !== undefined) {
                        if (x.head === i)
                            x.head  = x.head.next;
                        if (x.tail === i)
                            x.tail  = x.tail.prev;
                        if (i.prev !== undefined)
                            i.prev.next = i.next;
                        if (i.next !== undefined)
                            i.next.prev = i.prev;

                        i.ui.parentNode.parentNode.removeChild(i.ui.parentNode);
                        delete x.labels[i.label];
                        delete x.inputs[key];
                    }
                };
                x.forEach       = (fun=()=>{})=>{
                    let pointer = x.head;

                    while (pointer !== undefined) {
                        fun(pointer);
                        pointer = pointer.next;
                    }
                };
                x.clear         = ()=>{
                    const customs   = [];
                    x.forEach(i=>{
                        if (i.custom)
                            customs.push(i);
                        else {
                            i.val   = '';
                            i.pass  = i.type === 'none';
                        }

                    });
                    customs.forEach(e=>{
                        x.remInput(id + '-' + e.id);
                    });
                };
                x.getData       = ()=>{
                    const out   = {};

                    x.forEach(i=>{
                        if (i.depend === undefined)
                            out[i.label] = i.val;
                        else if (i.pass && i.depend.condition(i.depend.to.ui.value))
                            out[i.label] = i.val;
                    });

                    return out;
                };

                for (let key in panes) {
                    const p     = panes[key];
                    const add   = p.add;
                    const acr   = p.anchor;

                    add.click(()=>{
                        const nid   = factory.randomId();
                        const kid   = id + '-' + nid;
                        const lab   = factory.normalizeLabel('new form', x);
                        const i     = {
                            id      : nid,
                            group   : p.group,
                            label   : lab,
                            ui      : factory.createForm(kid,lab),
                            type    : 'text',
                            valid   : 'text',
                            pass    : false,
                            val     : '',
                            custom  : true,
                        };

                        x.addInput(kid, i, acr[0]);
                        factory.validation.text(i);
                        factory.animateForm(i, x);
                    });
                }
                for (let key in inputs) {
                    const i     = inputs[key];

                    i.val       = undefined;
                    i.pass      = false;

                    x.setInput(id + '-' + i.id, i);
                    factory.validation[i.valid](i);
                }
                depends.forEach(d=>{
                    const from  = x.inputs[id + '-' + d.form];
                    const to    = x.inputs[id + '-' + d.to];

                    if (from !== undefined && to !== undefined) {
                        const ui        = from.ui;
                        const par       = $(from.ui.parentNode);

                        from.depend     = {
                            to          : to,
                            condition   : d.condition,
                        };

                        if (!d.condition(to.ui.value))
                            par.addClass('d-none');
                        $(to.ui).change(()=>{
                            let toggle  = 'addClass';
                            const pass  = d.condition(to.ui.value);

                            if (pass)
                                toggle  = 'removeClass';
                            else
                                ui.value= '';

                            par[toggle]('d-none');
                        });
                    }
                });

                form.forms[id]  = x;

                return x;
            }

            return undefined;
        },
    };

    form.init();
})();