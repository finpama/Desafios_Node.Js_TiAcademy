const express = require('express');
const cors = require('cors');
const models = require('./models')

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;



app.get('/', function (req, res) {
	res.send('<h1>hello world!</h1>')
});




app.post('/servico/novo', async (req, res) => {
	await servico.create(req.body)
		.then(function () {
			return res.json({
				"message": "(V) O serviço foi criado com sucesso"
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "(X) O serviço não foi criado",
				"errorMessage": err
			});
		});
});

app.post('/cliente/novo', async (req, res) => {
	await cliente.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "(V) O cliente foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "(X) O cliente NÃO foi criado",
				"errorMessage": err
			});
		});
});

app.post('/pedido/novo', async (req, res) => {
	await pedido.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "(V) O Pedido foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "(X) O Pedido NÃO foi criado",
				"errorMessage": err
			});
		});
});

app.post('/item-pedido/novo', async (req, res) => {
	await itemPedido.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "(V) O itemPedido foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "(X) O itemPedido NÃO foi criado",
				"errorMessage": err
			});
		});
});



app.get('/servico/lista', async (req, res) => {
	await servico.findAll({       //https://sequelize.org/master/manual/model-querying-basics.html
		order: [['nome', 'ASC']]  //                 ------------------------>                    /\#ordering-and-grouping 
	})
		.then(function (servicos) {
			res.json({ servicos })
		});
})

app.get('/servico/quantia', async (req, res) => {
	await servico.count('id')
		.then(function (servicos) {
			res.json({ servicos });
		});
});

app.get('/servico/:id', async (req, res) => {
	await servico.findByPk(req.params.id)
	.then((servico) => {
		if (servico != null) {
			res.json({
				"error": false,
				servico
			});
		}else {
			res.json({
				"error": true,
				"message": "Serviço não encontrado"
			});
		}
	})
	.catch(err => {
		res.json({
			"error": true,
			"message": err
		});
	});
});



app.get('/cliente/lista', async (req, res) => {
	await cliente.findAll({
		order: [['createdAt', 'ASC']]
	})
		.then(function (clientes) {
			res.json({ clientes })
		});
})

app.get('/cliente/quantia', async (req, res) => {
	await cliente.count('id')
		.then(function (clientes) {
			res.json({ clientes });
		});
});

app.get('/cliente/:id', async (req, res) => {
	await cliente.findByPk(req.params.id)
	.then((cliente) => {
		if (cliente != null) {
			res.json({
				"error": false,
				cliente
			});
		}else {
			res.json({
				"error": true,
				"message": "Cliente não encontrado"
			});
		}
	})
	.catch(err => {
		res.json({
			"error": true,
			"message": err
		});
	});
});



app.get('/pedido/lista', async (req, res) => {
	await pedido.findAll({
		order: [['id', 'ASC']]
	})
		.then(function (pedidos) {
			res.json({ pedidos })
		});
})

app.get('/pedido/quantia', async (req, res) => {
	await pedido.count('id')
		.then(function (pedidos) {
			res.json({ pedidos });
		});
});

app.get('/pedido/:id', async (req, res) => {
	await pedido.findByPk(req.params.id)
	.then((pedido) => {
		if (pedido != null) {
			res.json({
				"error": false,
				pedido
			});
		}else {
			res.json({
				"error": true,
				"message": "pedido não encontrado"
			});
		}
	})
	.catch(err => {
		res.json({
			"error": true,
			"message": err
		});
	});
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
	console.log(`Servidor ativo: http://localhost:3001`);
});