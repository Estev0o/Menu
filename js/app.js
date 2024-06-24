$(document).ready(function () {
    menu.events.init();
})

var menu = {};

menu.events = {
    init:() => {
        menu.methods.listItensMenu();
    }
}

menu.methods = {
    listItensMenu: (categoria = 'burgers', more = false) => {
        var filter = MENU[categoria]

        if (!more) 
        {
            $("#menuItens").html('')
            $("#btnSeeMore").remove('hidden');
        }

        $.each(filter, (i,e) => {
            let temp = menu.models.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))

            if (more && i >= 8 && i <12) 
            {
                $("#menuItens").append(temp)
            }

            if (!more && i < 8)  
            {
                $("#menuItens").append(temp)
            }
            
        })

        $(".container-menu a").removeClass('active');
        $("#menu-"+ categoria).addClass('active');
    },

    varMais: () => {

        var activeBtn = $(".container-menu a.active").attr('id').split('menu-')[1];
        menu.methods.listItensMenu(activeBtn, true);

        $("#btnSeeMore").addClass('hidden');
    }
}

menu.models = {
    item: `
        <div class="col-3 mb-5">
                            <div class="card card-item">
                                <div class="img-product">
                                    <img src="\${img}" />
                                </div>

                                <p class="title-product text-center mt-4">
                                    <b>\${name}</b>
                                </p>

                                <p class="price-product text-center">
                                    <b>
                                        R$ \${price}
                                    </b>
                                </p>

                                <div class="add-buy">
                                    <span class="btn-minus"><i class="fas fa-minus"></i></span>
                                    <span class="add-number-itens">0</span>
                                    <span class="btn-plus"><i class="fas fa-plus"></i></span>
                                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                                </div>
                            </div>
                        </div>

    `
}

