import  express  from "express";
import NoteController from "../Controller/NoteController.js";
const router = express();
router.post("/create_note",NoteController.createNotes)
router.get("/getAll_note",NoteController.get_Notes)
router.get("/get_note_id/:id",NoteController.get_Notes_withId)
router.delete("/deleted_note_id/:id",NoteController.delete_notes_withId)
router.put("/update_note_id/:id",NoteController.updated_notes_withId)


export default router;
