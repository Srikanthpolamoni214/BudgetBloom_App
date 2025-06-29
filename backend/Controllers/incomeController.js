
const fs = require("fs")
const path = require("path")

const incomeFile  = path.resolve("Models" , "income.json")

const incomeData = JSON.parse(fs.readFileSync(incomeFile , "utf8"))

const incomepost = (req , res) =>{

    const {source , amount,  category,date} = req.body
    const newIncome = {
        source,
        amount,
        category,
        date
        }

        const income = incomeData.push(newIncome)
        fs.writeFileSync(incomeFile , JSON.stringify(incomeData , null , 2)) 
        if (
            source && amount && category && date
        )   {
            res.json({message : "Income Added Successfully" , newIncome})
        }


        




}
const incomeGet = (req , res) =>{
    res.json(incomeData)
}

module.exports = {incomepost , incomeGet}

