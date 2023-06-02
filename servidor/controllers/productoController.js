const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);

        await producto.save();
        res.send(producto);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarProducto = async (req, res) => {

    try {

        const {_id, producto, categoria, ubicacion, precio } = new Producto(req.body);
        let products = await Producto.findById(req.params.id);

        if(!products){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        producto._id = _id;
        products.producto = producto;
        products.categoria = categoria;
        products.ubicacion = ubicacion;
        products.precio = precio;

        console.log(products)

        products = await Producto.findOneAndUpdate({ _id: req.params.id }, products, { new: true } );
        res.json(products);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.verProducto = async (req, res) => {

    try {

        let products = await Producto.findById(req.params.id);

        if(!products){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        res.json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarProducto = async (req, res) => {

    try {

        let products = await Producto.findById(req.params.id);

        if(!products){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        products = await Producto.findOneAndRemove(req.params.id);

        res.json({ msg: 'El producto: ' + products.producto + ' se ha eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

