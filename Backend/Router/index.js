import  express  from "express";
import NoteController from "../Controller/NoteController.js";
import AuthController from "../Controller/AuthController.js";
import verifyToken from "../middlerware/Auth.js";
const router = express();

router.post("/create_note",NoteController.createNotes)
router.get("/getAll_note",NoteController.get_Notes)
router.get("/get_note_id/:id",NoteController.get_Notes_withId)
router.delete("/deleted_note_id/:id",NoteController.delete_notes_withId)
router.put("/update_note_id/:id",NoteController.updated_notes_withId)

// Auth js

router.post("/create_usr",AuthController.UsrRegister)
router.post("/login_usr",AuthController.UsrLogin)
router.put("/updat_role",AuthController.UpdateRole)
router.post("/welcome",verifyToken,AuthController.Welcomepage)


export default router;  
