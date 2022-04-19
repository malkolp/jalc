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
                    label   : 'nama',
                    ui      : $('#f-d-name')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                placeBirth  : {
                    id      : 'placeOfBirth',
                    label   : 'tempat',
                    ui      : $('#f-d-placeOfBirth')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                dateBirth   : {
                    id      : 'dateOfBirth',
                    label   : 'tanggal lahir',
                    ui      : $('#f-d-dateOfBirth')[0],
                    type    : 'none',
                    valid   : 'none',
                },
                gender      : {
                    id      : 'gender',
                    label   : 'jenis kelamin',
                    ui      : $('#f-d-gender')[0],
                    type    : 'none',
                    valid   : 'none',
                },
                education   : {
                    id      : 'education',
                    label   : 'pendidikan terakhir',
                    ui      : $('#f-d-education')[0],
                    type    : 'none',
                    valid   : 'none',
                },
                majoring    : {
                    id      : 'majoring',
                    label   : 'jurusan',
                    ui      : $('#f-d-majoring')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                address     : {
                    id      : 'address',
                    label   : 'alamat',
                    ui      : $('#f-d-address')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                phone       : {
                    id      : 'phone',
                    label   : 'nomor telepon',
                    ui      : $('#f-d-phone')[0],
                    type    : 'text',
                    valid   : 'phone',
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
                    anchor  : $('#f-d-profile-anchor'),
                    add     : $('#f-d-profile-add-form'),
                },
            },
        },
    );
})();