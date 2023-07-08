import dataController from "./data-controller.js";

class ViewController {
    getNumber(req, res){
        dataController.returnNumber().then(number => {
            res.status(200).send(number);
        }).catch(err => {
            res.status(500).send('Internal server error');
        })
    }

    async postNumber(req, res){
       dataController.updateNumber(req.body.number).then(_ => {
           res.status(200).send();
       }).catch(err => {
        res.status(500).send('Internal server error');
    })

      }
}

export default new ViewController();