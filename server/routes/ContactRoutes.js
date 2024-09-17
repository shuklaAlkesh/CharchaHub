import { Router } from 'express';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import { getContactsForDMList, searchContacts} from  "../controllers/ContactController.js"
const contactRoutes = Router();


contactRoutes.post("/search",verifyToken,searchContacts);
contactRoutes.get("/get-contact-for-dm",verifyToken,getContactsForDMList);

export default contactRoutes;