import { useEffect, useState } from "react";
import "./Note.css"

interface NoteProp {
    id: string;
    title: string;
    isChecklist: boolean;
    content: string | string[];
    labels: number[]
}

interface LabelObj {
    id: string;
    userIDs: string[];
    noteIDs: string[];
    labelName: string;
}


export default function Note({ id, title, isChecklist, content }: NoteProp){

    const [labelList, setLabelList] = useState([])

    useEffect(() => {

    async function getLabels(){
        const allLabels = await (await fetch("http://localhost:3000/labels")).json()
        const noteLabels = allLabels.filter((label: LabelObj) => label.noteIDs.includes(id))
        console.log(allLabels)
        setLabelList(noteLabels)
    }

        getLabels()
    }, [id])

    return <section className="note">
    <div className="note-head">
        {labelList.map((label: LabelObj) => <p>{label.labelName}</p> )}
    </div>
    <div className="note-title">
        <h3>{title}</h3>
    </div>
    <div className="content">
        {
            isChecklist && Array.isArray(content) ? 
            <div>{content.map((point) => {
                return <label className="check-container">
                    <input type="checkbox" />
                    {point}
                </label> 
            })}</div>
            :
            <p>{content}</p>
        }
    </div>
    <div className="note-foot">
        <div className="buttons">
            <button>Delete</button>
            <button>Edit</button>
        </div>
        <p>semantic label</p>
    </div>
    </section>
}