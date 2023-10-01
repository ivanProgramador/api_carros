const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var BD = {
    carros:[

        {id:1 ,marca:'Volkswagen',ano:'1990',cor:'Vermelho',usado:'sim'},
        {id:2 ,marca:'Peugeot',ano:'1992',cor:'Azul',usado:'não'},
        {id:3 ,marca:'Chevrolet',ano:'1994',cor:'Branco',usado:'não'},
        {id:4 ,marca:'SUBARU',ano:'1996',cor:'Verde',usado:'sim'},
        {id:5 ,marca:'Volvo',ano:'2004',cor:'Preto',usado:'não'},
        {id:6 ,marca:'Mercedes',ano:'2007',cor:'Cinza',usado:'sim'},
        {id:7 ,marca:'Mazda',ano:'2023',cor:'Roxo',usado:'não'},
        
        
    ]
}

//rota selecionar todos OK

app.get('/carros',(req,res)=>{

    res.send(BD.carros);

});


//selecionar carro unico
app.get('/carro/:id',(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);
        var carro = BD.carros.find(c => c.id == id);

        if(carro != undefined){

            res.send(carro);

        }
    }
});

//rota para adicionar carro OK 

app.post('/carro',(req,res)=>{

   var {marca,ano,cor,usado} = req.body; 

    BD.carros.push({
        marca:marca,
        ano:ano,
        cor:cor,
        usado:usado
    });
    res.sendStatus(200);
});


// rota para atualizar carros  OK

app.put('/carro/:id',(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);

        var carro = BD.carros.find(c => c.id == id);

        if(carro != undefined){

            var {marca, ano, cor, usado} = req.body;

            if(marca != undefined){
                  carro.marca = marca;
            }
            if(ano != undefined){
                carro.ano = ano;
            }
            if(cor != undefined){
                carro.cor = cor;
            }
            if(usado != undefined){

                carro.usado = usado;
            }

            res.sendStatus(200);
            
            
        }
    }

});









//rota para apagar carros OK

app.delete('/carro/:id',(req,res)=>{

    if(isNaN(req.params.id)){
     
        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);
        var index = BD.carros.find(c => c.id == id);

        if(index == -1){

            res.sendStatus(404);

        }else{

             BD.carros.splice(index, 1);
             res.sendStatus(200);
        }

    }

});




app.listen(4000,()=>{
    console.log('Api online');
})