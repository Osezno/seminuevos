
var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const c = require('../constants');
const v = require('../validations');
const path = require('path');
const fs = require('fs');

const validation = (precio, descripcion) => {
  if (v.checkNull(precio) || v.checkNull(descripcion)) {

    c.resMessage['success'] = true
    return c.resMessage
  }
  if (v.checkLength(precio, 1, 7)) {

    c.resMessage['success'] = true
    c.resMessage[c.errors.precio]
    return c.resMessage
  }
  if (v.checkLength(descripcion, 10, 400)) {
    c.resMessage['success'] = true
    c.resMessage[c.errors.descripcion]
  }
  return c.resMessage
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const selectorStr = (str, bool) => {
  if (bool) return [`a[data-activates="${str}"]
  `, `#${str}.active`]
  else return `li[data-content="${str}"]`
}

router.post('/', async (req, res) => {
  const { precio, descripcion } = req.body
  console.log(precio, descripcion, req.body)
  const {
    url,
    uSelector,
    pSelector,
    bSelector,
    inputRecorrido,
    inputTelefono,
    inputPrecio,
    nextSelector,
    inputDescripcion,
    inputImagenes,
    finalButton
  } = c.web
  const { username, password } = c.user
  const { drop, recorrido, telefono } = c.carObj

  let valid = await validation(precio, descripcion)

  if (valid.success) {

    return res.send(valid.message);
  } else {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.type(uSelector, username);
    await page.type(pSelector, password);
    await page.click(bSelector);
    await page.waitForNavigation();
    await page.goto(c.web.sellUrl);
    await delay(c.delay)


    for (selector in drop) {
      await delay(c.delay)
      let str = selectorStr(drop[selector][0], 1)
      let val = selectorStr(drop[selector][1], 0)
      await page.waitForSelector(str[0]);
      await page.click(str[0])
      // await page.waitForSelector(str[1]);
      await page.evaluate((selector) => {
        let li = document.querySelector(selector)
        li.click()
        if (li) {
          let valueLink = li.querySelector("a")
          valueLink.click()
        }
      }, val);
    }

    await page.type(inputRecorrido, recorrido);
    //await page.type(inputTelefono, telefono);
    await page.type(inputPrecio, precio);
    await page.waitForSelector(nextSelector);
    await page.click(nextSelector);
    await page.waitForNavigation();
    await delay(c.delay)
    await page.type(inputDescripcion, descripcion);
    const inputUploadHandle = await page.$(inputImagenes);
    let images = ["1", "2", "3"]
    let imageError = [];
    images.map(async (index) => {
      try {
        await inputUploadHandle.uploadFile(`img/nissan${index}.jpg`);
      } catch (error) {
        imageError.push(index)
        // console.log(error, "try again")
        //await inputUploadHandle.uploadFile(`img/nissan${index}.jpg`);
      }
    })
    console.log(imageError)
    if (!imageError.length) {

      await delay(c.midDelay);
      console.log("before next", nextSelector)
      await page.waitForSelector(nextSelector);
      await page.click(nextSelector);
      await delay(c.bigDelay);

      try {
        await page.click(finalButton);
      } catch (error) {
        console.log(error)
      } finally {

        await delay(c.bigDelay);
        await page.screenshot({ path: path.join(__dirname, `../.tmp/seminuevos.png`) });
        await browser.close();
        var mime = 'image/png';
        var encoding = 'base64';
        var data = fs.readFileSync(path.join(__dirname, `../.tmp/seminuevos.png`)).toString(encoding);
        var uri = 'data:' + mime + ';' + encoding + ',' + data;
        c.resMessage["data"] = uri
        c.resMessage["success"] = true
        return res.send(c.resMessage);

      }
    } else {
      c.resMessage['message'] = c.errors.serverError
      return res.send(c.resMessage);

    }
  }
})

module.exports = router;