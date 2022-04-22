// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

(()=>{
    //constant object control
    const forms     = {};
    const templates = {};

    //init required components
    switches_.set({
        id      : 'education',
        fun     : x=>{
            switch (x) {
                case '1'    :
                    x       = 'Sekolah Dasar (SD)';
                    break;
                case '2'    :
                    x       = 'Sekolah Menengah Pertama (SMP)';
                    break;
                case '3'    :
                    x       = 'Sekolah Menengah Atas (SMA)';
                    break;
                case '4'    :
                    x       = 'Diploma';
                    break;
                case '5'    :
                    x       = 'Sarjana';
                    break;
                case '6'    :
                    x       = 'Magister';
                    break;
                case '7'    :
                    x       = 'Doktor';
                    break;
                default     :
                    x       = 'Tidak bersekolah';
                    break;
            }

            return x;
        },
    });

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
        page_switcher.focus('page-default-4');
    });
    $('#f-d-act-prev-3').click(()=>{
        page_switcher.focus('page-default-3');
    });

    //generate
    $('[data-gen-template]').click(e=>{
        let tmp, frm, x, y;
        let tar     = e.target;

        while (tar.nodeName !== 'DIV')
            tar     = tar.parentNode;
        x           = tar.getAttribute('data-gen-template');
        y           = tar.getAttribute('data-form');

        if (x !== null && y !== null) {
            tmp     = templates[x];
            frm     = forms[y];

            frm.checkError(f=>{
                tmp.generate(f.getData());
                setTimeout(()=>{
                   tmp.print();
                });
            }, ()=>{
                notify_.danger('form has empty or invalid value');
            });
        }
    });

    templates['f_d_simple']     = generator_.setTemplate({
        id          : 'f-d-sim',
        tpl         : {
            font            : {
                link        : '',
                name        : 'Times New Roman',
            },
            replacements    : [
                {
                    input   : 'pendidikan terakhir',
                    replace : x=>{
                        return switches_.switches['education'](x);
                    },
                }
            ],
            joins           : [
                {
                    inputs  : ['tempat', 'tanggal lahir'],
                    pattern : '##0##, ##1##',
                    label   : ['tempat/ tanggal lahir'],
                },
                {
                    inputs  : ['tempat pengajuan', 'tanggal pengajuan'],
                    pattern : '##0##, ##1##',
                    label   : ['tempat/ tanggal pengajuan'],
                },
                {
                    inputs  : ['pendidikan terakhir', 'jurusan'],
                    pattern : '##0##/ ##1##',
                    label   : ['pendidikan'],
                },
            ],
            grouping        : [
                {
                    group   : 'cst-profile',
                    trans   : (v, l)=>{
                        return '<tr><td>'+l+'</td><td>:</td><td>'+v+'</td></tr>';
                    },
                },
                {
                    group   : 'attachment',
                    trans   : v=>{
                        return '<li>'+v+'</li>';
                    },
                },
            ],
            template        : [
                i=>{
                    return '<div class="head flex flex-row"><div class="flex-grow-1"><br></div><div class="flex flex-col flex-grow-0"><div class="flex-grow-0">'+i['tempat/ tanggal pengajuan']+'</div><div class="flex-grow-0"><br></div><div class="flex-grow-0">Kepada Yth :</div><div class="flex-grow-0">Pimpinan HRD '+i['nama perusahaan']+'</div><div class="flex-grow-0"><br></div><div class="flex-grow-0">Di Tempat,</div></div></div>';
                },
                (i, g)=>{
                    return '<div class="flex flex-col flex-grow-0"><div class="flex-grow-0">Saya yang bertanda tangan di bawah ini,</div><div class="flex-grow-0"><br></div><div class="ml-2"><table class="w-100"><tbody><tr><td>Nama</td><td>:</td><td>'+i['nama']+'</td></tr><tr><td>Tempat, tanggal lahir</td><td>:</td><td>'+i['tempat/ tanggal lahir']+'</td></tr><tr><td>Jenis kelamin</td><td>:</td><td>'+i['jenis kelamin']+'</td></tr><tr><td>Pendidikan terakhir</td><td>:</td><td>'+i['pendidikan terakhir']+'</td></tr><tr><td>Alamat</td><td>:</td><td>'+i['alamat']+'</td></tr><tr><td>Nomor Telepon/HP</td><td>:</td><td>'+i['nomor telepon']+'</td></tr>'+g['cst-profile']+'</tbody></table></div></div><div class="flex-grow-0"><br></div>';
                },
                (i, g)=>{
                    return '<div class="flex-grow-0">Dengan ini menyampaikan permohonan kepada bapak/ibu, agar kiranya dapat menjadikansaya sebagai karyawan di perusahaan yang bapak/ibu kelola sebagai '+i['posisi']+'.</div><div class="flex-grow-0"><br></div><div class="flex-grow-0">Sebagai bahan pertimbangan bapak/ibu, bersama ini saya lampirkan:</div><div class="flex-grow-0 ml-2"><ol class="pl-1">'+g['attachment']+'</ol></div><div class="flex-grow-0">Demikian surat lamaran ini saya sampaikan, besar harapan saya agar bapak/ibudapat mempertimbangkannya, atas perhatiannya saya ucapkan terima kasih.</div><div class="flex-grow-1"><br></div><div class="flex flex-row"><div class="flex-grow-1"><br></div><div class="flex flex-col flex-grow-0 text-center"><div class="flex-grow-0">Hormat saya,</div><div class="flex-grow-1 h-75 p-relative"><img class="h-75" src="'+i['tanda tangan']+'" alt=""><br></div><div class="flex-grow-0">'+i['nama']+'</div></div></div><div class="flex-grow-0 h-50"><br></div>';
                },
            ],
        },
    });
    templates['f_d_sidebar']    = generator_.setTemplate({
        id          : 'f-d-sid',
        tpl         : {
            font            : {
                link        : '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">',
                name        : 'Raleway',
            },
            replacements    : [
                {
                    input   : 'pendidikan terakhir',
                    replace : x=>{
                        return switches_.switches['education'](x);
                    },
                }
            ],
            joins           : [
                {
                    inputs  : ['tempat', 'tanggal lahir'],
                    pattern : '##0##, ##1##',
                    label   : ['tempat/ tanggal lahir'],
                },
                {
                    inputs  : ['tempat pengajuan', 'tanggal pengajuan'],
                    pattern : '##0##, ##1##',
                    label   : ['tempat/ tanggal pengajuan'],
                },
                {
                    inputs  : ['pendidikan terakhir', 'jurusan'],
                    pattern : '##0##/ ##1##',
                    label   : ['pendidikan'],
                },
            ],
            grouping        : [
                {
                    group   : 'cst-profile',
                    trans   : v=>{
                        return '<div class="flex-grow-0 fw-medium mb-0-5">'+v+'</div>';
                    },
                },
                {
                    group   : 'attachment',
                    trans   : v=>{
                        return '<li>'+v+'</li>';
                    },
                },
            ],
            template        : [
                (i, g)=>{
                    console.log(i);
                    return '<div class="flex flex-grow-1 flex-row line-1-75"><div class="flex-grow-0 w-25 pr-2 pl-1 br-1 b-secondary"><h1 class="flex-grow-0 font-32 line-3-5 fw-black text-capitalize text-dark">surat<br>lamaran<br>kerja</h1><div class="flex-grow-0"><br><br></div><div class="flex-grow-0 fw-medium mb-2">Kepada :</div><div class="flex-grow-0"><span class="fw-bolder text-capitalize">Pimpinan '+i['nama perusahaan']+'</span></div><div class="flex-grow-0"><br><br></div><div class="flex-grow-0 fw-medium mb-2">Dari :</div><div class="flex-grow-0 mb-0-5"><span class=" fw-bolder text-capitalize">'+i['nama']+'</span><span class="fw-medium">,</span></div><div class="flex-grow-0 fw-medium text-capitalize mb-0-5">'+i['tempat/ tanggal lahir']+',</div><div class="flex-grow-0 fw-medium text-capitalize mb-0-5">'+i['alamat']+',</div><div class="flex-grow-0 fw-medium mb-0-5">'+i['pendidikan']+',</div><div class="flex-grow-0 fw-medium text-capitalize mb-0-5">'+i['nomor telepon']+'.</div>'+g['cst-profile']+'</div><div class="flex flex-grow-1 pr-1 pl-2 flex-col"><div class="flex flex-grow-0 flex-row"><div class="flex-grow-1"><br></div><div class="flex flex-grow-0 flex-col text-right fw-medium"><div class="text-capitalize mb-0-5">'+i['tempat/ tanggal pengajuan']+'</div><div class="text-capitalize mb-0-5">hal: lamaran pekerjaan</div></div></div><div class="flex-grow-1"><br></div><div class="flex-grow-0 fw-medium mb-1">Dengan Hormat</div><div class="flex-grow-0 mb-0-5"><p class="text-justify fw-medium">Dengan ini saya mengajukan surat lamaran pekerjaan kepada Bapak/Ibu Pimpinan PT. '+i['nama perusahaan']+' untuk dapat diterima menjadi staff '+i['posisi']+' di perusahaan yang Bapak/Ibu pimpin.<br>Sebagai bahan pertimbangan bersama ini saya lampirkan :</p></div><div class="flex-grow-0 mb-0-5"><ol class="pl-1 fw-medium">'+g['attachment']+'</ol></div><div class="flex-grow-0 mb-0-5"><p class="text-justify fw-medium">Demikian surat yang saya buat, besar harapan saya untuk dapat diterima di Perusahaan ini. Atasperhatian Bapak/Ibu pimpinan berikut, saya ucapkan banyak terima kasih.</p></div><div class="flex-grow-1"><br></div><div class="flex flex-row fw-medium"><div class="flex-grow-1"><br></div><div class="flex flex-col flex-grow-0 text-center"><div class="flex-grow-0">Hormat saya,</div><div class="flex-grow-1 h-75 p-relative"><img class="h-75" src="'+i['signature']+'" alt=""><br></div><div class="flex-grow-0">'+i['nama']+'</div></div></div><div class="flex-grow-1"><br></div></div></div>';
                },
            ],
        },
    });

    forms['default']            = form.set( 'f-d',
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
                    valid   : 'date',
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
                    label   : 'nama perusahaan',
                    ui      : $('#f-d-companyName')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                position    : {
                    id      : 'position',
                    group   : 'apply',
                    label   : 'posisi',
                    ui      : $('#f-d-applyPosition')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                placeApply  : {
                    id      : 'placeApply',
                    group   : 'apply',
                    label   : 'tempat pengajuan',
                    ui      : $('#f-d-placeOfApply')[0],
                    type    : 'text',
                    valid   : 'text',
                },
                dateApply   : {
                    id      : 'dateApply',
                    group   : 'apply',
                    label   : 'tanggal pengajuan',
                    ui      : $('#f-d-dateOfApply')[0],
                    type    : 'date',
                    valid   : 'date',
                },
                signature   : {
                    id      : 'signature',
                    group   : 'apply',
                    label   : 'tanda tangan',
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
                    group   : 'cst-profile',
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