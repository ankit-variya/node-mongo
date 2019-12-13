var express = require('express');
var router = express.Router();
var api = require('../model/model');

router.get('/', async (req, res) => { 
    try{
        const datas = await api.find({});
        res.json(datas);
    } catch(err){
        throw new Error(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const data = await api.findById(req.params.id);
        if(data) res.json( data );
        else res.json({message: "record not found or error finding record"});
    }
    catch (err){
        throw err.message;
    }
 });


router.post('/', (req, res) =>{
    console.log(req.body.isCompleted);
    const datas= new api({
        title: req.body.title,
        isCompleted: req.body.isCompleted

    }); 
    if(datas.save()) res.json({ mesaage: "task successfully added"}); 
    else res.json("Error saving Task");
 });

router.put('/:id', async (req, res) => {
    
    try{
        const data = await api.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            isCompleted: req.body.isCompleted,
        });
        if(data) res.json({ message: "task updated successfully"});
        else res.json({message: "record not found or error updating"});
    }
    catch (err){
        res.json({ message: err.messsage});
    }

 });

router.delete('/:id', async (req, res) => {
    try{
        const data = await api.findByIdAndDelete(req.params.id);
        if(data) res.json({ message: "task deleted successfully"});
        else res.json({message: "record not found or error deleting"});
    }
    catch (err){
        throw err;
    }
 });
 
module.exports = router;