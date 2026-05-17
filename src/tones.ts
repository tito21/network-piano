
import * as Tone from 'tone';
import { Note, NetworkData } from './types/types';

export const scaleMajor = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
export const scalePentatonic = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];

export const keys = ['document', 'stylesheet', 'image', 'media', 'font', 'script', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other'];

export const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export const playNote = (note: Note) => {
    synth.set({
        envelope: {
            attack: note.attackTime / 1000,
            release: note.releaseTime / 1000
        }
    });
    synth.triggerAttackRelease(note.note, note.duration / 1000, Tone.now() + note.startTime / 1000);
};

export const networkTypeToNote = (key: string, scale: string[]): string => {
    const index = keys.indexOf(key);
    return index !== -1 ? scale[index % scale.length] : scale[Math.floor(Math.random() * scale.length)];
};

export const arrangeNotes = (notes: NetworkData[], scale: string[]): Note[] => {
    return notes.map((note) => {
        const totalTime = note.requestTime + note.waitingTime + note.downLoadTime;
        let startTime = note.startTime;
        const noteName = networkTypeToNote(note.contentType, scale);
        return {
            note: noteName,
            startTime: startTime + Math.random() * 1000, // Add some random delay to avoid notes playing at the same time
            duration: totalTime,
            attackTime: note.requestTime,
            releaseTime: note.downLoadTime
        };
    });
};

export const totalDuration = (notes: Note[]): number => {
    return notes.reduce((max, note) => Math.max(max, note.startTime + note.duration), 0);
};