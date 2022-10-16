import { Router } from "express";
import { User } from "../Entities/user";

const router = Router();

router.get('/', async (req, res) => {
    /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    */
    try {
        const users = await User.find();
        res.status(200).json({ data: users })
    } catch (error) {
        res.status(500).json({ msg: `error occured ${error} ` })
    }

})

router.get('/:id', async (req, res) => {
    /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get a specific user by id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'User id',
    }
    */
    try {
        const id = +(req.params.id)
        const user = await User.findOneBy({ id });
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(500).json({ msg: `error occured ${error} ` })
    }
})

router.post('/', async (req, res) => {
    /*
   #swagger.tags = ['Users']
   #swagger.summary = 'Create a new user'
   #swagger.parameters['firstName', 'lastName', 'email'] = {
       in: 'body',
       description: 'User data',
   }
   */
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
        res.status(200).json({ data: "User created successfully" })
    } catch (error) {
        res.status(500).json({ msg: `error occured ${error} ` })
    }
})

router.delete('/:id', async (req, res) => {
    /*
   #swagger.tags = ['Users']
   #swagger.summary = 'Delete a user'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'User id',
   }
   */
    try {
        const id = +(req.params.id)
        const user = await User.delete({ id });
        res.json({ data: "User deleted successfully" })
    } catch (error) {
        console.log(`error occured ${error} `)
    }
})

export default router;