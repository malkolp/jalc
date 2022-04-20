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

    //default template
    $('#f-d-act-cancel').click(()=>{
        page_switcher.focus('main');
        form.forms['f-d'].clear();
    });
    $('#f-d-act-prev-1').click(()=>{
        page_switcher.focus('launch-default');
    });
    $('#f-d-act-next-1').click(()=>{
        page_switcher.focus('page-default-2');
    });
    $('#f-d-act-prev-2').click(()=>{
        page_switcher.focus('page-default-2');
    });
    $('#f-d-act-next-2').click(()=>{
        page_switcher.focus('page-default-3');
    });
    $('#f-d-act-generate').click(()=>{
        alert('generated...');
    });
    form.set(
        'f-d',
        {
            inputs          : {
                name        : {
                    id      : 'name',
                    group   : 'profile',
                    label   : 'nama',
                    ui      : $('#f-d-name')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                placeBirth  : {
                    id      : 'placeOfBirth',
                    group   : 'profile',
                    label   : 'tempat',
                    ui      : $('#f-d-placeOfBirth')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                dateBirth   : {
                    id      : 'dateOfBirth',
                    group   : 'profile',
                    label   : 'tanggal lahir',
                    ui      : $('#f-d-dateOfBirth')[0],
                    type    : 'date',
                    valid   : 'none',
                },
                gender      : {
                    id      : 'gender',
                    group   : 'profile',
                    label   : 'jenis kelamin',
                    ui      : $('#f-d-gender')[0],
                    type    : 'none',
                    valid   : 'none',
                },
                education   : {
                    id      : 'education',
                    group   : 'profile',
                    label   : 'pendidikan terakhir',
                    ui      : $('#f-d-education')[0],
                    type    : 'none',
                    valid   : 'none',
                },
                majoring    : {
                    id      : 'majoring',
                    group   : 'profile',
                    label   : 'jurusan',
                    ui      : $('#f-d-majoring')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                address     : {
                    id      : 'address',
                    group   : 'profile',
                    label   : 'alamat',
                    ui      : $('#f-d-address')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                phone       : {
                    id      : 'phone',
                    group   : 'profile',
                    label   : 'nomor telepon',
                    ui      : $('#f-d-phone')[0],
                    type    : 'text',
                    valid   : 'phone',
                },
                comName     : {
                    id      : 'comName',
                    group   : 'apply',
                    label   : 'company name',
                    ui      : $('#f-d-companyName')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                position    : {
                    id      : 'position',
                    group   : 'apply',
                    label   : 'apply for position',
                    ui      : $('#f-d-applyPosition')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                placeApply  : {
                    id      : 'placeApply',
                    group   : 'apply',
                    label   : 'place of apply',
                    ui      : $('#f-d-placeOfApply')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                dateApply   : {
                    id      : 'dateApply',
                    group   : 'apply',
                    label   : 'date of apply',
                    ui      : $('#f-d-dateOfApply')[0],
                    type    : 'date',
                    valid   : 'none',
                },
                signature   : {
                    id      : 'signature',
                    group   : 'apply',
                    label   : 'signature',
                    ui      : $('#f-d-signature')[0],
                    ctr     : $('#f-d-signature-ui-ctr'),
                    prv     : {
                        ctr : $('#f-d-signature-prev-ctr'),
                        img : $('#f-d-signature-prev'),
                        del : $('#f-d-signature-del'),
                    },
                    type    : 'image',
                    valid   : 'image',
                },
            },
            dependency      : [
                {
                    form        : 'majoring',
                    to          : 'education',
                    condition   : toVal=>{
                        return parseInt(toVal) > 2;
                    },
                }
            ],
            panes           : {
                profile     : {
                    group   : 'profile',
                    anchor  : $('#f-d-profile-anchor'),
                    add     : $('#f-d-profile-add-form'),
                },
                attachment  : {
                    group   : 'attachment',
                    anchor  : $('#f-d-attachment-anchor'),
                    add     : $('#f-d-attachment-add-form'),
                },
            },
        },
    );
})();