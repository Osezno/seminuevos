
var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

router.post('/', async (req, res) => {
  const { precio, descripcion } = req.body
  console.log(precio, descripcion)
  // const semiNuevosObj = {
  //   tipo: "autos",
  //   marca: "Acura",
  //   modelo: "ILX",
  //   subtipo: "Sedán",
  //   año: "2018",
  //   estado: "Nuevo León",
  //   ciudadDelegacion: "Monterrey",
  //   recorrido: "20000 kms",
  //   precio: precio,
  //   transacción: "Negociable",
  //   descripción: descripcion,
  //   imagenes: "Sube 3 fotos, las que sean.",
  //   paquete: "Free",
  // }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.seminuevos.com/');
  await page.screenshot({ path: 'example.png' });
  
  await browser.close();
   
  return res.send('regresa foto');
})
// About page route.

module.exports = router;