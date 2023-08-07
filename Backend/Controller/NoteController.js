import Note from "../model/NoteModel.js";
import Reply from "../common/Reply.js";
const createNotes = async (req, res) => {
    const request = req.body;
    if (!request?.title || !request.content) {
        return res.json(Reply.failed("Note content can not be empty"))
    }
    try {
        const note = await Note.create(request)
        return res.json(Reply.success("Note created", note))

    } catch (error) {
        console.log(error);
        return res.json(Reply.failed("Unable to create notes"))
    }
}
const get_Notes = async (req, res) => {
    try {
        const get_notes = await Note.find().sort({title: -1 });

        return res.json(Reply.success("Notes fetched", get_notes))

    } catch (errors) {
        console.log(errors);
        return res.json(Reply.failed("Unable to fetch notes"))
    }
}
const get_Notes_withId = async (req, res) => {
    const id = req.params.id
    console.log(id, "ff");
    try {
        const get_notes = await Note.findById(id)
        return res.json(Reply.success("Notes fetched", get_notes))

    } catch (errors) {
        console.log(errors);
        return res.json(Reply.failed("Unable to fetch notes"))
    }
}

const delete_notes_withId = async (req, res) => {
    const id = req.params.id
    try {
        const deleted_notes = await Note.findByIdAndDelete(id)
        return res.json(Reply.success("Deleted notes successfully!!", deleted_notes))

    } catch (errors) {
        console.log(errors);
        return res.json(Reply.failed("Unable to deleted notes"))
    }
}

const updated_notes_withId = async (req, res) => {
    const id = req.params.id
    const request = req.body;
    try {
        if(!request.title || !request.content){
            return res.json(Reply.failed("Note content can not be empty"))
        }
        const form_data={
            title:request.title,
            content:request.content
        }
          await Note.findByIdAndUpdate(id, form_data)
         return res.json(Reply.success("Notes Updated successfully!!"))

    } catch (errors) {
        console.log(errors);
        return res.json(Reply.failed("Unable to updated notes"))
    }
}

export default { createNotes, get_Notes, get_Notes_withId, delete_notes_withId,updated_notes_withId };






