import { Router } from "express";
import { User } from "../Entities/users";

const router = Router();
//Get all users
router.get('/', async (req, res) => {
    const users = await User.find({relations:{posts:true}});
    res.json({ data: users })
})
// Get a specific user by id
router.get('/:id', async (req, res) => {
    const id = +(req.params.id)
    const user = await User.findOneBy({ id });
    res.json({ data: user })
})
//Create a new user
router.post('/', async (req, res) => {
    try {
        const { firstName,
            lastName,
            email } = req.body;
        const user = User.create({
            firstName,
            lastName,
                email
            });
        
        user.save();
        res.json({ data: "User created successfully" })
    } catch (error) {
        res.json({msg: `error occured ${error} `})
    }
})
//Delete a specific user by id
router.delete('/:id', async (req, res) => {
    try {
    const id = +(req.params.id)
    const user = await User.delete({ id });
        res.json({ data: "User deleted successfully" })
    } catch (error) {
        console.log(`error occured ${error} `)
    }
})




export default router;