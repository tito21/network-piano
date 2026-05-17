
import * as Tone from 'tone';

import * as css from './style.module.css';
import * as notesCss from './notes.module.css';

import { NetworkData, Note } from './types/types';
import { playNote, scaleMajor, scalePentatonic, arrangeNotes, totalDuration } from './tones';


async function loadData(data: any): Promise<NetworkData[]> {
    const notes: NetworkData[] = [];
    data.forEach((entry: any) => {
        notes.push({
            contentType: entry["_resourceType"],
            startTime: entry["timings"]["blocked"],
            requestTime: entry["timings"]["send"],
            waitingTime: entry["timings"]["wait"],
            downLoadTime: entry["timings"]["receive"]
        });
    });
    return notes;
}

function noteToPosition(note: Note): { left: number; top: number; width: number } {
    return {
        left: note.startTime,
        top: scale.indexOf(note.note) * 40, // Position based on note index
        width: note.duration
    };
}

function addNote(note: Note, parentElement: HTMLElement) {
    console.log(`Adding note: startTime=${note.startTime}, duration=${note.duration}`);
    const noteElement = document.createElement('div');
    noteElement.classList.add(css.note);
    noteElement.classList.add(notesCss[note.note.replace(/\d/, '')]); // Add class based on note name (e.g., C, D, E)
    const { left, top, width } = noteToPosition(note);
    noteElement.style.left = `${left}px`;
    noteElement.style.width = `${width}px`;
    noteElement.style.top = `${top}px`;
    parentElement.appendChild(noteElement);
}

function playNotes(notes: Note[]) {
    notes.forEach((note) => {
        playNote(note);
    });
}

const button = document.getElementById('play-button') as HTMLButtonElement;
const scaleElement = document.getElementById('scale-selector') as HTMLSelectElement;
const input = document.getElementById('file-input') as HTMLInputElement;
const labelContainer = document.getElementById('labels-container') as HTMLDivElement;
const noteContainer = document.getElementById('notes-container') as HTMLDivElement;

let scale = scaleMajor; // Default scale
if (scaleElement) {
    scaleElement.value = 'major'; // Set default value
    scaleElement.addEventListener('change', () => {
        console.log(`Scale changed to: ${scaleElement.value}`);
        if (scaleElement.value === 'major') {
            scale = scaleMajor;
        } else if (scaleElement.value === 'pentatonic') {
            scale = scalePentatonic;
        }
        noteContainer.innerHTML = ''; // Clear previous notes
        if (labelContainer) {
            labelContainer.innerHTML = ''; // Clear previous labels
            for (let i = 0; i < scale.length; i++) {
                const label = document.createElement('div');
                const note = { note: scale[i], startTime: 0, duration: 0, attackTime: 0, releaseTime: 0 };
                const { left, top, width } = noteToPosition(note);
                label.innerHTML = `<span style=" display: inline-block; vertical-align: middle; line-height: normal;">${scale[i]}</span>`;
                label.style.left = `${left}px`;
                // label.style.width = `${width}px`;
                label.style.top = `${top}px`;
                label.classList.add(css.label);
                labelContainer.appendChild(label);
            }
        } else {
            console.error("Label container element not found!");
        }
    });
} else {
    console.error("Scale select element not found!");
}

if (labelContainer) {
    labelContainer.innerHTML = ''; // Clear previous labels
    for (let i = 0; i < scale.length; i++) {
        const label = document.createElement('div');
        const note = { note: scale[i], startTime: 0, duration: 0, attackTime: 0, releaseTime: 0 };
        const { left, top, width } = noteToPosition(note);
        label.innerHTML = `<span style=" display: inline-block; vertical-align: middle; line-height: normal;">${scale[i]}</span>`;
        label.style.left = `${left}px`;
        // label.style.width = `${width}px`;
        label.style.top = `${top}px`;
        label.classList.add(css.label);
        labelContainer.appendChild(label);
    }
} else {
    console.error("Label container element not found!");
}


if (button) {
    button.addEventListener('click', () => {
        if (Tone.getContext().state !== 'running') {
            Tone.getContext().resume();
        }

        let jsonData: any = {}; // Use the imported JSON data
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    jsonData = JSON.parse(event.target?.result as string);
                    loadData(jsonData.log.entries).then(entries => {
                    console.log("Processed notes:", entries);
                    if (noteContainer && labelContainer) {
                        const notes = arrangeNotes(entries, scale);
                        const totalWidth = totalDuration(notes) + 10;
                        noteContainer.style.width = `${totalWidth}px`;
                        Array.from(labelContainer.children).forEach(element => {
                            (element as HTMLElement).style.width = `${totalWidth}px`;
                        });
                        noteContainer.innerHTML = ''; // Clear previous notes
                        notes.forEach((note) => addNote(note, noteContainer));
                        playNotes(notes);
                    }
                    }).catch(error => {
                       console.error("Error loading data:", error);
                });
                } catch (error) {
                    console.error("Error parsing JSON file:", error);
                    return;
                }
            };
            reader.readAsText(file);
        }
    });
} else {
    console.error("Play button not found!");
}
