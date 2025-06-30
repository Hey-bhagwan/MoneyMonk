import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook",async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation:{
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    };

    // Validate incoming request
    const status = await db.onRampTransaction.findFirst({
        where: {
            token: paymentInformation.token,
            status: "Processing"
        }
    });
    // Check if the transaction exists and is still processing
    if (!status) {
        return res.status(404).json({
            message: "Transaction not found or already processed"
        });
    }
    // Update balance in db, add txn
    try{
        await db.$transaction([
            db.balance.update({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment: Number(paymentInformation.amount)*100
                    }
                }
            }),
        
            db.onRampTransaction.update({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status: "Success"
                }
            })
        ]);

        res.json({
            message : "success"
        })

        return;
    }catch(e){
        console.error(e);
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3002,() =>{
    console.log("Server is running on port 3002");
    
})