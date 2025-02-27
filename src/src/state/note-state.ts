import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { Note, NoteEntry } from "../types/note-Type";
import { NoteCategories } from './category-state';
import { ILocationStore } from './location-state';
export interface INoteStore {
    ShowForm: boolean;
    CategoryFormIsVisible: boolean;
    CurrentCategory: any;
    CurrentNote: Note;
    Notes: Note[];
    CurrentForm: any[];
    FG: number,
    ICFG: number,
    ShowInfo: boolean;
    ShowGridCalc: boolean;
    ShowNavCalc: boolean;
    NavGridRef: string;
    ShowItascForm: boolean;
    ShowFireInfo: boolean;
    setCategory: (category: any, locationInfo: ILocationStore) => void;
    closeCategory: () => void;
    updateForm: (formEntry: any) => void;
    selectForm: (noteEntry: NoteEntry) => void;
    showCategory: () => void;
    showFireReading:()=>void;
    hideForm: () => void;
    addEntry: (entry: NoteEntry) => void;
    deleteEntry: (entry: NoteEntry) => void;
    addNote: (name: string) => void;
    deleteAllNotes: () => void;
    setCurrent: (header: Note) => void;
    clearCurrentNote: () => void;
    findNote: (id: number) => Note | undefined;
    showInfo: () => void;
    showGridCalc: () => void;
    showNavCalc: () => void;
    setNavRef: (ref: string) => void;
    showItaskForm: () => void;
    setTemp: (value: number) => void;
    setRH: (value: number) => void;
    setWind: (value: number) => void;
    setFuelLoad: (value: number) => void;
    setDrought: (value: number) => void;
    setSlope: (value: number) => void;
}

export const useNoteStore = create(persist<INoteStore>(
    (set, get) => ({
        ShowForm: false,
        ShowInfo: false,
        ShowGridCalc: false,
        ShowNavCalc: false,
        ShowItascForm: false,
        ShowFireInfo: false,
        NavGridRef: "",
        FG: 0,
        ICFG: 0,
        CategoryFormIsVisible: false,
        CurrentCategory: [] as any,
        CategoryPath: "",
        CurrentNote: {} as Note,
        CurrentForm: [] as any,
        Notes: [],
        setTemp: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    Temp: value
                } as Note;
                
                
                return {
                    CurrentNote: newNote,
                     Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        setRH: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    RH: value
                } as Note;

                return {
                    CurrentNote: newNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        setWind: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    Wind: value
                } as Note;

                return {
                    CurrentNote: newNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        setFuelLoad: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    FuelLoad: value
                } as Note;

                return {
                    CurrentNote: newNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        setDrought: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    Drought: value
                } as Note;

                return {
                    CurrentNote: newNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        setSlope: (value: number) => {
            set((state: INoteStore) => {
                var newNote = {
                    ...state.CurrentNote,
                    Slope: value
                } as Note;

                return {
                    CurrentNote: newNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
                };

            })
        },
        showItaskForm: () => {

            set((state: INoteStore) => ({
                ShowItascForm: !state.ShowItascForm
            }));
        },
        showFireReading: () => {
            set((state: INoteStore) => ({
                ShowFireInfo: !state.ShowFireInfo
            }));
        },
        showGridCalc: () => {
            set((state: INoteStore) => ({
                ShowGridCalc: !state.ShowGridCalc
            }));
        },
        setNavRef: (ref: string) => {
            set(() => ({
                NavGridRef: ref
            }))
        },
        showNavCalc: () => {
            set((state: INoteStore) => ({
                ShowNavCalc: !state.ShowNavCalc
            }));
        },
        showInfo: () => {
            set((state: INoteStore) => ({
                ShowInfo: !state.ShowInfo
            }));
        },
        selectForm: (noteEntry: NoteEntry) => {
            set(() => ({
                CurrentForm: noteEntry.Form
            }))
        },
        deleteEntry: (entry: NoteEntry) => {
            set((state: INoteStore) => {
                {
                    const currentNote = {
                        ...state.CurrentNote,
                        Enteries: state.CurrentNote.Enteries.filter((src: NoteEntry) => src.Id !== entry.Id),
                    };
                    return {
                        CurrentNote: currentNote,
                        Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? currentNote : note)
                    }
                }
            })
        },
        addEntry: (entry: NoteEntry) => {
            set((state: INoteStore) => {
                var currentNote = {
                    ...state.CurrentNote,
                    Enteries: [entry, ...state.CurrentNote.Enteries],

                } as Note;
                return {
                    CurrentNote: currentNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? currentNote : note)
                }
            });

        },
        closeCategory: () => {
            set(() => ({
                CategoryFormIsVisible: false,
                CurrentCategory: []
            }))
        },
        setCategory: (category: any, locationInfo: ILocationStore) => {
            const currentDate = new Date();

            if (category.Items !== undefined) {
                set(() => ({
                    CurrentCategory: category.Items
                }));
            } else {
                var newEntry = {
                    Id: Number(currentDate.getTime().toString()),
                    Lat: locationInfo?.Lat,
                    Long: locationInfo?.Long,
                    Ref: locationInfo?.Ref,
                    CurrentLocation: locationInfo?.Address,
                    Heading: locationInfo?.Heading,
                    Date: currentDate.toLocaleString(),
                    Name: category.Name,
                    Title: category.Title,
                    Category: "",
                    BackgroundIcon: category.Bg,
                    Content: "",
                    LastUpdated: "",
                    Form: []

                } as NoteEntry;
                const formId = Number(currentDate.getTime().toString());
                category.Form.map((f: any, i: number) => {
                    newEntry.Form.push({ Id: formId + i, Title: f.Title });
                });


                set((state: INoteStore) => {
                    const updateNote = () => {
                        const noteToUpdate = state.Notes.find((note) => note.Id === state.CurrentNote.Id);

                        if (!noteToUpdate) {
                            throw new Error("Note not found"); // Handle case where note is not found
                        }

                        // Update the note model
                        const updatedNote = {
                            ...noteToUpdate,
                            Enteries: [newEntry, ...(noteToUpdate.Enteries || [])], // Add new entry
                        };

                        return updatedNote;
                    };

                    const updatedNote = updateNote();
                    const updatedNotes = state.Notes.map((note) =>
                        note.Id === updatedNote.Id ? updatedNote : note
                    );

                    return {
                        CurrentForm: newEntry.Form,
                        CurrentNote: updatedNote,
                        CurrentCategory: undefined,
                        CategoryFormIsVisible: false,
                        Notes: updatedNotes
                    }
                });
            }
        },
        updateForm: (formEntry: any) => {
            set((state: INoteStore) => {        
                
                let currentNote={
                    ...state.CurrentNote,
                    Enteries: state.CurrentNote.Enteries.map((entry: any) => entry.Id === formEntry.Id ? { ...entry, formEntry } : entry)
                };
                const result = {
                    CurrentNote: currentNote,
                    Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? currentNote : note)
                }
                console.log(result);
                return result;
            })
        },


        hideForm: () => {
            set(() => ({
                CurrentForm: []
            }));
        },
        setCurrent: (newNote: Note) => {
            set((state: INoteStore) => { 
                
                return {
                CurrentNote: newNote,
                Notes: state.Notes.map((note) => note.Id === state.CurrentNote.Id ? newNote : note)
            }})
        },
        showCategory: () => {
            set(() => ({
                CurrentCategory: NoteCategories,
                CategoryFormIsVisible: true
            }))
        },
        deleteAllNotes: () => {
            set((state: INoteStore) => {
                const deleteNote = (noteId: number) => {
                    const noteExists = state.Notes.some((note) => note.Id === noteId);

                    if (!noteExists) {
                        throw new Error("Note not found"); // Handle case where note is not found
                    }

                    // Filter out the note to delete
                    const updatedNotes = state.Notes.filter((note) => note.Id !== noteId);

                    return updatedNotes;
                };
                // Use the helper method to remove the note from the Notes array
                const updatedNotes = deleteNote(state.CurrentNote.Id);

                return {
                    CurrentNote: {} as Note,
                    Notes: updatedNotes
                }

            })
        },
        findNote: (id: number) => {
            const state = get();
            return state.Notes.find((note: Note) => note.Id === id);

        },
        addNote: (name: string) => {
            var currentDate = new Date();
            var newNote = {
                Id: Number(currentDate.getTime().toString()),
                Date: currentDate.toLocaleString(),
                Name: name
            } as Note;

            set((state: INoteStore) => ({
                CurrentNote: newNote,
                Notes: [newNote, ...state.Notes]
            }))
        },
        clearCurrentNote: () => {
            set((state: INoteStore) => {
                const updatedNotes = state.Notes.map((note) => note.Id === state.CurrentNote.Id ? state.CurrentNote : note)
                return { Notes: updatedNotes, CurrentNote: {} as Note }
            });
        }
    }), {
    name: "notes-storage",

    onRehydrateStorage: () => {
        console.log("Rehydrating state from localStorage...");
    },
}));

